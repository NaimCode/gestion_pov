/*
  Warnings:

  - Added the required column `dbid` to the `Appliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disponibilite` to the `Appliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Appliance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appliance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "disponibilite" BOOLEAN NOT NULL,
    "dbid" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    CONSTRAINT "Appliance_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Appliance" ("id", "id_type", "id_user", "libelle") SELECT "id", "id_type", "id_user", "libelle" FROM "Appliance";
DROP TABLE "Appliance";
ALTER TABLE "new_Appliance" RENAME TO "Appliance";
CREATE UNIQUE INDEX "Appliance_id_type_key" ON "Appliance"("id_type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
