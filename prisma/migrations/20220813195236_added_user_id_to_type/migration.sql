/*
  Warnings:

  - Added the required column `id_user` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libelle" TEXT NOT NULL,
    "id_user" TEXT NOT NULL
);
INSERT INTO "new_Type" ("id", "libelle") SELECT "id", "libelle" FROM "Type";
DROP TABLE "Type";
ALTER TABLE "new_Type" RENAME TO "Type";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
