/*
  Warnings:

  - You are about to drop the column `nom` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Contact` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ContactType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL DEFAULT '',
    "discordId" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contact_id_fkey" FOREIGN KEY ("id") REFERENCES "ContactType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("createdAt", "email", "id", "message") SELECT "createdAt", "email", "id", "message" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
