// =============================================================================
// Mock.test.js — PRUEBA CON UN "ESPÍA" (spy / mock)
// -----------------------------------------------------------------------------
// Un MOCK o SPY permite observar (o reemplazar) una función para saber si se
// llamó, cuántas veces y con qué argumentos.
// Aquí espiamos localStorage.setItem para comprobar que registerUser guarda
// los datos UNA sola vez y que no guarda de nuevo un usuario repetido.
// =============================================================================

// vi: el objeto de utilidades de Vitest (spies, mocks, timers falsos...).
import { describe, expect, test, vi } from 'vitest'
import { getUsers, registerUser } from '../services/userService'

describe('Persistencia de usuarios con mocks', () => {
  test('guarda un nuevo usuario sin duplicarlo ni perder los usuarios iniciales', () => {
    // Primero se llama getUsers() para que cargue los 3 usuarios iniciales
    // (eso también llama a setItem). Así no cuenta en el espía de abajo.
    getUsers()
    // vi.spyOn(objeto, 'metodo') envuelve el método para registrar sus
    // llamadas. Storage.prototype es el "molde" de localStorage y
    // sessionStorage, así que espiamos setItem de ambos.
    // El método original SIGUE funcionando (spyOn solo observa).
    const guardar = vi.spyOn(Storage.prototype, 'setItem')
    registerUser('nuevo@pokestore.cl', 'Nuevo')
    // Se guardó exactamente 1 vez...
    expect(guardar).toHaveBeenCalledTimes(1)
    // ...con la clave 'pokestore-users' y cualquier texto como valor.
    // expect.any(String) = "cualquier string" (no nos importa cuál).
    expect(guardar).toHaveBeenCalledWith('pokestore-users', expect.any(String))
    const users = JSON.parse(localStorage.getItem('pokestore-users'))
    // 3 iniciales + 1 nuevo = 4.
    expect(users).toHaveLength(4)
    // toContainEqual: el array contiene un objeto IGUAL a este
    // (compara el contenido, no si es el mismo objeto en memoria).
    expect(users).toContainEqual({ email: 'nuevo@pokestore.cl', name: 'Nuevo', blocked: false, role: 'user' })
    // Registrar el mismo correo otra vez NO debe volver a guardar:
    registerUser('nuevo@pokestore.cl', 'Otro nombre')
    expect(guardar).toHaveBeenCalledTimes(1) // sigue en 1
    // toEqual: compara contenido. La lista no cambió.
    expect(getUsers()).toEqual(users)
  })
})



