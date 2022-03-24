import React from 'react'
import axios from 'axios'

import LoginView from '../../view/LoginView'

export default function LoginController() {

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

    const handleSubmit = async () => {
        const { email, password } = userValues;

        try {
            const { data } = await axios.post(
                "http://127.0.0.1:5000/api/users/login",
                { email, password }
            );
            // criar session token
            console.log(data);
        } catch {
            console.log('deu merda');
        }
    };

    return (
        <LoginView values={values} 
        handleClickShowPassword={handleClickShowPassword} 
        handleChangeField={handleChangeField}
        handleSubmit={handleSubmit}/>
    )
}
