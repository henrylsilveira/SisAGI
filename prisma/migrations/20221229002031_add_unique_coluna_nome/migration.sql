/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Material` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Material_nome_key" ON "Material"("nome");
