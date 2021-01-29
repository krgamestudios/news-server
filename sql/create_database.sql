#This file only needs to be run once, during initial setup

#Create the actual database
CREATE DATABASE IF NOT EXISTS news;
USE news;

#Create the database user
CREATE USER IF NOT EXISTS 'news'@'%' IDENTIFIED BY 'charizard';
GRANT ALL PRIVILEGES ON news.* TO 'news'@'%';