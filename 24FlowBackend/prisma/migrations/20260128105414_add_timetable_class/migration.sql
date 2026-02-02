-- CreateTable
CREATE TABLE "TimetableClass" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "room" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'School',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "syncedToCalendar" BOOLEAN NOT NULL DEFAULT false,
    "calendarEventId" TEXT,

    CONSTRAINT "TimetableClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TimetableClass_userId_day_idx" ON "TimetableClass"("userId", "day");

-- CreateIndex
CREATE INDEX "TimetableClass_userId_syncedToCalendar_idx" ON "TimetableClass"("userId", "syncedToCalendar");

-- AddForeignKey
ALTER TABLE "TimetableClass" ADD CONSTRAINT "TimetableClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
