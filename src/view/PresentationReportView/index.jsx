import React from 'react'
import MuiAlert from '@mui/material/Alert';
import { CardMedia, Box, Button, Snackbar } from '@mui/material'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PresentationReportView(props) {
  const { presentationInfo, handleGetReportClick } = props;
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

  if (!presentationInfo) {
    return (
      <div>
        <Header />
        <h1>Palestra não encontrada ou usuario não é seu criador</h1>
      </div>
    );
  }

  const { name, seatsAvailable, theme, location, date, duration } = presentationInfo;
  const sDate = new Date(date);

  return (
    <div>
      <Header />
      <Box className='presentationBox'>
        <CardMedia
          component="img"
          alt="evento"
          width="100%"
          height="140"
          src={SupimpaLogo}
        />
        <div className='presentationCardInfo'>
          <div className='presentationCardInfoBreak'>
            <h3 className='presentationInfo'>{name}</h3>
          </div>
          <div className='presentationCardInfoBreak'>
            <p className='presentationInfo'>{theme}</p>
          </div>
          <div className='presentationCardInfoBreak'>
            <p className='presentationInfo'>Local: {location}</p>
          </div>
          <div className='presentationCardInfoBreak'>
            <p className='presentationInfo'>Assentos disponíveis: {seatsAvailable}</p>
          </div>
          <div className='presentationCardInfoBreak'>
            <p className='presentationInfo'>Inicio: {
              ("0" + sDate.getUTCDate()).slice(-2) + "/" + ("0" + (sDate.getUTCMonth() + 1)).slice(-2) + "/" + sDate.getUTCFullYear()
            }</p>
            <p className='presentationInfo'>Duração: {duration} min</p>
          </div>
          <Button variant="contained" sx={{ m: 2 }} onClick={() => { handleGetReportClick(handleShowAlert); }} >Gerar relatorio</Button>
        </div>
      </Box>
      <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
        {eventStatus === 201
          ? <Alert severity="success">Relatorio gerado com sucesso!</Alert>
          : <Alert severity="error">Falha ao gerar relatorio!</Alert>}
      </Snackbar>
    </div>
  )
}
