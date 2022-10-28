-- Revert mhumain:1.init_db from pg

BEGIN;

DROP TABLE cat_has_favorites, cat, human, account; 
DROP DOMAIN email;

COMMIT;
