import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import NewEventView from "../../view/NewEventView"
import { getUserInfos } from '../userInfosController';
import axios from "axios"
import mongoose from 'mongoose'

export default function NewEventController() {
    const [userInfos, setUserInfos] = React.useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfos(getUserInfos());
        setLoading(false);
    }, [])

    const [eventValues, setEventValues] = useState({
        thumb: "",
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
        var { thumb, name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate } = eventValues;
        ticketsAvailable = parseInt(ticketsAvailable);
        ticketPrice = parseFloat(ticketPrice);
        creator = mongoose.Types.ObjectId(userInfos._id);
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