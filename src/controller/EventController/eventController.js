import asyncHandler from 'express-async-handler';
import Event from '../../model/Events/eventModel.js'
import mongoose from 'mongoose'

const getEvents = asyncHandler(async (req, res) => {
    const { filter } = req.body;
    const events = await Event.find({});
    res.json(events.filter(e => e.name.includes(filter)));
});

const newEvent = asyncHandler(async (req, res) => {
    const { thumb, name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate } = req.body;
    const newEvent = await Event.create({
        thumb,
        name,
        creator,
        description,
        participants,
        presentations,
        ticketsAvailable,
        ticketPrice,
        location,
        startDate,
        finishDate
    });
    if (newEvent) {
        res.status(201).json({
            _id: newEvent._id,
            thumb: newEvent.thumb,
            name: newEvent.name,
            creator: newEvent.creator,
            description: newEvent.description,
            participants: newEvent.participants,
            presentations: newEvent.presentations,
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

const updateEvent = asyncHandler(async (req, res) => {
    const { event, field, update } = req.body;

    const eventUpdate = await Event.findOne({ '_id': event });
    console.log(eventUpdate);
    console.log(field);
    if (field === 'presentations') {
        eventUpdate['presentations'].push(update);
    } else {
        eventUpdate[field] = update;
    }

    await eventUpdate.save().then(() => {
        res.status(201).json(eventUpdate);
    }, () => {
        res.status(400);
        throw new Error('Algo deu errado :(');
    });

});

export { getEvents, newEvent, updateEvent };