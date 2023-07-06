CREATE DATABASE libremercado;
USE libremercado;

CREATE TABLE users(
	id INT AUTO_INCREMENT,
    username VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(300) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE inventory(
	id INT AUTO_INCREMENT,
    id_user INT,
    item_name VARCHAR(50) NOT NULL,
	item_price INT NOT NULL,
    item_description VARCHAR(250),
    item_image VARCHAR(255),
    PRIMARY KEY(id),
    FOREIGN KEY(id_user) REFERENCES users(id)
);

SELECT * FROM users;
TRUNCATE users;
DROP TABLE users;

SELECT * FROM inventory;
TRUNCATE inventory;
DROP TABLE inventory;
