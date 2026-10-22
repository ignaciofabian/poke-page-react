// =============================================================================
// Validaciones.test.js — PRUEBAS UNITARIAS DE authenticateUser
// -----------------------------------------------------------------------------
// PRUEBA UNITARIA: prueba UNA función aislada, sin dibujar pantallas.
// Por eso el archivo es .js y no .jsx (no hay JSX).
// Patrón típico: llamar a la función con ciertos datos (entrada) y verificar
// con expect lo que devuelve (salida esperada).
// =============================================================================

import { describe, expect, test } from 'vitest'
import { authenticateUser } from '../services/userService'

describe('Validacion real de credenciales', () => {
  test('acepta el correo registrado normalizando espacios y mayusculas', () => {
    // toMatchObject: el resultado debe TENER al menos estas propiedades
    // (puede tener otras más, como password o blocked).
    expect(authenticateUser('  IGNACIO@POKESTORE.CL  ', '123456')).toMatchObject({
      email: 'ignacio@pokestore.cl', name: 'Ignacio', role: 'user',
    })
  })

  test('rechaza una contrasena incorrecta para un usuario registrado', () => {
    // toBeNull: el resultado debe ser exactamente null.
    expect(authenticateUser('bryan@pokestore.cl', 'incorrecta')).toBeNull()
  })

  test('rechaza un correo desconocido y las credenciales vacias', () => {
    // Un test puede tener varios expect: TODOS deben cumplirse.
    expect(authenticateUser('desconocido@pokestore.cl', '123456')).toBeNull()
    expect(authenticateUser('', '')).toBeNull()
  })
})
