import { usuariosIniciales } from '../data/usuarios'

// servicio para administrar los usuarios (se guardan en localStorage)
const KEY = 'pokestore-users'
const INITIALIZED_KEY = 'pokestore-users-initialized'

// correo de la cuenta de administrador (prueba)
export const ADMIN_EMAIL = 'admin@pokestore.cl'
export const ADMIN_PASSWORD = 'Pokemon123!'

export function getUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    const users = Array.isArray(saved) ? saved : []
    if (!localStorage.getItem(INITIALIZED_KEY)) {
      for (const initialUser of usuariosIniciales) {
        if (!users.some((user) => user.email.trim().toLowerCase() === initialUser.email)) {
          users.push({ ...initialUser, blocked: false })
        }
      }
      saveUsers(users)
      localStorage.setItem(INITIALIZED_KEY, '1')
    }
    return users
  } catch {
    return []
  }
}

export function authenticateUser(email, password) {
  const cleanEmail = email.trim().toLowerCase()
  if (cleanEmail === ADMIN_EMAIL) {
    return password === ADMIN_PASSWORD ? { email: ADMIN_EMAIL } : null
  }
  const user = getUsers().find((user) => user.email.trim().toLowerCase() === cleanEmail)
  if (!user) {
    return null
  }
  const initialUser = usuariosIniciales.find((user) => user.email === cleanEmail)
  const expectedPassword = user.password ?? initialUser?.password ?? ADMIN_PASSWORD
  return password === expectedPassword ? user : null
}

function saveUsers(users) {
  localStorage.setItem(KEY, JSON.stringify(users))
}

// guardar el usuario la primera vez que inicia sesion
export function registerUser(email, name) {
  const users = getUsers()
  const cleanEmail = email.trim().toLowerCase()
  if (users.find((user) => user.email === cleanEmail)) {
    return
  }
  let userName = name
  if (!userName) {
    userName = cleanEmail.split('@')[0]
  }
  users.push({ email: cleanEmail, name: userName, blocked: false, role: 'user' })
  saveUsers(users)
}

export function isBlocked(email) {
  const cleanEmail = email.trim().toLowerCase()
  const user = getUsers().find((user) => user.email === cleanEmail)
  return user !== undefined && user.blocked
}

export function toggleBlocked(email) {
  const users = getUsers()
  const user = users.find((user) => user.email === email)
  if (user) {
    user.blocked = !user.blocked
    saveUsers(users)
  }
}

export function deleteUser(email) {
  saveUsers(getUsers().filter((user) => user.email !== email))
}
