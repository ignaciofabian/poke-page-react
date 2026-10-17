import { describe, expect, test } from 'vitest'
import { authenticateUser } from '../services/userService'

describe('Validacion real de credenciales', () => {
  test('acepta el correo registrado normalizando espacios y mayusculas', () => {
    expect(authenticateUser('  IGNACIO@POKESTORE.CL  ', '123456')).toMatchObject({
      email: 'ignacio@pokestore.cl', name: 'Ignacio', role: 'user',
    })
  })

  test('rechaza una contrasena incorrecta para un usuario registrado', () => {
    expect(authenticateUser('bryan@pokestore.cl', 'incorrecta')).toBeNull()
  })

  test('rechaza un correo desconocido y las credenciales vacias', () => {
    expect(authenticateUser('desconocido@pokestore.cl', '123456')).toBeNull()
    expect(authenticateUser('', '')).toBeNull()
  })
})
