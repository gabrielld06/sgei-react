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
        type: [],
        required: true,
    },
    presentations: {
        type: [],
        required: true,
    },
    ticketsAvailable: {
        type: 'number',
        required: true,
    },
    ticketPrice: {
        type: 'number',
        required: true,
    },
    location: {
        type: 'string',
        required: true,
    },
    startDate: {
        type: 'date',
        required: true,
    },
    finishDate: {
        type: 'date',
        required: true,
    }
},
    {
        timestamps: true,
    }
);

const Event = mongoose.model("eventos", eventSchema);

export default Event;