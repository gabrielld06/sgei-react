import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import BuyTicketView from '../../view/BuyTicketView'
import { getUserId } from '../userInfosController/index.jsx'

export default function EventController() {
  const [eventInfo, setEventInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(0);


  const match = useMatch('/:event/sign_event');
  useEffect(() => {
    async function fetchData() {
      const eventName = match.params.event;
      await axios.post('http://127.0.0.1:5000/api/events/getEventPresentationsByName',
        { eventName }).then((response) => {
          const [eventData] = response.data;
          console.log(eventData);
          setEventInfo(eventData);
        }, (response) => {
          console.log(response);
        });
      setLoading(false);
    };
    fetchData();
  }, [])

  if (loading) {
    return (
      <h1>Loading</h1>
    )
  }

  if (!eventInfo) {
    return (
      <BuyTicketView />
    )
  }

  var { ticketsAvailable } = eventInfo;

  const handleChangeTickets = (newTicketsAvailable) => {
    let updatedValue = {};
    updatedValue["ticketsAvailable"] = newTicketsAvailable;
    setEventInfo(evtValues => ({
      ...evtValues,
      ...updatedValue
    }));
  }

  const handleBuyTicketClick = async (showAlert) => {
    if (ticketCount <= 0) {
      showAlert(0, "Erro!\nSelecione 1 ou mais ingressos!"); // Resposta 0 = Está tentando comprar 0 ou negativo ingressos
      return;
    }
    if (ticketCount > ticketsAvailable) {
      showAlert(0, `Erro!\nNão é possivel comprar mais que ${ticketsAvailable} ingressos!`); // Resposta 0 = Está tentando comprar mais ingressos que o que tem disponível
      return;
    }
    const eventId = eventInfo._id;
    const userId = getUserId();
    await axios.post('http://127.0.0.1:5000/api/tickets',
      { eventId, userId, ticketCount }).then(async (response) => {
        const data = response.data;

        const newTicketsAvailable = ticketsAvailable - ticketCount;
        handleChangeTickets(newTicketsAvailable);

        const { _id, creator, thumb, name, description, ticketPrice, location, startDate, finishDate } = eventInfo;
        ticketsAvailable = newTicketsAvailable;

        await axios.post('http://127.0.0.1:5000/api/events/updateEvent',
          { _id, thumb, name, creator, description, ticketsAvailable, ticketPrice, location, startDate, finishDate }).then(() => {
            showAlert(201, `Sucesso!\nVocê comprou ${ticketCount} ingressos no valor de R$${ticketCount * ticketPrice}`); // Resposta 200 = Sucesso (retorna até )
          }, (response) => {
            showAlert(0, "Algo deu errado :(");
          });
      }, (response) => {
        showAlert(0, "Algo deu errado :(");
      });

  }
  
  const handleTicketCount = (value) => {
    if (value > ticketsAvailable) {
      value = ticketsAvailable
    } else if (value < 0) {
      value = 0
    }
    setTicketCount(value)
  }
  return (
    <BuyTicketView
      eventInfo={eventInfo}
      handleTicketCount={handleTicketCount}
      handleBuyTicketClick={handleBuyTicketClick}
      ticketCount={ticketCount}
    />
  )
}