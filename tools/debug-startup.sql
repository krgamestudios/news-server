#use this while debugging
CREATE DATABASE IF NOT EXISTS news;
CREATE USER IF NOT EXISTS 'news'@'%' IDENTIFIED BY 'venusaur';
GRANT ALL PRIVILEGES ON news.* TO 'news'@'%';
