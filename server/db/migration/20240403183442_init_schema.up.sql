CREATE TABLE "accounts" (
  "id" bigserial PRIMARY KEY,
  "username" varchar NOT NULL,
  "full_name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

ALTER TABLE "accounts" ADD CONSTRAINT "unique_email" UNIQUE ("email");
ALTER TABLE "accounts" ADD CONSTRAINT "unique_username" UNIQUE ("username");