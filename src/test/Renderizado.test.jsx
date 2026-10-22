// =============================================================================
// Renderizado.test.jsx — PRUEBA DE HUMO ("smoke test")
// -----------------------------------------------------------------------------
// Verifica lo mínimo: que la app completa se pueda dibujar sin lanzar errores.
// Si algún componente tuviera un error grave, render() fallaría y el test
// quedaría en rojo.
// =============================================================================

// render: dibuja un componente dentro del navegador simulado (jsdom).
import { render } from '@testing-library/react'
// describe: agrupa tests relacionados bajo un nombre.
// test (o su alias "it"): define UN caso de prueba (nombre + función).
// expect: hace una verificación; si no se cumple, el test falla.
import { describe, expect, test } from 'vitest'
// MemoryRouter: un Router que guarda la URL en memoria en vez de usar la
// barra del navegador. Ideal para tests: initialEntries indica en qué URL
// "empieza" la app. (main.jsx usa BrowserRouter; aquí lo reemplazamos.)
import { MemoryRouter } from 'react-router'
import App from '../App'

describe('Renderizado de PokéStore', () => {
  test('renderiza la aplicación correctamente', () => {
    // App usa hooks de React Router (useNavigate, useLocation), por eso
    // DEBE estar dentro de un Router; si no, lanzaría un error.
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    // Verificación muy básica: el body existe. Lo importante es que render()
    // no haya fallado.
    expect(document.body).toBeInTheDocument()
  })
})
