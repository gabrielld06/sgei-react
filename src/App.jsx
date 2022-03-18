// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Header from './components/Header'
import HomeController from './controller/HomeController'
import EventController from './controller/EventController'
import PresentationController from './controller/PresentationController'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeController />}/>
        {/* <Route path="/login" element={<LoginController />}/> */}
        <Route path="/:eventName" element={<EventController />}/>
        <Route path="/:eventName/:presentationName" element={<PresentationController />}/>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
