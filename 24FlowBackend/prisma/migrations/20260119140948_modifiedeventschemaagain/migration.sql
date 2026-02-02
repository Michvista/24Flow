-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "color" TEXT NOT NULL DEFAULT 'primary-accent',
ADD COLUMN     "textColor" TEXT NOT NULL DEFAULT 'white';
