
CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50), avatar_url VARCHAR(500), bio TEXT, location VARCHAR(255),
  role ENUM('admin','agent','user') DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE, reset_token VARCHAR(255), reset_expires TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  INDEX idx_email (email), INDEX idx_role (role)
);

CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(255) PRIMARY KEY, user_id INT NOT NULL, token TEXT NOT NULL,
  ip_address VARCHAR(45), user_agent TEXT, expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id), INDEX idx_expires (expires_at)
);

CREATE TABLE IF NOT EXISTS destinations (
  destination_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL,
  region VARCHAR(100) NOT NULL,
  category ENUM('culture','nature','plage','ville','historique') NOT NULL,
  description TEXT NOT NULL, long_description LONGTEXT,
  image_url VARCHAR(500), gallery JSON, video_url VARCHAR(500),
  latitude DECIMAL(10,8), longitude DECIMAL(11,8),
  best_time_to_visit VARCHAR(255), duration_days INT, price_level INT DEFAULT 2,
  rating DECIMAL(3,2) DEFAULT 0, review_count INT DEFAULT 0, visit_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE, is_trending BOOLEAN DEFAULT FALSE, is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category), INDEX idx_region (region), INDEX idx_featured (is_featured),
  FULLTEXT INDEX idx_search (name, description, long_description)
);

CREATE TABLE IF NOT EXISTS destination_highlights (
  highlight_id INT PRIMARY KEY AUTO_INCREMENT, destination_id INT NOT NULL,
  highlight_text VARCHAR(255) NOT NULL, icon_name VARCHAR(50), sort_order INT DEFAULT 0,
  FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
  INDEX idx_destination (destination_id)
);

CREATE TABLE IF NOT EXISTS activities (
  activity_id INT PRIMARY KEY AUTO_INCREMENT, destination_id INT NOT NULL,
  name VARCHAR(255) NOT NULL, description TEXT, duration_hours INT, price DECIMAL(10,2),
  icon_name VARCHAR(50), sort_order INT DEFAULT 0,
  FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
  INDEX idx_destination (destination_id)
);

CREATE TABLE IF NOT EXISTS accommodations (
  accommodation_id INT PRIMARY KEY AUTO_INCREMENT, destination_id INT NOT NULL,
  name VARCHAR(255) NOT NULL, type VARCHAR(100), price_per_night DECIMAL(10,2),
  rating DECIMAL(3,2), image_url VARCHAR(500), amenities JSON,
  phone VARCHAR(50), email VARCHAR(255), website VARCHAR(500),
  FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
  INDEX idx_destination (destination_id), INDEX idx_type (type)
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id INT PRIMARY KEY AUTO_INCREMENT, destination_id INT NOT NULL, user_id INT,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5), title VARCHAR(255), comment TEXT NOT NULL,
  helpful_count INT DEFAULT 0, reported BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE, is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
  INDEX idx_destination (destination_id), INDEX idx_rating (rating), INDEX idx_user (user_id)
);

CREATE TABLE IF NOT EXISTS tours (
  tour_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT, long_description LONGTEXT, duration_days INT, duration_nights INT,
  price_adult DECIMAL(10,2), price_child DECIMAL(10,2),
  difficulty ENUM('easy','moderate','challenging') DEFAULT 'moderate',
  min_participants INT DEFAULT 1, max_participants INT,
  image_url VARCHAR(500), gallery JSON, included_services JSON, excluded_services JSON,
  is_active BOOLEAN DEFAULT TRUE, is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active), INDEX idx_featured (is_featured)
);

CREATE TABLE IF NOT EXISTS tour_destinations (
  tour_id INT NOT NULL, destination_id INT NOT NULL, day_number INT, activities TEXT,
  accommodation_id INT, PRIMARY KEY (tour_id, destination_id),
  FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE CASCADE,
  FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
  FOREIGN KEY (accommodation_id) REFERENCES accommodations(accommodation_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT, booking_reference VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL, tour_id INT, booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  start_date DATE NOT NULL, end_date DATE NOT NULL,
  number_of_adults INT NOT NULL DEFAULT 1, number_of_children INT DEFAULT 0,
  total_price DECIMAL(12,2) NOT NULL, deposit_amount DECIMAL(12,2),
  status ENUM('pending','confirmed','cancelled','completed','refunded') DEFAULT 'pending',
  payment_status ENUM('unpaid','deposit_paid','paid','refunded') DEFAULT 'unpaid',
  payment_method VARCHAR(50), stripe_payment_intent_id VARCHAR(255),
  special_requests TEXT, cancellation_reason TEXT, cancelled_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (tour_id) REFERENCES tours(tour_id) ON DELETE SET NULL,
  INDEX idx_user (user_id), INDEX idx_status (status),
  INDEX idx_dates (start_date, end_date), INDEX idx_reference (booking_reference)
);

CREATE TABLE IF NOT EXISTS favorites (
  favorite_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, destination_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, destination_id), INDEX idx_user (user_id)
);

CREATE TABLE IF NOT EXISTS blog_posts (
  post_id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT, content LONGTEXT, featured_image VARCHAR(500), gallery JSON,
  author_id INT, category VARCHAR(100), tags JSON, views INT DEFAULT 0, likes INT DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE, is_featured BOOLEAN DEFAULT FALSE, published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE SET NULL,
  INDEX idx_published (is_published), INDEX idx_featured (is_featured), INDEX idx_category (category),
  FULLTEXT INDEX idx_search (title, content, excerpt)
);

CREATE TABLE IF NOT EXISTS contact_requests (
  contact_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL, phone VARCHAR(50), subject VARCHAR(255), message TEXT NOT NULL,
  travel_date DATE, travelers INT, budget VARCHAR(100),
  status ENUM('new','read','replied','archived') DEFAULT 'new',
  assigned_to INT, replied_at TIMESTAMP NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status), INDEX idx_email (email),
  FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  subscriber_id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255), is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, unsubscribed_at TIMESTAMP NULL,
  INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS user_points (
  point_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, points INT NOT NULL,
  reason VARCHAR(255), booking_id INT, expires_at DATE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE SET NULL,
  INDEX idx_user (user_id)
);

CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL, message TEXT NOT NULL,
  type ENUM('booking','promotion','alert','info','system') DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE, link VARCHAR(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  INDEX idx_user (user_id), INDEX idx_read (is_read)
);

INSERT IGNORE INTO users (email, password_hash, first_name, last_name, phone, location, role) VALUES
('admin@legbah.bj', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MqrCJFxKqZQzYwXq8q8q8q8q8q8q8q', 'Admin', 'LEGBAH', '+229 01 54 06 94 54', 'Cotonou', 'admin');

INSERT IGNORE INTO destinations (name, slug, region, category, description, long_description, image_url, latitude, longitude, best_time_to_visit, duration_days, price_level, is_featured, is_trending, rating, review_count) VALUES
('Ganvié', 'ganvie', 'Atlantique', 'culture', 'La Venise de l''Afrique', 'Village lacustre exceptionnel.', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', 6.4667, 2.4167, 'Novembre à Février', 2, 2, TRUE, TRUE, 4.8, 1234),
('Parc National de la Pendjari', 'parc-pendjari', 'Atacora', 'nature', 'Sanctuaire de faune sauvage', 'Joyau de la conservation.', 'https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800', 11.2667, 1.5333, 'Décembre à Mars', 4, 3, TRUE, FALSE, 4.9, 856),
('Ouidah', 'ouidah', 'Atlantique', 'historique', 'Cœur spirituel du vodoun', 'Ville chargée d''histoire.', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', 6.3667, 2.0833, 'Janvier', 2, 2, TRUE, TRUE, 4.7, 2100),
('Abomey', 'abomey', 'Zou', 'historique', 'Palais royaux du Dahomey', 'Capitale du Dahomey.', 'https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800', 7.1833, 1.9833, 'Novembre à Février', 2, 2, FALSE, FALSE, 4.6, 945),
('Grand-Popo', 'grand-popo', 'Mono', 'plage', 'Plages de sable fin', 'Station balnéaire paisible.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 6.2833, 1.8333, 'Novembre à Mars', 3, 2, FALSE, FALSE, 4.5, 678),
('Cotonou', 'cotonou', 'Littoral', 'ville', 'Capitale économique', 'Cœur battant du Bénin.', 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800', 6.3667, 2.4333, 'Toute l''année', 2, 3, FALSE, TRUE, 4.2, 3400);

CREATE OR REPLACE VIEW vw_user_dashboard AS
SELECT u.user_id, u.email, u.first_name, u.last_name,
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
