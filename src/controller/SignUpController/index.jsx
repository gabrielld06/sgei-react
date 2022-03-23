import React from 'react'
import SignUpView from '../../view/SignUpView'
// import registerUser from '../RegisterController/registerController';
// const asyncHandler = require('express-async-handler')
import axios from "axios";

export default function SignUpController() {
    
    const [userValues, setUserValues] = React.useState({
        userName: "",
        password: "",
        email: "",
        cpf: "",
        phone: "",
        adress: "",
        city: "",
        userType: 0,
    });

    const handleSubmit = async () => {
        console.log('handleSubmit chegou aqui hein');
        const config = {
            headers: {
                "Content-type" : "application/json",
                "Access-Control-Allow-Origin" : "true",
                "Access-Control-Allow-Methods" : "GET, POST, PUT",
                'X-Requested-With': 'XMLHttpRequest',
            },
        };
        console.log('handleSubmit2 chegou aqui hein');
        const username = userValues.userName;
        const senha = userValues.password;
        const email = userValues.email;
        const endereco = userValues.adress;
        const CPF_CNPJ = userValues.cpf;
        console.log(username);
        console.log(senha);
        console.log(email);
        console.log(endereco);
        console.log(CPF_CNPJ);
        const type = ['espectador', 'criador de evento', 'apresentador'];
        const tipoUsuario = type[userValues.userType];
        console.log('handleSubmit3 chegou aqui hein');
        try {
            const { data } = await axios.post(
                "http://127.0.0.1:1337/api/users",
                { username, tipoUsuario, senha, endereco, email, CPF_CNPJ },
                config,
            );
            console.log('data');
            console.log(data);
            console.log('data');
            
        } catch {
            console.log('deu merda porra');
        }
    };

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
            handleChangeIndex={handleChangeIndex}
            handleSubmit={handleSubmit}/>
    )
}
