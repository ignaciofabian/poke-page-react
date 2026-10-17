import { describe, expect, test, vi } from 'vitest'
import { getUsers, registerUser } from '../services/userService'

describe('Persistencia de usuarios con mocks', () => {
  test('guarda un nuevo usuario sin duplicarlo ni perder los usuarios iniciales', () => {
    getUsers()
    const guardar = vi.spyOn(Storage.prototype, 'setItem')
    registerUser('nuevo@pokestore.cl', 'Nuevo')
    expect(guardar).toHaveBeenCalledTimes(1)
    expect(guardar).toHaveBeenCalledWith('pokestore-users', expect.any(String))
    const users = JSON.parse(localStorage.getItem('pokestore-users'))
    expect(users).toHaveLength(4)
    expect(users).toContainEqual({ email: 'nuevo@pokestore.cl', name: 'Nuevo', blocked: false, role: 'user' })
    registerUser('nuevo@pokestore.cl', 'Otro nombre')
    expect(guardar).toHaveBeenCalledTimes(1)
    expect(getUsers()).toEqual(users)
  })
})



