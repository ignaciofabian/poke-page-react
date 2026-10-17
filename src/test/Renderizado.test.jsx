import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router'
import App from '../App'

describe('Renderizado de PokéStore', () => {
  test('renderiza la aplicación correctamente', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'PokéStore', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cartas destacadas' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Tu tienda de cartas Pokémon')
  })
})
