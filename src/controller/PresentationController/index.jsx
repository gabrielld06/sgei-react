import React from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'

import PresentationView from '../../view/PresentationView'

export default function PresentationController() {
  const [presentationInfo, setPresentationInfo] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const match = useMatch('/:event/:presentation');
  React.useEffect(() => {
    async function fetchData() {
        const eventName = match.params.event;
        await axios.post('http://127.0.0.1:5000/api/events/getEventByName',
            { eventName }).then(async (response) => {
                const [eventData] = response.data;
                const event = eventData._id;
                const presentationName = match.params.presentation;    
                await axios.post('http://127.0.0.1:5000/api/presentations/getPresentationByNameAndEvent',
                    { event, presentationName }).then((response) => {
                      const [presentationData] = response.data;
                      setPresentationInfo(presentationData);
                    }, (response) => {
                        console.log(response);
                    });
            }, (response) => {
                console.log(response);
            });
        setLoading(false);
    };
    fetchData();
}, [])

  if (loading) {
    return (<h1>Loading</h1>);
  }

  return (
    <PresentationView
      presentationInfo={presentationInfo} />
  )
}