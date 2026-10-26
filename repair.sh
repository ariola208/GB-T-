#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
[ -f package.json ] && [ -d server ] && [ -d src ] || { echo "❌ Lance depuis ~/GB-T-"; exit 1; }

echo "🔧 Port 5000…"
pkill -f "node index.js" 2>/dev/null || true
lsof -ti:5000 2>/dev/null | xargs -r kill -9 2>/dev/null || true
sleep 1

echo "🔐 MySQL root…"
read -srp "Mot de passe root MySQL : " RPWD; echo
mysql -u root -p"$RPWD" -e "SELECT 1;" >/dev/null 2>&1 || { echo "❌ mdp root refusé. Fais : sudo mysqld_safe --skip-grant-tables & puis mysql -u root -e \"FLUSH PRIVILEGES; ALTER USER 'root'@'localhost' IDENTIFIED BY 'RootMDP2025!';\""; exit 1; }

mysql -u root -p"$RPWD" <<SQL
CREATE USER IF NOT EXISTS 'legbah'@'localhost' IDENTIFIED BY 'LegbahSecure!2025';
GRANT ALL PRIVILEGES ON benin_tourisme_db.* TO 'legbah'@'localhost';
FLUSH PRIVILEGES;
SQL

echo "📦 Import schéma + migration…"
mysql -u root -p"$RPWD" benin_tourisme_db < database.sql 2>/dev/null || mysql -u root -p"$RPWD" < database.sql
mysql -u root -p"$RPWD" < scripts/migrations/001_auth_stats.sql

echo "📝 server/.env…"
cat > server/.env <<EOF
DB_HOST=localhost
DB_USER=legbah
DB_PASSWORD=LegbahSecure!2025
DB_NAME=benin_tourisme_db
DB_POOL_SIZE=10
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")
PORT=5000
CORS_ORIGIN=http://localhost:8080
EOF
chmod 600 server/.env

echo "🩹 Réparation Profile.tsx…"
git checkout -- src/pages/Profile.tsx 2>/dev/null || echo "⚠️  pas de git, vérifie Profile.tsx manuellement"

echo "🔑 Mot de passe admin…"
read -srp "Admin password (8 car. min.) : " APWD; echo
node scripts/setup-admin-password.cjs "$APWD"

unset RPWD APWD
echo
echo "✅ Terminé. Lance : pnpm run dev"
