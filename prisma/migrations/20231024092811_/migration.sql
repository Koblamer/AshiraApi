/*
  Warnings:

  - You are about to drop the column `paymentId` on the `OrderDetails` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderDetails` DROP FOREIGN KEY `OrderDetails_paymentId_fkey`;

-- AlterTable
ALTER TABLE `OrderDetails` DROP COLUMN `paymentId`;
