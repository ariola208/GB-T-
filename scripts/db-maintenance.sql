-- Maintenance quotidienne (cron 3h)
USE benin_tourisme_db;

-- Nettoyage des sessions expirées (libère de l'espace)
DELETE FROM sessions WHERE expires_at < NOW();

-- Nettoyage des jetons de reset inutilisés expirés
DELETE FROM password_resets WHERE expires_at < NOW() AND used_at IS NULL;

-- Recalcul de la vue matérialisée (si un trigger a raté un cas)
CALL sp_refresh_mv_destination_stats();

-- Optimisation des tables principales (défragmentation InnoDB)
OPTIMIZE TABLE users, destinations, bookings, reviews, blog_posts;

-- Mise à jour des statistiques pour l'optimiseur
ANALYZE TABLE users, destinations, destination_highlights, activities,
              accommodations, reviews, tours, tour_destinations, bookings,
              booking_events, favorites, blog_posts, blog_comments,
              contact_requests, newsletter_subscribers, user_points, notifications;

-- Archivage : purge des notifications lues > 90 jours
DELETE FROM notifications WHERE is_read = TRUE AND created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- Purge de l'audit > 1 an (configurable)
DELETE FROM _meta_audit_log WHERE created_at < DATE_SUB(NOW(), INTERVAL 365 DAY);

-- Purge des slow queries > 30 jours
DELETE FROM _meta_slow_queries WHERE captured_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

SELECT '✅ Maintenance terminée' AS status;
