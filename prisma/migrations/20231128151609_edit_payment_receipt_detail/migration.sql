/*
  Warnings:

  - You are about to drop the column `Amount` on the `PaymentReceiptDetail` table. All the data in the column will be lost.
  - You are about to drop the column `soureBank` on the `PaymentReceiptDetail` table. All the data in the column will be lost.
  - Added the required column `amount` to the `PaymentReceiptDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceBank` to the `PaymentReceiptDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PaymentReceiptDetail` DROP COLUMN `Amount`,
    DROP COLUMN `soureBank`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `sourceBank` VARCHAR(191) NOT NULL;
