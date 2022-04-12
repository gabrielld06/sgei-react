import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import BuyTicketView from '../../view/BuyTicketView'

export default function EventController() {
  const [eventInfo, setEventInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(0);
  const [presentationList, setPresentationList] = useState();


  const match = useMatch('/:event/sign_event');
  useEffect(() => {
    async function fetchData() {
      const filter = match.params.event;
      await axios.post('http://127.0.0.1:5000/api/events', // Get events
        { filter }).then(async (response) => {
          const [data] = response.data;

          if (data) {
            setEventInfo(data);
            const filterEvent = data._id;
            await axios.post('http://127.0.0.1:5000/api/presentations', // Get presentations
              { filterEvent }).then((response) => {
                const presentationData = response.data;

                setPresentationList(presentationData);
              }, (response) => {
                console.log(response);
              });
          }
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
  const { name, description, location, startDate, finishDate, ticketPrice, ticketsAvailable } = eventInfo;

  const handleBuyTicketClick = async (showAlert) => {
    if (ticketCount <= 0) {
      showAlert(0, "Erro!\nSelecione 1 ou mais ingressos!"); // Resposta 0 = Está tentando comprar 0 ou negativo ingressos
      return;
    }
    if (ticketCount > ticketsAvailable) {
      showAlert(0, `Erro!\nNão é possivel comprar mais que ${ticketsAvailable} ingressos!`); // Resposta 0 = Está tentando comprar mais ingressos que o que tem disponível
      return;
    }
    const event = eventInfo._id;
    const field = "ticketsAvailable";
    const update = ticketsAvailable - ticketCount;
    await axios.post('http://127.0.0.1:5000/api/events/updateEvent',
      { event, field, update }).then(() => {
        showAlert(201, `Sucesso!\nVocê comprou ${ticketCount} ingressos no valor de R$${ticketCount * ticketPrice}`); // Resposta 200 = Sucesso (retorna até )
      }, (response) => {
        console.log(response);
      });
  }
  // O textfield ta aceitando caracteres não-numéricos, tem que arrumar pra aceitar só numero. Mas o handle não é chamado pelo onChange quando o usuário coloca um valor que é string
  // por causa do props type='numeric' que faz as setinhas aparecerem do lado do texto
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
      name={name}
      description={description}
      totalPresentations={presentationList.length}
      location={location}
      startDate={startDate}
      finishDate={finishDate}
      ticketPrice={ticketPrice}
      ticketsAvailable={ticketsAvailable}
      handleTicketCount={handleTicketCount}
      handleBuyTicketClick={handleBuyTicketClick}
      ticketCount={ticketCount}
    />
  )
}