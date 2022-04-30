import React from 'react'
import axios from 'axios'
import MyTicketsView from '../../view/MyTicketsView'
import { getUserId } from '../userInfosController';
import mongoose from 'mongoose'

export default function MyTicketsController() {
    const [myTicketList, setMyTicketList] = React.useState([]);
    const [filter, setFilter] = React.useState("");

    const handleChangeField = (event) => {
        setFilter(event.target.value);
    }

    // TODO:PODE TIRAR
    const handleSearch = (event) => {

    }

    React.useEffect(() => {
        const userId = getUserId();

        axios.post('http://127.0.0.1:5000/api/tickets/getUserTickets',
            { userId }).then((response) => {
                console.log(response.data);
                setMyTicketList(response.data);
            }, (response) => {
                console.log(response);
            });
    }, []);

    return (
        <MyTicketsView
            myTicketList={myTicketList}
            handleChangeField={handleChangeField}
            handleSearch={handleSearch}
            filter={filter} />
    )
}