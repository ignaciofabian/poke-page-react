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

    expect(screen.getByRole('heading', { name: 'Cartas destacadas' })).toBeInTheDocument()
  })

  test('carga correctamente la ruta de login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'INICIAR SESIÓN' })).toBeInTheDocument()
  })

  test('redirige mi cuenta al login cuando no hay sesión', () => {
    render(
      <MemoryRouter initialEntries={['/mi-cuenta']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: 'INICIAR SESIÓN' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Mi cuenta' })).not.toBeInTheDocument()
  })

})
