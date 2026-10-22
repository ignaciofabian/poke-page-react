// =============================================================================
// setup.js — CONFIGURACIÓN COMÚN DE LOS TESTS
// -----------------------------------------------------------------------------
// vite.config.js lo indica en "setupFiles", así que se ejecuta antes de cada
// archivo de test. Sirve para agregar "matchers" extra a expect.
// Un MATCHER es la verificación que va después de expect(...):
//   expect(x).toBe(3)   <- toBe es un matcher
// =============================================================================

// Agrega matchers para el DOM, por ejemplo:
//   toBeInTheDocument(), toHaveValue(), toHaveAttribute('href', '/cartas')
import '@testing-library/jest-dom'
import { expect } from 'vitest'
// jest-axe revisa problemas de ACCESIBILIDAD (imágenes sin alt, inputs sin
// label, etc.). Aquí registramos su matcher toHaveNoViolations().
import { toHaveNoViolations } from 'jest-axe'

// expect.extend agrega matchers nuevos a expect.
expect.extend(toHaveNoViolations)
