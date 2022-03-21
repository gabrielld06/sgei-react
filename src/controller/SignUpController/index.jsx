import React from 'react'
// import asyncHandler from 'express-async-handler'
import SignUpView from '../../view/SignUpView'
// const User = require('../../model/Users')

export default function SignUpController() {
    
    const [userValues, setUserValues] = React.useState({
        userName: "",
        password: "",
        email: "",
        phone: "",
        adress: "",
        city: "",
        userType: 0,
    });

    // FieldText Change handler
    const handleChangeField = (event, field) =>{
        let updatedValue = {};
        updatedValue[field] = event.target.value;
        setUserValues(userValues => ({
        ...userValues,
        ...updatedValue
        }));
        console.log(userValues);
    }

    const handleChangeUser = (user) =>{
        setUserValues(userValues => ({
        ...userValues,
        userType: user,
        }));
        console.log(userValues);
    }

    // Register User
    // const registerUser = async (req, res) => {
    //     const {userName, password, email, cpf, userType} = req.body;
   
    // };

    // Show/hide password handler
    const [values, setValues] = React.useState({
        tabValues: 0,
        showPassword: false,
    })
    
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    // SwipableTabs Handlers
    const handleChange = (event, index) => {
        handleChangeUser(index); // Change User
        setValues({
            ...values,
            tabValues: index,
        });
    };

    const handleChangeIndex = (index) => {
        handleChangeUser(index); // Change User
        setValues({
            ...values,
            tabValues: index,
        });
    };

    return (
        <SignUpView 
            userValues={userValues}
            handleChangeField={handleChangeField}
            setUserValues={setUserValues}
            values={values} 
            handleClickShowPassword={handleClickShowPassword}
            handleChange={handleChange} 
            handleChangeIndex={handleChangeIndex}/>
    )
}
