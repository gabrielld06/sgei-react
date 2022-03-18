import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:eventName" element={<Eventos />}/>
        <Route path="/:eventName/:presentationName" element={<Apresentacoes />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
