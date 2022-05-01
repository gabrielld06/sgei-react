import React from 'react'
import axios from 'axios'
import MyEventsView from '../../view/MyEventsView'
import { getUserId } from '../userInfosController';
import mongoose from 'mongoose'

export default function MyEventsController() {
  const [myEventList, setMyEventList] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const handleChangeField = (event) => {
    setFilter(event.target.value);
  }

  React.useEffect(() => {
    const userId = mongoose.Types.ObjectId(getUserId());
    
    axios.post('http://127.0.0.1:5000/api/events/getUserEvents',
      { userId }).then((response) => {
        setMyEventList(response.data);
      }, (response) => {
        console.log(response);
      });
  }, []);

  return (
    <MyEventsView
      myEventList={myEventList}
      handleChangeField={handleChangeField}
      filter={filter} />
  )
}