// =============================================================================
// Usuarios.test.jsx — PRUEBAS DE INTEGRACIÓN DEL LOGIN Y LOS USUARIOS
// -----------------------------------------------------------------------------
// PRUEBA DE INTEGRACIÓN: se dibuja la App COMPLETA y se simula lo que haría
// un usuario real (escribir en inputs, hacer clic) para comprobar que varias
// piezas funcionan juntas: Login.jsx + App.jsx + userService.js + storage.
// =============================================================================

// beforeEach / afterEach: "hooks" de Vitest (no confundir con hooks de React).
//   beforeEach -> se ejecuta ANTES de cada test
//   afterEach  -> se ejecuta DESPUÉS de cada test
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
// cleanup: borra lo que se dibujó con render.
// fireEvent: dispara eventos (change, click...) sobre elementos.
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'
import { usuariosIniciales } from '../data/usuarios'
import { authenticateUser, deleteUser, getUsers, toggleBlocked } from '../services/userService'

// Cada test empieza con el storage vacío para que un test no afecte a otro
// (los tests deben ser INDEPENDIENTES entre sí).
beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})

// FUNCIONES AUXILIARES para no repetir código en cada test.

// Dibuja la App empezando en la ruta indicada (por defecto /login).
function openPage(path = '/login') {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

// Completa el formulario de login y presiona el botón.
function signIn(email, password, remember = false) {
  // getByLabelText busca el input por el texto de su <label>
  // (funciona gracias a htmlFor + id en Login.jsx).
  // fireEvent.change simula escribir: { target: { value } } es el texto.
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: email } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: password } })
  if (remember) fireEvent.click(screen.getByLabelText('Recordarme'))
  fireEvent.click(screen.getByRole('button', { name: 'INICIAR SESIÓN' }))
}

describe('Usuarios de prueba y acceso existente', () => {
  test('el administrador conserva sus credenciales y acceso al panel', () => {
    openPage()
    signIn('admin@pokestore.cl', 'Pokemon123!')
    // Tras el login correcto, la app navega a /mi-cuenta.
    expect(screen.getByRole('heading', { name: 'Mi cuenta' })).toBeInTheDocument()
    // El admin ve el link "Admin" en el menú; al hacer clic llega al panel.
    fireEvent.click(screen.getByRole('link', { name: 'Admin' }))
    expect(screen.getByRole('heading', { name: 'Panel de administración' })).toBeInTheDocument()
  })

  // test.each(lista)(nombre, funcion): ejecuta el MISMO test una vez por cada
  // elemento de la lista (aquí, una vez por cada usuario inicial = 3 tests).
  // '$name' en el título se reemplaza por la propiedad name de cada usuario.
  // ({ email, name }) desestructura cada usuario en los parámetros.
  test.each(usuariosIniciales)('$name inicia sesión sin permisos de administrador', ({ email, name }) => {
    openPage()
    signIn(email, '123456')
    expect(screen.getByRole('heading', { name: 'Mi cuenta' })).toBeInTheDocument()
    // toHaveValue: el input contiene ese valor.
    expect(screen.getByLabelText('Nombre')).toHaveValue(name)
    // Un usuario normal NO ve el link Admin.
    expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument()
    expect(getUsers().find((user) => user.email === email).role).toBe('user')
    const account = sessionStorage.getItem('pokestore-user')
    cleanup()
    // Intentar entrar a /admin escribiendo la URL: debe ser redirigido.
    openPage('/admin')
    expect(screen.queryByRole('heading', { name: 'Panel de administración' })).not.toBeInTheDocument()
    // Y la sesión sigue intacta.
    expect(sessionStorage.getItem('pokestore-user')).toBe(account)
  })

  // test.each con una lista de arrays: cada array son los argumentos
  // (email, password). %s en el título se reemplaza por cada valor.
  test.each([
    ['desconocido@pokestore.cl', '123456'],
    ['desconocido@pokestore.cl', 'Pokemon123!'],
    ['ignacio@pokestore.cl', 'incorrecta'],
    ['ignacio@pokestore.cl', 'Pokemon123!'],
    ['bryan@pokestore.cl', 'incorrecta'],
    ['felipe@pokestore.cl', 'incorrecta'],
    ['admin@pokestore.cl', '123456'],
  ])('rechaza las credenciales incorrectas %s / %s', (email, password) => {
    openPage()
    signIn(email, password)
    // getByText busca un elemento por su texto visible.
    expect(screen.getByText('El correo o la contraseña son incorrectos.')).toBeInTheDocument()
    // No se guardó ninguna sesión.
    expect(localStorage.getItem('pokestore-user')).toBeNull()
    expect(sessionStorage.getItem('pokestore-user')).toBeNull()
  })

  // Se ejecuta 2 veces: con remember = false y con remember = true.
  test.each([false, true])('conserva sesión, restauración y cierre con Recordarme=%s', (remember) => {
    openPage()
    signIn('ignacio@pokestore.cl', '123456', remember)
    // Con "Recordarme" la sesión va a localStorage; sin él, a sessionStorage.
    const storage = remember ? localStorage : sessionStorage
    expect(JSON.parse(storage.getItem('pokestore-user')).email).toBe('ignacio@pokestore.cl')
    // ...y NO está en el otro storage.
    expect((remember ? sessionStorage : localStorage).getItem('pokestore-user')).toBeNull()
    // Simular "recargar la página": borrar lo dibujado y volver a abrir.
    cleanup()
    openPage('/mi-cuenta')
    // La sesión se restauró desde el storage.
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ignacio')
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    // Tras cerrar sesión vuelve al login y se borró la sesión de ambos lados.
    expect(screen.getByRole('button', { name: 'INICIAR SESIÓN' })).toBeInTheDocument()
    expect(localStorage.getItem('pokestore-user')).toBeNull()
    expect(sessionStorage.getItem('pokestore-user')).toBeNull()
  })

  test('integra los iniciales sin sobrescribir cuentas ni duplicarlas', () => {
    // PREPARAR datos: simular que ya había usuarios guardados de antes.
    const previous = [
      { email: 'anterior@pokestore.cl', name: 'Anterior', blocked: false },
      { email: 'ignacio@pokestore.cl', name: 'Nombre guardado', blocked: true },
    ]
    localStorage.setItem('pokestore-users', JSON.stringify(previous))
    const users = getUsers()
    // 2 anteriores + bryan + felipe (ignacio ya existía, no se duplica) = 4.
    expect(users).toHaveLength(4)
    // .slice(0, 2): los 2 primeros siguen iguales (no se sobrescribieron).
    expect(users.slice(0, 2)).toEqual(previous)
    expect(getUsers()).toEqual(users)
    expect(authenticateUser('anterior@pokestore.cl', 'Pokemon123!')).toEqual(previous[0])
    expect(authenticateUser('ignacio@pokestore.cl', '123456')).toEqual(previous[1])
  })

  test('conserva una contraseña que ya estuviera guardada', () => {
    const existing = { email: 'ignacio@pokestore.cl', name: 'Ignacio', password: 'guardada', blocked: false }
    localStorage.setItem('pokestore-users', JSON.stringify([existing]))
    expect(authenticateUser(existing.email, 'guardada')).toEqual(existing)
    expect(authenticateUser(existing.email, '123456')).toBeNull()
  })

  test('mantiene el bloqueo y no vuelve a crear usuarios eliminados', () => {
    // Bloquear a Bryan directamente con el servicio (sin pasar por la UI).
    toggleBlocked('bryan@pokestore.cl')
    openPage()
    signIn('bryan@pokestore.cl', '123456')
    expect(screen.getByText('Tu cuenta está bloqueada. Contacta al administrador.')).toBeInTheDocument()
    expect(sessionStorage.getItem('pokestore-user')).toBeNull()
    deleteUser('felipe@pokestore.cl')
    // .some(...) devuelve false -> Felipe ya no existe.
    expect(getUsers().some((user) => user.email === 'felipe@pokestore.cl')).toBe(false)
    expect(authenticateUser('felipe@pokestore.cl', '123456')).toBeNull()
  })

  test('permite registrar nuevos usuarios con el mecanismo anterior y luego iniciar sesión', () => {
    openPage('/registro')
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Nuevo' } })
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'nuevo@pokestore.cl' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'Pokemon123!' } })
    fireEvent.click(screen.getByRole('button', { name: 'CREAR CUENTA' }))
    expect(screen.getByRole('heading', { name: 'Mi cuenta' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    signIn('nuevo@pokestore.cl', 'Pokemon123!')
    expect(screen.getByLabelText('Nombre')).toHaveValue('Nuevo')
    expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument()
  })
})
