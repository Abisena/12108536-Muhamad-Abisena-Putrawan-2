/*
  Warnings:

  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Employee');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;
