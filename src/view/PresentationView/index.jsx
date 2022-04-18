import React from 'react'
import { CardMedia, Box } from '@mui/material'
import SupimpaLogo from '../../assets/supimpa.png'
import Header from '../../components/Header'
import './styles.css'

export default function PresentationView(props) {

  const { name,seatsAvailable,theme,location,date,duration } = props;

  const sDate = new Date(date);
  return (
    <div>
      <Header/>
      <Box className='presentationBox'>
          <CardMedia
            component="img"
            alt="evento"
            width="100%"
            height="140"
            // sx={{border : 1 }}
            src={SupimpaLogo}
          />
          <div className='presentationCardInfo'>
            <div className='presentationCardInfoBreak'>
              <h3 className='presentationInfo'>{name}</h3>
            </div>
            <div className='presentationCardInfoBreak'>
              <p className='presentationInfo'>{theme}</p>
            </div>
            <div className='presentationCardInfoBreak'>
              <p className='presentationInfo'>Local: {location}</p>
            </div>
            <div className='presentationCardInfoBreak'>
              <p className='presentationInfo'>Assentos disponíveis: {seatsAvailable}</p>
            </div>
            <div className='presentationCardInfoBreak'>
              <p className='presentationInfo'>Inicio: {
                ("0" + sDate.getUTCDate()).slice(-2) + "/" + ("0" + (sDate.getUTCMonth() + 1)).slice(-2) + "/" + sDate.getUTCFullYear()
              }</p>
              <p className='presentationInfo'>Duração: {duration} min</p>
            </div>
          </div>
        </Box>
    </div>
  )
}
