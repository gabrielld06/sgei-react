import React from 'react'
import MuiAlert from '@mui/material/Alert';
import { CardMedia, Box, Button, Snackbar } from '@mui/material'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function GetCertificateView(props) {
    const { eventInfo, handleGetCertificateClick } = props;
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

    if (!eventInfo) {
        return (
            <div>
                <Header />
                <h1>Usuario não inscrito no evento</h1>
            </div>
        );
    }

    const {thumb, name, description, location, startDate, finishDate, ticketPrice, ticketsAvailable } = eventInfo;

    const sDate = new Date(startDate);
    const fDate = new Date(finishDate);

    return (
        <div>
            <Header />
            <Box className='presentationBox'>
                <CardMedia
                    component="img"
                    alt="evento"
                    width="100%"
                    height="140"
                    src={thumb === "" ? SupimpaLogo : thumb}
                />
                <div className='eventCardInfo'>
                    <div className='eventCardInfoBreak'>
                        <h3 className='eventInfo'>{name}</h3>
                    </div>
                    <div className='eventCardInfoBreak'>
                        <p className='eventInfo'>{description}</p>
                    </div>
                    <div className='eventCardInfoBreak'>
                        <p className='eventInfo'>Local: {location}</p>
                    </div>
                    <div className='eventCardInfoBreak'>
                        <p className='eventInfo'>Inicio: {
                            ("0" + sDate.getUTCDate()).slice(-2) + "/" + ("0" + (sDate.getUTCMonth() + 1)).slice(-2) + "/" + sDate.getUTCFullYear()
                        }</p>
                        <p className='eventInfo'>Fim: {
                            ("0" + fDate.getUTCDate()).slice(-2) + "/" + ("0" + (fDate.getUTCMonth() + 1)).slice(-2) + "/" + fDate.getUTCFullYear()
                        }</p>
                    </div>
                    <Button variant="contained" sx={{ m: 2 }} onClick={() => { handleGetCertificateClick(handleShowAlert); }} >Gerar certificado</Button>
                </div>
            </Box>
            <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
                {eventStatus === 201
                    ? <Alert severity="success">Certificado gerado com sucesso!</Alert>
                    : <Alert severity="error">Falha ao gerar certificado!</Alert>}
            </Snackbar>
        </div>
    )
}
