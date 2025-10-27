CREATE DATABASE IF NOT EXISTS alumni_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alumni_db;

CREATE TABLE IF NOT EXISTS alumni (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  branch ENUM('cse','ece','dsai') NULL,
  batch VARCHAR(10) NULL,
  company VARCHAR(100) NULL,
  description TEXT NULL,
  image VARCHAR(512) NULL,
  user_id VARCHAR(64) UNIQUE NULL,
  password VARCHAR(128) NULL,
  role ENUM('alumni','student','admin') DEFAULT 'alumni',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO alumni (name, branch, batch, company, description, image, user_id, password, role) VALUES
('Aarav Sharma','cse','2021','Google','Software Engineer focusing on distributed systems and reliability.','https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=1200&q=80&auto=format&fit=crop','aarav','pass1234','alumni'),
('Ananya Gupta','ece','2020','Microsoft','Hardware-software co-design, building low-latency signal processing stacks.','https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80&auto=format&fit=crop','ananya','pass1234','student'),
('Rohan Verma','dsai','2022','Amazon','Applied scientist working on recommendation systems and personalization.','https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=1200&q=80&auto=format&fit=crop','rohan','pass1234','admin');

