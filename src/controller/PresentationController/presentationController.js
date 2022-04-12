import asyncHandler from 'express-async-handler';
import Presentation from '../../model/Presentations/presentationModel.js'

const getPresentations = asyncHandler(async (req, res) => {
    const { filterId, filterName, filterEvent } = req.body;
    var presentations = await Presentation.find({});
    if(filterId && filterId !== '') {
        presentations = presentations.filter(e => e._id.includes(filterId));
    }
    if(filterName && filterName !== '') {
        presentations = presentations.filter(e => e.name.includes(filterName));
    }
    if(filterEvent && filterEvent !== '') {
        presentations = presentations.filter(e => e.event === filterEvent);
    }
    res.json(presentations);
});

const newPresentation = asyncHandler(async (req, res) => {
    const { thumb, name, seatsAvailable, theme, location, date, duration, presenter, event } = req.body;
    
    console.log(req.body);
    const newPresentation = await Presentation.create({
        thumb,
        name, 
        seatsAvailable, 
        theme, 
        location, 
        date, 
        duration, 
        presenter, 
        event
    });
    
    if (newPresentation) {
        res.status(201).json({
            _id: newPresentation._id,
            thumb: newPresentation.thumb,
            name: newPresentation.name,
            seatsAvailable: newPresentation.seatsAvailable,
            theme: newPresentation.theme,
            location: newPresentation.location,
            date: newPresentation.date,
            duration: newPresentation.duration,
            presenter: newPresentation.presenter,
            event: newPresentation.event
        });
    } else {
        res.status(400);
        throw new Error('Algo deu errado :(');
    }
});

export { getPresentations, newPresentation };