import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
    event: {
        type: 'string',
        required: true,
    }
},
    {
        timestamps: true,
    }
);

const Ticket = mongoose.model("ingressos", ticketSchema);

export default Ticket;