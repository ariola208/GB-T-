-- Migration 001 — Suivi des authentifications & suppression de compte
USE benin_tourisme_db;

CREATE TABLE IF NOT EXISTS auth_events (
    event_id     BIGINT       NOT NULL AUTO_INCREMENT,
    user_id      INT          NULL,
    event_type   ENUM('register','login','logout','failed_login','account_delete','account_restore') NOT NULL,
    ip_address   VARCHAR(45)  NULL,
    user_agent   VARCHAR(500) NULL,
    success      BOOLEAN      NOT NULL DEFAULT TRUE,
    detail       VARCHAR(500) NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id),
    INDEX idx_auth_user (user_id, created_at DESC),
    INDEX idx_auth_type (event_type, created_at DESC),
    INDEX idx_auth_created (created_at DESC),
    INDEX idx_auth_ip (ip_address, created_at DESC),
    CONSTRAINT fk_auth_user FOREIGN KEY (user_id)
        REFERENCES users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB
  COMMENT='Journal des événements d''authentification';

CREATE TABLE IF NOT EXISTS _meta_auth_stats (
    stat_key        VARCHAR(100) NOT NULL,
    stat_value      BIGINT       NOT NULL DEFAULT 0,
    last_updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
                                 ON UPDATE CURRENT_TIMESTAMP,
    description     VARCHAR(255) NULL,
    PRIMARY KEY (stat_key)
) ENGINE=InnoDB
  COMMENT='Compteurs cumulés des inscriptions et connexions';

INSERT IGNORE INTO _meta_auth_stats (stat_key, stat_value, description) VALUES
('total_users_ever_registered',  0, 'Comptes créés depuis le début'),
('total_logins_success',         0, 'Connexions réussies'),
('total_logins_failed',          0, 'Tentatives échouées'),
('total_accounts_deleted',       0, 'Comptes supprimés'),
('peak_concurrent_sessions',     0, 'Pic de sessions simultanées'),
('peak_users_active_daily',      0, 'Pic d''utilisateurs actifs/jour'),
('current_active_sessions',      0, 'Sessions valides (recalculé)');

DELIMITER //
DROP PROCEDURE IF EXISTS sp_update_peak_sessions//
CREATE PROCEDURE sp_update_peak_sessions()
BEGIN
    DECLARE v_current BIGINT DEFAULT 0;
    DECLARE v_peak    BIGINT DEFAULT 0;
    SELECT COUNT(*) INTO v_current FROM sessions WHERE expires_at > NOW();
    SELECT stat_value INTO v_peak FROM _meta_auth_stats WHERE stat_key = 'peak_concurrent_sessions';
    IF v_current > v_peak THEN
        UPDATE _meta_auth_stats SET stat_value = v_current WHERE stat_key = 'peak_concurrent_sessions';
    END IF;
    UPDATE _meta_auth_stats SET stat_value = v_current WHERE stat_key = 'current_active_sessions';
END//

DROP PROCEDURE IF EXISTS sp_update_peak_daily_active//
CREATE PROCEDURE sp_update_peak_daily_active()
BEGIN
    DECLARE v_today BIGINT DEFAULT 0;
    DECLARE v_peak  BIGINT DEFAULT 0;
    SELECT COUNT(DISTINCT user_id) INTO v_today
    FROM auth_events
    WHERE event_type = 'login' AND success = TRUE AND DATE(created_at) = CURDATE();
    SELECT stat_value INTO v_peak FROM _meta_auth_stats WHERE stat_key = 'peak_users_active_daily';
    IF v_today > v_peak THEN
        UPDATE _meta_auth_stats SET stat_value = v_today WHERE stat_key = 'peak_users_active_daily';
    END IF;
END//

DROP PROCEDURE IF EXISTS sp_delete_account//
CREATE PROCEDURE sp_delete_account(
    IN  p_user_id INT,
    IN  p_reason  VARCHAR(500),
    OUT p_ok      BOOLEAN
)
BEGIN
    DECLARE v_email_hash CHAR(64);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_ok = FALSE;
        RESIGNAL;
    END;

    SET p_ok = FALSE;
    START TRANSACTION;

    IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = p_user_id AND deleted_at IS NULL) THEN
        ROLLBACK;
        SET p_ok = FALSE;
    ELSE
        SELECT SHA2(email, 256) INTO v_email_hash FROM users WHERE user_id = p_user_id;

        UPDATE users SET
            email              = CONCAT('deleted-', v_email_hash, '@legbah.local'),
            password_hash      = '*DELETED*',
            first_name         = 'Compte',
            last_name          = 'Supprimé',
            phone              = NULL,
            avatar_url         = NULL,
            bio                = NULL,
            location           = NULL,
            is_active          = FALSE,
            email_verified     = FALSE,
            email_verify_token = NULL,
            deleted_at         = NOW()
        WHERE user_id = p_user_id;

        DELETE FROM sessions        WHERE user_id = p_user_id;
        DELETE FROM password_resets WHERE user_id = p_user_id;

        INSERT INTO auth_events (user_id, event_type, success, detail)
        VALUES (p_user_id, 'account_delete', TRUE, LEFT(COALESCE(p_reason, 'user_request'), 500));

        INSERT INTO _meta_audit_log (table_name, record_id, operation, actor_user_id, diff_json)
        VALUES ('users', p_user_id, 'DELETE', p_user_id,
                JSON_OBJECT('reason', COALESCE(p_reason, 'user_request')));

        UPDATE _meta_auth_stats SET stat_value = stat_value + 1
        WHERE stat_key = 'total_accounts_deleted';

        COMMIT;
        SET p_ok = TRUE;
    END IF;
END//
DELIMITER ;

DELIMITER //
DROP TRIGGER IF EXISTS trg_auth_after_insert//
CREATE TRIGGER trg_auth_after_insert
AFTER INSERT ON auth_events
FOR EACH ROW
BEGIN
    IF NEW.event_type = 'register' AND NEW.success = TRUE THEN
        UPDATE _meta_auth_stats SET stat_value = stat_value + 1
        WHERE stat_key = 'total_users_ever_registered';
    ELSEIF NEW.event_type = 'login' AND NEW.success = TRUE THEN
        UPDATE _meta_auth_stats SET stat_value = stat_value + 1
        WHERE stat_key = 'total_logins_success';
    ELSEIF NEW.event_type = 'failed_login' THEN
        UPDATE _meta_auth_stats SET stat_value = stat_value + 1
        WHERE stat_key = 'total_logins_failed';
    END IF;
END//
DELIMITER ;

INSERT IGNORE INTO _meta_schema_migrations (version, description)
VALUES ('4.1.0', 'Suivi auth (auth_events + compteurs) & suppression de compte');

SELECT '✅ Migration 001 appliquée' AS status;
