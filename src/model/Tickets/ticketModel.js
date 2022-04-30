import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
    event: {
        type: 'ObjectId',
        required: true,
    },
    user: {
        type: 'ObjectId',
        required: true,
    }
},
    {
        timestamps: true,
    }
);

const Ticket = mongoose.model("ingressos", ticketSchema);

export default Ticket;