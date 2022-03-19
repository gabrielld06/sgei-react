import React from 'react'

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

    return (
        <LoginView values={values} handleClickShowPassword={handleClickShowPassword}/>
    )
}
