#!/usr/bin/env bash
set -e

# ---------- 0. Garde-fous ----------
cd "$(dirname "$0")"
if [ ! -f package.json ] || [ ! -d server ] || [ ! -d src ]; then
  echo "❌ Tu dois être à la racine ~/GB-T- (package.json + server/ + src/)"
  exit 1
fi
echo "📍 Racine : $(pwd)"

# ---------- 1. Libérer le port 5000 ----------
echo "🔧 Libération du port 5000…"
pkill -f "node index.js" 2>/dev/null || true
lsof -ti:5000 2>/dev/null | xargs -r kill -9 2>/dev/null || true
sleep 1

# ---------- 2. MySQL : demande le mot de passe root UNE fois ----------
echo
echo "🔐 Connexion à MySQL (mot de passe root)…"
read -srp "Mot de passe root MySQL : " ROOT_PWD
echo
if ! mysql -u root -p"$ROOT_PWD" -e "SELECT 1;" >/dev/null 2>&1; then
  echo "❌ Mot de passe root refusé. Essaie : sudo mysql -e \"ALTER USER 'root'@'localhost' IDENTIFIED BY 'TONMDP';\""
  exit 1
fi
echo "✅ MySQL OK"

# Crée l'utilisateur applicatif (idempotent)
mysql -u root -p"$ROOT_PWD" <<SQL
CREATE USER IF NOT EXISTS 'legbah'@'localhost' IDENTIFIED BY 'LegbahSecure!2025';
GRANT ALL PRIVILEGES ON benin_tourisme_db.* TO 'legbah'@'localhost';
FLUSH PRIVILEGES;
SQL
echo "✅ Utilisateur 'legbah' prêt"

# ---------- 3. server/.env ----------
JWT=$(node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")
cat > server/.env <<EOF
DB_HOST=localhost
DB_USER=legbah
DB_PASSWORD=LegbahSecure!2025
DB_NAME=benin_tourisme_db
DB_POOL_SIZE=10
JWT_SECRET=$JWT
PORT=5000
CORS_ORIGIN=http://localhost:8080
EOF
chmod 600 server/.env
echo "✅ server/.env généré"

# ---------- 4. package.json scripts ----------
node - <<'NODE'
const fs = require('fs');
const d = JSON.parse(fs.readFileSync('package.json', 'utf8'));
d.scripts = d.scripts || {};
d.scripts.build = 'tsc -p tsconfig.app.json --noEmit && vite build';
d.scripts.typecheck = 'tsc -p tsconfig.app.json --noEmit';
d.scripts['i18n:check'] = 'python3 check_i18n.py';
fs.writeFileSync('package.json', JSON.stringify(d, null, 2) + '\n');
NODE
echo "✅ package.json scripts mis à jour"

# ---------- 5. setup-admin-password en .cjs ----------
[ -f scripts/setup-admin-password.js ] && mv scripts/setup-admin-password.js scripts/setup-admin-password.cjs
cat > scripts/setup-admin-password.cjs <<'NODE'
#!/usr/bin/env node
require('dotenv').config({ path: 'server/.env' });
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
(async () => {
  const pwd = process.argv[2];
  if (!pwd || pwd.length < 8) {
    console.error('Usage : node scripts/setup-admin-password.cjs "MonMotDePasse"');
    process.exit(1);
  }
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST, user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
  });
  const hash = await bcrypt.hash(pwd, 12);
  const [r] = await conn.execute(
    "UPDATE users SET password_hash=? WHERE email='admin@legbah.bj'", [hash]);
  await conn.end();
  console.log(r.affectedRows ? '✅ Mot de passe admin mis à jour.' : "❌ admin@legbah.bj introuvable.");
})().catch(e => { console.error('❌', e.message); process.exit(1); });
NODE
chmod +x scripts/setup-admin-password.cjs
echo "✅ setup-admin-password.cjs prêt"

# ---------- 6. Migration SQL 001 ----------
mkdir -p scripts/migrations
cat > scripts/migrations/001_auth_stats.sql <<'SQL'
USE benin_tourisme_db;

CREATE TABLE IF NOT EXISTS auth_events (
    event_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    event_type ENUM('register','login','logout','failed_login','account_delete','account_restore') NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent VARCHAR(500) NULL,
    success BOOLEAN NOT NULL DEFAULT TRUE,
    detail VARCHAR(500) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id),
    INDEX idx_auth_user (user_id, created_at DESC),
    INDEX idx_auth_type (event_type, created_at DESC),
    INDEX idx_auth_created (created_at DESC),
    CONSTRAINT fk_auth_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS _meta_auth_stats (
    stat_key VARCHAR(100) NOT NULL PRIMARY KEY,
    stat_value BIGINT NOT NULL DEFAULT 0,
    last_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description VARCHAR(255) NULL
) ENGINE=InnoDB;

INSERT IGNORE INTO _meta_auth_stats (stat_key, description) VALUES
('total_users_ever_registered','Comptes créés'),
('total_logins_success','Connexions réussies'),
('total_logins_failed','Échecs'),
('total_accounts_deleted','Comptes supprimés'),
('peak_concurrent_sessions','Pic sessions'),
('peak_users_active_daily','Pic actifs/jour'),
('current_active_sessions','Sessions valides');

DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_peak_sessions//
CREATE PROCEDURE sp_update_peak_sessions()
BEGIN
  DECLARE v_cur BIGINT; DECLARE v_peak BIGINT;
  SELECT COUNT(*) INTO v_cur FROM sessions WHERE expires_at > NOW();
  SELECT stat_value INTO v_peak FROM _meta_auth_stats WHERE stat_key='peak_concurrent_sessions';
  IF v_cur > v_peak THEN
    UPDATE _meta_auth_stats SET stat_value=v_cur WHERE stat_key='peak_concurrent_sessions';
  END IF;
  UPDATE _meta_auth_stats SET stat_value=v_cur WHERE stat_key='current_active_sessions';
END//

DROP PROCEDURE IF EXISTS sp_update_peak_daily_active//
CREATE PROCEDURE sp_update_peak_daily_active()
BEGIN
  DECLARE v_t BIGINT; DECLARE v_p BIGINT;
  SELECT COUNT(DISTINCT user_id) INTO v_t FROM auth_events
    WHERE event_type='login' AND success=TRUE AND DATE(created_at)=CURDATE();
  SELECT stat_value INTO v_p FROM _meta_auth_stats WHERE stat_key='peak_users_active_daily';
  IF v_t > v_p THEN
    UPDATE _meta_auth_stats SET stat_value=v_t WHERE stat_key='peak_users_active_daily';
  END IF;
END//

DROP PROCEDURE IF EXISTS sp_delete_account//
CREATE PROCEDURE sp_delete_account(IN p_uid INT, IN p_reason VARCHAR(500), OUT p_ok BOOLEAN)
BEGIN
  DECLARE v_hash CHAR(64);
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; SET p_ok=FALSE; RESIGNAL; END;
  SET p_ok = FALSE;
  START TRANSACTION;
  IF EXISTS (SELECT 1 FROM users WHERE user_id=p_uid AND deleted_at IS NULL) THEN
    SELECT SHA2(email,256) INTO v_hash FROM users WHERE user_id=p_uid;
    UPDATE users SET email=CONCAT('deleted-',v_hash,'@legbah.local'),
      password_hash='*DELETED*', first_name='Compte', last_name='Supprimé',
      phone=NULL, avatar_url=NULL, bio=NULL, location=NULL,
      is_active=FALSE, deleted_at=NOW()
    WHERE user_id=p_uid;
    DELETE FROM sessions WHERE user_id=p_uid;
    DELETE FROM password_resets WHERE user_id=p_uid;
    INSERT INTO auth_events (user_id,event_type,success,detail)
      VALUES (p_uid,'account_delete',TRUE,LEFT(COALESCE(p_reason,'user'),500));
    UPDATE _meta_auth_stats SET stat_value=stat_value+1 WHERE stat_key='total_accounts_deleted';
    COMMIT; SET p_ok=TRUE;
  ELSE ROLLBACK; END IF;
END//
DELIMITER ;

DELIMITER //
DROP TRIGGER IF EXISTS trg_auth_after_insert//
CREATE TRIGGER trg_auth_after_insert AFTER INSERT ON auth_events FOR EACH ROW
BEGIN
  IF NEW.event_type='register' AND NEW.success THEN
    UPDATE _meta_auth_stats SET stat_value=stat_value+1 WHERE stat_key='total_users_ever_registered';
  ELSEIF NEW.event_type='login' AND NEW.success THEN
    UPDATE _meta_auth_stats SET stat_value=stat_value+1 WHERE stat_key='total_logins_success';
  ELSEIF NEW.event_type='failed_login' THEN
    UPDATE _meta_auth_stats SET stat_value=stat_value+1 WHERE stat_key='total_logins_failed';
  END IF;
END//
DELIMITER ;

INSERT IGNORE INTO _meta_schema_migrations (version, description) VALUES ('4.1.0','Auth stats & suppression');
SQL
echo "✅ Migration 001 prête"

# ---------- 7. Route account.js ----------
cat > server/routes/account.js <<'JS'
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const auth = require('../middleware/auth');
router.use(auth);

router.delete('/', async (req, res) => {
  const { password, reason } = req.body || {};
  if (typeof password !== 'string' || password.length < 1)
    return res.status(400).json({ error: 'Mot de passe requis' });
  try {
    const [rows] = await pool.execute(
      'SELECT password_hash, deleted_at FROM users WHERE user_id=?', [req.user.userId]);
    if (!rows.length) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    if (rows[0].deleted_at) return res.status(400).json({ error: 'Déjà supprimé' });
    if (!(await bcrypt.compare(password, rows[0].password_hash)))
      return res.status(400).json({ error: 'Mot de passe incorrect' });
    const conn = await pool.getConnection();
    try {
      await conn.query('CALL sp_delete_account(?, ?, @ok)', [req.user.userId, (reason||'user').slice(0,500)]);
      const [[{ ok }]] = await conn.query('SELECT @ok AS ok');
      if (!ok) return res.status(500).json({ error: 'Suppression échouée' });
    } finally { conn.release(); }
    res.json({ message: 'Compte supprimé.' });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur serveur' }); }
});

router.get('/export', async (req, res) => {
  try {
    const uid = req.user.userId;
    const [[user]] = await pool.execute('SELECT user_id,email,first_name,last_name,phone,bio,location,role,created_at FROM users WHERE user_id=?',[uid]);
    const [bookings] = await pool.execute('SELECT booking_id,booking_reference,start_date,end_date,total_price,status FROM bookings WHERE user_id=?',[uid]);
    const [reviews] = await pool.execute('SELECT review_id,destination_id,rating,title,comment,created_at FROM reviews WHERE user_id=?',[uid]);
    const [favs] = await pool.execute('SELECT destination_id,created_at FROM favorites WHERE user_id=?',[uid]);
    const [logs] = await pool.execute('SELECT event_type,ip_address,created_at FROM auth_events WHERE user_id=? ORDER BY created_at DESC LIMIT 1000',[uid]);
    res.setHeader('Content-Disposition', `attachment; filename="legbah-export-${uid}.json"`);
    res.json({ exported_at: new Date().toISOString(), user, bookings, reviews, favorites: favs, auth_history: logs });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur serveur' }); }
});

module.exports = router;
JS
echo "✅ server/routes/account.js"

# ---------- 8. auth.js instrumenté ----------
cat > server/routes/auth.js <<'JS'
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const clean = (s) => typeof s === 'string' ? s.trim() : '';
const normEmail = (e) => clean(e).toLowerCase();
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 255;
const sign = (p) => jwt.sign(p, process.env.JWT_SECRET, { expiresIn: '7d' });

const meta = (req) => ({
  ip: (req.headers['x-forwarded-for']||'').split(',')[0].trim() || req.ip || null,
  ua: (req.headers['user-agent']||'').slice(0,500) || null,
});
async function logEvent(uid, type, req, ok = true, detail = null) {
  try {
    const { ip, ua } = meta(req);
    await pool.execute('INSERT INTO auth_events (user_id,event_type,ip_address,user_agent,success,detail) VALUES (?,?,?,?,?,?)',
      [uid, type, ip, ua, ok, detail]);
  } catch (e) { console.warn('[auth-events]', e.message); }
}

router.post('/register', async (req, res) => {
  const firstName = clean(req.body.firstName), lastName = clean(req.body.lastName);
  const email = normEmail(req.body.email), phone = clean(req.body.phone);
  const { password } = req.body;
  if (!firstName || !lastName) return res.status(400).json({ error: 'Nom et prénom requis' });
  if (!emailOk(email)) return res.status(400).json({ error: 'Email invalide' });
  if (typeof password !== 'string' || password.length < 8) return res.status(400).json({ error: '8 caractères minimum' });
  try {
    const [ex] = await pool.execute('SELECT user_id FROM users WHERE email=? AND deleted_at IS NULL', [email]);
    if (ex.length) return res.status(400).json({ error: 'Email déjà utilisé' });
    const hashed = await bcrypt.hash(password, 12);
    const [r] = await pool.execute('INSERT INTO users (email,password_hash,first_name,last_name,phone) VALUES (?,?,?,?,?)',
      [email, hashed, firstName, lastName, phone || null]);
    await logEvent(r.insertId, 'register', req, true, 'email/password');
    const token = sign({ userId: r.insertId, email, role: 'user' });
    res.status(201).json({ message: 'Compte créé', token,
      user: { id: r.insertId, name: `${firstName} ${lastName}`, email, role: 'user' } });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur serveur' }); }
});

router.post('/login', async (req, res) => {
  const email = normEmail(req.body.email);
  const { password } = req.body;
  if (!emailOk(email) || typeof password !== 'string')
    return res.status(400).json({ error: 'Identifiants invalides' });
  try {
    const [rows] = await pool.execute('SELECT user_id,email,password_hash,first_name,last_name,role,is_active,deleted_at FROM users WHERE email=?', [email]);
    if (!rows.length) { await logEvent(null, 'failed_login', req, false, 'unknown'); return res.status(401).json({ error: 'Identifiants incorrects' }); }
    if (rows[0].deleted_at) { await logEvent(rows[0].user_id, 'failed_login', req, false, 'deleted'); return res.status(403).json({ error: 'Compte supprimé' }); }
    if (!(await bcrypt.compare(password, rows[0].password_hash))) { await logEvent(rows[0].user_id, 'failed_login', req, false, 'wrong_pwd'); return res.status(401).json({ error: 'Identifiants incorrects' }); }
    if (!rows[0].is_active) { await logEvent(rows[0].user_id, 'failed_login', req, false, 'inactive'); return res.status(403).json({ error: 'Compte désactivé' }); }
    await pool.execute('UPDATE users SET last_login=NOW() WHERE user_id=?', [rows[0].user_id]);
    await logEvent(rows[0].user_id, 'login', req, true, 'email/password');
    try { await pool.query('CALL sp_update_peak_sessions()'); await pool.query('CALL sp_update_peak_daily_active()'); } catch {}
    const token = sign({ userId: rows[0].user_id, email: rows[0].email, role: rows[0].role });
    res.json({ message: 'OK', token,
      user: { id: rows[0].user_id, name: `${rows[0].first_name} ${rows[0].last_name}`, email: rows[0].email, role: rows[0].role } });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur serveur' }); }
});

router.post('/logout', async (req, res) => {
  const auth = req.headers['authorization'];
  const token = auth && auth.split(' ')[1];
  if (token) try { const d = jwt.verify(token, process.env.JWT_SECRET); await logEvent(d.userId, 'logout', req); } catch {}
  res.json({ message: 'Déconnecté' });
});

router.get('/stats', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT stat_key,stat_value FROM _meta_auth_stats');
    const out = {}; rows.forEach(r => out[r.stat_key] = Number(r.stat_value));
    res.json(out);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erreur' }); }
});

module.exports = router;
JS
echo "✅ server/routes/auth.js"

# ---------- 9. index.js : branchement /api/account ----------
node - <<'NODE'
const fs = require('fs');
const p = 'server/index.js';
let s = fs.readFileSync(p, 'utf8');
const needle = "app.use('/api/profile', require('./routes/avatar'));";
if (!s.includes('/api/account') && s.includes(needle)) {
  s = s.replace(needle, needle + "\napp.use('/api/account', require('./routes/account'));");
  fs.writeFileSync(p, s);
  console.log('✅ /api/account branché');
} else {
  console.log('ℹ️  /api/account déjà branché ou ancre introuvable');
}
NODE

# ---------- 10. Composants frontend ----------
mkdir -p src/components
cat > src/components/AuthStatsWidget.tsx <<'TSX'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, LogIn, TrendingUp, Trash2 } from "lucide-react";
import { api } from "@/lib/api";

type Stats = Record<string, number>;
export const AuthStatsWidget = () => {
  const { t } = useTranslation();
  const [s, setS] = useState<Stats | null>(null);
  useEffect(() => {
    let c = false;
    api.get<Stats>("/auth/stats").then((x) => { if (!c) setS(x); }).catch(() => {});
    return () => { c = true; };
  }, []);
  if (!s) return null;
  const items = [
    { icon: Users, label: t("authStats.registered", "Inscriptions"), value: s.total_users_ever_registered ?? 0 },
    { icon: LogIn, label: t("authStats.logins", "Connexions"), value: s.total_logins_success ?? 0 },
    { icon: TrendingUp, label: t("authStats.peak", "Pic"), value: s.peak_concurrent_sessions ?? 0 },
    { icon: Trash2, label: t("authStats.deleted", "Supprimés"), value: s.total_accounts_deleted ?? 0 },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border border-border bg-card p-4 text-center">
          <it.icon className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
          <p className="font-heading text-2xl font-bold tabular-nums">{it.value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{it.label}</p>
        </div>
      ))}
    </div>
  );
};
export default AuthStatsWidget;
TSX

cat > src/components/DeleteAccountDialog.tsx <<'TSX'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api, ApiError, API_URL } from "@/lib/api";

const CONFIRM = "SUPPRIMER";
export const DeleteAccountDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState(""); const [txt, setTxt] = useState("");
  const [reason, setReason] = useState(""); const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  if (!open) return null;
  const can = pwd.length >= 8 && txt === CONFIRM;

  const del = async () => {
    if (!can) return; setBusy(true); setErr("");
    try {
      await api.delete("/account");
      localStorage.removeItem("token"); localStorage.removeItem("user");
      toast({ title: t("deleteAccount.success_title") });
      navigate("/", { replace: true });
    } catch (e) { setErr(e instanceof ApiError ? e.message : t("deleteAccount.error")); }
    finally { setBusy(false); }
  };

  const exp = async () => {
    try {
      const tk = localStorage.getItem("token");
      const r = await fetch(`${API_URL}/account/export`, { headers: { Authorization: `Bearer ${tk}` } });
      if (!r.ok) throw new Error("Export impossible");
      const b = await r.blob(); const u = URL.createObjectURL(b);
      const a = document.createElement("a"); a.href = u; a.download = `legbah-export-${Date.now()}.json`; a.click();
      URL.revokeObjectURL(u);
    } catch (e: any) { toast({ title: e.message, variant: "destructive" }); }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70" onClick={busy ? undefined : onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-destructive/40 bg-background p-6 shadow-dramatic">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold">{t("deleteAccount.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("deleteAccount.intro")}</p>
          </div>
        </div>
        <div className="space-y-4">
          <PasswordInput id="dp" label={t("deleteAccount.password")} value={pwd} onChange={(e) => setPwd(e.target.value)} />
          <input value={txt} onChange={(e) => setTxt(e.target.value.toUpperCase())} placeholder={CONFIRM}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono uppercase focus:ring-2 focus:ring-ring" />
          <Textarea label={t("deleteAccount.reason")} rows={2} value={reason} onChange={(e) => setReason(e.target.value)} />
          {err && <p className="text-sm text-destructive">{err}</p>}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" onClick={exp} disabled={busy} className="flex-1"><Download className="mr-2 h-4 w-4" />{t("deleteAccount.export")}</Button>
          <Button variant="destructive" onClick={del} disabled={!can || busy} className="flex-1"><Trash2 className="mr-2 h-4 w-4" />{t("deleteAccount.confirm")}</Button>
          <Button variant="ghost" onClick={onClose} disabled={busy} className="w-full">{t("deleteAccount.cancel")}</Button>
        </div>
      </div>
    </div>
  );
};
export default DeleteAccountDialog;
TSX
echo "✅ Composants frontend créés"

# ---------- 11. Traductions ----------
python3 - <<'PY'
import json
BLOCKS = {
  "fr": {
    "authStats": {"registered":"Inscriptions","logins":"Connexions","peak":"Pic simultané","deleted":"Comptes supprimés"},
    "deleteAccount": {"title":"Supprimer mon compte","intro":"Action irréversible. Données anonymisées (RGPD).","password":"Mot de passe actuel","confirm_label":"Tapez {{word}} pour confirmer","reason":"Raison (facultatif)","reason_ph":"Pourquoi ?","export":"Exporter mes données","confirm":"Supprimer définitivement","cancel":"Annuler","success_title":"Compte supprimé","success_desc":"Données anonymisées.","error":"Erreur"}
  },
  "en": {
    "authStats": {"registered":"Sign-ups","logins":"Log-ins","peak":"Peak","deleted":"Deleted"},
    "deleteAccount": {"title":"Delete my account","intro":"Irreversible. Data anonymised (GDPR).","password":"Current password","confirm_label":"Type {{word}} to confirm","reason":"Reason (optional)","reason_ph":"Why?","export":"Export my data","confirm":"Delete permanently","cancel":"Cancel","success_title":"Account deleted","success_desc":"Data anonymised.","error":"Error"}
  },
  "pt": {
    "authStats": {"registered":"Inscrições","logins":"Sessões","peak":"Pico","deleted":"Eliminadas"},
    "deleteAccount": {"title":"Eliminar conta","intro":"Irreversível. Dados anonimizados (RGPD).","password":"Palavra-passe atual","confirm_label":"Escreva {{word}}","reason":"Motivo","reason_ph":"Porquê?","export":"Exportar dados","confirm":"Eliminar","cancel":"Cancelar","success_title":"Conta eliminada","success_desc":"Dados anonimizados.","error":"Erro"}
  }
}
for lang, block in BLOCKS.items():
    p = f"src/i18n/locales/{lang}.json"
    try:
        d = json.load(open(p))
    except FileNotFoundError:
        print(f"⚠️  {p} absent"); continue
    for k, v in block.items():
        if isinstance(v, dict) and isinstance(d.get(k), dict):
            d[k].update(v)
        else:
            d[k] = v
    json.dump(d, open(p, "w"), ensure_ascii=False, indent=1)
print("✅ Traductions ajoutées")
PY

# ---------- 12. Appliquer la migration ----------
echo
echo "📦 Application de la migration…"
mysql -u root -p"$ROOT_PWD" < scripts/migrations/001_auth_stats.sql
echo "✅ Migration appliquée"

# ---------- 13. Hash admin ----------
echo
echo "🔑 Mot de passe admin (8 car. min.) :"
read -srp "Admin password : " ADMIN_PWD
echo
node scripts/setup-admin-password.cjs "$ADMIN_PWD"
unset ADMIN_PWD ROOT_PWD

# ---------- 14. Récap ----------
echo
echo "🎉 Tout est prêt."
echo
echo "Prochaines commandes :"
echo "   pnpm run typecheck       # vérifie le TypeScript"
echo "   pnpm run dev             # lance API + frontend"
echo
echo "Test rapide :"
echo "   curl http://localhost:5000/api/health"
echo "   curl http://localhost:5000/api/auth/stats"
