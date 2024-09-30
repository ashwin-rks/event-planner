-- DropForeignKey
ALTER TABLE "Booked" DROP CONSTRAINT "Booked_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Booked" ADD CONSTRAINT "Booked_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
