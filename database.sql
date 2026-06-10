-- ============================================
-- BÉNIN TOURISME DATABASE - VERSION COMPLÈTE
-- ============================================

CREATE DATABASE IF NOT EXISTS benin_tourisme_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE benin_tourisme_db;

-- ============================================
-- 1. UTILISATEURS
-- ============================================
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
    reset_token VARCHAR(255),
    reset_expires TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- ============================================
-- 2. DESTINATIONS
-- ============================================
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
    video_url VARCHAR(500),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    best_time_to_visit VARCHAR(255),
    duration_days INT,
    price_level INT DEFAULT 2,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    visit_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_region (region),
    INDEX idx_featured (is_featured),
    INDEX idx_trending (is_trending),
    FULLTEXT INDEX idx_search (name, description, long_description)
);

-- ============================================
-- 3. POINTS FORTS DES DESTINATIONS
-- ============================================
CREATE TABLE destination_highlights (
    highlight_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    highlight_text VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    INDEX idx_destination (destination_id)
);

-- ============================================
-- 4. ACTIVITÉS
-- ============================================
CREATE TABLE activities (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_hours INT,
    price DECIMAL(10,2),
    icon_name VARCHAR(50),
    sort_order INT DEFAULT 0,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    INDEX idx_destination (destination_id)
);

-- ============================================
-- 5. HÉBERGEMENTS
-- ============================================
CREATE TABLE accommodations (
    accommodation_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    price_per_night DECIMAL(10,2),
    rating DECIMAL(3,2),
    image_url VARCHAR(500),
    amenities JSON,
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(500),
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    INDEX idx_destination (destination_id),
    INDEX idx_type (type)
);

-- ============================================
-- 6. AVIS
-- ============================================
CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    user_id INT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    comment TEXT NOT NULL,
    helpful_count INT DEFAULT 0,
    reported BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_destination (destination_id),
    INDEX idx_rating (rating),
    INDEX idx_user (user_id)
);

-- ============================================
-- 7. CIRCUITS TOURISTIQUES
-- ============================================
CREATE TABLE tours (
    tour_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    long_description LONGTEXT,
    duration_days INT,
    duration_nights INT,
    price_adult DECIMAL(10,2),
    price_child DECIMAL(10,2),
    difficulty ENUM('easy', 'moderate', 'challenging') DEFAULT 'moderate',
    min_participants INT DEFAULT 1,
    max_participants INT,
    image_url VARCHAR(500),
    gallery JSON,
    included_services JSON,
    excluded_services JSON,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured)
);

-- ============================================
-- 8. DESTINATIONS PAR CIRCUIT
-- ============================================
CREATE TABLE tour_destinations (
    tour_id INT NOT NULL,
    destination_id INT NOT NULL,
    day_number INT,
    activities TEXT,
    accommodation_id INT,
    PRIMARY KEY (tour_id, destination_id),
    FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    FOREIGN KEY (accommodation_id) REFERENCES accommodations(accommodation_id) ON DELETE SET NULL
);

-- ============================================
-- 9. RÉSERVATIONS
-- ============================================
CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    tour_id INT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_adults INT NOT NULL DEFAULT 1,
    number_of_children INT DEFAULT 0,
    total_price DECIMAL(12,2) NOT NULL,
    deposit_amount DECIMAL(12,2),
    status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'refunded') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'deposit_paid', 'paid', 'refunded') DEFAULT 'unpaid',
    payment_method VARCHAR(50),
    stripe_payment_intent_id VARCHAR(255),
    special_requests TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_reference (booking_reference)
);

-- ============================================
-- 10. FAVORIS
-- ============================================
CREATE TABLE favorites (
    favorite_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, destination_id),
    INDEX idx_user (user_id)
);

-- ============================================
-- 11. ARTICLES DE BLOG
-- ============================================
CREATE TABLE blog_posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(500),
    gallery JSON,
    author_id INT,
    category VARCHAR(100),
    tags JSON,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_published (is_published),
    INDEX idx_featured (is_featured),
    INDEX idx_category (category),
    FULLTEXT INDEX idx_search (title, content, excerpt)
);

-- ============================================
-- 12. COMMENTAIRES DE BLOG
-- ============================================
CREATE TABLE blog_comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT,
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_post (post_id),
    INDEX idx_approved (is_approved)
);

-- ============================================
-- 13. DEMANDES DE CONTACT
-- ============================================
CREATE TABLE contact_requests (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    travel_date DATE,
    travelers INT,
    budget VARCHAR(100),
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    assigned_to INT,
    replied_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (email),
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);

-- ============================================
-- 14. NEWSLETTER
-- ============================================
CREATE TABLE newsletter_subscribers (
    subscriber_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    INDEX idx_email (email)
);

-- ============================================
-- 15. POINTS UTILISATEURS (FIDÉLITÉ)
-- ============================================
CREATE TABLE user_points (
    point_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    points INT NOT NULL,
    reason VARCHAR(255),
    booking_id INT,
    expires_at DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE SET NULL,
    INDEX idx_user (user_id)
);

-- ============================================
-- 16. NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('booking', 'promotion', 'alert', 'info') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read)
);

-- ============================================
-- INSERTION DES DONNÉES DE DÉMONSTRATION
-- ============================================

-- Utilisateurs (mot de passe: password123 pour tous)
INSERT INTO users (email, password_hash, first_name, last_name, phone, location, role) VALUES
('admin@benin-tourisme.bj', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrCJFxKqZQzYwXq8q8q8q8q8q8q8q', 'Admin', 'Benin Tourisme', '+229 97 12 34 56', 'Cotonou', 'admin'),
('jean.kouagou@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrCJFxKqZQzYwXq8q8q8q8q8q8q8q', 'Jean', 'Kouagou', '+229 90 12 34 56', 'Cotonou', 'user'),
('marie.sophie@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrCJFxKqZQzYwXq8q8q8q8q8q8q8q', 'Marie', 'Sophie', '+229 91 23 45 67', 'Porto-Novo', 'user');

-- Destinations
INSERT INTO destinations (name, slug, region, category, description, long_description, image_url, latitude, longitude, best_time_to_visit, duration_days, price_level, is_featured, is_trending, rating, review_count) VALUES
('Ganvié', 'ganvie', 'Atlantique', 'culture', 'La Venise de l\'Afrique, village lacustre unique au monde', 'Ganvié est un village lacustre exceptionnel situé sur le lac Nokoué. Avec ses 30 000 habitants vivant dans des maisons sur pilotis, c\'est la plus grande cité lacustre d\'Afrique. La vie s\'organise entièrement sur l\'eau : marchés flottants, écoles, lieux de culte. Les habitants se déplacent en pirogues dans un ballet aquatique fascinant. Classé au patrimoine mondial de l\'UNESCO, Ganvié offre une expérience unique au monde.', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', 6.4667, 2.4167, 'Novembre à Février', 2, 2, TRUE, TRUE, 4.8, 1234),

('Parc National de la Pendjari', 'parc-pendjari', 'Atacora', 'nature', 'L\'un des derniers grands sanctuaires de faune sauvage en Afrique de l\'Ouest', 'Le Parc National de la Pendjari est un joyau de la conservation en Afrique de l\'Ouest. Sur 275 000 hectares, ce parc abrite une faune exceptionnelle : lions, éléphants, buffles, hippopotames, guépards, et plus de 300 espèces d\'oiseaux. Les safaris offrent des rencontres inoubliables avec la grande faune africaine dans un cadre préservé. La cascade de Tanougou et les montagnes de l\'Atacora ajoutent à la beauté des lieux.', 'https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800', 11.2667, 1.5333, 'Décembre à Mars', 4, 3, TRUE, FALSE, 4.9, 856),

('Ouidah', 'ouidah', 'Atlantique', 'historique', 'Cœur spirituel du vodoun et mémoire de la traite négrière', 'Ouidah est une ville chargée d\'histoire. La Route des Esclaves et la Porte du Non-Retour témoignent de la tragédie de la traite négrière. La ville est aussi le berceau du vodoun, avec le Temple des Pythons et la Forêt Sacrée de Kpassè. Chaque année, le 10 janvier, la Fête Nationale du Vodoun attire des milliers de pèlerins. Ouidah est un lieu de mémoire, de spiritualité et de résilience.', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', 6.3667, 2.0833, 'Janvier, Octobre-Décembre', 2, 2, TRUE, TRUE, 4.7, 2100),

('Abomey', 'abomey', 'Zou', 'historique', 'Les palais royaux du Dahomey, classés au patrimoine mondial', 'Abomey fut la capitale du puissant Royaume du Dahomey pendant près de 300 ans. Les palais royaux, classés au patrimoine mondial de l\'UNESCO, sont ornés de bas-reliefs exceptionnels qui racontent l\'histoire et les traditions du royaume. Le musée historique d\'Abomey abrite des trésors inestimables : trônes, armes, objets rituels. La ville reste un centre important de l\'artisanat traditionnel, notamment des célèbres appliqués d\'Abomey.', 'https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800', 7.1833, 1.9833, 'Novembre à Février', 2, 2, FALSE, FALSE, 4.6, 945),

('Grand-Popo', 'grand-popo', 'Mono', 'plage', 'Plages de sable fin, pêche traditionnelle et ambiance décontractée', 'Grand-Popo est une station balnéaire paisible où le fleuve Mono rencontre l\'océan Atlantique. Ses longues plages bordées de cocotiers invitent à la détente. Le village de pêcheurs conserve ses traditions : vous pourrez assister au retour des pirogues chargées de poissons. La bouche du Roy, où le fleuve se jette dans l\'océan, offre des paysages magnifiques. L\'ambiance y est authentique et reposante.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 6.2833, 1.8333, 'Novembre à Mars', 3, 2, FALSE, FALSE, 4.5, 678),

('Cotonou', 'cotonou', 'Littoral', 'ville', 'La vibrante capitale économique, entre tradition et modernité', 'Cotonou est le cœur battant du Bénin. Cette ville dynamique mêle modernité et traditions. Le marché Dantokpa, l\'un des plus grands d\'Afrique de l\'Ouest, est une immersion totale dans la vie locale. La Place de l\'Étoile Rouge, la cathédrale Notre-Dame, la plage de Fidjrossè sont autant de lieux à découvrir. Cotonou est aussi le point de départ idéal pour explorer le reste du pays.', 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800', 6.3667, 2.4333, 'Toute l\'année', 2, 3, FALSE, TRUE, 4.2, 3400),

('Natitingou', 'natitingou', 'Atacora', 'nature', 'Porte d\'entrée du pays Somba et de ses tatas', 'Natitingou est la principale ville du pays Somba, réputée pour ses habitations traditionnelles uniques : les tatas. Ces forteresses miniatures en terre crue ressemblent à de petits châteaux. La région offre des paysages magnifiques de collines et de vallées. C\'est aussi le point de départ idéal pour visiter le Parc de la Pendjari et découvrir la culture fascinante du peuple Batammariba.', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', 10.3, 1.3833, 'Novembre à Février', 3, 2, FALSE, FALSE, 4.6, 423),

('Porto-Novo', 'porto-novo', 'Ouémé', 'culture', 'La capitale administrative, riche d\'histoire et de traditions', 'Porto-Novo, la capitale du Bénin, est une ville au riche patrimoine historique. Le Musée Honmè (ancien palais royal), la Grande Mosquée de style afro-brésilien, le Jardin des Plantes et de la Nature sont autant de sites à découvrir. Plus calme que Cotonou, Porto-Novo offre une atmosphère authentique.', 'https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800', 6.4833, 2.6167, 'Novembre à Février', 2, 2, FALSE, FALSE, 4.4, 567);

-- Points forts des destinations
INSERT INTO destination_highlights (destination_id, highlight_text, sort_order) VALUES
(1, 'Village lacustre UNESCO', 1), (1, 'Marché flottant', 2), (1, 'Musée de Ganvié', 3), (1, 'Pêche traditionnelle', 4),
(2, 'Safari photo', 1), (2, 'Observation des lions', 2), (2, 'Cascade de Tanougou', 3), (2, 'Bird watching', 4),
(3, 'Porte du Non-Retour', 1), (3, 'Route des Esclaves', 2), (3, 'Temple des Pythons', 3), (3, 'Forêt Sacrée de Kpassè', 4),
(4, 'Palais royaux UNESCO', 1), (4, 'Bas-reliefs historiques', 2), (4, 'Artisanat des appliqués', 3), (4, 'Musée historique', 4),
(5, 'Plages de sable fin', 1), (5, 'Bouche du Roy', 2), (5, 'Pêche traditionnelle', 3), (5, 'Couchers de soleil', 4),
(6, 'Marché Dantokpa', 1), (6, 'Place de l\'Étoile Rouge', 2), (6, 'Plage de Fidjrossè', 3), (6, 'Fondation Zinsou', 4),
(7, 'Tatas Somba', 1), (7, 'Cascades de Kota', 2), (7, 'Montagnes de l\'Atacora', 3), (7, 'Artisanat local', 4),
(8, 'Musée Honmè', 1), (8, 'Grande Mosquée', 2), (8, 'Jardin des Plantes', 3), (8, 'Palais du Gouverneur', 4);

-- Activités
INSERT INTO activities (destination_id, name, duration_hours, price, icon_name, sort_order) VALUES
(1, 'Tour en pirogue', 2, 15, 'Compass', 1), (1, 'Visite du marché flottant', 2, 10, 'ShoppingBag', 2), (1, 'Atelier artisanat', 2, 20, 'Palette', 3),
(2, 'Safari guidé', 4, 50, 'Car', 1), (2, 'Safari photo', 6, 80, 'Camera', 2), (2, 'Randonnée Tanougou', 3, 25, 'TreePine', 3),
(3, 'Visite historique', 3, 25, 'Landmark', 1), (3, 'Cérémonie vodoun', 2, 30, 'Users', 2), (3, 'Musée de Ouidah', 2, 10, 'Info', 3),
(4, 'Visite des palais', 2, 15, 'Landmark', 1), (4, 'Atelier appliqués', 2, 25, 'Palette', 2), (4, 'Musée historique', 2, 10, 'Info', 3),
(5, 'Baignade', 0, 0, 'Waves', 1), (5, 'Pirogue sur le Mono', 2, 15, 'Compass', 2), (5, 'Balade à vélo', 3, 10, 'Bike', 3),
(6, 'Visite de Dantokpa', 3, 15, 'Compass', 1), (6, 'Art contemporain', 2, 10, 'Palette', 2), (6, 'Balade en ville', 3, 20, 'Car', 3),
(7, 'Visite des tatas', 3, 20, 'Home', 1), (7, 'Randonnée', 4, 25, 'Mountain', 2), (7, 'Cascades de Kota', 2, 15, 'Waves', 3),
(8, 'Visite Musée Honmè', 2, 10, 'Landmark', 1), (8, 'Tour de ville', 3, 20, 'Compass', 2), (8, 'Jardin des Plantes', 2, 5, 'TreePine', 3);

-- Hébergements
INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, image_url, amenities) VALUES
(1, 'Hotel Lac Nokoué', 'Hôtel', 75, 4.5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', '["WiFi", "Restaurant", "Climatisation", "Vue lac"]'),
(1, 'Chez Thérèse', 'Maison d\'hôtes', 35, 4.8, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', '["WiFi", "Repas maison", "Terrasse", "Pirogue privée"]'),
(2, 'Pendjari Lodge', 'Lodge', 120, 4.7, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', '["WiFi", "Restaurant", "Piscine", "Guide privé"]'),
(2, 'Campement Tanougou', 'Camping', 30, 4.5, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400', '["Tentes équipées", "Douches", "Feu de camp"]'),
(3, 'Hotel Diaspora', 'Hôtel', 60, 4.3, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', '["WiFi", "Restaurant", "Piscine", "Climatisation"]'),
(4, 'Hotel Abomey', 'Hôtel', 50, 4.2, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', '["WiFi", "Restaurant", "Climatisation"]'),
(5, 'Auberge de Grand-Popo', 'Auberge', 40, 4.4, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', '["WiFi", "Restaurant", "Plage privée"]'),
(6, 'Benin Marina Hotel', 'Hôtel 4*', 120, 4.5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', '["WiFi", "Piscine", "Restaurant", "Spa", "Salle de sport"]'),
(6, 'Hotel du Port', 'Hôtel 3*', 70, 4.2, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', '["WiFi", "Restaurant", "Climatisation"]');

-- Circuits
INSERT INTO tours (name, slug, description, duration_days, duration_nights, price_adult, price_child, difficulty, min_participants, max_participants, image_url, is_featured) VALUES
('Circuit Essentiel Bénin', 'circuit-essentiel-benin', 'Découvrez les merveilles du Bénin en 7 jours : Ganvié, Ouidah, Abomey et Pendjari', 7, 6, 899, 450, 'moderate', 2, 12, 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', TRUE),
('Aventure Pendjari', 'aventure-pendjari', 'Safari dans le parc national de la Pendjari - 4 jours d\'immersion dans la savane', 4, 3, 680, 340, 'challenging', 2, 8, 'https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800', TRUE),
('Découverte Culturelle', 'decouverte-culturelle', 'Plongée dans l\'histoire et les traditions du Bénin : Ouidah, Abomey et Porto-Novo', 5, 4, 550, 275, 'easy', 1, 15, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', FALSE),
('Bénin Authentique', 'benin-authentique', 'Le meilleur du Bénin en 10 jours : culture, nature et plages', 10, 9, 1299, 650, 'moderate', 2, 10, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', TRUE);

-- Tour destinations
INSERT INTO tour_destinations (tour_id, destination_id, day_number) VALUES
(1, 1, 2), (1, 3, 3), (1, 4, 4), (1, 6, 5), (1, 2, 6),
(2, 2, 1), (2, 2, 2), (2, 2, 3), (2, 7, 4),
(3, 8, 1), (3, 4, 2), (3, 3, 3), (3, 6, 4),
(4, 6, 1), (4, 1, 2), (4, 3, 3), (4, 4, 4), (4, 5, 7), (4, 2, 8);

-- Avis utilisateurs
INSERT INTO reviews (destination_id, user_id, rating, title, comment, is_verified) VALUES
(1, 2, 5, 'Magique !', 'Ganvié est une expérience unique. Le marché flottant est fascinant et les habitants sont très accueillants. Notre guide était exceptionnel.', TRUE),
(2, 2, 5, 'Safari inoubliable', 'Nous avons vu des lions, des éléphants et même un léopard ! Le lodge est confortable et les guides très compétents.', TRUE),
(3, 3, 5, 'Émouvant', 'La visite de la Porte du Non-Retour est un moment très émouvant. Le Temple des Pythons est surprenant. Guide passionnant.', TRUE),
(4, 2, 4, 'Histoire fascinante', 'Les bas-reliefs des palais sont impressionnants. L\'atelier d\'appliqués vaut le détour.', TRUE),
(6, 2, 4, 'Ville animée', 'Dantokpa est une expérience unique. Préparez-vous à marchander ! La ville a beaucoup d\'énergie.', TRUE),
(1, 3, 5, 'À voir absolument', 'Une merveille ! Prenez le temps de faire le tour du lac.', TRUE);

-- Blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, tags, is_published, is_featured, published_at) VALUES
('10 expériences incontournables au Bénin', '10-experiences-incontournables-benin', 'Des palais royaux d\'Abomey aux plages de Grand-Popo, découvrez les expériences qui rendront votre voyage inoubliable.', '<p>Le Bénin regorge de trésors à découvrir...</p>', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', 'Voyage', '["Destinations", "Culture", "Conseils"]', TRUE, TRUE, NOW()),

('Guide complet du Vodoun : histoire et traditions', 'guide-complet-vodoun-benin', 'Plongez au cœur de la spiritualité béninoise et découvrez les secrets de cette religion ancestrale.', '<p>Le vodoun est une religion fascinante...</p>', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', 'Culture', '["Vodoun", "Spiritualité", "Traditions"]', TRUE, TRUE, NOW()),

('Safari photo au Parc de la Pendjari', 'safari-photo-pendjari', 'Conseils et astuces pour réussir vos photos de safari dans l\'un des plus beaux parcs d\'Afrique de l\'Ouest.', '<p>La Pendjari est un paradis pour les photographes...</p>', 'https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800', 'Photographie', '["Safari", "Photo", "Pendjari"]', TRUE, FALSE, NOW()),

('La gastronomie béninoise : un voyage culinaire', 'gastronomie-beninoise', 'Du pâte rouge au poulet braisé, explorez les saveurs authentiques de la cuisine béninoise.', '<p>La cuisine béninoise est une explosion de saveurs...</p>', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Gastronomie', '["Cuisine", "Saveurs", "Tradition"]', TRUE, FALSE, NOW());

-- Favoris
INSERT INTO favorites (user_id, destination_id) VALUES
(2, 1), (2, 2), (2, 3),
(3, 5), (3, 6);

-- Newsletter
INSERT INTO newsletter_subscribers (email, name) VALUES
('jean.kouagou@email.com', 'Jean Kouagou'),
('marie.sophie@email.com', 'Marie Sophie');

-- ============================================
-- PROCÉDURES STOCKÉES
-- ============================================
DELIMITER //

CREATE PROCEDURE sp_get_featured_destinations(IN limit_count INT)
BEGIN
    SELECT * FROM destinations 
    WHERE is_featured = TRUE AND is_active = TRUE 
    ORDER BY rating DESC 
    LIMIT limit_count;
END//

CREATE PROCEDURE sp_search_destinations(IN search_term VARCHAR(255))
BEGIN
    SELECT * FROM destinations 
    WHERE MATCH(name, description, long_description) AGAINST(search_term IN NATURAL LANGUAGE MODE)
       OR name LIKE CONCAT('%', search_term, '%')
       OR region LIKE CONCAT('%', search_term, '%')
    LIMIT 20;
END//

CREATE PROCEDURE sp_get_destination_by_slug(IN destination_slug VARCHAR(255))
BEGIN
    SELECT * FROM destinations WHERE slug = destination_slug AND is_active = TRUE;
END//

CREATE PROCEDURE sp_get_destination_with_details(IN dest_id INT)
BEGIN
    SELECT * FROM destinations WHERE destination_id = dest_id;
    SELECT * FROM destination_highlights WHERE destination_id = dest_id ORDER BY sort_order;
    SELECT * FROM activities WHERE destination_id = dest_id ORDER BY sort_order;
    SELECT * FROM accommodations WHERE destination_id = dest_id;
    SELECT r.*, u.first_name, u.last_name 
    FROM reviews r 
    LEFT JOIN users u ON r.user_id = u.user_id 
    WHERE r.destination_id = dest_id AND r.is_published = TRUE 
    ORDER BY r.created_at DESC;
END//

CREATE PROCEDURE sp_get_popular_destinations(IN limit_count INT)
BEGIN
    SELECT d.*, COUNT(b.booking_id) as booking_count
    FROM destinations d
    LEFT JOIN tour_destinations td ON d.destination_id = td.destination_id
    LEFT JOIN tours t ON td.tour_id = t.tour_id
    LEFT JOIN bookings b ON t.tour_id = b.tour_id
    WHERE d.is_active = TRUE
    GROUP BY d.destination_id
    ORDER BY booking_count DESC, d.rating DESC
    LIMIT limit_count;
END//

CREATE PROCEDURE sp_get_user_stats(IN user_id_param INT)
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM bookings WHERE user_id = user_id_param AND status != 'cancelled') as total_trips,
        (SELECT COUNT(*) FROM reviews WHERE user_id = user_id_param) as total_reviews,
        (SELECT COUNT(*) FROM favorites WHERE user_id = user_id_param) as total_favorites,
        (SELECT COALESCE(SUM(points), 0) FROM user_points WHERE user_id = user_id_param) as total_points;
END//

CREATE PROCEDURE sp_create_booking(
    IN p_user_id INT,
    IN p_tour_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_adults INT,
    IN p_children INT,
    IN p_total_price DECIMAL(12,2)
)
BEGIN
    DECLARE new_reference VARCHAR(50);
    SET new_reference = CONCAT('BEN-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(FLOOR(RAND() * 9999), 4, '0'));
    
    INSERT INTO bookings (booking_reference, user_id, tour_id, start_date, end_date, number_of_adults, number_of_children, total_price, status, payment_status)
    VALUES (new_reference, p_user_id, p_tour_id, p_start_date, p_end_date, p_adults, p_children, p_total_price, 'pending', 'unpaid');
    
    SELECT LAST_INSERT_ID() as booking_id, new_reference as booking_reference;
END//

DELIMITER ;

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
    d.price_level,
    d.is_featured,
    d.is_trending,
    COUNT(DISTINCT h.highlight_id) as highlight_count,
    COUNT(DISTINCT a.activity_id) as activity_count,
    COUNT(DISTINCT acc.accommodation_id) as accommodation_count
FROM destinations d
LEFT JOIN destination_highlights h ON d.destination_id = h.destination_id
LEFT JOIN activities a ON d.destination_id = a.destination_id
LEFT JOIN accommodations acc ON d.destination_id = acc.destination_id
WHERE d.is_active = TRUE
GROUP BY d.destination_id;

CREATE VIEW vw_user_dashboard AS
SELECT 
    u.user_id,
    u.email,
    u.first_name,
    u.last_name,
    COUNT(DISTINCT b.booking_id) as total_bookings,
    COUNT(DISTINCT r.review_id) as total_reviews,
    COUNT(DISTINCT f.favorite_id) as total_favorites,
    COALESCE(SUM(up.points), 0) as loyalty_points
FROM users u
LEFT JOIN bookings b ON u.user_id = b.user_id AND b.status != 'cancelled'
LEFT JOIN reviews r ON u.user_id = r.user_id
LEFT JOIN favorites f ON u.user_id = f.user_id
LEFT JOIN user_points up ON u.user_id = up.user_id
GROUP BY u.user_id;

-- ============================================
-- INDEXES SUPPLEMENTAIRES
-- ============================================

CREATE INDEX idx_destinations_rating ON destinations(rating DESC);
CREATE INDEX idx_destinations_visit ON destinations(visit_count DESC);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_reviews_destination_rating ON reviews(destination_id, rating);
CREATE INDEX idx_tours_price ON tours(price_adult);

-- ============================================
-- TRIGGERS
-- ============================================

DELIMITER //

CREATE TRIGGER update_destination_rating
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE destinations 
    SET rating = (SELECT AVG(rating) FROM reviews WHERE destination_id = NEW.destination_id AND is_published = TRUE),
        review_count = (SELECT COUNT(*) FROM reviews WHERE destination_id = NEW.destination_id AND is_published = TRUE)
    WHERE destination_id = NEW.destination_id;
END//

CREATE TRIGGER increment_destination_visit
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    DECLARE dest_id INT;
    
    IF NEW.tour_id IS NOT NULL THEN
        SELECT destination_id INTO dest_id 
        FROM tour_destinations 
        WHERE tour_id = NEW.tour_id 
        LIMIT 1;
        
        IF dest_id IS NOT NULL THEN
            UPDATE destinations SET visit_count = visit_count + NEW.number_of_adults + NEW.number_of_children
            WHERE destination_id = dest_id;
        END IF;
    END IF;
END//

CREATE TRIGGER generate_booking_reference
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
    IF NEW.booking_reference IS NULL THEN
        SET NEW.booking_reference = CONCAT(
            'BEN-',
            DATE_FORMAT(NOW(), '%Y%m%d'),
            '-',
            LPAD(FLOOR(RAND() * 10000), 4, '0')
        );
    END IF;
END//

CREATE TRIGGER add_loyalty_points
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        INSERT INTO user_points (user_id, points, reason, booking_id, expires_at)
        VALUES (NEW.user_id, FLOOR(NEW.total_price / 10), 'Points de fidélité', NEW.booking_id, DATE_ADD(NOW(), INTERVAL 1 YEAR));
    END IF;
END//

DELIMITER ;

-- ============================================
-- VERSION DE LA BASE
-- ============================================
CREATE TABLE db_version (
    version_id INT PRIMARY KEY AUTO_INCREMENT,
    version_number VARCHAR(20) NOT NULL,
    applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

INSERT INTO db_version (version_number, description) 
VALUES ('2.0.0', 'Version complète de la base de données Bénin Tourisme');

-- ============================================
-- FIN DU SCRIPT
-- ============================================
