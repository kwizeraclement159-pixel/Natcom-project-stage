CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  role VARCHAR(20)
);

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  class_name VARCHAR(50),
  fee_paid INT DEFAULT 0,
  total_fee INT
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  amount INT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);