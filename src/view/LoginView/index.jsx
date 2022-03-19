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
import { borderRadius } from '@mui/system';



export default function LoginView(props) {
    const { values, handleClickShowPassword } = props;
    return (
        <div className='boxStyle'>
            <Box sx={boxStyle}>
                <img src='https://cdn.discordapp.com/attachments/906606035454791720/954543121675460618/supimpa.png' style={{paddingTop:10}}></img>
                <Stack direction="column"
                    alignItems="center">
                    <TextField id="UserField" label="Usuário" variant="outlined" sx={userFieldStyle} />
                    <TextField id="PasswordField" label="Senha" variant="outlined" type={values.showPassword ? "text" : "password"} sx={userFieldStyle} InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton aria-label="Mostrar senha"
                                    onClick={handleClickShowPassword}
                                    edge="end">
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>)
                    }} />
                    <Link to={`/cadastrar`}> <FormHelperText on sx={{m: -1, width: 150, paddingLeft: "95%"}}>Esqueceu a senha?</FormHelperText></Link>
                    <Button variant="contained" sx={{ width: '40%', m: 3 }} >Entrar</Button>
                    <Divider sx={{width: '95%'}} light style={{color:'gray'}}>ou</Divider>
                    <Button variant="outlined" sx={{ width: '40%', m: 3 }} >Cadastre-se</Button>
                </Stack>
            </Box>
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