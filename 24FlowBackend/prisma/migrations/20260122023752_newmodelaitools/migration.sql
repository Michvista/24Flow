/*
  Warnings:

  - You are about to drop the column `endTime` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `repeatDaily` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Task` table. All the data in the column will be lost.
  - Added the required column `colorName` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "colorName" TEXT NOT NULL,
ALTER COLUMN "color" DROP DEFAULT,
ALTER COLUMN "textColor" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "endTime",
DROP COLUMN "repeatDaily",
DROP COLUMN "startTime",
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "AITools" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toolType" TEXT NOT NULL,
    "inputData" JSONB NOT NULL,
    "outputData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AITools_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AITools" ADD CONSTRAINT "AITools_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
