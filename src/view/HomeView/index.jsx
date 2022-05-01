import { useMediaQuery, Card, CardActions, CardContent, CardMedia, Button, Fab, Typography, Grid, Divider, Box, TextField, InputAdornment, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

export default function HomeView(props) {
  const { eventList, handleChangeField, handleSearch } = props;
  const matches = useMediaQuery('(min-width:768px)');
  const [userInfo, setUserInfo] = React.useState();
  
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
                    src={item.thumb === "" ? SupimpaLogo : item.thumb}
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
