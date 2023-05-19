DROP DATABASE IF EXISTS scriptures;
CREATE DATABASE scriptures;

USE scriptures;
CREATE TABLE s_scriptures (
  id INT PRIMARY KEY AUTO_INCREMENT,
  verse TEXT,
  book TEXT,
  chapter INT,
  verse_number INT
);