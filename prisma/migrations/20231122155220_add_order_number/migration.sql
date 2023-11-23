/*
  Warnings:

  - You are about to drop the column `orderNumber` on the `OrderItems` table. All the data in the column will be lost.
  - Added the required column `orderNumber` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderDetails` ADD COLUMN `orderNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItems` DROP COLUMN `orderNumber`;
