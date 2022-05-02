import React from 'react';
import {Box, Button, Divider, Grid, TextField, CardMedia, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './styles.css';
import Header from '../../components/Header'
import SupimpaLogo from '../../assets/supimpa.png'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DialogURL from '../../components/DialogURL';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewPresentationView(props) {
    const { handleChangeField, handleSubmit, handleChangeFieldValue, startDate } = props;
    const [showAlert, setShowAlert] = React.useState(false);
    const [presentationStatus, setPresentationStatus] = React.useState(false);
    const [date, setDate] = React.useState(startDate);
    const [imageURL, setImageURL] = React.useState(SupimpaLogo);

    const handleChangeImage = (url) => {
        handleChangeFieldValue(url, "thumb");
        setImageURL(url);
    }

    const handleShowAlert = (message) => {
        setPresentationStatus(message);
        setShowAlert(true)
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };
    
    return (
        <div>
            <Header />
            <div className='boxDivStyle'>
                <Box sx={boxStyle}>
                    <Grid container >
                        <CardMedia
                            component="img"
                            sx={{ maxHeight: '250px' }}
                            image={imageURL}
                        />
                        <DialogURL handleChangeImage={handleChangeImage}/>
                        <Grid item xs container direction="row" justifyContent="space-evenly">
                            <TextField id="name" label="Nome da palestra" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "name") }} />
                            <TextField id="theme" label="Tema da palestra" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "theme") }} />
                            <TextField id="seatsAvailable" label="Quantidade de assentos disponiveis" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "seatsAvailable") }} />
                            <TextField id="location" label="Local" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "location") }} />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs container direction="column" >
                            <TextField id="duration" label="Duração (min)" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "duration") }} />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Data e hora de início"
                                    value={date}
                                    onChange={(e) => {setDate(e); handleChangeFieldValue(date, "date");}}
                                    renderInput={(params) => <TextField sx={userFieldStyle} {...params} />}
                                />
                            </LocalizationProvider>
                            <Button variant="contained" sx={{ m: 2 }} onClick={() => { handleSubmit(handleShowAlert); }} >Adicionar palestra</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
                    {presentationStatus === 201
                        ? <Alert severity="success">Palestra criada com sucesso!</Alert>
                        : <Alert severity="error">Falha ao criar palestra, verifique os campos!</Alert>}
                </Snackbar>
            </div>
        </div>
    );
}

const boxStyle = {
    width: 750,
    backgroundColor: 'white',
    boxShadow: 15,
    borderRadius: 5,
}

const userFieldStyle = {
    width: '80%',
    m: 1,
}