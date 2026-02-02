/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TimetableClass` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TimetableClass` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TimetableClass_userId_syncedToCalendar_idx";

-- AlterTable
ALTER TABLE "TimetableClass" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
