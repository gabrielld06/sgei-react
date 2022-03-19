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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function SignUpView(props) {
    const { values, handleClickShowPassword, tabValues, handleChange, handleChangeIndex } = props;
    const theme = useTheme();

    return (
        <div className='boxStyle'>
            <Box sx={ boxStyle }>
                <AppBar position="static" sx={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Tabs
                    value={tabValues}
                    onChange={handleChange}
                    TabIndicatorProps={{style: {background:'black'}}}
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
                    index={tabValues}
                    onChangeIndex={handleChangeIndex}>
                    <TabPanel value={tabValues} index={0} dir={theme.direction}>
                        <SignUpGrid values={values} handleClickShowPassword={handleClickShowPassword} userType={0} />
                    </TabPanel>
                    <TabPanel value={tabValues} index={1} dir={theme.direction}>
                        <SignUpGrid values={values} handleClickShowPassword={handleClickShowPassword} userType={1} />
                    </TabPanel>
                    <TabPanel value={tabValues} index={2} dir={theme.direction}>
                        <SignUpGrid values={values} handleClickShowPassword={handleClickShowPassword} userType={2} />
                    </TabPanel>
                </SwipeableViews>
                <Button variant="contained" sx={{ m: 2 }} component={Link} to="/signup" >Cadastre-se</Button>
            </Box>
        </div>
    );
}

const boxStyle = {
    width: 750,
    backgroundColor: 'white',
    boxShadow: 15,
    borderRadius: 5,
}