import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import EventView from '../../view/EventView'

export default function EventController() {
  const [eventInfo, setEventInfo] = useState();
  const [loading, setLoading] = useState(true);

  const match = useMatch('/:event');
  useEffect(() => {
    async function fetchData() {
      const filter = match.params.event;
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
      <EventView />
    )
  }

  const { name, description, presentations, location, startDate, finishDate, ticketPrice, ticketsAvailable } = eventInfo;
  return (
    <EventView
      name={name}
      description={description}
      presentations={presentations}
      location={location}
      startDate={startDate}
      finishDate={finishDate}
      ticketPrice={ticketPrice}
      ticketsAvailable={ticketsAvailable}
    />
  )
}
