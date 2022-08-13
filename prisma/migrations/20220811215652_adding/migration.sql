-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libelle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Prestation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libelle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Appliance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libelle" TEXT NOT NULL,
    "id_type" TEXT NOT NULL,
    CONSTRAINT "Appliance_id_type_fkey" FOREIGN KEY ("id_type") REFERENCES "Type" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libelle" TEXT NOT NULL,
    "secteur" TEXT NOT NULL,
    "activite" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fonction" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    CONSTRAINT "Contact_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "id_seance" TEXT NOT NULL,
    CONSTRAINT "Participant_id_seance_fkey" FOREIGN KEY ("id_seance") REFERENCES "Seance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "resume" TEXT NOT NULL,
    "id_pov" TEXT NOT NULL,
    CONSTRAINT "Seance_id_pov_fkey" FOREIGN KEY ("id_pov") REFERENCES "Pov" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Suivi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "offre_commerciale" TEXT NOT NULL,
    "montant" REAL NOT NULL,
    "compte_rendu" TEXT NOT NULL,
    "id_prestation" TEXT NOT NULL,
    "id_pov" TEXT NOT NULL,
    CONSTRAINT "Suivi_id_prestation_fkey" FOREIGN KEY ("id_prestation") REFERENCES "Prestation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Suivi_id_pov_fkey" FOREIGN KEY ("id_pov") REFERENCES "Pov" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pov" (
    "id" TEXT NOT NULL PRIMARY KEY,
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

-- CreateIndex
CREATE UNIQUE INDEX "Appliance_id_type_key" ON "Appliance"("id_type");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_client_key" ON "Contact"("id_client");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_id_seance_key" ON "Participant"("id_seance");

-- CreateIndex
CREATE UNIQUE INDEX "Seance_id_pov_key" ON "Seance"("id_pov");

-- CreateIndex
CREATE UNIQUE INDEX "Suivi_id_prestation_key" ON "Suivi"("id_prestation");

-- CreateIndex
CREATE UNIQUE INDEX "Suivi_id_pov_key" ON "Suivi"("id_pov");

-- CreateIndex
CREATE UNIQUE INDEX "Pov_id_client_key" ON "Pov"("id_client");

-- CreateIndex
CREATE UNIQUE INDEX "Pov_id_appliance_key" ON "Pov"("id_appliance");
