import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { axe } from 'jest-axe'
import App from '../App'

describe('Accesibilidad del inicio de sesion', () => {
  test('la pagina de login no presenta infracciones detectables por axe', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>
    )
    const resultados = await axe(container)
    expect(resultados).toHaveNoViolations()
  })
})
