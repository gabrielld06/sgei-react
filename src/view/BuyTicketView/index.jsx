import React from 'react'
import { useMediaQuery, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Divider, Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom';
import Header from '../../components/Header'
import SupimpaLogo from '../../assets/supimpa.png'
import './styles.css'

export default function EventView(props) {
    const matches = useMediaQuery('(min-width:768px)');
    const { name, description, totalPresentations, location, startDate, finishDate, ticketPrice, ticketsAvailable, handleTicketCount, ticketCount } = props;

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
                        // sx={{border : 1 }}
                        src={SupimpaLogo}
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
                            <p className='eventInfo'>Total de palestras no evento: {totalPresentations}</p>
                        </div>
                    </div>
                </Box>
                {matches ? <Divider orientation="vertical" flexItem /> : <Divider orientation="horizontal" flexItem />}
                <Box className='eventRightSide'>
                    <Grid container
                        direction={matches ? 'row' : 'column'}
                        width='100%'
                        justifyContent="space-evenly"
                        rowGap={2}
                        columnGap={2}
                        alignItems="center">
                        <h3 className='eventInfo'>Comprar ingresso</h3>
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
                        <h3 className='eventInfo'>Total: R${ticketCount * ticketPrice}</h3>
                    </Grid>
                </Box>
            </ Grid>
        </div>
    )
}