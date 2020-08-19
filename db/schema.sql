
-- Drops the adoptme if it exists currently --
DROP DATABASE IF EXISTS adoptme_db;
-- Creates the "adoptme_db" database --
CREATE DATABASE adoptme_db;

USE adoptme_db;

CREATE TABLE animal (
    id INTEGER NOT NULL AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

