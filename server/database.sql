-- ============================================
-- BÉNIN TOURISME DATABASE - VERSION COMPLÈTE
-- ============================================

CREATE DATABASE IF NOT EXISTS benin_tourisme_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE benin_tourisme_db;

-- 1. UTILISATEURS
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    bio TEXT,
    location VARCHAR(255),
    role ENUM('admin', 'agent', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email)
);

-- 2. DESTINATIONS
CREATE TABLE destinations (
    destination_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    region VARCHAR(100) NOT NULL,
    category ENUM('culture', 'nature', 'plage', 'ville', 'historique') NOT NULL,
    description TEXT NOT NULL,
    long_description LONGTEXT,
    image_url VARCHAR(500),
    gallery JSON,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    best_time_to_visit VARCHAR(255),
    duration_days INT,
    price_level INT DEFAULT 2,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_featured (is_featured),
    FULLTEXT INDEX idx_search (name, description)
);

-- 3. POINTS FORTS
CREATE TABLE destination_highlights (
    highlight_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    highlight_text VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
);

-- 4. ACTIVITÉS
CREATE TABLE activities (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    duration_hours INT,
    price DECIMAL(10,2),
    icon_name VARCHAR(50),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
);

-- 5. HÉBERGEMENTS
CREATE TABLE accommodations (
    accommodation_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    price_per_night DECIMAL(10,2),
    rating DECIMAL(3,2),
    image_url VARCHAR(500),
    amenities JSON,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
);

-- 6. AVIS
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    user_id INT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    helpful_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- 7. CIRCUITS
CREATE TABLE tours (
    tour_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    duration_days INT,
    price_adult DECIMAL(10,2),
    price_child DECIMAL(10,2),
    difficulty ENUM('easy', 'moderate', 'challenging') DEFAULT 'moderate',
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. DESTINATIONS PAR CIRCUIT
CREATE TABLE tour_destinations (
    tour_id INT NOT NULL,
    destination_id INT NOT NULL,
    day_number INT,
    PRIMARY KEY (tour_id, destination_id),
    FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
);

-- 9. RÉSERVATIONS
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    tour_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_adults INT DEFAULT 1,
    number_of_children INT DEFAULT 0,
    total_price DECIMAL(12,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'deposit_paid', 'paid', 'refunded') DEFAULT 'unpaid',
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- 10. FAVORIS
CREATE TABLE favorites (
    favorite_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, destination_id)
);

-- 11. ARTICLES DE BLOG
CREATE TABLE blog_posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(500),
    category VARCHAR(100),
    tags JSON,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_published (is_published),
    FULLTEXT INDEX idx_search (title, content)
);

-- 12. DEMANDES DE CONTACT
CREATE TABLE contact_requests (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    travel_date DATE,
    travelers INT,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. NEWSLETTER
CREATE TABLE newsletter_subscribers (
    subscriber_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. POINTS FIDÉLITÉ
CREATE TABLE user_points (
    point_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    points INT NOT NULL,
    reason VARCHAR(255),
    booking_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ============================================
-- INSERTION DES DONNÉES
-- ============================================

-- Utilisateurs (mot de passe: password123 pour tous)
INSERT INTO users (email, password_hash, first_name, last_name, phone, location, role) VALUES
('admin@benin-tourisme.bj', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrCJFxKqZQzYwXq8q8q8q8q8q8q8q', 'Admin', 'Benin', '+229 97 12 34 56', 'Cotonou', 'admin'),
('jean.kouagou@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrCJFxKqZQzYwXq8q8q8q8q8q8q8q', 'Jean', 'Kouagou', '+229 90 12 34 56', 'Cotonou', 'user');

-- Destinations
INSERT INTO destinations (name, slug, region, category, description, image_url, is_featured, is_trending, rating) VALUES
('Ganvié', 'ganvie', 'Atlantique', 'culture', 'La Venise de l''Afrique, village lacustre unique au monde', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', TRUE, TRUE, 4.8),
('Parc Pendjari', 'parc-pendjari', 'Atacora', 'nature', 'L''un des derniers sanctuaires de faune sauvage', 'https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800', TRUE, FALSE, 4.9),
('Ouidah', 'ouidah', 'Atlantique', 'historique', 'Cœur spirituel du vodoun', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', TRUE, TRUE, 4.7),
('Abomey', 'abomey', 'Zou', 'historique', 'Palais royaux du Dahomey', 'https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800', FALSE, FALSE, 4.6),
('Grand-Popo', 'grand-popo', 'Mono', 'plage', 'Plages de sable fin', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', FALSE, FALSE, 4.5),
('Cotonou', 'cotonou', 'Littoral', 'ville', 'Capitale économique vibrante', 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800', FALSE, TRUE, 4.2);

-- Points forts
INSERT INTO destination_highlights (destination_id, highlight_text, sort_order) VALUES
(1, 'Village lacustre UNESCO', 1), (1, 'Marché flottant', 2), (1, 'Musée de Ganvié', 3),
(2, 'Safari photo', 1), (2, 'Observation des lions', 2), (2, 'Cascade de Tanougou', 3),
(3, 'Porte du Non-Retour', 1), (3, 'Route des Esclaves', 2), (3, 'Temple des Pythons', 3),
(4, 'Palais royaux UNESCO', 1), (4, 'Bas-reliefs', 2), (4, 'Artisanat appliqués', 3);

-- Activités
INSERT INTO activities (destination_id, name, duration_hours, price, icon_name) VALUES
(1, 'Tour en pirogue', 2, 15, 'Compass'),
(1, 'Visite marché flottant', 2, 10, 'ShoppingBag'),
(2, 'Safari guidé', 4, 50, 'Car'),
(2, 'Safari photo', 6, 80, 'Camera'),
(3, 'Visite historique', 3, 25, 'Landmark'),
(3, 'Cérémonie vodoun', 2, 30, 'Users');

-- Hébergements
INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities) VALUES
(1, 'Hotel Lac Nokoué', 'Hôtel', 75, 4.5, '["WiFi", "Restaurant", "Climatisation"]'),
(1, 'Chez Thérèse', 'Maison d''hôtes', 35, 4.8, '["WiFi", "Repas maison", "Pirogue"]'),
(2, 'Pendjari Lodge', 'Lodge', 120, 4.7, '["WiFi", "Piscine", "Guide privé"]');

-- Avis
INSERT INTO reviews (destination_id, user_id, rating, comment, is_verified) VALUES
(1, 2, 5, 'Une expérience unique ! Le marché flottant est fascinant.', TRUE),
(2, 2, 5, 'Nous avons vu des lions et des éléphants ! Inoubliable.', TRUE),
(3, 2, 5, 'Très émouvant, la visite de la Porte du Non-Retour est un moment fort.', TRUE);

-- Circuits
INSERT INTO tours (name, slug, description, duration_days, price_adult, price_child, image_url, is_featured) VALUES
('Circuit Essentiel Bénin', 'circuit-essentiel', 'Découvrez les merveilles du Bénin', 7, 899, 450, 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', TRUE),
('Aventure Pendjari', 'aventure-pendjari', 'Safari dans le parc national', 4, 680, 340, 'https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800', TRUE);

-- Tour destinations
INSERT INTO tour_destinations (tour_id, destination_id, day_number) VALUES
(1, 1, 2), (1, 3, 3), (1, 4, 4), (1, 6, 5),
(2, 2, 1), (2, 2, 2), (2, 2, 3);

-- Favoris
INSERT INTO favorites (user_id, destination_id) VALUES
(2, 1), (2, 2), (2, 3);

-- Blog posts
INSERT INTO blog_posts (title, slug, excerpt, featured_image, category, is_published, is_featured, published_at) VALUES
('10 expériences incontournables au Bénin', '10-experiences-benin', 'Découvrez les merveilles du Bénin', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', 'Voyage', TRUE, TRUE, NOW()),
('Guide complet du Vodoun', 'guide-vodoun', 'Plongez au cœur de la spiritualité béninoise', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', 'Culture', TRUE, TRUE, NOW());

-- Newsletter
INSERT INTO newsletter_subscribers (email, name) VALUES
('jean.kouagou@email.com', 'Jean Kouagou');

-- ============================================
-- VUES
-- ============================================
CREATE VIEW vw_destination_summary AS
SELECT 
    d.destination_id,
    d.name,
    d.slug,
    d.region,
    d.category,
    d.description,
    d.image_url,
    d.rating,
    d.review_count,
    d.is_featured,
    d.is_trending,
    COUNT(DISTINCT h.highlight_id) as highlight_count,
    COUNT(DISTINCT a.activity_id) as activity_count
FROM destinations d
LEFT JOIN destination_highlights h ON d.destination_id = h.destination_id
LEFT JOIN activities a ON d.destination_id = a.destination_id
WHERE d.is_active = TRUE
GROUP BY d.destination_id;

-- ============================================
-- FIN DU SCRIPT
-- ============================================
