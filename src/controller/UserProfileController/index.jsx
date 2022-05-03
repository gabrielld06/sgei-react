import React from 'react'
import axios from 'axios'

import UserProfileView from '../../view/UserProfileView'
import { getUserId } from '../userInfosController';

export default function UserProfileController() {
    const [userInfos, setUserInfos] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            const userId = getUserId();
            await axios.post('http://127.0.0.1:5000/api/users/getUserInfos',
                { userId }).then((response) => {
                    setUserInfos(response.data);
                }, (response) => {
                    console.log(response);
                });
            setLoading(false);
        };
        fetchData();
    }, [])

    if (loading) {
        return (<h1>Loading</h1>);
    }

    const handleChangeField = (event, field) => {
        let updatedValue = {};
        updatedValue[field] = event.target.value;
        setUserInfos(evtValues => ({
            ...evtValues,
            ...updatedValue
        }));
    }

    const handleChangeFieldValue = (newValue, field) => {
        let updatedValue = {};
        updatedValue[field] = newValue;
        setUserInfos(evtValues => ({
            ...evtValues,
            ...updatedValue
        }));
    }

    const handleSubmit = async (showAlert) => {
        var { _id, username, userType, password, phone, address, city, email, cpf_cnpj } = userInfos;
        await axios.post(
            "http://127.0.0.1:5000/api/users/updateUser",
            { _id, username, userType, password, phone, address, city, email, cpf_cnpj }
        ).then(response => {
            showAlert(response.status);
        }, err => {
            showAlert(err.response.status)
        });
    };

    return (
        <UserProfileView
            handleChangeField={handleChangeField}
            handleChangeFieldValue={handleChangeFieldValue}
            handleSubmit={handleSubmit} 
            userInfos={userInfos}/>
    )
}