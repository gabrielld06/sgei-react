import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    nomeEvento: {
        type: 'string',
        required: true,
    },
    criadorEvento: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    descricao: {
        type: 'string',
        required: true,
    },
    participantes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
    },
    vagas: {
        type: 'number',
        required: true,
    },
    precoIngresso: {
        type: 'number',
        required: true,
    },
    local: {
        type: 'string',
        required: true,
    },
    dataInicio: {
        type: 'Date',
        required: true,
    },
    dataFim: {
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