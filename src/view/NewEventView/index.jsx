import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './styles.css';
import { Link } from 'react-router-dom';
import SignUpGrid from '../../components/SignUpGrid'
import TabPanel from '../../components/TabPanel'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Header from '../../components/Header'
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import SupimpaLogo from '../../assets/supimpa.png'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function NewEventView(props) {
    const { handleChangeField, setUserValues, values, handleClickShowPassword, handleChangeIndex, handleSubmit } = props;
    const theme = useTheme();
    const [showAlert, setShowAlert] = React.useState(false);
    const [signUpStatus, setSignUpStatus] = React.useState();
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleShowAlert = (message) => {
        setSignUpStatus(message);
        console.log(message);
        setShowAlert(true)
    }
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };
    return (
        <div>
            <Header />
            <div className='boxStyle'>
                <Box sx={boxStyle}>
                    <Grid container >
                        <CardMedia
                            component="img"
                            sx={{ maxHeight: '250px' }}
                            image={SupimpaLogo}
                            alt="green iguana"
                        />
                        <Grid item xs container direction="row" justifyContent="space-evenly">
                            <TextField id="name" label="Nome do evento" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "name") }} />
                            <TextField id="description" label="Descrição do evento" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "description") }} />
                            <TextField id="tickets-available" label="Quantidade de ingressos disponíveis" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "ticket-available") }} />
                            <TextField id="tickets-price" label="Preço dos ingressos" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "tickets-price") }} />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs container direction="column" >
                            <TextField id="local" label="Local" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "local") }} />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Data e hora de início"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField sx={userFieldStyle} {...params} />}
                                />
                                 <DateTimePicker
                                    label="Data e hora de término"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField sx={userFieldStyle} {...params} />}
                                />
                            </LocalizationProvider>
                            <Button variant="contained" sx={{ m: 2 }} component={Link} to="/signup" onClick={() => { handleSubmit(handleShowAlert); }} >Adicionar produto</Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

const boxStyle = {
    width: 750,
    backgroundColor: 'white',
    boxShadow: 15,
    borderRadius: 5,
}


const userFieldStyle = {
    width: '80%',
    m: 1,
}