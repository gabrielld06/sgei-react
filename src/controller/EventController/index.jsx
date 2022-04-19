import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'
import EventView from '../../view/EventView'

export default function EventController() {
  const [eventInfo, setEventInfo] = useState();
  const [filter, setFilter] = useState();
  const [presentationList, setPresentationList] = useState();
  const [presentationShowList, setPresentationShowList] = useState();
  const [loading, setLoading] = useState(true);

  const filterPresentations = () => {
    setPresentationShowList(presentationList.filter(p => p.name.includes(filter)));
  }

  const handleChangeField = (event) => {
    setFilter(event.target.value);
  }

  const handleSearch = (event) => {
    filterPresentations();
  }
  
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
                setPresentationShowList(presentationData);
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

  return (
    <EventView
      event={eventInfo}
      loading={loading}
      presentations={presentationShowList}
      handleChangeField={handleChangeField}
      handleSearch={handleSearch}
    />
  )
}
