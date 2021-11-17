use news;
ALTER TABLE revisions CHANGE COLUMN id `index` INTEGER(11) UNIQUE NOT NULL AUTO_INCREMENT;

ALTER TABLE revisions DROP FOREIGN KEY revisions_ibfk_1;

ALTER TABLE revisions CHANGE COLUMN originalIndex originalIndex INTEGER(11);