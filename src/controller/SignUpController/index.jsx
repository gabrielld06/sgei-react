import React from 'react'
import SignUpView from '../../view/SignUpView'
import axios from "axios";

// TODO: tratar senhas diferentes; session token

export default function SignUpController() {
    
    const [userValues, setUserValues] = React.useState({
        username: "",
        accountType: 0,
        password: "",
        phone: "",
        address: "",
        city: "",
        email: "",
        cpf_cnpj: "",
        passVer : "",
    });

    const handleSubmit = async () => {
        const { username, accountType, password, phone, address, city, email, cpf_cnpj, passVer } = userValues;
        const type = ['espectador', 'criadorDeEvento', 'apresentador'];
        const userType = type[accountType];

        if(passVer !== password) {
            // do something
            console.log("senha diferente");
        } else {
            try {
                const { data } = await axios.post(
                "http://127.0.0.1:5000/api/users",
                { username, userType, password, phone, address, city, email, cpf_cnpj }
                );
                // criar session token
                console.log(data);            
            } catch {
                console.log('deu merda');
            }
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
        accountType: user,
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
            handleChangeField={handleChangeField}
            setUserValues={setUserValues}
            values={values} 
            handleClickShowPassword={handleClickShowPassword}
            handleChange={handleChange} 
            handleChangeIndex={handleChangeIndex}
            handleSubmit={handleSubmit}/>
    )
}
