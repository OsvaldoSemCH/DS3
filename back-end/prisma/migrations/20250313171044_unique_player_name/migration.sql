/*
  Warnings:

  - A unique constraint covering the columns `[Name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Player_Name_key` ON `Player`(`Name`);
