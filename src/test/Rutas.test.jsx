// =============================================================================
// Rutas.test.jsx — LAS RUTAS PRINCIPALES CARGAN SIN ERRORES
// -----------------------------------------------------------------------------
// Con MemoryRouter + initialEntries simulamos que el usuario entra
// directamente a cada URL. Cada test dibuja la App en una ruta distinta.
// =============================================================================

import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router'
import App from '../App'

describe('Rutas de PokéStore', () => {

  test('carga correctamente la ruta de inicio', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(document.body).toBeInTheDocument()
  })

  test('carga correctamente la ruta de login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    )

    expect(document.body).toBeInTheDocument()
  })

  // Sin sesión, /mi-cuenta redirige a /login (<Navigate> en MiCuenta.jsx).
  // El test comprueba que esa redirección no rompe la app.
  test('carga correctamente la ruta mi cuenta', () => {
    render(
      <MemoryRouter initialEntries={['/mi-cuenta']}>
        <App />
      </MemoryRouter>
    )

    expect(document.body).toBeInTheDocument()
  })

  // Idea para mejorar: verificar contenido real de cada ruta, por ejemplo
  //   expect(screen.getByRole('button', { name: 'INICIAR SESIÓN' })).toBeInTheDocument()
  // ("screen" ya está importado para eso).

})
