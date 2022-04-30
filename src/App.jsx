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
import MyEventsController from './controller/MyEventsController'
import MyPresentationsController from './controller/MyPresentationsController'
import MyTicketsController from './controller/MyTicketsController'
import NewPresentationController from './controller/NewPresentationController'
import BuyTicketController from './controller/BuyTicketController'
import GetCertificateController from './controller/GetCertificateController'
import EditEventController from "./controller/EditEventController";
import EditPresentationController from "./controller/EditPresentationController";
import UserProfileController from "./controller/UserProfileController";
import EventReportController from "./controller/EventReportController";
import PresentationReportController from "./controller/PresentationReportController";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeController />} />
        <Route path="/login" element={<LoginController />} />
        <Route path="/signup" element={<SignUpController />} />
        <Route path="/myProfile" element={<UserProfileController />} />
        <Route path="/newEvent" element={<NewEventController />} />
        <Route path="/myEvents" element={<MyEventsController />} />
        <Route path="/myPresentations" element={<MyPresentationsController />} />
        <Route path="/myTickets" element={<MyTicketsController />} />
        <Route path="/:eventName" element={<EventController />} />
        <Route path="/:eventName/edit_event" element={<EditEventController/>} />
        <Route path="/:eventName/get_certificate" element={<GetCertificateController/>} />
        <Route path="/:eventName/event_report" element={<EventReportController/>} />
        <Route path="/:eventName/sign_event" element={<BuyTicketController />} />
        <Route path="/:eventName/newPresentation" element={<NewPresentationController />} />
        <Route path="/:eventName/:presentationName" element={<PresentationController />} />
        <Route path="/:eventName/:presentationName/edit_presentation" element={<EditPresentationController />} />
        <Route path="/:eventName/:presentationName/presentation_report" element={<PresentationReportController />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
