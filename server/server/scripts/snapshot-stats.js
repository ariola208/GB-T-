#!/usr/bin/env node
/**
 * Cron quotidien (à lancer via crontab, ex: 0 * * * *).
 * Met à jour les pics de sessions et d'actifs quotidiens.
 */
require('dotenv').config();
const pool = require('../config/db');

(async () => {
  try {
    await pool.query('CALL sp_update_peak_sessions()');
    await pool.query('CALL sp_update_peak_daily_active()');
    const [rows] = await pool.query('SELECT stat_key, stat_value FROM _meta_auth_stats');
    console.table(rows);
    process.exit(0);
  } catch (e) {
    console.error('❌ snapshot-stats :', e.message);
    process.exit(1);
  }
})();
