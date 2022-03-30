import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import './styles.css';
import { Link } from 'react-router-dom';
import Supimpa from '../../assets/supimpa.png'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Header from '../../components/Header'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginView(props) {
    const { values, handleClickShowPassword, handleChangeField, handleSubmit, userInfos } = props;
    const [showAlert, setShowAlert] = React.useState(false);
    const [loginStatus, setLoginStatus] = React.useState();

    const handleShowAlert = (message) => {
        setLoginStatus(message);
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
                    <img src={Supimpa} style={{ paddingTop: 10 }} alt="Logo"></img>
                    <Stack direction="column"
                        alignItems="center">
                        <TextField id="UserField" label="Usuário" variant="outlined" sx={userFieldStyle} onChange={(e) => { handleChangeField(e, "username") }} />
                        <TextField id="PasswordField" label="Senha" variant="outlined" type={values.showPassword ? "text" : "password"} sx={userFieldStyle} InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton aria-label="Mostrar senha"
                                        onClick={handleClickShowPassword}
                                        edge="end">
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>)
                        }} onChange={(e) => { handleChangeField(e, "password") }} />
                        <Link to={`/forgetPassword`}> <FormHelperText sx={{ m: -1, width: 150, paddingLeft: "95%" }}>Esqueceu a senha?</FormHelperText></Link>
                        <Button variant="contained" sx={{ width: '40%', m: 3 }} onClick={() => { handleSubmit(handleShowAlert); }} >Entrar</Button>
                        <Divider sx={{ width: '95%' }} light style={{ color: 'gray' }}>ou</Divider>
                        <Button variant="outlined" sx={{ width: '40%', m: 3 }} component={Link} to="/signup" >Cadastre-se</Button>
                    </Stack>
                </Box>
                <Snackbar open={showAlert} onClose={handleAlertClose} autoHideDuration={3000}>
                    {loginStatus === 201
                        ? <Alert severity="success">Login feito com sucesso!</Alert>
                        : <Alert severity="error">Usuário ou senha incorretos!</Alert>}
                </Snackbar>
            </div>
        </div>
    )
}

const boxStyle = {
    width: 500,
    height: 500,
    backgroundColor: 'white',
    boxShadow: 15,
    borderRadius: 5,
}

const userFieldStyle = {
    width: '69%',
    m: 1,
}