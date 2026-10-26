-- ============================================================
-- LEGBAH — Base de données Bénin Tourisme (v3.0)
-- Source unique de vérité (le fichier server/database.sql y fait référence)
-- ============================================================

CREATE DATABASE IF NOT EXISTS benin_tourisme_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE benin_tourisme_db;

-- ----------------------------------------------
-- 0. VERSION / MIGRATIONS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(50) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- ----------------------------------------------
-- 1. UTILISATEURS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    bio TEXT,
    location VARCHAR(255),
    role ENUM('admin','agent','user') NOT NULL DEFAULT 'user',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    email_verify_token VARCHAR(255),
    last_login TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_users_email (email),         -- email normalisé (LOWER) côté app
    INDEX idx_users_role (role),
    INDEX idx_users_active (is_active),
    INDEX idx_users_deleted (deleted_at),
    INDEX idx_users_created (created_at)
);

-- ----------------------------------------------
-- 2. SESSIONS / TOKENS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
    session_id CHAR(36) PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash CHAR(64) NOT NULL,             -- SHA-256 du token (jamais en clair)
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY uq_sessions_token (token_hash),
    INDEX idx_sessions_user (user_id),
    INDEX idx_sessions_expires (expires_at)
);

CREATE TABLE IF NOT EXISTS password_resets (
    reset_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY uq_reset_token (token_hash),
    INDEX idx_reset_user (user_id),
    INDEX idx_reset_expires (expires_at)
);

-- ----------------------------------------------
-- 3. DESTINATIONS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS destinations (
    destination_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    category ENUM('culture','nature','plage','ville','historique') NOT NULL,
    description TEXT NOT NULL,
    long_description LONGTEXT,
    image_url VARCHAR(500),
    gallery JSON,
    video_url VARCHAR(500),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    best_time_to_visit VARCHAR(255),
    duration_days INT,
    price_level TINYINT NOT NULL DEFAULT 2,
    rating DECIMAL(3,2) NOT NULL DEFAULT 0,
    review_count INT NOT NULL DEFAULT 0,
    visit_count INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_trending BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_dest_slug (slug),
    INDEX idx_dest_category (category),
    INDEX idx_dest_region (region),
    INDEX idx_dest_featured (is_featured),
    INDEX idx_dest_trending (is_trending),
    INDEX idx_dest_active (is_active),
    INDEX idx_dest_deleted (deleted_at),
    INDEX idx_dest_rating (rating DESC),
    INDEX idx_dest_visit (visit_count DESC),
    FULLTEXT KEY ft_dest_search (name, description, long_description),
    CONSTRAINT chk_dest_price_level CHECK (price_level BETWEEN 1 AND 4),
    CONSTRAINT chk_dest_rating CHECK (rating BETWEEN 0 AND 5),
    CONSTRAINT chk_dest_reviews CHECK (review_count >= 0)
);

CREATE TABLE IF NOT EXISTS destination_highlights (
    highlight_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    highlight_text VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50),
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    INDEX idx_high_dest (destination_id),
    INDEX idx_high_active (is_active)
);

CREATE TABLE IF NOT EXISTS activities (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_hours INT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    icon_name VARCHAR(50),
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    INDEX idx_act_dest (destination_id),
    INDEX idx_act_active (is_active),
    CONSTRAINT chk_act_price CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS accommodations (
    accommodation_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    price_per_night DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0,
    image_url VARCHAR(500),
    amenities JSON,
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    INDEX idx_acc_dest (destination_id),
    INDEX idx_acc_type (type),
    INDEX idx_acc_active (is_active),
    CONSTRAINT chk_acc_price CHECK (price_per_night IS NULL OR price_per_night >= 0),
    CONSTRAINT chk_acc_rating CHECK (rating BETWEEN 0 AND 5)
);

-- ----------------------------------------------
-- 4. AVIS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    user_id INT NULL,
    rating TINYINT NOT NULL,
    title VARCHAR(255),
    comment TEXT NOT NULL,
    helpful_count INT NOT NULL DEFAULT 0,
    reported BOOLEAN NOT NULL DEFAULT FALSE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_rev_dest (destination_id),
    INDEX idx_rev_user (user_id),
    INDEX idx_rev_published (is_published),
    INDEX idx_rev_rating (rating),
    INDEX idx_rev_created (created_at DESC),
    INDEX idx_rev_dest_rating (destination_id, rating),
    CONSTRAINT chk_rev_rating CHECK (rating BETWEEN 1 AND 5),
    CONSTRAINT chk_rev_helpful CHECK (helpful_count >= 0)
);

-- Un utilisateur ne peut laisser qu'un avis par destination
ALTER TABLE reviews
    ADD UNIQUE KEY uq_rev_user_dest (user_id, destination_id);

-- ----------------------------------------------
-- 5. CIRCUITS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS tours (
    tour_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    long_description LONGTEXT,
    duration_days INT,
    duration_nights INT,
    price_adult DECIMAL(10,2),
    price_child DECIMAL(10,2),
    difficulty ENUM('easy','moderate','challenging') NOT NULL DEFAULT 'moderate',
    min_participants INT NOT NULL DEFAULT 1,
    max_participants INT,
    image_url VARCHAR(500),
    gallery JSON,
    included_services JSON,
    excluded_services JSON,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_tour_slug (slug),
    INDEX idx_tour_active (is_active),
    INDEX idx_tour_featured (is_featured),
    INDEX idx_tour_price (price_adult),
    CONSTRAINT chk_tour_adult CHECK (price_adult IS NULL OR price_adult >= 0),
    CONSTRAINT chk_tour_child CHECK (price_child IS NULL OR price_child >= 0),
    CONSTRAINT chk_tour_max CHECK (max_participants IS NULL OR max_participants >= min_participants)
);

CREATE TABLE IF NOT EXISTS tour_destinations (
    tour_id INT NOT NULL,
    destination_id INT NOT NULL,
    day_number INT NOT NULL DEFAULT 1,
    activities TEXT,
    accommodation_id INT,
    PRIMARY KEY (tour_id, destination_id, day_number),
    FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    FOREIGN KEY (accommodation_id) REFERENCES accommodations(accommodation_id) ON DELETE SET NULL,
    INDEX idx_td_day (tour_id, day_number)
);

-- ----------------------------------------------
-- 6. RÉSERVATIONS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    tour_id INT NULL,
    booking_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_adults INT NOT NULL DEFAULT 1,
    number_of_children INT NOT NULL DEFAULT 0,
    total_price DECIMAL(12,2) NOT NULL,
    deposit_amount DECIMAL(12,2),
    status ENUM('pending','confirmed','cancelled','completed','refunded') NOT NULL DEFAULT 'pending',
    payment_status ENUM('unpaid','deposit_paid','paid','refunded') NOT NULL DEFAULT 'unpaid',
    payment_method VARCHAR(50),
    stripe_payment_intent_id VARCHAR(255),
    special_requests TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE SET NULL,
    UNIQUE KEY uq_booking_ref (booking_reference),
    INDEX idx_book_user (user_id),
    INDEX idx_book_status (status),
    INDEX idx_book_dates (start_date, end_date),
    INDEX idx_book_created (created_at DESC),
    INDEX idx_book_user_status (user_id, status),
    CONSTRAINT chk_book_adults CHECK (number_of_adults >= 1),
    CONSTRAINT chk_book_children CHECK (number_of_children >= 0),
    CONSTRAINT chk_book_dates CHECK (end_date >= start_date),
    CONSTRAINT chk_book_price CHECK (total_price >= 0),
    CONSTRAINT chk_book_deposit CHECK (deposit_amount IS NULL OR deposit_amount >= 0)
);

-- Journal d'audit des changements de statut d'une réservation
CREATE TABLE IF NOT EXISTS booking_events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    from_status VARCHAR(20),
    to_status VARCHAR(20) NOT NULL,
    actor_user_id INT,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (actor_user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_be_booking (booking_id),
    INDEX idx_be_created (created_at DESC)
);

-- ----------------------------------------------
-- 7. FAVORIS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS favorites (
    favorite_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    UNIQUE KEY uq_fav_user_dest (user_id, destination_id),
    INDEX idx_fav_user (user_id),
    INDEX idx_fav_dest (destination_id)
);

-- ----------------------------------------------
-- 8. BLOG
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(500),
    gallery JSON,
    author_id INT,
    category VARCHAR(100),
    tags JSON,
    views INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET NULL,
    UNIQUE KEY uq_post_slug (slug),
    INDEX idx_post_published (is_published),
    INDEX idx_post_featured (is_featured),
    INDEX idx_post_category (category),
    INDEX idx_post_published_at (published_at DESC),
    FULLTEXT KEY ft_post_search (title, content, excerpt),
    CONSTRAINT chk_post_views CHECK (views >= 0),
    CONSTRAINT chk_post_likes CHECK (likes >= 0)
);

CREATE TABLE IF NOT EXISTS blog_comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NULL,
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    content TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_com_post (post_id),
    INDEX idx_com_approved (is_approved),
    INDEX idx_com_created (created_at DESC)
);

-- ----------------------------------------------
-- 9. CONTACT / NEWSLETTER
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS contact_requests (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    travel_date DATE,
    travelers INT,
    budget VARCHAR(100),
    status ENUM('new','read','replied','archived') NOT NULL DEFAULT 'new',
    assigned_to INT,
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_ct_status (status),
    INDEX idx_ct_email (email),
    INDEX idx_ct_created (created_at DESC),
    CONSTRAINT chk_ct_travelers CHECK (travelers IS NULL OR travelers >= 1)
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    subscriber_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    UNIQUE KEY uq_news_email (email),
    INDEX idx_news_active (is_active)
);

-- ----------------------------------------------
-- 10. FIDÉLITÉ / NOTIFICATIONS
-- ----------------------------------------------
CREATE TABLE IF NOT EXISTS user_points (
    point_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    points INT NOT NULL,
    reason VARCHAR(255),
    booking_id INT,
    expires_at DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE SET NULL,
    UNIQUE KEY uq_points_booking (user_id, booking_id),
    INDEX idx_points_user (user_id),
    INDEX idx_points_expires (expires_at)
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('booking','promotion','alert','info','system') NOT NULL DEFAULT 'info',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    link VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_notif_user (user_id),
    INDEX idx_notif_read (is_read),
    INDEX idx_notif_created (created_at DESC)
);

-- ============================================
-- VUES
-- ============================================

CREATE OR REPLACE VIEW vw_destination_summary AS
SELECT
    d.destination_id, d.name, d.slug, d.region, d.category,
    d.description, d.image_url, d.rating, d.review_count, d.price_level,
    d.is_featured, d.is_trending,
    COUNT(DISTINCT h.highlight_id) AS highlight_count,
    COUNT(DISTINCT a.activity_id)  AS activity_count,
    COUNT(DISTINCT acc.accommodation_id) AS accommodation_count
FROM destinations d
LEFT JOIN destination_highlights h ON d.destination_id = h.destination_id AND h.is_active = TRUE
LEFT JOIN activities a             ON d.destination_id = a.destination_id AND a.is_active = TRUE
LEFT JOIN accommodations acc       ON d.destination_id = acc.destination_id AND acc.is_active = TRUE
WHERE d.is_active = TRUE AND d.deleted_at IS NULL
GROUP BY d.destination_id;

CREATE OR REPLACE VIEW vw_user_dashboard AS
SELECT
    u.user_id, u.email, u.first_name, u.last_name,
    COUNT(DISTINCT b.booking_id) AS total_bookings,
    COUNT(DISTINCT r.review_id)  AS total_reviews,
    COUNT(DISTINCT f.favorite_id) AS total_favorites,
    COALESCE(SUM(up.points), 0) AS loyalty_points
FROM users u
LEFT JOIN bookings b      ON u.user_id = b.user_id AND b.status != 'cancelled'
LEFT JOIN reviews r       ON u.user_id = r.user_id
LEFT JOIN favorites f     ON u.user_id = f.user_id
LEFT JOIN user_points up  ON u.user_id = up.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.user_id;

-- ============================================
-- PROCÉDURES STOCKÉES
-- ============================================
DELIMITER //

DROP PROCEDURE IF EXISTS sp_get_featured_destinations//
CREATE PROCEDURE sp_get_featured_destinations(IN limit_count INT)
BEGIN
    SELECT * FROM destinations
    WHERE is_featured = TRUE AND is_active = TRUE AND deleted_at IS NULL
    ORDER BY rating DESC
    LIMIT limit_count;
END//

DROP PROCEDURE IF EXISTS sp_search_destinations//
CREATE PROCEDURE sp_search_destinations(IN search_term VARCHAR(255))
BEGIN
    SELECT * FROM destinations
    WHERE is_active = TRUE AND deleted_at IS NULL
      AND (MATCH(name, description, long_description) AGAINST(search_term IN NATURAL LANGUAGE MODE)
        OR name LIKE CONCAT('%', search_term, '%')
        OR region LIKE CONCAT('%', search_term, '%'))
    LIMIT 20;
END//

DROP PROCEDURE IF EXISTS sp_get_destination_by_slug//
CREATE PROCEDURE sp_get_destination_by_slug(IN destination_slug VARCHAR(255))
BEGIN
    SELECT * FROM destinations
    WHERE slug = destination_slug AND is_active = TRUE AND deleted_at IS NULL;
END//

DROP PROCEDURE IF EXISTS sp_create_booking//
CREATE PROCEDURE sp_create_booking(
    IN p_user_id INT,
    IN p_tour_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_adults INT,
    IN p_children INT,
    IN p_total_price DECIMAL(12,2),
    OUT p_booking_id INT,
    OUT p_reference VARCHAR(50)
)
BEGIN
    DECLARE new_reference VARCHAR(50);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    START TRANSACTION;
    SET new_reference = CONCAT('BEN-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(FLOOR(RAND() * 9999), 4, '0'));
    INSERT INTO bookings (booking_reference, user_id, tour_id, start_date, end_date,
                          number_of_adults, number_of_children, total_price, status, payment_status)
    VALUES (new_reference, p_user_id, p_tour_id, p_start_date, p_end_date,
            p_adults, p_children, p_total_price, 'pending', 'unpaid');
    SET p_booking_id = LAST_INSERT_ID();
    SET p_reference = new_reference;
    INSERT INTO booking_events (booking_id, to_status, actor_user_id, note)
    VALUES (p_booking_id, 'pending', p_user_id, 'Création de la réservation');
    COMMIT;
END//

DELIMITER ;

-- ============================================
-- TRIGGERS (recalcul correct sur INSERT/UPDATE/DELETE)
-- ============================================
DELIMITER //

DROP TRIGGER IF EXISTS trg_reviews_after_insert//
CREATE TRIGGER trg_reviews_after_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    IF NEW.is_published = TRUE THEN
        UPDATE destinations
        SET rating = (SELECT ROUND(AVG(rating), 2) FROM reviews WHERE destination_id = NEW.destination_id AND is_published = TRUE),
            review_count = (SELECT COUNT(*) FROM reviews WHERE destination_id = NEW.destination_id AND is_published = TRUE)
        WHERE destination_id = NEW.destination_id;
    END IF;
END//

DROP TRIGGER IF EXISTS trg_reviews_after_update//
CREATE TRIGGER trg_reviews_after_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    UPDATE destinations
    SET rating = COALESCE((SELECT ROUND(AVG(rating), 2) FROM reviews WHERE destination_id = NEW.destination_id AND is_published = TRUE), 0),
        review_count = (SELECT COUNT(*) FROM reviews WHERE destination_id = NEW.destination_id AND is_published = TRUE)
    WHERE destination_id = NEW.destination_id;
END//

DROP TRIGGER IF EXISTS trg_reviews_after_delete//
CREATE TRIGGER trg_reviews_after_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    UPDATE destinations
    SET rating = COALESCE((SELECT ROUND(AVG(rating), 2) FROM reviews WHERE destination_id = OLD.destination_id AND is_published = TRUE), 0),
        review_count = (SELECT COUNT(*) FROM reviews WHERE destination_id = OLD.destination_id AND is_published = TRUE)
    WHERE destination_id = OLD.destination_id;
END//

DROP TRIGGER IF EXISTS trg_bookings_after_insert//
CREATE TRIGGER trg_bookings_after_insert
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    INSERT INTO booking_events (booking_id, to_status, actor_user_id, note)
    VALUES (NEW.booking_id, NEW.status, NEW.user_id, 'Réservation créée');
END//

DROP TRIGGER IF EXISTS trg_bookings_status_change//
CREATE TRIGGER trg_bookings_status_change
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF NEW.status <> OLD.status THEN
        INSERT INTO booking_events (booking_id, from_status, to_status, actor_user_id, note)
        VALUES (NEW.booking_id, OLD.status, NEW.status, NEW.user_id, 'Changement de statut');
    END IF;
    IF NEW.status = 'completed' AND OLD.status <> 'completed' THEN
        INSERT IGNORE INTO user_points (user_id, points, reason, booking_id, expires_at)
        VALUES (NEW.user_id, FLOOR(NEW.total_price / 10), 'Points de fidélité', NEW.booking_id, DATE_ADD(NOW(), INTERVAL 1 YEAR));
    END IF;
END//

DELIMITER ;

-- ============================================
-- DONNÉES DE DÉMONSTRATION
-- ============================================

-- ⚠️ Le mot de passe admin doit être défini via un script de setup (hash réel).
-- Ce placeholder NE DOIT PAS être utilisé tel quel en production.
INSERT IGNORE INTO users (email, password_hash, first_name, last_name, phone, location, role, is_active)
VALUES ('admin@legbah.bj', 'REPLACE_WITH_REAL_BCRYPT_HASH', 'Admin', 'LEGBAH', '+229 01 54 06 94 54', 'Cotonou', 'admin', TRUE);

INSERT IGNORE INTO destinations (name, slug, region, category, description, long_description, image_url, latitude, longitude, best_time_to_visit, duration_days, price_level, is_featured, is_trending, rating, review_count) VALUES
('Ganvié','ganvie','Atlantique','culture','La Venise de l''Afrique','Village lacustre exceptionnel.','https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800',6.4667,2.4167,'Novembre à Février',2,2,TRUE,TRUE,4.8,1234),
('Parc National de la Pendjari','parc-pendjari','Atacora','nature','Sanctuaire de faune sauvage','Joyau de la conservation.','https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800',11.2667,1.5333,'Décembre à Mars',4,3,TRUE,FALSE,4.9,856),
('Ouidah','ouidah','Atlantique','historique','Cœur spirituel du vodoun','Ville chargée d''histoire.','https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',6.3667,2.0833,'Janvier',2,2,TRUE,TRUE,4.7,2100),
('Abomey','abomey','Zou','historique','Palais royaux du Dahomey','Capitale du Dahomey.','https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800',7.1833,1.9833,'Novembre à Février',2,2,FALSE,FALSE,4.6,945),
('Grand-Popo','grand-popo','Mono','plage','Plages de sable fin','Station balnéaire paisible.','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',6.2833,1.8333,'Novembre à Mars',3,2,FALSE,FALSE,4.5,678),
('Cotonou','cotonou','Littoral','ville','Capitale économique','Cœur battant du Bénin.','https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800',6.3667,2.4333,'Toute l''année',2,3,FALSE,TRUE,4.2,3400);

INSERT INTO schema_migrations (version, description)
VALUES ('3.0.0', 'Version consolidée avec contraintes, index et triggers corrigés')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- ============================================================
-- FIN
-- ============================================================
