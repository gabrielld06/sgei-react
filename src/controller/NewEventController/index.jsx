import { useState } from 'react'
import NewEventView from "../../view/NewEventView"
import axios from "axios"

export default function NewEventController() {
    // name, creator, description, participants, ticketsAvailable, ticketPrice, location, startDate, finishDate
    const [eventValues, setEventValues] = useState({
        name: "",
        creator: "",
        description: "",
        participants: "1",
        ticketsAvailable: "",
        ticketPrice: "",
        location: "",
        startDate: new Date(),
        finishDate: new Date()
    });

    const handleSubmit = async (showAlert) => {
        const id = JSON.parse(localStorage.getItem("userInfos"))._id;
        handleChangeFieldValue(id.toString(), "creator");
        var { name, creator, description, participants, ticketsAvailable, ticketPrice, location, startDate, finishDate } = eventValues;
        // ticketsAvailable = parseInt(ticketsAvailable);
        // ticketPrice = parseFloat(ticketPrice);
        startDate = startDate.toString();
        finishDate = finishDate.toString();
        participants = '1';
        const thumb = '';
        console.log(eventValues);
        await axios.post(
            "http://127.0.0.1:5000/api/events/newEvent",
            { thumb, name, creator, description, participants, ticketsAvailable, ticketPrice, location, startDate, finishDate }
        ).then(response => {
            showAlert(response.status);
            //navigate("/login");
        }, err => {
            showAlert(err.response.status)
        });
    };

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

    return (
        <NewEventView
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handleChangeFieldValue={handleChangeFieldValue}
            startDate={eventValues.startDate}
            finishDate={eventValues.finishDate} />
    )
}