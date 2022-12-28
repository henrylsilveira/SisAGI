/*
  Warnings:

  - You are about to drop the column `locale` on the `Material` table. All the data in the column will be lost.
  - Added the required column `local` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Material" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "condicoes" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "local" TEXT NOT NULL
);
INSERT INTO "new_Material" ("condicoes", "id", "nome", "quantidade") SELECT "condicoes", "id", "nome", "quantidade" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
