// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Header from './components/Header'
import HomeController from './controller/HomeController'
import EventController from './controller/EventController'
import PresentationController from './controller/PresentationController'
import LoginController from './controller/LoginController'
import SignUpController from './controller/SignUpController'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeController />}/>
        <Route path="/login" element={<LoginController />}/>
        <Route path="/signup" element={<SignUpController />}/>
        <Route path="/:eventName" element={<EventController />}/>
        <Route path="/:eventName/:presentationName" element={<PresentationController />}/>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
