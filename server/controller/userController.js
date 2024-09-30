const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserDetails = async (req, res) => {
  try {
    const id = req.user.userId;


    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({});
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const getAllUnbookedEvents = async (req, res) => {
  const userId = req.user.userId;

  try {
    const bookedEventIds = await prisma.booked.findMany({
      where: { userId: userId },
      select: { eventId: true },
    });

    const bookedEventIdArray = bookedEventIds.map(booking => booking.eventId);

    const events = await prisma.event.findMany({
      where: {
        id: {
          notIn: bookedEventIdArray,
        },
      },
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const getFilteredUnbookedEvents = async (req, res) => {
  const userId = req.user.userId;
  const { eventType } = req.params; 
  
  const eventTypeMapping = {
    1: 'MUSIC',
    2: 'THEATRE',
    3: 'SPORTS',
  };

  const selectedEventType = eventTypeMapping[eventType];

  if (!selectedEventType) {
    return res.status(400).json({ error: 'Invalid event type parameter' });
  }

  try {
    const bookedEventIds = await prisma.booked.findMany({
      where: { userId: userId },
      select: { eventId: true },
    });

    const bookedEventIdArray = bookedEventIds.map(booking => booking.eventId);

    const events = await prisma.event.findMany({
      where: {
        eventType: selectedEventType,
        id: {
          notIn: bookedEventIdArray,
        },
        eventStart: {
          gt: new Date(), 
        },
      },
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const bookEvent = async (req, res) => {
  const { id } = req.params;

  const userId = req.user.userId;

  if (!id || !userId) {
    return res.status(400).json({ error: "Event ID or user ID is missing" });
  }

  try {
    const existingBooking = await prisma.booked.findUnique({
      where: {
        userId_eventId: {
          userId: userId,
          eventId: parseInt(id, 10),
        },
      },
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "You have already booked this event" });
    }

    const booking = await prisma.booked.create({
      data: {
        userId: parseInt(userId, 10),
        eventId: parseInt(id, 10),
      },
    });

    await prisma.event.update({
      where: { id: parseInt(id, 10) },
      data: {
        ticketsBooked: {
          increment: 1,
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Event booked successfully", booking });
  } catch (error) {
    console.error("Error booking event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await prisma.booked.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    const events = bookings.map((booking) => ({
      ...booking.event,
      creator: {
        firstName: booking.event.user.firstName,
        lastName: booking.event.user.lastName,
      },
    }));

    res.json(events);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUserDetails, getUserBookings, bookEvent, getAllEvents, getAllUnbookedEvents, getFilteredUnbookedEvents };
