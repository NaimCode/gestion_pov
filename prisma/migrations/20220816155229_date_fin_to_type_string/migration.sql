-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pov" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "date_debut" TEXT NOT NULL,
    "date_fin" TEXT,
    "description" TEXT NOT NULL,
    "compte_manager" TEXT NOT NULL,
    "ingenieur_cybersecurite" TEXT NOT NULL,
    "analyste_cybersecurite" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_appliance" TEXT NOT NULL,
    CONSTRAINT "Pov_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pov_id_appliance_fkey" FOREIGN KEY ("id_appliance") REFERENCES "Appliance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pov" ("analyste_cybersecurite", "compte_manager", "date_debut", "date_fin", "description", "id", "id_appliance", "id_client", "id_user", "ingenieur_cybersecurite", "libelle") SELECT "analyste_cybersecurite", "compte_manager", "date_debut", "date_fin", "description", "id", "id_appliance", "id_client", "id_user", "ingenieur_cybersecurite", "libelle" FROM "Pov";
DROP TABLE "Pov";
ALTER TABLE "new_Pov" RENAME TO "Pov";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
