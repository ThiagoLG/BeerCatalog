/*
  Warnings:

  - You are about to alter the column `active` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to alter the column `active` on the `BeerCraft` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authCode" TEXT NOT NULL,
    "googleId" TEXT,
    "avatar" BLOB
);
INSERT INTO "new_User" ("active", "authCode", "avatar", "email", "googleId", "id", "name") SELECT "active", "authCode", "avatar", "email", "googleId", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
CREATE TABLE "new_BeerCraft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "countryOrigin" TEXT,
    "additionalInfos" TEXT,
    "logo" BLOB
);
INSERT INTO "new_BeerCraft" ("active", "additionalInfos", "countryOrigin", "id", "logo", "name") SELECT "active", "additionalInfos", "countryOrigin", "id", "logo", "name" FROM "BeerCraft";
DROP TABLE "BeerCraft";
ALTER TABLE "new_BeerCraft" RENAME TO "BeerCraft";
CREATE UNIQUE INDEX "BeerCraft_name_key" ON "BeerCraft"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
