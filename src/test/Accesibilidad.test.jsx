// =============================================================================
// Accesibilidad.test.jsx — PRUEBA AUTOMÁTICA DE ACCESIBILIDAD CON jest-axe
// -----------------------------------------------------------------------------
// axe analiza el HTML generado y detecta problemas comunes de accesibilidad:
// inputs sin label, imágenes sin alt, botones sin texto, IDs repetidos, etc.
// =============================================================================

import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { axe } from 'jest-axe'
import App from '../App'

describe('Accesibilidad del inicio de sesion', () => {
  // "async" porque axe tarda un poco en analizar y devuelve una PROMESA.
  // "await" espera a que termine antes de seguir con el expect.
  test('la pagina de login no presenta infracciones detectables por axe', async () => {
    // render devuelve un objeto; con DESESTRUCTURACIÓN sacamos solo
    // "container" (el div donde se dibujó la app).
    const { container } = render(
      <MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>
    )
    const resultados = await axe(container)
    // toHaveNoViolations viene de jest-axe; se registró en setup.js.
    expect(resultados).toHaveNoViolations()
  })
})
