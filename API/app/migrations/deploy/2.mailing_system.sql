-- Deploy mhumain:2.mailing_system to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "human_has_message" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "human_id" integer NOT NULL REFERENCES "human"("id"),
  "cat_id" integer NOT NULL REFERENCES "cat" ("id"),
  "content" TEXT NOT NULL,  
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "cat_has_message" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
  "cat_id" integer NOT NULL REFERENCES "cat"("id"),
  "human_id" integer NOT NULL REFERENCES "human" ("id"), 
  "content" TEXT NOT NULL, 
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

COMMIT;

