require('dotenv').config();
const mysql = require('mysql2/promise');

// Pool optimisé InnoDB :
// - connectionLimit = (CPU cores × 2) + disques
// - charset utf8mb4_unicode_ci
// - timezone UTC pour éviter les décalages
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4_unicode_ci',
  timezone: '+00:00',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_SIZE) || 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  dateStrings: false,
  supportBigNumbers: true,
  bigNumberStrings: false,
  multipleStatements: false, // ✅ sécurité : pas d'injection multi-requête
  namedPlaceholders: true,
});

// Ping de démarrage
pool.getConnection()
  .then(async (conn) => {
    const [[row]] = await conn.query('SELECT VERSION() AS v, @@transaction_isolation AS iso');
    console.log(`✅ MySQL connecté — ${row.v} (isolation: ${row.iso})`);
    conn.release();
  })
  .catch((err) => {
    console.error('❌ MySQL non joignable :', err.message);
    process.exit(1);
  });

/**
 * Wrapper transactionnel (ACID) :
 *   await withTransaction(async (conn) => { ... });
 * Rollback automatique en cas d'erreur.
 */
async function withTransaction(fn, isolation = 'REPEATABLE READ') {
  const conn = await pool.getConnection();
  try {
    await conn.query(`SET TRANSACTION ISOLATION LEVEL ${isolation}`);
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

/**
 * Enregistre une requête lente dans _meta_slow_queries.
 * À appeler depuis les routes critiques.
 */
async function logSlowQuery(sql, durationMs, rowsExamined, rowsSent) {
  if (durationMs < 500) return;
  try {
    await pool.execute(
      'INSERT INTO _meta_slow_queries (sql_text, duration_ms, rows_examined, rows_sent) VALUES (?, ?, ?, ?)',
      [sql.slice(0, 4000), Math.round(durationMs), rowsExamined, rowsSent]
    );
  } catch (e) {
    console.warn('[slow-query] log failed:', e.message);
  }
}

module.exports = pool;
module.exports.withTransaction = withTransaction;
module.exports.logSlowQuery = logSlowQuery;
