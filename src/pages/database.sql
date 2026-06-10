-- BÉNIN TOURISME DATABASE
CREATE DATABASE IF NOT EXISTS benin_tourisme_db;
USE benin_tourisme_db;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE destinations (
    destination_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    region VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    rating DECIMAL(3,2) DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    destination_id INT NOT NULL,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE bookings (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    travelers INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(destination_id)
);

CREATE TABLE blog_posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(500),
    category VARCHAR(100),
    likes INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO destinations (name, slug, region, category, description, image_url, is_featured) VALUES
('Ganvié', 'ganvie', 'Atlantique', 'culture', 'La Venise de l''Afrique', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', TRUE),
('Parc Pendjari', 'parc-pendjari', 'Atacora', 'nature', 'Safari inoubliable', 'https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800', TRUE),
('Ouidah', 'ouidah', 'Atlantique', 'historique', 'Route des Esclaves', 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', TRUE);

INSERT INTO blog_posts (title, slug, excerpt, featured_image, category, is_published, published_at) VALUES
('10 expériences incontournables au Bénin', '10-experiences-benin', 'Découvrez les merveilles du Bénin', 'https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800', 'Voyage', TRUE, NOW());

INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@benin-tourisme.bj', 'admin_hash', 'Admin', 'Benin', 'admin');

