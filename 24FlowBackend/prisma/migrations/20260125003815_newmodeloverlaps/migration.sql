-- CreateEnum
CREATE TYPE "ConflictStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'AUTO_RESOLVED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('STATIC', 'CONFLICT');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "Conflict" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "errorId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "status" "ConflictStatus" NOT NULL DEFAULT 'PENDING',
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Conflict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConflictTask" (
    "id" TEXT NOT NULL,
    "conflictId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "displayStart" INTEGER NOT NULL,
    "displayEnd" INTEGER NOT NULL,
    "relativeStart" INTEGER NOT NULL,
    "relativeEnd" INTEGER NOT NULL,
    "taskType" "TaskType" NOT NULL DEFAULT 'CONFLICT',
    "priority" "Priority" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "ConflictTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConflictProposal" (
    "id" TEXT NOT NULL,
    "conflictId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "proposedStart" TIMESTAMP(3) NOT NULL,
    "proposedEnd" TIMESTAMP(3) NOT NULL,
    "displayStart" INTEGER NOT NULL,
    "displayEnd" INTEGER NOT NULL,
    "relativeStart" INTEGER NOT NULL,
    "relativeEnd" INTEGER NOT NULL,
    "taskType" "TaskType" NOT NULL,
    "reasoning" TEXT NOT NULL,

    CONSTRAINT "ConflictProposal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conflict_userId_status_idx" ON "Conflict"("userId", "status");

-- CreateIndex
CREATE INDEX "Conflict_userId_detectedAt_idx" ON "Conflict"("userId", "detectedAt");

-- CreateIndex
CREATE INDEX "ConflictTask_conflictId_idx" ON "ConflictTask"("conflictId");

-- CreateIndex
CREATE INDEX "ConflictTask_eventId_idx" ON "ConflictTask"("eventId");

-- CreateIndex
CREATE INDEX "ConflictProposal_conflictId_idx" ON "ConflictProposal"("conflictId");

-- CreateIndex
CREATE INDEX "Event_userId_startTime_idx" ON "Event"("userId", "startTime");

-- CreateIndex
CREATE INDEX "Event_userId_endTime_idx" ON "Event"("userId", "endTime");

-- AddForeignKey
ALTER TABLE "Conflict" ADD CONSTRAINT "Conflict_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConflictTask" ADD CONSTRAINT "ConflictTask_conflictId_fkey" FOREIGN KEY ("conflictId") REFERENCES "Conflict"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConflictTask" ADD CONSTRAINT "ConflictTask_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConflictProposal" ADD CONSTRAINT "ConflictProposal_conflictId_fkey" FOREIGN KEY ("conflictId") REFERENCES "Conflict"("id") ON DELETE CASCADE ON UPDATE CASCADE;
