import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import NewEventView from "../../view/NewEventView"
import { getUserInfos } from '../userInfosController';
import axios from "axios"
import mongoose from 'mongoose'

export default function NewEventController() {
    // name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate
    const [userInfos, setUserInfos] = React.useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfos(getUserInfos());
        setLoading(false);
    }, [])

    const [eventValues, setEventValues] = useState({
        name: "",
        creator: "",
        description: "",
        participants: [],
        presentations: [],
        ticketsAvailable: "",
        ticketPrice: "",
        location: "",
        startDate: new Date(),
        finishDate: new Date()
    });

    if(loading) {
        return (
            <h1>Loading</h1>
        )
    }

    //TODO: CHANGE TO FORBIDDEN
    if (!userInfos || userInfos.userType !== 'criadorDeEvento') {
        navigate("/")
    }

    const handleChangeField = (event, field) => {
        let updatedValue = {};
        updatedValue[field] = event.target.value;
        setEventValues(evtValues => ({
            ...evtValues,
            ...updatedValue
        }));
    }

    const handleChangeFieldValue = (newValue, field) => {
        let updatedValue = {};
        updatedValue[field] = newValue;
        setEventValues(evtValues => ({
            ...evtValues,
            ...updatedValue
        }));
    }

    const handleSubmit = async (showAlert) => {
        var { name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate } = eventValues;
        ticketsAvailable = parseInt(ticketsAvailable);
        ticketPrice = parseFloat(ticketPrice);
        creator = mongoose.Types.ObjectId(userInfos._id);
        const thumb = '';
        await axios.post(
            "http://127.0.0.1:5000/api/events/newEvent",
            { thumb, name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate }
        ).then(response => {
            showAlert(response.status);
        }, err => {
            showAlert(err.response.status)
        });
    };

    return (
        <NewEventView
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handleChangeFieldValue={handleChangeFieldValue}
            startDate={eventValues.startDate}
            finishDate={eventValues.finishDate} />
    )
}