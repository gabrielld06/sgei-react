// import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import HomeController from './controller/HomeController'
import EventController from './controller/EventController'
import PresentationController from './controller/PresentationController'
import LoginController from './controller/LoginController'
import SignUpController from './controller/SignUpController'
import NewEventController from './controller/NewEventController'
import MyEventsConstroller from './controller/MyEventsController'
import NewPresentationController from './controller/NewPresentationController'
import BuyTicketController from './controller/BuyTicketController'
import EditEventController from "./controller/EditEventController";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeController />} />
        <Route path="/login" element={<LoginController />} />
        <Route path="/signup" element={<SignUpController />} />
        <Route path="/newEvent" element={<NewEventController />} />
        <Route path="/myEvents" element={<MyEventsConstroller />} />
        <Route path="/:eventName/edit_event" element={<EditEventController/>} />
        <Route path="/:eventName" element={<EventController />} />
        <Route path="/:eventName/sign_event" element={<BuyTicketController />} />
        <Route path="/:eventName/newPresentation" element={<NewPresentationController />} />
        <Route path="/:eventName/:presentationName" element={<PresentationController />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
