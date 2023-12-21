/*
  Warnings:

  - The values [OUTFORDELIVERY] on the enum `OrderDetails_orderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `OrderDetails` MODIFY `orderStatus` ENUM('PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED') NOT NULL;

-- AlterTable
ALTER TABLE `PaymentDetail` MODIFY `paymentStatus` ENUM('PENDING', 'PAID', 'CANCEL') NOT NULL;
