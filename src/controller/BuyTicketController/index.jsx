import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import BuyTicketView from '../../view/BuyTicketView'

export default function EventController() {
  const [eventInfo, setEventInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(0);

  const match = useMatch('/:event/sign_event');
  useEffect(() => {
    async function fetchData() {
      const filter = match.params.event;
      console.log(match.params)
      await axios.post('http://127.0.0.1:5000/api/events',
        { filter }).then((response) => {
          const [data] = response.data;
          setEventInfo(data);
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
  const { name, description, presentations, location, startDate, finishDate, ticketPrice, ticketsAvailable } = eventInfo;
  // O textfield ta aceitando caracteres não-numéricos, tem que arrumar pra aceitar só numero. Mas o handle não é chamado pelo onChange quando o usuário coloca um valor que é string
  // por causa do props type='numeric' que faz as setinhas aparecerem do lado do texto
  const handleTicketCount = (value) => {
   if (value > ticketsAvailable) {
      value = ticketsAvailable
    }else if(value < 0){
      value = 0
    }
    setTicketCount(value)
  }

  console.log(presentations.length)
  return (
    <BuyTicketView
      name={name}
      description={description}
      totalPresentations={presentations.length}
      location={location}
      startDate={startDate}
      finishDate={finishDate}
      ticketPrice={ticketPrice}
      ticketsAvailable={ticketsAvailable}
      handleTicketCount={handleTicketCount}
      ticketCount={ticketCount}
    />
  )
}