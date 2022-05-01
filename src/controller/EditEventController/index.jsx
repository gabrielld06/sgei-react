import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from "react-router-dom";
import EditEventView from "../../view/EditEventView"
import axios from "axios"
import { getUserInfos } from '../userInfosController';

export default function EditEventController() {
    const [userInfos, setUserInfos] = React.useState();
    const [eventInfo, setEventInfo] = useState();
    const [loading, setLoading] = useState(true);

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
              setEventInfo(eventData);
              setLoading(false);
            }, (response) => {
              console.log(response);
            });
        };
        fetchData();
      }, [])

    const handleChangeField = (event, field) => {
        let updatedValue = {};
        updatedValue[field] = event.target.value;
        setEventInfo(evtValues => ({
            ...evtValues,
            ...updatedValue
        }));
    }

    const handleChangeFieldValue = (newValue, field) => {
        let updatedValue = {};
        updatedValue[field] = newValue;
        setEventInfo(evtValues => ({
            ...evtValues,
            ...updatedValue
        }));
    }

    const handleSubmit = async (showAlert) => {
        var { _id, thumb, name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate } = eventInfo;
        ticketsAvailable = parseInt(ticketsAvailable);
        ticketPrice = parseFloat(ticketPrice);
    
        await axios.post(
            "http://127.0.0.1:5000/api/events/updateEvent",
            { _id, thumb, name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate }
        ).then(response => {
            showAlert(response.status);
        }, err => {
            showAlert(err.response.status)
        });
    };

    if(loading) {
        return (<h1>Loading</h1>);
    }

    return (
        <EditEventView
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handleChangeFieldValue={handleChangeFieldValue}
            eventInfo = {eventInfo} />
    )
}