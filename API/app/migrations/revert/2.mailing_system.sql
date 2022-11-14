-- Revert mhumain:2.mailing_system from pg

BEGIN;

DROP TABLE cat_has_message, human_has_message;

COMMIT;
