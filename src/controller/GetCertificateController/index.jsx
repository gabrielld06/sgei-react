import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import GetCertificateView from '../../view/GetCertificateView'
import { getUserId } from '../userInfosController/index.jsx'

export default function GetCertificateController() {
    const [eventInfo, setEventInfo] = useState();
    const [ticketInfo, setTicketInfo] = useState();
    const [loading, setLoading] = useState(true);

    const match = useMatch('/:event/get_certificate');
    useEffect(() => {
        async function fetchData() {
            const eventName = match.params.event;
            await axios.post('http://127.0.0.1:5000/api/events/getEventByName',
                { eventName }).then(async (response) => {
                    const [eventData] = response.data;

                    setEventInfo(eventData);

                    const userId = getUserId();
                    const eventId = eventData._id;

                    await axios.post('http://127.0.0.1:5000/api/tickets/getTickets',
                        { userId, eventId }).then((response) => {
                            const tickets = response.data;
                            
                            setTicketInfo(tickets);
                        }, (response) => {
                            console.log(response);
                        });
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

    if (!eventInfo || ticketInfo.length < 1) {
        return (
            <GetCertificateView />
        )
    }

    function handleGetCertificateClick(showAlert) {
        showAlert(201);
    }

    return (
        <GetCertificateView
            eventInfo={eventInfo}
            handleGetCertificateClick={handleGetCertificateClick}
        />
    )
}