import React from 'react'
import { useMediaQuery, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Divider, Box, Fab, TextField, InputAdornment, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Header from '../../components/Header'
import SupimpaLogo from '../../assets/supimpa.png'
import './styles.css'

export default function EventView(props) {
  const matches = useMediaQuery('(min-width:768px)');
  const { event, loading, filter, handleChangeField } = props;
  const [userInfo, setUserInfo] = React.useState();

  React.useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfos")));
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <h1>Loading</h1>
      </div>
    )
  }

  if (!event) {
    return (
      <div>
        <Header />
        <h1>Event Not Found</h1>
      </div>
    )
  }
  const { thumb, name, description, location, startDate, finishDate, ticketPrice, ticketsAvailable, presentationList } = event;

  const maxLength = 69;
  const sDate = new Date(startDate);
  const fDate = new Date(finishDate);
  return (
    <div>
      <Header />
      <Grid container direction={matches ? 'row' : 'column'} sx={{ "flexWrap": "nowrap" }} className='mainContainer'>
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
            </div>
          </div>
        </Box>
        {matches ? <Divider orientation="vertical" flexItem /> : <Divider orientation="horizontal" flexItem />}
        <Box className='eventRightSide'>
          <TextField
            id="searchField"
            label="Busca"
            sx={{ "width": "50%", "marginBottom": "16px" }}
            onChange={(e) => { handleChangeField(e) }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Grid container
            direction={matches ? 'row' : 'column'}
            width='100%'
            justifyContent="space-evenly"
            rowGap={2}
            columnGap={2}
            alignItems="center">
            {presentationList.filter(e => (filter === "" ? e : e.name.toLowerCase().includes(filter.toLowerCase()))).map((item) => (
              <Card key={`${item.name}`} sx={{ minWidth: 430, minHeight: 250, maxHeight: 300, maxWidth: 430 }}>
                <Link to={`/${name}/${item.name}`}>
                  <CardMedia
                    component="img"
                    alt="evento"
                    height="140"
                    src={item.thumb === "" ? SupimpaLogo : item.thumb}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.theme.length < 72 ? item.theme : (item.theme.substring(0, maxLength) + "...")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={`${item.name}`} size="small">Ver palestra</Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Box>
        {(userInfo && userInfo.userType === "apresentador") &&
          <div className="createPresentation" >
            <Tooltip title="Criar apresentação">
              <Button component={Link} to={`newPresentation`}>
                <Fab aria-label="Criar apresentação">
                  <AddIcon />
                </Fab>
              </Button>
            </Tooltip>
          </div>
        }
      </ Grid>
    </div>
  )
}
