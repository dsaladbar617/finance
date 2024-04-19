CREATE TABLE IF NOT EXISTS "expense_categories"(
  "id" bigserial PRIMARY KEY,
  "category" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "expenses" (
  "id" bigserial PRIMARY KEY,
  "account_id" bigserial NOT NULL,
  "category_id" bigserial NOT NULL,
  "description" varchar NOT NULL,
  "amount" decimal NOT NULL,
  "date_added" date NOT NULL
);

ALTER TABLE "expenses" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");
ALTER TABLE "expenses" ADD FOREIGN Key ("category_id") REFERENCES "expense_categories" ("id");

INSERT INTO "expense_categories" ("category") VALUES ('Utilities');
INSERT INTO "expense_categories" ("category") VALUES ('Groceries');
INSERT INTO "expense_categories" ("category") VALUES ('Entertainment');