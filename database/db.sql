CREATE DATABASE programs_cloud;

USE programs_cloud;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

CREATE TABLE friends(
    friend_id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

DESCRIBE friends;

CREATE TABLE requests(
    id_to_request INT(11) NOT NULL,
    id_from INT(11) NOT NULL,
    username_from VARCHAR(16) NOT NULL,
    fullname_from VARCHAR(100) NOT NULL
);

DESCRIBE requests;