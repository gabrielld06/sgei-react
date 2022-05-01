import React from 'react'
import SignUpView from '../../view/SignUpView'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getUserInfos } from '../userInfosController';

export default function SignUpController() {
    const [userInfos, setUserInfos] = React.useState();
    const navigate = useNavigate();
    React.useEffect(() => {
        setUserInfos(getUserInfos());

    }, [userInfos])
    if (userInfos) {
        navigate("/")
    }
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

    const handleSubmit = async (showAlert) => {
        const { username, accountType, password, phone, address, city, email, cpf_cnpj, passVer } = userValues;
        const type = ['espectador', 'criadorDeEvento', 'apresentador'];
        const userType = type[accountType];
        if(passVer !== password) {
            showAlert(400)
        } else {
                await axios.post(
                "http://127.0.0.1:5000/api/users",
                { username, userType, password, phone, address, city, email, cpf_cnpj }
                ).then(response => {
                    showAlert(response.status);
                }, err => {
                    showAlert(err.response.status)
                });
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
    }

    const handleChangeUser = (user) =>{
        setUserValues(userValues => ({
        ...userValues,
        accountType: user,
        }));
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
