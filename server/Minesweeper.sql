CREATE DATABASE minesweeper;

USE minesweeper;

CREATE TABLE scores (
	score_id INT AUTO_INCREMENT PRIMARY KEY,
    level_id INT,
    username VARCHAR(255),
    time DECIMAL(8, 2)
);