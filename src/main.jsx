import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router'

import { Inicio } from './pages/Inicio.jsx'
import { Login } from './pages/Login.jsx'
import { Cartas } from './pages/Cartas.jsx'
import { Nosotros } from './pages/Nosotros.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>

        <Route
          path='/'
          element={<Inicio />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cartas"
          element={<Cartas />}
        />

        <Route
          path="/nosotros"
          element={<Nosotros />}
        />

      </Routes>

    </BrowserRouter>
  </StrictMode>
)
