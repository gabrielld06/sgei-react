import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import LoginView from '../../view/LoginView'

export default function LoginController() {
    const [userInfos, setUserInfos] = React.useState();
    const navigate = useNavigate();
    useEffect(() => {
        setUserInfos(localStorage.getItem("userInfos"));

    }, [userInfos])
    if (userInfos) {
        console.log(userInfos);
        navigate("/")
    }
    const [values, setValues] = React.useState({
        showPassword: false,
    })

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const [userValues, setUserValues] = React.useState({
        email: "",
        password: "",
    });

    // FieldText Change handler
    const handleChangeField = (event, field) => {
        let updatedValue = {};
        updatedValue[field] = event.target.value;
        setUserValues(userValues => ({
            ...userValues,
            ...updatedValue
        }));
        console.log(userValues);
    }

    const handleSubmit = async (handleShowAlert) => {
        const { email, password } = userValues;
        await axios.post(
            "http://127.0.0.1:5000/api/users/login",
            { email, password }
        ).then(response => {
            localStorage.setItem("userInfos", JSON.stringify(response.data));
            handleShowAlert(response.status);
            navigate("/");
        }, (err) => {
            console.log(err.response.status)
            handleShowAlert(err.response.status);
        })
    };

    return (
        <LoginView values={values}
            handleClickShowPassword={handleClickShowPassword}
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            userInfos={userInfos}
        />
    )
}
