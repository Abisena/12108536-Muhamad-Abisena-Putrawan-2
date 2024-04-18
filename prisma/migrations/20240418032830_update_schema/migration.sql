/*
  Warnings:

  - Added the required column `Kembalian` to the `Costumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pembayaran` to the `Costumer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Costumer" ADD COLUMN     "Kembalian" INTEGER NOT NULL,
ADD COLUMN     "pembayaran" INTEGER NOT NULL;
