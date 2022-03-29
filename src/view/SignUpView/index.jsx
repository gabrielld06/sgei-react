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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function SignUpView(props) {
    const { handleChangeField, setUserValues, values, handleClickShowPassword, handleChange, handleChangeIndex, handleSubmit } = props;
    const theme = useTheme();
    const [showAlert, setShowAlert] = React.useState(false);
    const [signUpStatus, setSignUpStatus] = React.useState();

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
                    <AppBar position="static" sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <Tabs
                            value={values.tabValues}
                            onChange={handleChange}
                            TabIndicatorProps={{ style: { background: 'black' } }}
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="escolha seu usuário"
                        >
                            <Tab label="seja um espectador" {...a11yProps(0)} />
                            <Tab label="divulgue seus eventos" {...a11yProps(1)} />
                            <Tab label="publique suas apresentações" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={values.tabValues}
                        onChangeIndex={handleChangeIndex}>
                        <TabPanel value={values.tabValues} index={0} dir={theme.direction}>
                            <SignUpGrid setUserValues={setUserValues} handleChangeField={handleChangeField} values={values} handleClickShowPassword={handleClickShowPassword} userType={0} />
                        </TabPanel>
                        <TabPanel value={values.tabValues} index={1} dir={theme.direction}>
                            <SignUpGrid setUserValues={setUserValues} handleChangeField={handleChangeField} values={values} handleClickShowPassword={handleClickShowPassword} userType={1} />
                        </TabPanel>
                        <TabPanel value={values.tabValues} index={2} dir={theme.direction}>
                            <SignUpGrid setUserValues={setUserValues} handleChangeField={handleChangeField} values={values} handleClickShowPassword={handleClickShowPassword} userType={2} />
                        </TabPanel>
                    </SwipeableViews>
                    <Button variant="contained" sx={{ m: 2 }} component={Link} to="/signup" onClick={() => { handleSubmit(handleShowAlert); }} >Cadastre-se</Button>
                </Box>
                <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
                    {signUpStatus === 201
                        ? <Alert severity="success">Cadastro feito com sucesso!</Alert>
                        : <Alert severity="error">Falha ao fazer cadastro, verifique os campos!</Alert>}
                </Snackbar>
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