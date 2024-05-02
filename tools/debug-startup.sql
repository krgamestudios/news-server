#use this while debugging
CREATE DATABASE news;
CREATE USER 'news'@'%' IDENTIFIED BY 'venusaur';
GRANT ALL PRIVILEGES ON news.* TO 'news'@'%';
