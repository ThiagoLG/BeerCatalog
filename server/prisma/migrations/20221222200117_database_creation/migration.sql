-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" TEXT NOT NULL DEFAULT 'yes',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authCode" TEXT NOT NULL,
    "googleId" TEXT,
    "avatar" BLOB
);

-- CreateTable
CREATE TABLE "BeerCraft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" TEXT NOT NULL DEFAULT 'yes',
    "name" TEXT NOT NULL,
    "countryOrigin" TEXT,
    "additionalInfos" TEXT,
    "logo" BLOB
);

-- CreateTable
CREATE TABLE "BeerStyle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "style" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "UserCatalog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" BLOB,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "UserCatalog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BeerReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "userCatalogId" INTEGER NOT NULL,
    "reviewDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identificationImage" BLOB NOT NULL,
    "beerCraftId" INTEGER NOT NULL,
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
    CONSTRAINT "BeerReview_beerCraftId_fkey" FOREIGN KEY ("beerCraftId") REFERENCES "BeerCraft" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BeerReview_beerStyleId_fkey" FOREIGN KEY ("beerStyleId") REFERENCES "BeerStyle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BeerReview_userCatalogId_fkey" FOREIGN KEY ("userCatalogId") REFERENCES "UserCatalog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "BeerCraft_name_key" ON "BeerCraft"("name");
