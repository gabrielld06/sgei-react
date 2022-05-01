import React from 'react'
import { useMediaQuery, CardMedia, Button, Typography, Grid, Divider, Box, TextField } from '@mui/material'
import Header from '../../components/Header'
import SupimpaLogo from '../../assets/supimpa.png'
import './styles.css'
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EventView(props) {
    const matches = useMediaQuery('(min-width:768px)');
    const { eventInfo, handleTicketCount, handleBuyTicketClick, ticketCount } = props;
    const {thumb, name, description, ticketPrice, location, startDate, finishDate, presentationList } = eventInfo;
    var { ticketsAvailable } = eventInfo;
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [eventStatus, setEventStatus] = React.useState(false);

    const handleShowAlert = (response, message) => {
        setEventStatus(response);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    if (!name) {
        return (
            <div>
                <Header />
                <h1>Event Not Found</h1>
            </div>
        )
    }
    const sDate = new Date(startDate);
    const fDate = new Date(finishDate);
    return (
        <div>
            <Header />
            <Grid direction={matches ? 'row' : 'column'} className='mainContainer'>
                <Box className='eventLeftSide'>
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
                        <div className='eventCardInfoBreak'>
                            <p className='eventInfo'>Valor do ingresso: R${ticketPrice.toFixed(2)}</p>
                            <p className='eventInfo'>Ingressos disponiveis: {ticketsAvailable}</p>
                            <p className='eventInfo'>Total de palestras no evento: {presentationList.length}</p>
                        </div>
                    </div>
                </Box>
                {matches ? <Divider orientation="vertical" flexItem /> : <Divider orientation="horizontal" flexItem />}
                <Box className='eventRightSide'>
                    <Grid container
                        direction={matches ? 'column' : 'column'}
                        width='100%'
                        rowGap={2}
                        columnGap={2}
                        alignItems="center">
                        <Typography variant="h4" gutterBottom component="div">Comprar ingressos</Typography>
                        <TextField
                            id="ticket-count"
                            label="Quantidade de ingressos"
                            defaultValue={0}
                            type='number'
                            value={ticketCount}
                            onChange={(e) => handleTicketCount(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Typography variant="h6" gutterBottom component="div">Total: R${ticketCount * ticketPrice}</Typography>
                        <Button variant="contained" onClick={() => { handleBuyTicketClick(handleShowAlert);}} endIcon={<ShoppingCartIcon />}>Comprar ingresso</Button>
                    </Grid>
                </Box>
                <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
                    {eventStatus === 201
                        ? <Alert severity="success">{alertMessage}</Alert>
                        : <Alert severity="error">{alertMessage}</Alert>}
                </Snackbar>
            </ Grid>

        </div>
    )
}
