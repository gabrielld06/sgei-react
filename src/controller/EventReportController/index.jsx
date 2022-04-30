import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import EventReportView from '../../view/EventReportView'
import { getUserId } from '../userInfosController/index.jsx'

export default function EventReportController() {
    const [eventInfo, setEventInfo] = useState();
    const [loading, setLoading] = useState(true);

    const match = useMatch('/:event/event_report');
    useEffect(() => {
        async function fetchData() {
            const eventName = match.params.event;
            const creatorId = getUserId();
            await axios.post('http://127.0.0.1:5000/api/events/getEventPresentationsByNameAndCreator',
                { eventName, creatorId }).then((response) => {
                    const [eventData] = response.data;
                    setEventInfo(eventData);
                }, (response) => {
                    console.log(response);
                });
            setLoading(false);
        };
        fetchData();
    }, [])

    if (loading) {
        return (
            <h1>Loading</h1>
        )
    }

    if (!eventInfo) {
        return (
            <EventReportView />
        )
    }

    function handleGetReportClick(showAlert) {
        showAlert(201);
    }

    return (
        <EventReportView
            eventInfo={eventInfo}
            handleGetReportClick={handleGetReportClick}
        />
    )
}