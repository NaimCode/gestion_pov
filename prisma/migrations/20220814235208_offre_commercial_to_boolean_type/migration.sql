/*
  Warnings:

  - You are about to alter the column `offre_commerciale` on the `Suivi` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Suivi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "offre_commerciale" BOOLEAN NOT NULL,
    "montant" REAL NOT NULL,
    "compte_rendu" TEXT NOT NULL,
    "id_prestation" TEXT NOT NULL,
    "id_pov" TEXT NOT NULL,
    CONSTRAINT "Suivi_id_prestation_fkey" FOREIGN KEY ("id_prestation") REFERENCES "Prestation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Suivi_id_pov_fkey" FOREIGN KEY ("id_pov") REFERENCES "Pov" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Suivi" ("compte_rendu", "id", "id_pov", "id_prestation", "id_user", "montant", "offre_commerciale") SELECT "compte_rendu", "id", "id_pov", "id_prestation", "id_user", "montant", "offre_commerciale" FROM "Suivi";
DROP TABLE "Suivi";
ALTER TABLE "new_Suivi" RENAME TO "Suivi";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
