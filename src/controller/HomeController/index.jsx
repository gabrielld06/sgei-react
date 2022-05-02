import React from 'react'
import axios from 'axios'
import HomeView from '../../view/HomeView'

export default function HomeController() {
  const [eventList, setEventList] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const handleChangeField = (event) => {
    setFilter(event.target.value);
  }

  React.useEffect(() => {
    axios.post('http://127.0.0.1:5000/api/events',
      { filter }).then((response) => {
        setEventList(response.data);
      }, (response) => {
        console.log(response);
      });
  }, []);

  return (
    <HomeView
      eventList={eventList}
      handleChangeField={handleChangeField}
      filter={filter} />
  )
}