-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cautela" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data_cautela" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacao" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "validado" BOOLEAN NOT NULL,
    "resp_cautela" TEXT NOT NULL,
    "cautelouId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    CONSTRAINT "Cautela_cautelouId_fkey" FOREIGN KEY ("cautelouId") REFERENCES "Militar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cautela_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cautela" ("cautelouId", "id", "local", "materialId", "observacao", "resp_cautela", "validado") SELECT "cautelouId", "id", "local", "materialId", "observacao", "resp_cautela", "validado" FROM "Cautela";
DROP TABLE "Cautela";
ALTER TABLE "new_Cautela" RENAME TO "Cautela";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
