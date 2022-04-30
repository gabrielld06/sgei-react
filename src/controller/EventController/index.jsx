import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import EventView from '../../view/EventView'

export default function EventController() {
  const [eventInfo, setEventInfo] = useState();
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChangeField = (event) => {
    setFilter(event.target.value);
  }

  const match = useMatch('/:event');

  useEffect(() => {
    async function fetchData() {
      const eventName = match.params.event;
      await axios.post('http://127.0.0.1:5000/api/events/getEventPresentationsByName', // Get presentations
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

  return (
    <EventView
      event={eventInfo}
      loading={loading}
      filter={filter}
      handleChangeField={handleChangeField}
    />
  )
}
