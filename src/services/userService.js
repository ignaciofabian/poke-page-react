import { send } from './api'
export async function authenticateUser(email, password) {
  const data = await send('/auth/iniciar-sesion', 'POST', null, { email: email.trim().toLowerCase(), password })
  return session(data)
}

export async function registerUser(email, password, nombre) {
  return session(await send('/auth/registro', 'POST', null, { email, password, nombre }))
}

function session(data) {
  const payload = JSON.parse(atob(data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
  const expiresAt = payload.exp * 1000
  if (!data.email || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) throw new Error('Sesión inválida')
  return { email: data.email, name: data.nombre || data.email, role: data.rol, token: data.token, expiresAt }
}
