// servicio para administrar los usuarios (se guardan en localStorage)
const KEY = 'pokestore-users'

// correo de la cuenta de administrador (prueba)
export const ADMIN_EMAIL = 'admin@pokestore.cl'

export function getUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(saved)) {
      return saved
    }
  } catch {
    return []
  }
  return []
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
  users.push({ email: cleanEmail, name: userName, blocked: false })
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
