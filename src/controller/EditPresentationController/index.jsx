import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from "react-router-dom";
import EditPresentationView from "../../view/EditPresentationView"
import axios from "axios"
import { getUserInfos } from '../userInfosController';

export default function EditPresentationController() {
    const [userInfos, setUserInfos] = React.useState();
    const [presentationInfo, setPresentationInfo] = useState();
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfos(getUserInfos());
    }, [])

    if (!userInfos || userInfos.userType !== 'apresentador') {
        navigate("/")
    }

    const match = useMatch('/:event/:presentation/edit_presentation');
    React.useEffect(() => {
        async function fetchData() {
            const eventName = match.params.event;
            await axios.post('http://127.0.0.1:5000/api/events/getEventByName',
                { eventName }).then(async (response) => {
                    const [eventData] = response.data;
                    const event = eventData._id;
                    const presentationName = match.params.presentation;    
                    await axios.post('http://127.0.0.1:5000/api/presentations/getPresentationByNameAndEvent',
                        { event, presentationName }).then((response) => {
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

    const handleChangeField = (event, field) => {
        let updatedValue = {};
        updatedValue[field] = event.target.value;
        setPresentationInfo(prstValues => ({
            ...prstValues,
            ...updatedValue
        }));
    }

    const handleChangeFieldValue = (newValue, field) => {
        let updatedValue = {};
        updatedValue[field] = newValue;
        setPresentationInfo(prstValues => ({
            ...prstValues,
            ...updatedValue
        }));
    }

    const handleSubmit = async (showAlert) => {
        var { _id, thumb, name, seatsAvailable, theme, location, date, duration, presenter, event } = presentationInfo;

        const atualDate = new Date();
        if(date < atualDate ) {
            showAlert(400)
            return;
        }

        seatsAvailable = parseInt(seatsAvailable);
        duration = parseInt(duration);
        await axios.post(
            "http://127.0.0.1:5000/api/presentations/updatePresentation",
            { _id, thumb, name, seatsAvailable, theme, location, date, duration, presenter, event }
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
        <EditPresentationView
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handleChangeFieldValue={handleChangeFieldValue}
            presentationInfo = {presentationInfo} />
    )
}