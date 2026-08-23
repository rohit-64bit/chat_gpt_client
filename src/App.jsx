import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<div>About Us</div>} />
    </Routes>
  )
}

export default App