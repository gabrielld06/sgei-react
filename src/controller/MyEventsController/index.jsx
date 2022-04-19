import React from 'react'
import axios from 'axios'
import MyEventsView from '../../view/MyEventsView'
import { getUserId } from '../userInfosController';

export default function HomeController() {
  const [myEventList, setMyEventList] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const getMyEvents = () => {
      const userId = getUserId();
    axios.post('http://127.0.0.1:5000/api/events/getUserEvents',
      { userId, filter }).then((response) => {
        setMyEventList(response.data);
      }, (response) => {
        console.log(response);
      });
  }

  const handleChangeField = (event) => {
    setFilter(event.target.value);
  }

  const handleSearch = (event) => {
    getMyEvents();
  }

  React.useEffect(() => {
    const userId = getUserId();
    axios.post('http://127.0.0.1:5000/api/events/getUserEvents',
      { userId, filter }).then((response) => {
        setMyEventList(response.data);
      }, (response) => {
        console.log(response);
      });
  }, []);

  return (
    <MyEventsView
      myEventList={myEventList}
      handleChangeField={handleChangeField}
      handleSearch={handleSearch} />
  )
}