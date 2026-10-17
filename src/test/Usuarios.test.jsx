import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'
import { usuariosIniciales } from '../data/usuarios'
import { authenticateUser, deleteUser, getUsers, toggleBlocked } from '../services/userService'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})

function openPage(path = '/login') {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

function signIn(email, password, remember = false) {
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: email } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: password } })
  if (remember) fireEvent.click(screen.getByLabelText('Recordarme'))
  fireEvent.click(screen.getByRole('button', { name: 'INICIAR SESIÓN' }))
}

describe('Usuarios de prueba y acceso existente', () => {
  test('el administrador conserva sus credenciales y acceso al panel', () => {
    openPage()
    signIn('admin@pokestore.cl', 'Pokemon123!')
    expect(screen.getByRole('heading', { name: 'Mi cuenta' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: 'Admin' }))
    expect(screen.getByRole('heading', { name: 'Panel de administración' })).toBeInTheDocument()
  })

  test.each(usuariosIniciales)('$name inicia sesión sin permisos de administrador', ({ email, name }) => {
    openPage()
    signIn(email, '123456')
    expect(screen.getByRole('heading', { name: 'Mi cuenta' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toHaveValue(name)
    expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument()
    expect(getUsers().find((user) => user.email === email).role).toBe('user')
    const account = sessionStorage.getItem('pokestore-user')
    cleanup()
    openPage('/admin')
    expect(screen.queryByRole('heading', { name: 'Panel de administración' })).not.toBeInTheDocument()
    expect(sessionStorage.getItem('pokestore-user')).toBe(account)
  })

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
    expect(screen.getByText('El correo o la contraseña son incorrectos.')).toBeInTheDocument()
    expect(localStorage.getItem('pokestore-user')).toBeNull()
    expect(sessionStorage.getItem('pokestore-user')).toBeNull()
  })

  test.each([false, true])('conserva sesión, restauración y cierre con Recordarme=%s', (remember) => {
    openPage()
    signIn('ignacio@pokestore.cl', '123456', remember)
    const storage = remember ? localStorage : sessionStorage
    expect(JSON.parse(storage.getItem('pokestore-user')).email).toBe('ignacio@pokestore.cl')
    expect((remember ? sessionStorage : localStorage).getItem('pokestore-user')).toBeNull()
    cleanup()
    openPage('/mi-cuenta')
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ignacio')
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(screen.getByRole('button', { name: 'INICIAR SESIÓN' })).toBeInTheDocument()
    expect(localStorage.getItem('pokestore-user')).toBeNull()
    expect(sessionStorage.getItem('pokestore-user')).toBeNull()
  })

  test('integra los iniciales sin sobrescribir cuentas ni duplicarlas', () => {
    const previous = [
      { email: 'anterior@pokestore.cl', name: 'Anterior', blocked: false },
      { email: 'ignacio@pokestore.cl', name: 'Nombre guardado', blocked: true },
    ]
    localStorage.setItem('pokestore-users', JSON.stringify(previous))
    const users = getUsers()
    expect(users).toHaveLength(4)
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
    toggleBlocked('bryan@pokestore.cl')
    openPage()
    signIn('bryan@pokestore.cl', '123456')
    expect(screen.getByText('Tu cuenta está bloqueada. Contacta al administrador.')).toBeInTheDocument()
    expect(sessionStorage.getItem('pokestore-user')).toBeNull()
    deleteUser('felipe@pokestore.cl')
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
