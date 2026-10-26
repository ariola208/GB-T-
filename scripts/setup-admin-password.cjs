#!/usr/bin/env node
/**
 * Génère un hash bcrypt réel pour l'admin et met à jour la DB.
 * Usage : node scripts/setup-admin-password.cjs "MonMotDePasse"
 */
require('dotenv').config({ path: 'server/.env' });
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

(async () => {
  const pwd = process.argv[2];
  if (!pwd || pwd.length < 8) {
    console.error('❌ Usage : node scripts/setup-admin-password.cjs "MonMotDePasse" (8 car. min.)');
    process.exit(1);
  }
  const hash = await bcrypt.hash(pwd, 12);
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [r] = await conn.execute(
    "UPDATE users SET password_hash = ? WHERE email = 'admin@legbah.bj'",
    [hash]
  );
  await conn.end();
  if (r.affectedRows === 0) {
    console.error("❌ Admin admin@legbah.bj introuvable. Lance d'abord : mysql < database.sql");
    process.exit(1);
  }
  console.log('✅ Mot de passe admin mis à jour.');
})().catch((e) => { console.error('❌', e.message); process.exit(1); });
