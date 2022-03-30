import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import NewEventView from "../../view/NewEventView"
import axios from "axios"

export default function NewEventController() {
    // name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate
    const [userInfos, setUserInfos] = React.useState();
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
    const navigate = useNavigate();

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

    useEffect(() => {
        setUserInfos(localStorage.getItem("userInfos"));

    }, [userInfos])

    if (!userInfos || JSON.parse(userInfos).userType !== 'criadorDeEvento') {
        navigate("/")
    }

    const handleSubmit = async (showAlert) => {
        var { name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate } = eventValues;
        ticketsAvailable = parseInt(ticketsAvailable);
        ticketPrice = parseFloat(ticketPrice);
        creator = await JSON.parse(userInfos)._id;
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