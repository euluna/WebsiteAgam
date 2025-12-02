// src/main.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
// FIX: Change BrowserRouter to HashRouter for GitHub Pages compatibility
import { HashRouter } from 'react-router-dom' 
import App from './App'
import { CartProvider } from './contexts/CartContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <HashRouter> {/* FIX: Use HashRouter here */}
        <App />
      </HashRouter>
    </CartProvider>
  </React.StrictMode>
)