import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import MessageGenerator from './pages/MessageGenerator'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/message" element={<MessageGenerator />} />
    </Routes>
  )
}

export default App
