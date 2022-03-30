import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    creator: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    participants: {
        type: 'string',
        required: true,
    },
    ticketsAvailable: {
        type: 'string',
        required: true,
    },
    ticketPrice: {
        type: 'string',
        required: true,
    },
    location: {
        type: 'string',
        required: true,
    },
    startDate: {
        type: 'string',
        required: true,
    },
    finishDate: {
        type: 'string',
        required: true,
    }
},
    {
        timestamps: true,
    }
);

const Event = mongoose.model("eventos", eventSchema);

export default Event;