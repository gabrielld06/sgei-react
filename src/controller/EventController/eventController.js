import asyncHandler from 'express-async-handler';
import Event from '../../model/Events/eventModel.js'

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.json(events);
});

const getFilterEvents = asyncHandler(async (req, res) => {

    const { filter } = req.body;
    const events = await Event.find({});
    res.json(events.filter(e => e.nomeEvento.includes(filter)));
});

const newEvent = asyncHandler(async (req, res) => {
    const { thumb, nomeEvento, criadorEvento, descricao, participantes, vagas, precoIngresso, local, dataInicio, dataFim } = req.body;

    const newEvent = await Event.create({
        thumb,
        nomeEvento,
        criadorEvento,
        descricao,
        participantes,
        vagas,
        precoIngresso,
        local,
        dataInicio,
        dataFim
    });

    if (newProduct) {
        res.status(201).json({
            _id: newEvent._id,
            thumb: newEvent.thumb,
            nomeEvento: newEvent.nomeEvento,
            criadorEvento: newEvent.criadorEvento,
            descricao: newEvent.descricao,
            participantes: newEvent.participantes,
            vagas: newEvent.vagas,
            precoIngresso: newEvent.precoIngresso,
            local: newEvent.local,
            dataInicio: newEvent.dataInicio,
            dataFim: newEvent.dataFim
        });
    } else {
        res.status(400);
        throw new Error('Algo deu errado :(');
    }
});

export { getFilterEvents, newEvent };