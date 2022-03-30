import asyncHandler from 'express-async-handler';
import Event from '../../model/Events/eventModel.js'

const getFilterEvents = asyncHandler(async (req, res) => {

    const { filter } = req.body;
    const events = await Event.find({});
    res.json(events.filter(e => e.name.includes(filter)));
});

const newEvent = asyncHandler(async (req, res) => {
    console.log(req);
    const { thumb, name, creator, description, participants, ticketsAvailable, ticketPrice, location, startDate, finishDate } = req.body;
    console.log(req.body);
    const newEvent = await Event.create({
        thumb,
        name, 
        creator,
        description, 
        participants, 
        ticketsAvailable, 
        ticketPrice, 
        location, 
        startDate, 
        finishDate
    });
    console.log('newEvent');
    console.log(newEvent);
    if (newEvent) {
        res.status(201).json({
            _id: newEvent._id,
            thumb: newEvent.thumb,
            name: newEvent.name,
            creator: newEvent.creator,
            description: newEvent.description,
            participants: newEvent.participants,
            ticketsAvailable: newEvent.ticketsAvailable,
            ticketPrice: newEvent.ticketPrice,
            location: newEvent.location,
            startDate: newEvent.startDate,
            finishDate: newEvent.finishDate
        });
    } else {
        res.status(400);
        throw new Error('Algo deu errado :(');
    }
});

export { getFilterEvents, newEvent };