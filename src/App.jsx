import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Chat from './pages/Chat'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<div>About Us</div>} />
    </Routes>
  )
}

export default App