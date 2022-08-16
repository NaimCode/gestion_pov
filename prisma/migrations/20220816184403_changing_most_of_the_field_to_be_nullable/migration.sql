-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "fonction" TEXT,
    "id_client" TEXT NOT NULL,
    CONSTRAINT "Contact_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Contact" ("email", "fonction", "id", "id_client", "id_user", "nom", "prenom", "telephone") SELECT "email", "fonction", "id", "id_client", "id_user", "nom", "prenom", "telephone" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "secteur" TEXT,
    "activite" TEXT
);
INSERT INTO "new_Client" ("activite", "id", "id_user", "libelle", "secteur") SELECT "activite", "id", "id_user", "libelle", "secteur" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Appliance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "disponibilite" BOOLEAN NOT NULL,
    "dbid" TEXT,
    "reference" TEXT,
    "id_type" TEXT NOT NULL,
    CONSTRAINT "Appliance_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appliance" ("dbid", "disponibilite", "id", "id_type", "id_user", "libelle", "reference") SELECT "dbid", "disponibilite", "id", "id_type", "id_user", "libelle", "reference" FROM "Appliance";
DROP TABLE "Appliance";
ALTER TABLE "new_Appliance" RENAME TO "Appliance";
CREATE TABLE "new_Pov" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "date_debut" TEXT,
    "date_fin" TEXT,
    "description" TEXT,
    "compte_manager" TEXT,
    "ingenieur_cybersecurite" TEXT,
    "analyste_cybersecurite" TEXT,
    "id_client" TEXT NOT NULL,
    "id_appliance" TEXT NOT NULL,
    CONSTRAINT "Pov_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pov_id_appliance_fkey" FOREIGN KEY ("id_appliance") REFERENCES "Appliance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pov" ("analyste_cybersecurite", "compte_manager", "date_debut", "date_fin", "description", "id", "id_appliance", "id_client", "id_user", "ingenieur_cybersecurite", "libelle") SELECT "analyste_cybersecurite", "compte_manager", "date_debut", "date_fin", "description", "id", "id_appliance", "id_client", "id_user", "ingenieur_cybersecurite", "libelle" FROM "Pov";
DROP TABLE "Pov";
ALTER TABLE "new_Pov" RENAME TO "Pov";
CREATE TABLE "new_Suivi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "offre_commerciale" BOOLEAN NOT NULL,
    "montant" TEXT,
    "compte_rendu" TEXT,
    "id_prestation" TEXT NOT NULL,
    "id_pov" TEXT NOT NULL,
    CONSTRAINT "Suivi_id_prestation_fkey" FOREIGN KEY ("id_prestation") REFERENCES "Prestation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Suivi_id_pov_fkey" FOREIGN KEY ("id_pov") REFERENCES "Pov" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Suivi" ("compte_rendu", "id", "id_pov", "id_prestation", "id_user", "montant", "offre_commerciale") SELECT "compte_rendu", "id", "id_pov", "id_prestation", "id_user", "montant", "offre_commerciale" FROM "Suivi";
DROP TABLE "Suivi";
ALTER TABLE "new_Suivi" RENAME TO "Suivi";
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,
    "id_seance" TEXT NOT NULL,
    CONSTRAINT "Participant_id_seance_fkey" FOREIGN KEY ("id_seance") REFERENCES "Seance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("id", "id_seance", "id_user", "nom", "prenom") SELECT "id", "id_seance", "id_user", "nom", "prenom" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
