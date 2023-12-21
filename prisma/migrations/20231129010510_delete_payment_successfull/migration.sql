/*
  Warnings:

  - The values [PAYMENTSUCESSFUL] on the enum `OrderDetails_orderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `OrderDetails` MODIFY `orderStatus` ENUM('PROCESSING', 'OUTFORDELIVERY', 'DELIVERED') NOT NULL;
