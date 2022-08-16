/*
  Warnings:

  - Added the required column `prenom` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "id_seance" TEXT NOT NULL,
    CONSTRAINT "Participant_id_seance_fkey" FOREIGN KEY ("id_seance") REFERENCES "Seance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("id", "id_seance", "id_user", "nom") SELECT "id", "id_seance", "id_user", "nom" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
