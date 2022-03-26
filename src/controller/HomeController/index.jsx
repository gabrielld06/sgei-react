import React from 'react'
import axios from 'axios'
import HomeView from '../../view/HomeView'

export default function HomeController() {
  const [eventList, setEventList] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  // React.useEffect(() => {
  //   Promise.all([
  //     fetch('http://127.0.0.1:5000/api/events'),
  //   ]).then(async (responses) => {
  //     const [eventResponse] = responses;

  //     if (eventResponse.status === 404) {
  //       setEventList({ error: 'User not found!' });
  //       return;
  //     }

  //     const events = await eventResponse.json();
  //     setEventList(events);
  //     console.log(events);
  //   });
  // }, []);

  const getEvents = () => {
    axios.post('http://127.0.0.1:5000/api/events',
      { filter }).then((response) => {
        setEventList(response.data);
        console.log(eventList);
      });
  }

  const handleChangeField = (event) => {
    setFilter(event.target.value);
  }

  const handleSearch = (event) => {
    getEvents();
  }

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <HomeView
      eventList={eventList}
      handleChangeField={handleChangeField}
      handleSearch={handleSearch} />
  )
}
