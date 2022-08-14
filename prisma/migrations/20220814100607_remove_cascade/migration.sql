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
INSERT INTO "new_Contact" ("email", "fonction", "id", "id_client", "id_user", "nom", "prenom", "telephone") SELECT "email", "fonction", "id", "id_client", "id_user", "nom", "prenom", "telephone" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
