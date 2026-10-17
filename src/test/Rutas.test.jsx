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

  test('carga correctamente la ruta mi cuenta', () => {
    render(
      <MemoryRouter initialEntries={['/mi-cuenta']}>
        <App />
      </MemoryRouter>
    )

    expect(document.body).toBeInTheDocument()
  })

})