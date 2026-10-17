import { render } from '@testing-library/react'
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

    expect(document.body).toBeInTheDocument()
  })
})