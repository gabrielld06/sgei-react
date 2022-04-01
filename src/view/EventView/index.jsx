import React from 'react'
import { useMediaQuery, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Divider, Box } from '@mui/material'
import { Link } from 'react-router-dom';
import Header from '../../components/Header'
import SupimpaLogo from '../../assets/supimpa.png'
import './styles.css'

export default function EventView(props) {
  const matches = useMediaQuery('(min-width:768px)');
  const { name, description, presentations, location, startDate, finishDate, ticketPrice, ticketsAvailable } = props;

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
            <h3 className='eventInfo'>Palestras</h3>
            {presentations.map((item) => (
              <Card sx={{ minWidth: 345 }}>
                <Link to={`/${item.name}`}>
                  <CardMedia
                    component="img"
                    alt="evento"
                    height="140"
                    src={SupimpaLogo}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.theme}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={`${name}/${item.name}`} size="small">Ver palestra</Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Box>
      </ Grid>
    </div>
  )
}
