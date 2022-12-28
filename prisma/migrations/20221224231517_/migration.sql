/*
  Warnings:

  - A unique constraint covering the columns `[identidade]` on the table `Militar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Militar_identidade_key" ON "Militar"("identidade");
