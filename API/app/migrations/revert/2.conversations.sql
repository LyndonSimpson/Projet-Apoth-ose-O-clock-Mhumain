-- Revert mhumain:2.conversations from pg

BEGIN;

DROP TABLE conversation;

COMMIT;
