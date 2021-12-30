ALTER TABLE articles ADD COLUMN rendered TEXT DEFAULT "" AFTER body;

ALTER TABLE revisions ADD COLUMN rendered TEXT DEFAULT "" AFTER body;

