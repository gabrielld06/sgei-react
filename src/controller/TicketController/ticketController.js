import asyncHandler from 'express-async-handler';
import Ticket from '../../model/Tickets/ticketModel.js'

// const getEvents = asyncHandler(async (req, res) => {
//     const { filter } = req.body;
//     const events = await Event.find({});
//     res.json(events.filter(e => e.name.includes(filter)));
// });

const newTicket = asyncHandler(async (req, res) => {
    const { event, ticketCount } = req.body;
    var tickets = [];
    console.log(event);
    for(let i = 0;i < ticketCount;i++) {
        const newTicket = await Ticket.create({
            event,
        });
        console.log(newTicket);
        if (newTicket) {
            tickets.push({
                _id: newTicket._id,
                event: newTicket.event
            });
            console.log(tickets);
        }
    }
    if (newTicket) {
        res.status(201).json(tickets);
    } else {
        res.status(400);
        throw new Error('Algo deu errado :(');
    }
});

export { newTicket };