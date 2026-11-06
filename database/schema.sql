-- =========================================
-- Luma Skin Database
-- Schema Version: 1.0
-- Database: MariaDB / MySQL
-- Charset: utf8mb4
-- Timezone: UTC
-- =========================================

CREATE DATABASE IF NOT EXISTS luma_skin_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE luma_skin_db;

SET time_zone = '+00:00';

-- =========================================
-- Table: users
-- =========================================

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin') NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- =========================================
-- Table: products
-- =========================================

CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NULL,
    price DECIMAL(10,2) UNSIGNED NOT NULL,
    size VARCHAR(100) NULL,
    description TEXT NULL,
    how_to_use TEXT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    image VARCHAR(255) NULL,
    deleted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_products_status_deleted (status, deleted_at)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- =========================================
-- Table: scan_logs
-- =========================================

CREATE TABLE IF NOT EXISTS scan_logs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNSIGNED NOT NULL,
    scanned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_scan_logs_product_id (product_id),
    INDEX idx_scan_logs_scanned_at (scanned_at),
    CONSTRAINT fk_scan_logs_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- =========================================
-- End of Schema
-- =========================================
