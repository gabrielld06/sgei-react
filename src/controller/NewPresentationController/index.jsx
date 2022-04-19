import { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NewPresentationView from '../../view/NewPresentationView'
import { getUserInfos } from '../userInfosController'

export default function NewPresentationController() {
    // name, seatsAvailable, theme, location, date, duration, presenter, event
    const [eventInfo, setEventInfo] = useState();
    const [userInfos, setUserInfos] = useState();
    const [loading, setLoading] = useState(true);
    const [presentationValues, setPresentationValues] = useState({
        name: "",
        participants: 'a',
        seatsAvailable: 0,
        theme: "",
        location: "",
        date: new Date(),
        duration: 0,
        presenter: "",
        event: ""
    });
    // TODO: descomentar, user forbidden
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfos(getUserInfos());

    }, [userInfos])

    // if (!userInfos || JSON.parse(userInfos).userType !== 'palestrante') {
    //     navigate("/")
    // }

    const match = useMatch('/:event/:presentation');
    useEffect(() => {
        async function fetchData() {
            const filter = match.params.event;
            await axios.post('http://127.0.0.1:5000/api/events',
                { filter }).then((response) => {
                    const [data] = response.data;
                    setEventInfo(data);
                }, (response) => {
                    console.log(response);
                });
                setLoading(false);
        };
        fetchData();
    }, [])

    if(loading) {
        return (
            <h1>Loading</h1>
        )
    }

    if (!eventInfo) {
        return (
            <h1>Not found</h1>
        )
    }

    const handleChangeField = (event, field) => {
        let updatedValue = {};
        updatedValue[field] = event.target.value;
        setPresentationValues(pValues => ({
            ...pValues,
            ...updatedValue
        }));
    }

    const handleChangeFieldValue = (newValue, field) => {
        let updatedValue = {};
        updatedValue[field] = newValue;
        setPresentationValues(pValues => ({
            ...pValues,
            ...updatedValue
        }));
    }

    const handleSubmit = async (showAlert) => {
        var { name, participants, seatsAvailable, theme, location, date, duration, presenter, event } = presentationValues;
        seatsAvailable = parseInt(seatsAvailable);
        duration = parseInt(duration);
        presenter = await userInfos._id;
        event = eventInfo._id;
        const thumb = '';
        try {
            const presentationData = await axios.post(
                "http://127.0.0.1:5000/api/presentations/newPresentation",
                { thumb, name, participants, seatsAvailable, theme, location, date, duration, presenter, event }
            );
            
            // const update = presentationData.data._id;
            // const field = 'presentations';

            // await axios.post(
            //     "http://127.0.0.1:5000/api/events/updateEvent",
            //     { event, field, update }
            // );

            showAlert(201);

        } catch (err) {
            console.log(err);
            
            showAlert(400);
        }
    };

    return (
        <NewPresentationView
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handleChangeFieldValue={handleChangeFieldValue}
            date={presentationValues.date} />
    )
}
