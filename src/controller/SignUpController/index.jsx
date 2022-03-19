import React from 'react'

import SignUpView from '../../view/SignUpView'

export default function SignUpController() {

    const [values, setValues] = React.useState({
        showPassword: false,
    })
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    
    const [tabValues, setTabValues] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValues(newValue);
    };

    const handleChangeIndex = (index) => {
        setTabValues(index);
    };

    return (
        <SignUpView values={values} handleClickShowPassword={handleClickShowPassword} tabValues={tabValues} handleChange={handleChange} handleChangeIndex={handleChangeIndex}/>
    )
}
