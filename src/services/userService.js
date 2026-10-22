// =============================================================================
// userService.js — SERVICIO DE USUARIOS
// -----------------------------------------------------------------------------
// Funciones para validar el login, registrar, bloquear y eliminar usuarios.
// Todo se guarda en localStorage (no hay backend). Es JS normal sin React,
// por eso se puede testear directamente (ver Validaciones.test.js y
// Mock.test.js) sin dibujar ninguna pantalla.
// =============================================================================

import { usuariosIniciales } from '../data/usuarios'

// servicio para administrar los usuarios (se guardan en localStorage)
const KEY = 'pokestore-users'
// "Marca" para saber si ya se copiaron los usuarios iniciales una vez.
// Así, si el admin elimina a un usuario inicial, no vuelve a aparecer.
const INITIALIZED_KEY = 'pokestore-users-initialized'

// correo de la cuenta de administrador (prueba)
// Se exportan porque App, Login y Admin las necesitan.
export const ADMIN_EMAIL = 'admin@pokestore.cl'
export const ADMIN_PASSWORD = 'Pokemon123!'

// Devuelve la lista de usuarios guardados.
// La primera vez también agrega los usuarios iniciales (sin duplicarlos).
export function getUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    // Si lo guardado es un array lo usamos; si no (null, dato corrupto), [].
    const users = Array.isArray(saved) ? saved : []
    if (!localStorage.getItem(INITIALIZED_KEY)) {
      for (const initialUser of usuariosIniciales) {
        // .some() -> true si AL MENOS UN elemento cumple la condición.
        // Aquí: ¿ya existe un usuario con este correo?
        if (!users.some((user) => user.email.trim().toLowerCase() === initialUser.email)) {
          // { ...initialUser, blocked: false } = SPREAD EN OBJETOS:
          // copia todas las propiedades de initialUser (id, name, email,
          // password, role) y AGREGA blocked: false. Si initialUser ya tuviera
          // "blocked", el valor escrito después (false) lo reemplazaría.
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

// Valida correo + contraseña. Devuelve el usuario si son correctos, o null.
export function authenticateUser(email, password) {
  // Normalizar: sin espacios y en minúsculas ("  ANA@X.CL " -> "ana@x.cl").
  const cleanEmail = email.trim().toLowerCase()
  // El admin se valida aparte con sus constantes.
  if (cleanEmail === ADMIN_EMAIL) {
    return password === ADMIN_PASSWORD ? { email: ADMIN_EMAIL } : null
  }
  const user = getUsers().find((user) => user.email.trim().toLowerCase() === cleanEmail)
  if (!user) {
    return null
  }
  // ¿Qué contraseña esperamos?
  //   ?.  ENCADENAMIENTO OPCIONAL: initialUser?.password devuelve undefined
  //       (sin error) si initialUser es undefined.
  //   ??  NULLISH COALESCING: "a ?? b" devuelve a, salvo que a sea null o
  //       undefined; en ese caso devuelve b.
  // Se lee así: la clave guardada del usuario; si no tiene, la del usuario
  // inicial; si tampoco, la clave de prueba de registro (Pokemon123!).
  const initialUser = usuariosIniciales.find((user) => user.email === cleanEmail)
  const expectedPassword = user.password ?? initialUser?.password ?? ADMIN_PASSWORD
  return password === expectedPassword ? user : null
}

// Función interna (sin export: no se puede usar desde otros archivos).
function saveUsers(users) {
  localStorage.setItem(KEY, JSON.stringify(users))
}

// guardar el usuario la primera vez que inicia sesion
// Si el correo ya existe, no hace nada (no duplica).
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

// true si el usuario existe y está bloqueado.
export function isBlocked(email) {
  const cleanEmail = email.trim().toLowerCase()
  const user = getUsers().find((user) => user.email === cleanEmail)
  return user !== undefined && user.blocked
}

// Cambia bloqueado <-> activo. "!" invierte un booleano (true -> false).
export function toggleBlocked(email) {
  const users = getUsers()
  const user = users.find((user) => user.email === email)
  if (user) {
    user.blocked = !user.blocked
    saveUsers(users)
  }
}

// Guarda la lista sin el usuario con ese correo.
export function deleteUser(email) {
  saveUsers(getUsers().filter((user) => user.email !== email))
}
