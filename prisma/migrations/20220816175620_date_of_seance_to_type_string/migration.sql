-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_user" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "id_pov" TEXT NOT NULL,
    CONSTRAINT "Seance_id_pov_fkey" FOREIGN KEY ("id_pov") REFERENCES "Pov" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seance" ("date", "id", "id_pov", "id_user", "resume") SELECT "date", "id", "id_pov", "id_user", "resume" FROM "Seance";
DROP TABLE "Seance";
ALTER TABLE "new_Seance" RENAME TO "Seance";
CREATE UNIQUE INDEX "Seance_id_pov_key" ON "Seance"("id_pov");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
