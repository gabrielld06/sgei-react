import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles.css';
import MuiAlert from '@mui/material/Alert';
import Header from '../../components/Header'
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import SupimpaLogo from '../../assets/supimpa.png'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NewEventView(props) {
    const { handleChangeField, handleSubmit, handleChangeFieldValue, startDate, endDate } = props;
    const [showAlert, setShowAlert] = React.useState(false);
    const [eventStatus, setEventStatus] = React.useState(false);
    const [dateStart, setDateStart] = React.useState(startDate);
    const [dateEnd, setDateEnd] = React.useState(endDate);
    
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
    
    return (
        <div>
            <Header />
            <div className='boxDivStyle'>
                <Box sx={boxStyle}>
                    <Grid container >
                        <CardMedia
                            component="img"
                            sx={{ maxHeight: '250px' }}
                            image={SupimpaLogo}
                            alt="green iguana"
                        />
                        <Grid item xs container direction="row" justifyContent="space-evenly">
                            <TextField id="name" label="Nome do evento" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "name") }} />
                            <TextField id="description" label="Descrição do evento" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "description") }} />
                            <TextField id="ticketsAvailable" label="Quantidade de ingressos disponíveis" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "ticketsAvailable") }} />
                            <TextField id="ticketPrice" label="Preço dos ingressos" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "ticketPrice") }} />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs container direction="column" >
                            <TextField id="location" label="Local" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "location") }} />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Data e hora de início"
                                    value={dateStart}
                                    onChange={(e) => {setDateStart(e); handleChangeFieldValue(dateStart, "startDate");}}
                                    renderInput={(params) => <TextField sx={userFieldStyle} {...params} />}
                                />
                                <DateTimePicker
                                    label="Data e hora de término"
                                    value={dateEnd}
                                    onChange={(e) => {setDateEnd(e); handleChangeFieldValue(dateEnd, "finishDate");}}
                                    renderInput={(params) => <TextField sx={userFieldStyle} {...params} />}
                                />
                            </LocalizationProvider>
                            <Button variant="contained" sx={{ m: 2 }} onClick={() => { handleSubmit(handleShowAlert); }} >Adicionar evento</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
                    {eventStatus === 201
                        ? <Alert severity="success">Cadastro feito com sucesso!</Alert>
                        : <Alert severity="error">Falha ao fazer cadastro, verifique os campos!</Alert>}
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