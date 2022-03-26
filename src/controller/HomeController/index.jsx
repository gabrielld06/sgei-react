import React from 'react'
import axios from 'axios'
import HomeView from '../../view/HomeView'

export default function HomeController() {
  const [eventList, setEventList] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      fetch(`http://127.0.0.1:5000/api/events`),
    ]).then(async (responses) => {
      const [eventResponse, setEventResponse] = responses;

      if (eventResponse.status === 404) {
        setEventList({ error: 'User not found!' });
        return;
      }

      const events = await eventResponse.json();
      setEventList(events);
      console.log(events);
    });
  }, eventList);

  return (
    <HomeView eventList={eventList} />
  )
}
