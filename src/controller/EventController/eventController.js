import asyncHandler from 'express-async-handler';
import Event from '../../model/Events/eventModel.js'

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.json(events);
});

const getFilterEvents = asyncHandler(async (req, res) => {
   
    const {filter} = req.body;
    const events = await Event.find({});
    res.json(events.filter(e => e.nomeEvento.includes(filter)));
});

export default getFilterEvents;