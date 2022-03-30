import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
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
        type: 'Date',
        required: true,
    },
    finishDate: {
        type: 'Date',
        required: true,
    }
},
    {
        timestamps: true,
    }
);

const Event = mongoose.model("eventos", eventSchema);

export default Event;