import asyncHandler from 'express-async-handler';
import Ticket from '../../model/Tickets/ticketModel.js'
import mongoose from 'mongoose'

const newTicket = asyncHandler(async (req, res) => {
    const { eventId, userId, ticketCount } = req.body;
    var tickets = [];

    const event = mongoose.Types.ObjectId(eventId);
    const user = mongoose.Types.ObjectId(userId);

    console.log(req.body);

    for(let i = 0;i < ticketCount;i++) {
        const newTicket = await Ticket.create({
            event,
            user,
        });
        console.log(newTicket);
        if (newTicket) {
            tickets.push({
                _id: newTicket._id,
                event: newTicket.event,
                user: newTicket.user
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