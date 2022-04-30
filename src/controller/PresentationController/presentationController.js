import asyncHandler from 'express-async-handler';
import Presentation from '../../model/Presentations/presentationModel.js'
import mongoose from 'mongoose';

const getPresentations = asyncHandler(async (req, res) => {
    const { filterId, filterName, filterEvent } = req.body;
    const eventId = mongoose.Types.ObjectId(filterEvent);
    var presentations = await Presentation.find({});
    if (filterId && filterId !== '') {
        presentations = presentations.filter(e => e._id.includes(filterId));
    }
    if (filterName && filterName !== '') {
        presentations = presentations.filter(e => e.name.includes(filterName));
    }
    console.log(filterEvent);
    if (filterEvent && filterEvent !== '') {
    console.log(eventId);
        presentations = presentations.filter(e => e.event === eventId);
    }
    res.json(presentations);
});

const getPresentationsByEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.body;

    const id = mongoose.Types.ObjectId(eventId);
    const userPresentations = await Presentation.find({"event" : id});
    console.log(userPresentations);
    res.json(userPresentations);
});

const getUserPresentationByNameAndEvent = asyncHandler(async (req, res) => {
    const { user, event, presentationName } = req.body;

    const userId = mongoose.Types.ObjectId(user);
    const eventId = mongoose.Types.ObjectId(event);
    const presentation = await Presentation.find({"presenter" : userId, "name" : presentationName, "event" : eventId});

    res.json(presentation);
})

const getUserPresentations = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    const id = mongoose.Types.ObjectId(userId);
    const userPresentations = await Presentation.aggregate([
        {
            "$match": {
                "presenter": id
            }
        },
        {
            "$lookup": {
                "from": "eventos",
                "localField": "event",
                "foreignField": "_id",
                "as": "event"
            }
        }]);

    res.json(userPresentations);
})

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

const updatePresentation = asyncHandler(async (req, res) => {
    const { _id, thumb, name, seatsAvailable, theme, location, date, duration, presenter, event } = req.body;
    await Presentation.findByIdAndUpdate({ '_id': _id }, {
        _id: _id,
        thumb: thumb,
        name: name,
        seatsAvailable: seatsAvailable,
        theme: theme,
        location: location,
        date: date,
        duration: duration,
        presenter: presenter,
        event: event
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            res.status(201).json({
                _id,
                thumb,
                name,
                seatsAvailable,
                theme,
                location,
                date,
                duration,
                presenter,
                event
            })
        }
    }).clone().catch(function (err) { console.log(err) });
});

export { getPresentations, newPresentation, updatePresentation, getPresentationsByEvent, getUserPresentations, getUserPresentationByNameAndEvent };