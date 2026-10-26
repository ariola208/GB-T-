const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const clean = (s) => typeof s === 'string' ? s.trim() : '';
const normEmail = (e) => clean(e).toLowerCase();
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 255;
const sign = (p) => jwt.sign(p, process.env.JWT_SECRET, { expiresIn: '7d' });

// Log d'événement + mise à jour manuelle du compteur (sans trigger MySQL)
async function logEvent(uid, type, req, ok = true, detail = null) {
  try {
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.ip || null;
    const ua = (req.headers['user-agent'] || '').slice(0, 500) || null;
    
    // 1. On insère l'événement
    await pool.execute(
      'INSERT INTO auth_events (user_id, event_type, ip_address, user_agent, success, detail) VALUES (?,?,?,?,?,?)',
      [uid, type, ip, ua, ok, detail]
    );

    // 2. On met à jour le compteur correspondant directement
    if (type === 'register' && ok) {
      await pool.execute("UPDATE _meta_auth_stats SET stat_value = stat_value + 1 WHERE stat_key = 'total_users_ever_registered'");
    } else if (type === 'login' && ok) {
      await pool.execute("UPDATE _meta_auth_stats SET stat_value = stat_value + 1 WHERE stat_key = 'total_logins_success'");
    } else if (type === 'failed_login') {
      await pool.execute("UPDATE _meta_auth_stats SET stat_value = stat_value + 1 WHERE stat_key = 'total_logins_failed'");
    }
  } catch (e) {
    console.warn('[auth-events]', e.message);
  }
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
    const [r] = await pool.execute('INSERT INTO users (email,password_hash,first_name,last_name,phone) VALUES (?,?,?,?,?)', [email, hashed, firstName, lastName, phone || null]);
    
    await logEvent(r.insertId, 'register', req, true, 'email/password');
    
    const token = sign({ userId: r.insertId, email, role: 'user' });
    res.status(201).json({ message: 'Compte créé', token, user: { id: r.insertId, name: `${firstName} ${lastName}`, email, role: 'user' } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/login', async (req, res) => {
  const email = normEmail(req.body.email);
  const { password } = req.body;
  
  if (!emailOk(email) || typeof password !== 'string') return res.status(400).json({ error: 'Identifiants invalides' });
  
  try {
    const [rows] = await pool.execute('SELECT user_id,email,password_hash,first_name,last_name,role,is_active,deleted_at FROM users WHERE email=?', [email]);
    
    if (!rows.length) {
      await logEvent(null, 'failed_login', req, false, 'unknown_email');
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    if (rows[0].deleted_at) {
      await logEvent(rows[0].user_id, 'failed_login', req, false, 'deleted');
      return res.status(403).json({ error: 'Compte supprimé' });
    }
    if (!(await bcrypt.compare(password, rows[0].password_hash))) {
      await logEvent(rows[0].user_id, 'failed_login', req, false, 'wrong_password');
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    if (!rows[0].is_active) {
      await logEvent(rows[0].user_id, 'failed_login', req, false, 'inactive');
      return res.status(403).json({ error: 'Compte désactivé' });
    }
    
    await pool.execute('UPDATE users SET last_login=NOW() WHERE user_id=?', [rows[0].user_id]);
    await logEvent(rows[0].user_id, 'login', req, true, 'email/password');
    
    try {
      await pool.query('CALL sp_update_peak_sessions()');
      await pool.query('CALL sp_update_peak_daily_active()');
    } catch (err) {
      console.warn('[peak]', err.message);
    }
    
    const token = sign({ userId: rows[0].user_id, email: rows[0].email, role: rows[0].role });
    res.json({ message: 'OK', token, user: { id: rows[0].user_id, name: `${rows[0].first_name} ${rows[0].last_name}`, email: rows[0].email, role: rows[0].role } });
  } catch (e) {
    console.error('ERREUR LOGIN:', e);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/stats', async (_req, res) => {
  try {
    const [rows] = await pool.execute('SELECT stat_key, stat_value FROM _meta_auth_stats');
    const out = {};
    rows.forEach((r) => (out[r.stat_key] = Number(r.stat_value)));
    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
