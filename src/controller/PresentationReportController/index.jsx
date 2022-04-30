import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import { getUserId } from '../userInfosController/index.jsx'
import PresentationReportView from '../../view/PresentationReportView'

export default function PresentationReportController() {
    const [presentationInfo, setPresentationInfo] = useState();
    const [loading, setLoading] = useState(true);

    const match = useMatch('/:event/:presentation/presentation_report');
    useEffect(() => {
        async function fetchData() {
            const eventName = match.params.event;
            await axios.post('http://127.0.0.1:5000/api/events/getEventByName',
                { eventName }).then(async (response) => {
                    const [eventData] = response.data;

                    const event = eventData._id;
                    const presentationName = match.params.presentation;
                    const user = getUserId();
                    
                    await axios.post('http://127.0.0.1:5000/api/presentations/getUserPresentationByNameAndEvent',
                        { user, event, presentationName }).then((response) => {
                            const [presentationData] = response.data;
                            setPresentationInfo(presentationData);
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

    if (!presentationInfo) {
        return (
            <PresentationReportView />
        )
    }

    function handleGetReportClick(showAlert) {
        showAlert(201);
    }

    return (
        <PresentationReportView
            presentationInfo={presentationInfo}
            handleGetReportClick={handleGetReportClick}
        />
    )
}