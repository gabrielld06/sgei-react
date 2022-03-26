import React from 'react'
import axios from 'axios'
import EventView from '../../view/EventView'


const handleSubmit = async () => {
  try {
      const { data } = await axios.get(
          "http://127.0.0.1:5000/api/events",
      );
      console.log(data);
  } catch {
      console.log('deu merda');
  }
};

export default function EventController() {
  handleSubmit();
  // code goes here
  return (
    <EventView />
  )
}
