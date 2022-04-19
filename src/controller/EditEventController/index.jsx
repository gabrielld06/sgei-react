import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from "react-router-dom";
import EditEventView from "../../view/EditEventView"
import axios from "axios"
import { getUserInfos } from '../userInfosController';

export default function EditEventController() {
    // name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate
    const [userInfos, setUserInfos] = React.useState();
    const [eventInfo, setEventInfo] = useState();
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

    useEffect(() => {
        setUserInfos(getUserInfos());
    }, [])

    if (!userInfos || userInfos.userType !== 'criadorDeEvento') {
        navigate("/")
    }

    const match = useMatch('/:event/edit_event');
    React.useEffect(() => {
        function fetchData() {
          const eventName = match.params.event;
          axios.post('http://127.0.0.1:5000/api/events/getEventByName',
            { eventName }).then((response) => {
              const [eventData] = response.data;
              console.log(eventData);
              setEventInfo(eventData);
            }, (response) => {
              console.log(response);
            });
        };
        fetchData();
      }, [])

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
        
        //feipa arrumar dps ↓↓↓↓↓↓
        creator = userInfos._id;
        participants = eventInfo.participants;
        presentations = eventInfo.presentations;
        const _id = eventInfo._id;
        const thumb = '';
        await axios.post(
            "http://127.0.0.1:5000/api/events/updateEvent",
            { _id, thumb, name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate }
        ).then(response => {
            showAlert(response.status);
        }, err => {
            showAlert(err.response.status)
        });
    };

    return (
        <EditEventView
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handleChangeFieldValue={handleChangeFieldValue}
            eventValues = {eventValues}
            eventInfo = {eventInfo} />
    )
}