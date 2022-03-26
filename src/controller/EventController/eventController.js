import asyncHandler from 'express-async-handler';
import Event from '../../model/Events/eventModel.js'

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.json(events);
});

export default getEvents;