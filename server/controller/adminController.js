const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      eventStart,
      eventEnd,
      eventDescription,
      ticketPrice,
      ticketsAvailable,
    } = req.body;

    let { imageUrl } = req.body;

    const userId = req.user.userId;

    // Validate required fields
    if (!eventName || !eventType || !eventStart || !eventEnd || !eventDescription || ticketPrice === undefined || ticketsAvailable === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }




    // Validate eventType
    const validEventTypes = ['SPORTS', 'MUSIC', 'THEATRE'];
    if (!validEventTypes.includes(eventType)) {
      return res.status(400).json({ error: 'Invalid event type' });
    }

    // set Deafult images
    if (!imageUrl) {
      if (eventType === 'SPORTS') {
        imageUrl ='https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg';
      } else if (eventType === 'MUSIC') {
        imageUrl = 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg';
      } else if (eventType === 'THEATRE') {
        imageUrl = 'https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg';
      }
    }

    // Validate dates
    const start = new Date(eventStart);
    const end = new Date(eventEnd);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid dates' });
    }

    if (start >= end) {
      return res.status(400).json({ error: 'Event start must be before event end' });
    }

    // Create event in database
    const newEvent = await prisma.event.create({
      data: {
        userId: userId,
        eventName: eventName,
        eventType: eventType,
        imageUrl: imageUrl,
        eventStart: new Date(eventStart),
        eventEnd: new Date(eventEnd),
        eventDescription: eventDescription,
        ticketPrice: parseInt(ticketPrice, 10),
        ticketsAvailable: parseInt(ticketsAvailable, 10),
      }
    });

    return res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getManagerEvents = async (req, res) => {
  const userId = req.user.userId;
  try {
    const events = await prisma.event.findMany({
      where: {
        userId: userId
       }
    })
    
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = parseInt(req.params.id, 10); 
  if (isNaN(eventId)) {
    return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editEvent = async (req, res) => {
  const { id } = req.params; 
  const { eventName, eventDescription, imageUrl, ticketPrice } = req.body;

  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        eventName: eventName || event.eventName,
        eventDescription: eventDescription || event.eventDescription,
        imageUrl: imageUrl || event.imageUrl,
        ticketPrice: parseInt(ticketPrice) || parseInt(event.ticketPrice),
      }
    });

    res.status(200).json(updatedEvent);

  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'An error occurred while updating the event' });
  }
};

module.exports = {
  createEvent,
  getManagerEvents,
  deleteEvent,
  editEvent,
};
