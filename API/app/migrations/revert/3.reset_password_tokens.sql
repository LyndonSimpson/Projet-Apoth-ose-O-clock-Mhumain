-- Revert mhumain:3.reset_password_tokens from pg

BEGIN;

DROP TABLE password_token;

COMMIT;
