import mongoose from 'mongoose'

const presentationSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    participants: {
        type: [],
    },
    seatsAvailable: {
        type: 'number',
        required: true,
    },
    theme: {
        type: 'string',
        required: true,
    },
    location: {
        type: 'string',
        required: true,
    },
    date: {
        type: 'date',
        required: true,
    },
    duration: {
        type: 'number',
        required: true,
    },
    presenter: {
        type: 'ObjectId',
        required: true,
    },
    event: {
        type: 'ObjectId',
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const Presentation = mongoose.model("apresentacoes", presentationSchema);

export default Presentation;