// =============================================================================
// main.jsx — PUNTO DE ENTRADA DE LA APLICACIÓN
// -----------------------------------------------------------------------------
// Es el primer archivo de JavaScript que se ejecuta. El navegador abre
// index.html, que tiene un <div id="root"></div> vacío y carga este archivo.
// Aquí le decimos a React: "dibuja toda la aplicación dentro de ese div".
//
// En la versión HTML original cada página era un archivo .html distinto.
// Ahora hay UNA sola página HTML (por eso se llama SPA: Single Page
// Application) y React cambia el contenido según la URL.
// =============================================================================

// "import { X } from 'paquete'" trae algo que otro archivo/paquete exportó.
// Las llaves { } significan que importamos una exportación con NOMBRE
// (export const / export function). Sin llaves (como "App" más abajo)
// importamos la exportación POR DEFECTO (export default).
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
// Importar un .css desde JS hace que Vite lo agregue a la página.
import './index.css'

// 1. document.getElementById('root') busca el <div id="root"> de index.html.
// 2. createRoot(...) prepara ese div para que React lo controle.
// 3. .render(...) dibuja dentro el JSX que le pasamos.
createRoot(document.getElementById('root')).render(
  // StrictMode: modo de desarrollo que avisa de errores comunes en consola.
  // No dibuja nada visible y no afecta la versión publicada.
  <StrictMode>
    {/* BrowserRouter activa React Router: lee la URL del navegador
        (ej: /cartas) y permite que <Routes> elija qué página mostrar.
        Todo lo que use rutas (Link, useNavigate, etc.) debe estar DENTRO
        de un Router. En los tests se usa MemoryRouter en su lugar. */}
    <BrowserRouter>
      {/* App es el componente raíz: contiene el estado global y las rutas. */}
      <App />
    </BrowserRouter>
  </StrictMode>
)
