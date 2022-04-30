import React from 'react'
import { CardMedia, Box } from '@mui/material'
import UserImage from '../../assets/userImage.png'
import Header from '../../components/Header'
import TextField from '@mui/material/TextField';
import ComboBox from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import './styles.css'

// da pra criar um desse no Models e só importar, deixaria o código fácil de manutenções no futuro caso seja nessário
// adicionar um novo tipo de usuário.
const userTypes = [
    { label: "Espectador", userType: "espectador" },
    { label: "Criador de Eventos", userType: "criadorDeEvento" },
    { label: "Palestrante", userType: "apresentador" },
]

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UserProfileView(props) {
    const { handleChangeField, handleSubmit, handleChangeFieldValue, userInfos } = props;
    const [showAlert, setShowAlert] = React.useState(false);
    const [eventStatus, setEventStatus] = React.useState(false);

    const handleShowAlert = (message) => {
        setEventStatus(message);
        setShowAlert(true)
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };
    const getUserTypeLabeled = (filter) => {
        const labeledUserType = userTypes.find((element) => {
            return element.userType === filter;
        })
        return labeledUserType;
    }
    return (
        <div>
            <Header />
            <Box className='userInfosBox'>
                <CardMedia
                    component="img"
                    alt="profile image"
                    height="150"
                    margin='auto'

                    sx={{ objectFit: 'contain' }}
                    src={UserImage}
                />
                <div className='userInfosCard'>
                    <div className='userInfosCardBreak'>
                        <h3 className='userInfos'>
                            <TextField id="username" defaultValue={userInfos.username} label="Usuário" variant="outlined" onChange={(e) => { handleChangeField(e, "username") }} />
                        </h3>
                    </div>
                    <div className='userInfosCardBreak'>
                        <ComboBox
                            id="userType"
                            options={userTypes}
                            sx={{ width: 200, paddingLeft: 3 }}
                            renderInput={(params) => <TextField {...params} label="Tipo de usuário" />}
                            defaultValue={getUserTypeLabeled(userInfos.userType)}
                            isOptionEqualToValue={(option, value) => option.userType === getUserTypeLabeled(userInfos.userType).userType}
                            onChange={(event, value) => handleChangeFieldValue(value.userType, "userType")}
                        />
                    </div>
                    <div className='userInfosCardBreak'>
                        <TextField id="password" type="password" defaultValue={""} label="Senha" variant="outlined" onChange={(e) => { handleChangeField(e, "password") }} />
                    </div>
                    <div className='userInfosCardBreak'>
                        <TextField id="phone" defaultValue={userInfos.phone} label="Telefone" variant="outlined" onChange={(e) => { handleChangeField(e, "phone") }} />
                    </div>
                    <div className='userInfosCardBreak'>
                        <TextField id="address" defaultValue={userInfos.address} label="Endereço" variant="outlined" onChange={(e) => { handleChangeField(e, "address") }} />
                    </div>
                    <div className='userInfosCardBreak'>
                        <TextField id="city" defaultValue={userInfos.city} label="Cidade" variant="outlined" onChange={(e) => { handleChangeField(e, "city") }} />
                    </div>
                    <div className='userInfosCardBreak'>
                        <TextField id="email" defaultValue={userInfos.email} label="Email" variant="outlined" onChange={(e) => { handleChangeField(e, "email") }} />
                    </div>
                    <div className='userInfosCardBreak'>
                        <TextField id="cpf_cnpj" defaultValue={userInfos.cpf_cnpj} label="CPF/CNPJ" variant="outlined" onChange={(e) => { handleChangeField(e, "cpf_cnpj") }} />
                    </div>
                    <Button variant="contained" sx={{ width: 250 }} onClick={() => { handleSubmit(handleShowAlert); }} >Atualizar informações</Button>
                </div>
            </Box>
            <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
                {eventStatus === 201
                    ? <Alert severity="success">Informações da conta editado com sucesso!</Alert>
                    : <Alert severity="error">Falha ao editar informações da conta, verifique os campos!</Alert>}
            </Snackbar>
        </div>
    )
}
