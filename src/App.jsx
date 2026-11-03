import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import ResetPass from './pages/ResetPass'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const App = () => {

  useEffect(() => {
    const clientID = localStorage.getItem('clientID');
    if (!clientID) {
      localStorage.setItem('clientID', uuidv4());
    }
  }, [localStorage.getItem('clientID')]);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/reset-pass" element={<ResetPass />} />
      <Route path="/" element={<Home />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  )
}

export default App