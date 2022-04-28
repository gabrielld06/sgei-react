import React, { useEffect, useState } from 'react'
import { useNavigate, useMatch } from "react-router-dom";
import EditPresentationView from "../../view/EditPresentationView"
import axios from "axios"
import { getUserInfos } from '../userInfosController';

export default function EditPresentationController() {
    // name, creator, description, participants, presentations, ticketsAvailable, ticketPrice, location, startDate, finishDate
    const [userInfos, setUserInfos] = React.useState();
    const [presentationInfo, setPresentationInfo] = useState();
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfos(getUserInfos());
    }, [])

    if (!userInfos || userInfos.userType !== 'criadorDeEvento') {
        navigate("/")
    }

    const match = useMatch('/:event/:presentation/edit_presentation');
    React.useEffect(() => {
        function fetchData() {
          const filterName = match.params.presentation;
          axios.post('http://127.0.0.1:5000/api/presentations',
            { filterName }).then((response) => {
              const [presentationData] = response.data;
              console.log(presentationData);
              setPresentationInfo(presentationData);
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
        var { _id, thumb, name, participants, seatsAvailable, theme, location, date, duration, presenter, event } = presentationInfo;
        seatsAvailable = parseInt(seatsAvailable);
        duration = parseInt(duration);

        console.log(presentationInfo);
        await axios.post(
            "http://127.0.0.1:5000/api/presentations/updatePresentation",
            { _id, thumb, name, participants, seatsAvailable, theme, location, date, duration, presenter, event }
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