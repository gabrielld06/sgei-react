import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeController from './controller/HomeController'
import EventController from './controller/EventController'
import PresentationController from './controller/PresentationController'
import LoginController from './controller/LoginController'
import SignUpController from './controller/SignUpController'
import NewEventController from './controller/NewEventController'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeController />} />
        <Route path="/login" element={<LoginController />} />
        <Route path="/signup" element={<SignUpController />} />
        <Route path="/newEvent" element={<NewEventController />} />
        <Route path="/:eventName" element={<EventController />} />
        <Route path="/:eventName/:presentationName" element={<PresentationController />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
