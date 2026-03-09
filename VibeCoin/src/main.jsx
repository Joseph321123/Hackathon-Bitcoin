/**
 * Punto de entrada de la aplicación VibeCoin.
 * Monta el árbol de React en el div#root y aplica StrictMode para detectar
 * prácticas no recomendadas durante el desarrollo.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
