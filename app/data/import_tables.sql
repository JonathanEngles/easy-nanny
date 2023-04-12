-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "parent", "nanny", "children", "diary", "suggest", "activity";



CREATE TABLE IF NOT EXISTS "nanny" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "uniqueId" VARCHAR(36) NOT NULL,
    "is_nanny" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "parent" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "uniqueId" VARCHAR(36) NOT NULL,
    "nanny_id" INTEGER REFERENCES "nanny" ("id") ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "children" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "sexe" VARCHAR(10) NOT NULL,
    "birthday" DATE NOT NULL,
    "parent_id" INTEGER NOT NULL REFERENCES "parent" ("id") ON DELETE CASCADE,
    "nanny_id" INTEGER REFERENCES "nanny" ("id") ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "diary" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "date" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "parent_id" INTEGER NOT NULL REFERENCES "parent" ("id"),
    "nanny_id" INTEGER NOT NULL REFERENCES "nanny" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "suggest" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "parent_id" INTEGER NOT NULL REFERENCES "parent" ("id"),
    "nanny_id" INTEGER NOT NULL REFERENCES "nanny" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "activity" (
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "begin" TIME NOT NULL,
    "end" TIME NOT NULL,
    "color" VARCHAR(6) NOT NULL DEFAULT 'FFFFFF',
    "category" VARCHAR(255) NOT NULL,
    "nanny_id" INTEGER NOT NULL REFERENCES "nanny" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);




COMMIT;