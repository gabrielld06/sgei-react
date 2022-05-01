import React from 'react'
import axios from 'axios'
import MyPresentationsView from '../../view/MyPresentationsView'
import { getUserId } from '../userInfosController';
import mongoose from 'mongoose'

export default function MyEventsController() {
  const [myPresentationList, setMyPresentationList] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const handleChangeField = (event) => {
    setFilter(event.target.value);
  }

  React.useEffect(() => {
    const userId = getUserId();

    axios.post('http://127.0.0.1:5000/api/presentations/getUserPresentations',
      { userId }).then((response) => {
        setMyPresentationList(response.data);
      }, (response) => {
        console.log(response);
      });
  }, []);

  return (
    <MyPresentationsView
      myPresentationList={myPresentationList}
      handleChangeField={handleChangeField}
      filter={filter} />
  )
}