const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        userId: 8,
        eventName: "Electronic Music Festival",
        eventType: "MUSIC",
        imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
        eventStart: new Date("2024-09-08T18:00:00Z"),
        eventEnd: new Date("2024-09-08T23:00:00Z"),
        eventDescription: "An exciting festival featuring the best in electronic music with top DJs.",
        ticketPrice: 1400,
        ticketsAvailable: 500,
        ticketsBooked: 0,
      },
      {
        userId: 8,
        eventName: "Romeo and Juliet",
        eventType: "THEATRE",
        imageUrl: "https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg",
        eventStart: new Date("2024-09-25T20:00:00Z"),
        eventEnd: new Date("2024-09-25T22:00:00Z"),
        eventDescription: "A dramatic and passionate performance of Shakespeare's Romeo and Juliet.",
        ticketPrice: 900,
        ticketsAvailable: 300,
        ticketsBooked: 0,
      },
      {
        userId: 8,
        eventName: "Summer Sports Day",
        eventType: "SPORTS",
        imageUrl: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
        eventStart: new Date("2024-10-10T08:00:00Z"),
        eventEnd: new Date("2024-10-10T15:00:00Z"),
        eventDescription: "Join us for a day of fun sports activities and competitions for all ages.",
        ticketPrice: 600,
        ticketsAvailable: 1500,
        ticketsBooked: 0,
      },
      {
        userId: 8,
        eventName: "Opera Night",
        eventType: "MUSIC",
        imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg",
        eventStart: new Date("2024-09-30T19:00:00Z"),
        eventEnd: new Date("2024-09-30T22:00:00Z"),
        eventDescription: "An enchanting evening of opera performances featuring renowned artists.",
        ticketPrice: 1700,
        ticketsAvailable: 250,
        ticketsBooked: 0,
      },
      {
        userId: 8,
        eventName: "Fine Art Exhibition",
        eventType: "THEATRE",
        imageUrl: "https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg",
        eventStart: new Date("2024-09-28T10:00:00Z"),
        eventEnd: new Date("2024-09-28T18:00:00Z"),
        eventDescription: "Explore a diverse collection of fine art pieces from various artists.",
        ticketPrice: 750,
        ticketsAvailable: 400,
        ticketsBooked: 0,
      },
    ],
  });
  console.log('Events inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
