import { useMediaQuery, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Divider, Box, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import React from 'react'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

export default function HomeView(props) {
  const { eventList, handleChangeField, handleSearch } = props;
  const matches = useMediaQuery('(min-width:768px)');

  return (
    <div>
      <Header></Header>
      <Grid direction={matches ? 'row' : 'column'} className='mainContainer'>
        <Box className='leftSide'>
          <TextField
            id="searchField"
            label="Busca"
            onChange={(e) => { handleChangeField(e) }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon onClick={handleSearch} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Box>
        {matches ? <Divider orientation="vertical" flexItem /> : <Divider orientation="horizontal" flexItem />}
        <Box className='rightSide'>
          <Grid container
            direction={matches ? 'row' : 'column'}
            width='100%'
            justifyContent="space-evenly"
            rowGap={2}
            columnGap={2}
            alignItems="center">
            {eventList.map((item) => (
              <Card key={`${item.name}`} sx={{ minWidth: 345 }}>
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
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={`/${item.name}`} size="small">Ver evento</Button>
                  <Button component={Link} to={`/${item.name}/sign_event`} size="small">Inscrever-se</Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Box>
      </ Grid>
    </div>
  )
}
