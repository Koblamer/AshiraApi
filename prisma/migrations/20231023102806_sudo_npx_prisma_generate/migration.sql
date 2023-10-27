/*
  Warnings:

  - Added the required column `dimensions` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `dimensions` VARCHAR(191) NOT NULL,
    MODIFY `desc` VARCHAR(1000) NOT NULL;
