import React from 'react'
import SignUpView from '../../view/SignUpView'
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

    const handleSubmit = async (user, password, email) => {
        // const type = ['espectador', 'criador de evento', 'apresentador'];
        // const tipoUsuario = type[userValues.userType];
        try {
           
            const { data } = await axios.post(
              "http://127.0.0.1:5000/api/users",
              { user, password, email }
            );
            
            console.log(data);            
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
