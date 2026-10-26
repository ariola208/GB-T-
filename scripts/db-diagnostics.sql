USE benin_tourisme_db;

-- 1. Vérifier les moteurs de stockage utilisés par table
SELECT TABLE_NAME, ENGINE, TABLE_ROWS, ROW_FORMAT, DATA_LENGTH, INDEX_LENGTH
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'benin_tourisme_db'
ORDER BY DATA_LENGTH DESC;

-- 2. Vérifier l'isolation et les variables InnoDB
SELECT @@transaction_isolation AS isolation_level,
       @@innodb_buffer_pool_size AS buffer_pool_bytes,
       @@innodb_log_file_size AS redo_log_bytes,
       @@innodb_file_per_table AS file_per_table,
       @@innodb_flush_log_at_trx_commit AS flush_mode;

-- 3. Index inutilisés (candidats à suppression)
SELECT OBJECT_SCHEMA, OBJECT_NAME, INDEX_NAME
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'benin_tourisme_db'
  AND INDEX_NAME != 'PRIMARY'
  AND COUNT_STAR = 0
  AND COUNT_READ = 0;

-- 4. Tables sans clé primaire (mauvaise pratique InnoDB)
SELECT t.TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES t
LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS c
  ON t.TABLE_SCHEMA = c.TABLE_SCHEMA
 AND t.TABLE_NAME = c.TABLE_NAME
 AND c.CONSTRAINT_TYPE = 'PRIMARY KEY'
WHERE t.TABLE_SCHEMA = 'benin_tourisme_db'
  AND t.TABLE_TYPE = 'BASE TABLE'
  AND c.CONSTRAINT_NAME IS NULL;

-- 5. Requêtes lentes (top 10)
SELECT DIGEST_TEXT, COUNT_STAR, AVG_TIMER_WAIT / 1e9 AS avg_ms
FROM performance_schema.events_statements_summary_by_digest
WHERE SCHEMA_NAME = 'benin_tourisme_db'
ORDER BY AVG_TIMER_WAIT DESC
LIMIT 10;

-- 6. Contenu de la vue matérialisée
SELECT COUNT(*) AS total, MAX(refreshed_at) AS last_refresh FROM _mv_destination_stats;

-- 7. Dernières migrations
SELECT version, description, applied_at FROM _meta_schema_migrations ORDER BY applied_at DESC;
