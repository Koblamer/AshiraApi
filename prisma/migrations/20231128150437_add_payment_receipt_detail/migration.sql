-- CreateTable
CREATE TABLE `PaymentReceiptDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentDetailId` INTEGER NOT NULL,
    `destinationBank` VARCHAR(191) NOT NULL,
    `soureBank` VARCHAR(191) NOT NULL,
    `senderAccountNumber` INTEGER NOT NULL,
    `transactionDate` DATETIME(3) NOT NULL,
    `Amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentReceiptDetail` ADD CONSTRAINT `PaymentReceiptDetail_paymentDetailId_fkey` FOREIGN KEY (`paymentDetailId`) REFERENCES `PaymentDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
