import { useMediaQuery, Card, CardActions, CardContent, CardMedia, Button, Fab, Typography, Grid, Divider, Box, TextField, InputAdornment, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

export default function HomeView(props) {
  const { eventList, handleChangeField, filter } = props;
  const matches = useMediaQuery('(min-width:768px)');
  const [userInfo, setUserInfo] = React.useState();

  const maxLength = 69;
  
  React.useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfos")));
  }, []);

  return (
    <div>
      <Header></Header>
      <Grid container direction={matches ? 'row' : 'column'} sx={{"flexWrap":"nowrap"}} className='mainContainer'>
        <Box className='leftSide'>
          <TextField
            id="searchField"
            label="Busca"
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
            {eventList.filter(e => (filter === "" ? e : e.name.toLowerCase().includes(filter.toLowerCase()))).map((item) => (
              <Card key={`${item.name}`} sx={{ minWidth: 430, minHeight: 250, maxHeight: 300, maxWidth: 430 }}>
                <Link to={`/${item.name}`}>
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
                    {item.description.length < 72 ? item.description : (item.description.substring(0, maxLength) + "...")}
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
      {(userInfo && userInfo.userType === "criadorDeEvento") &&
          <div className="createEvent" >
            <Tooltip title="Criar evento">
              <Button component={Link} to={`newEvent`}>
                <Fab aria-label="Criar evento">
                  <AddIcon />
                </Fab>
              </Button>
            </Tooltip>
          </div>
        }
    </div>
  )
}
