import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

export default function SignUpGrid(props) {
    const { handleChangeField, values, handleClickShowPassword, userType } = props;
    return (
        <Grid container >
            <Grid item xs container direction="row" justifyContent="space-evenly">
                <TextField id="UserField" label="Usuário" variant="outlined" sx={userFieldStyle} onChange={(e) => {handleChangeField(e, "username")}}/>
                <TextField id="EmailField" label="Email" variant="outlined" sx={userFieldStyle} onChange={(e) => {handleChangeField(e, "email")}}/>
                <TextField id="PasswordField" label="Senha" variant="outlined" type={values.showPassword ? "text" : "password"} sx={userFieldStyle} InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton aria-label="Mostrar senha"
                                onClick={handleClickShowPassword}
                                edge="end">
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>)
                }} onChange={(e) => {handleChangeField(e, "password")}} />
                <TextField id="RetypePasswordField" label="Digite novamente sua senha" variant="outlined" type={values.showPassword ? "text" : "password"} sx={userFieldStyle} InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton aria-label="Mostrar senha"
                                onClick={handleClickShowPassword}
                                edge="end">
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>)
                }} onChange={(e) => {handleChangeField(e, "passVer")}} />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs container direction="row" justifyContent="space-evenly">
                <TextField id="PhoneField" label="Telefone/Celular" variant="outlined" sx={userFieldStyle} onChange={(e) => {handleChangeField(e, "phone")}}/>
                <TextField id="CPFField" label={userType === 0 ? "CPF" : "CPF/CNPJ"} variant="outlined" sx={userFieldStyle} onChange={(e) => {handleChangeField(e, "cpf_cnpj")}} />
                <TextField id="CityField" label="Cidade" variant="outlined" sx={userFieldStyle} onChange={(e) => {handleChangeField(e, "city")}} />
                <TextField id="AdressField" label="Endereço" variant="outlined" sx={userFieldStyle} onChange={(e) => {handleChangeField(e, "address")}} />
            </Grid>
        </Grid>
    )
}

const userFieldStyle = {
    width: '80%',
    m: 1,
}