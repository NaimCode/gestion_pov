/*
  Warnings:

  - Added the required column `id_user` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Suivi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Prestation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Appliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Pov` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Seance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fonction" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    CONSTRAINT "Contact_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("email", "fonction", "id", "id_client", "nom", "prenom", "telephone") SELECT "email", "fonction", "id", "id_client", "nom", "prenom", "telephone" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_id_client_key" ON "Contact"("id_client");
CREATE TABLE "new_Suivi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "offre_commerciale" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "compte_rendu" TEXT NOT NULL,
    "id_prestation" TEXT NOT NULL,
    "id_pov" TEXT NOT NULL,
    CONSTRAINT "Suivi_id_prestation_fkey" FOREIGN KEY ("id_prestation") REFERENCES "Prestation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Suivi_id_pov_fkey" FOREIGN KEY ("id_pov") REFERENCES "Pov" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Suivi" ("compte_rendu", "id", "id_pov", "id_prestation", "montant", "offre_commerciale") SELECT "compte_rendu", "id", "id_pov", "id_prestation", "montant", "offre_commerciale" FROM "Suivi";
DROP TABLE "Suivi";
ALTER TABLE "new_Suivi" RENAME TO "Suivi";
CREATE UNIQUE INDEX "Suivi_id_prestation_key" ON "Suivi"("id_prestation");
CREATE UNIQUE INDEX "Suivi_id_pov_key" ON "Suivi"("id_pov");
CREATE TABLE "new_Prestation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL
);
INSERT INTO "new_Prestation" ("id", "libelle") SELECT "id", "libelle" FROM "Prestation";
DROP TABLE "Prestation";
ALTER TABLE "new_Prestation" RENAME TO "Prestation";
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "id_seance" TEXT NOT NULL,
    CONSTRAINT "Participant_id_seance_fkey" FOREIGN KEY ("id_seance") REFERENCES "Seance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("id", "id_seance", "nom") SELECT "id", "id_seance", "nom" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE UNIQUE INDEX "Participant_id_seance_key" ON "Participant"("id_seance");
CREATE TABLE "new_Appliance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    CONSTRAINT "Appliance_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Appliance" ("id", "id_type", "libelle") SELECT "id", "id_type", "libelle" FROM "Appliance";
DROP TABLE "Appliance";
ALTER TABLE "new_Appliance" RENAME TO "Appliance";
CREATE UNIQUE INDEX "Appliance_id_type_key" ON "Appliance"("id_type");
CREATE TABLE "new_Pov" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "date_debut" DATETIME NOT NULL,
    "date_fin" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "compte_manager" TEXT NOT NULL,
    "ingenieur_cybersecurite" TEXT NOT NULL,
    "analyste_cybersecurite" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_appliance" TEXT NOT NULL,
    CONSTRAINT "Pov_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Pov_id_appliance_fkey" FOREIGN KEY ("id_appliance") REFERENCES "Appliance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pov" ("analyste_cybersecurite", "compte_manager", "date_debut", "date_fin", "description", "id", "id_appliance", "id_client", "ingenieur_cybersecurite", "libelle") SELECT "analyste_cybersecurite", "compte_manager", "date_debut", "date_fin", "description", "id", "id_appliance", "id_client", "ingenieur_cybersecurite", "libelle" FROM "Pov";
DROP TABLE "Pov";
ALTER TABLE "new_Pov" RENAME TO "Pov";
CREATE UNIQUE INDEX "Pov_id_client_key" ON "Pov"("id_client");
CREATE UNIQUE INDEX "Pov_id_appliance_key" ON "Pov"("id_appliance");
CREATE TABLE "new_Seance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "resume" TEXT NOT NULL,
    "id_pov" TEXT NOT NULL,
    CONSTRAINT "Seance_id_pov_fkey" FOREIGN KEY ("id_pov") REFERENCES "Pov" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Seance" ("date", "id", "id_pov", "resume") SELECT "date", "id", "id_pov", "resume" FROM "Seance";
DROP TABLE "Seance";
ALTER TABLE "new_Seance" RENAME TO "Seance";
CREATE UNIQUE INDEX "Seance_id_pov_key" ON "Seance"("id_pov");
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "secteur" TEXT NOT NULL,
    "activite" TEXT NOT NULL
);
INSERT INTO "new_Client" ("activite", "id", "libelle", "secteur") SELECT "activite", "id", "libelle", "secteur" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
