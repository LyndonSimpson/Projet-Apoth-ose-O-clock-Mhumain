-- Revert mhumain:3.jwt_log from pg

BEGIN;

DROP TABLE user_tokens;

COMMIT;
