import { Container, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@mui/material'
import React from 'react'
import SupimpaLogo from '../../assets/supimpa.png'

import './styles.css'

export default function HomeView(props) {
  const {eventList} = props;
  console.log(eventList);
  return (

    // UI goes here

    <Container className='mainContainer'>
      <Grid container
        direction="row"
        justifyContent="space-between"
        rowGap={2}
        columnGap={2}
        alignItems="center">
        {eventList.map((item) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              src={SupimpaLogo}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.nomeEvento}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </ Container>
  )
}
