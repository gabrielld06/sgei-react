import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import EventView from '../../view/EventView'

export default function EventController() {
  const [eventInfo, setEventInfo] = useState();
  const [presentationList, setPresentationList] = useState();
  const [loading, setLoading] = useState(true);

  const match = useMatch('/:event');
  useEffect(() => {
    async function fetchData() {
      const filter = match.params.event;
      await axios.post('http://127.0.0.1:5000/api/events', // Get events
        { filter }).then(async (response) => {
          const [data] = response.data;

          if(data) {
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
      <EventView />
    )
  }

  const { name, description, location, startDate, finishDate, ticketPrice, ticketsAvailable } = eventInfo;
  return (
    <EventView
      name={name}
      description={description}
      presentations={presentationList}
      location={location}
      startDate={startDate}
      finishDate={finishDate}
      ticketPrice={ticketPrice}
      ticketsAvailable={ticketsAvailable}
    />
  )
}
