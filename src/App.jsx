import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import ResetPass from './pages/ResetPass'
import Home from './pages/Home'
import Chat from './pages/Chat'

const App = () => {
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