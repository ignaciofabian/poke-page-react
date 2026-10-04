import './App.css'

import { Routes, Route } from 'react-router-dom';

import { Inicio } from './pages/Inicio'

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Inicio />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

    </Routes>




  )
}

export default App
