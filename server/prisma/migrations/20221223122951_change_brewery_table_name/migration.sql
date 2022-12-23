/*
  Warnings:

  - You are about to drop the `BeerCraft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `beerCraftId` on the `BeerReview` table. All the data in the column will be lost.
  - Added the required column `breweryId` to the `BeerReview` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BeerCraft_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BeerCraft";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Brewery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "countryOrigin" TEXT,
    "additionalInfos" TEXT,
    "logo" BLOB
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BeerReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "userCatalogId" INTEGER NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identificationImage" BLOB NOT NULL,
    "breweryId" INTEGER NOT NULL,
    "beerStyleId" INTEGER NOT NULL,
    "beerLabel" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "generalScore" REAL NOT NULL,
    "smellScore" REAL NOT NULL,
    "appearanceScore" REAL NOT NULL,
    "tasteScore" REAL NOT NULL,
    "sensationScore" REAL NOT NULL,
    "workSetScore" REAL NOT NULL,
    "drinkabilityScore" REAL NOT NULL,
    "SRM" INTEGER,
    "ABV" REAL,
    "IBU" INTEGER,
    "idealCup" TEXT,
    "usedCup" TEXT,
    "brewingDate" DATETIME,
    "expirationDate" DATETIME,
    "container" TEXT,
    "containerVolumeMl" INTEGER,
    "family" TEXT,
    "temperatureCelsius" REAL,
    "turbidity" TEXT,
    "boughtPrice" INTEGER,
    "boughtWhere" TEXT,
    "boughtCurrency" TEXT,
    "density" TEXT,
    "harmonization" TEXT,
    CONSTRAINT "BeerReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BeerReview_breweryId_fkey" FOREIGN KEY ("breweryId") REFERENCES "Brewery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BeerReview_beerStyleId_fkey" FOREIGN KEY ("beerStyleId") REFERENCES "BeerStyle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BeerReview_userCatalogId_fkey" FOREIGN KEY ("userCatalogId") REFERENCES "UserCatalog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BeerReview" ("ABV", "IBU", "SRM", "appearanceScore", "beerLabel", "beerStyleId", "boughtCurrency", "boughtPrice", "boughtWhere", "brewingDate", "container", "containerVolumeMl", "density", "drinkabilityScore", "expirationDate", "family", "generalScore", "harmonization", "id", "idealCup", "identificationImage", "review", "reviewDate", "sensationScore", "smellScore", "tasteScore", "temperatureCelsius", "turbidity", "usedCup", "userCatalogId", "userId", "workSetScore") SELECT "ABV", "IBU", "SRM", "appearanceScore", "beerLabel", "beerStyleId", "boughtCurrency", "boughtPrice", "boughtWhere", "brewingDate", "container", "containerVolumeMl", "density", "drinkabilityScore", "expirationDate", "family", "generalScore", "harmonization", "id", "idealCup", "identificationImage", "review", "reviewDate", "sensationScore", "smellScore", "tasteScore", "temperatureCelsius", "turbidity", "usedCup", "userCatalogId", "userId", "workSetScore" FROM "BeerReview";
DROP TABLE "BeerReview";
ALTER TABLE "new_BeerReview" RENAME TO "BeerReview";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Brewery_name_key" ON "Brewery"("name");
