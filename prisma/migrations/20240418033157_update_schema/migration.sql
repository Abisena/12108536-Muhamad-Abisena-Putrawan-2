/*
  Warnings:

  - You are about to drop the column `Kembalian` on the `Costumer` table. All the data in the column will be lost.
  - Added the required column `kembali` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Costumer" DROP COLUMN "Kembalian";

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "kembali" INTEGER NOT NULL;
