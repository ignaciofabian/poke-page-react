// =============================================================================
// Login.jsx — PÁGINAS /login, /registro y /recuperar
// -----------------------------------------------------------------------------
// UN componente para TRES pantallas. App.jsx le pasa la prop "mode":
//   /login     -> mode = 'login'    (valor por defecto)
//   /registro  -> mode = 'register'
//   /recuperar -> mode = 'recover'
// Según el modo cambian el título, el botón y los campos que se muestran.
//
// Flujo al iniciar sesión:
//   1. El usuario escribe correo y clave (inputs controlados con useState).
//   2. Al enviar, submit() valida con authenticateUser (userService.js).
//   3. Si está bien, llama a login() que vino por props desde App.jsx.
//   4. App guarda el usuario en su estado y en el storage.
//   5. navigate('/mi-cuenta') lleva a la cuenta.
// =============================================================================

import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { ADMIN_PASSWORD, authenticateUser, isBlocked, registerUser } from '../services/userService'
import '../assets/CSS/login.css'

// Props:
//   mode  -> 'login' | 'register' | 'recover' (por defecto 'login')
//   user  -> usuario con sesión o null (para saber si ya inició sesión)
//   login -> función de App.jsx que guarda la sesión
export function Login({ mode = 'login', user, login }) {
  const navigate = useNavigate()
  // Un estado por cada campo del formulario (inputs controlados).
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [remember, setRemember] = useState(false) // checkbox "Recordarme"
  const [message, setMessage] = useState('') // mensaje de error

  // Si YA hay sesión, no tiene sentido mostrar el login: redirigimos.
  // <Navigate> es un componente que, al dibujarse, cambia la URL.
  // "replace" evita que /login quede en el historial (el botón atrás no vuelve aquí).
  // OJO: los useState van ANTES de este return. Regla de los hooks: siempre
  // se llaman en el mismo orden, nunca después de un return condicional.
  if (user) {
    return <Navigate to="/mi-cuenta" replace />
  }

  // Textos según el modo (let porque se reasignan).
  let title = 'Inicia sesión para continuar'
  let buttonText = 'INICIAR SESIÓN'
  if (mode === 'register') {
    title = 'Crea tu cuenta'
    buttonText = 'CREAR CUENTA'
  }
  if (mode === 'recover') {
    title = 'Recuperar acceso'
    buttonText = 'RECUPERAR CONTRASEÑA'
  }

  function submit(event) {
    // evitar que el formulario recargue la pagina
    event.preventDefault()
    // Recuperar contraseña no está implementado: solo mostramos un mensaje.
    if (mode === 'recover') {
      setMessage(
        'La recuperación de contraseña no está disponible en este momento. Contáctanos para solicitar ayuda.'
      )
      return
    }
    // Si es login, validamos correo + clave. authenticateUser devuelve el
    // usuario si es correcto o null si no. En registro no se valida aquí.
    const account = mode === 'login' ? authenticateUser(email, password) : null
    // Esta condición usa un TERNARIO para elegir qué revisar:
    //   - en registro: error si la clave NO es la clave de prueba (Pokemon123!)
    //   - en login:    error si authenticateUser devolvió null (!null === true)
    if (mode === 'register' ? password !== ADMIN_PASSWORD : !account) {
      setMessage('El correo o la contraseña son incorrectos.')
      return
    }
    if (mode === 'register' && name.trim() === '') {
      setMessage('Escribe un nombre.')
      return
    }
    // Un usuario bloqueado por el admin no puede entrar.
    if (isBlocked(email)) {
      setMessage('Tu cuenta está bloqueada. Contacta al administrador.')
      return
    }
    // Guarda el usuario en la lista (si ya existe, registerUser no hace nada).
    registerUser(email, name.trim())
    // Nombre a usar: el escrito (registro) || el de la cuenta (login) || ''.
    // "||" devuelve el primer valor "verdadero" ('' cuenta como falso).
    // account?.name es ENCADENAMIENTO OPCIONAL: si account es null, devuelve
    // undefined en vez de lanzar un error (account.name fallaría).
    login(email, remember, name.trim() || account?.name || '')
    navigate('/mi-cuenta')
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="card-decoration">
          <div className="pokeball">
            <span />
          </div>
        </div>
        <div className="login-header">
          <h1>PokeStore</h1>
          <p>{title}</p>
        </div>
        <form onSubmit={submit}>
          {/* El campo Nombre solo aparece en registro. */}
          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={60}
              />
            </div>
          )}
          <div className="form-group">
            {/* El label conectado al input (htmlFor + id) es lo que permite
                que los tests lo encuentren con getByLabelText('Correo electrónico'). */}
            <label htmlFor="input-email">Correo electrónico</label>
            <input
              id="input-email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </div>
          {/* La contraseña y "Recordarme" se ocultan en modo recuperar.
              <> </> agrupa varios elementos sin agregar un div extra. */}
          {mode !== 'recover' && (
            <>
              <div className="form-group">
                <label htmlFor="input-password">Contraseña</label>
                <input
                  id="input-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                />
              </div>
              <div className="login-options">
                <label className="remember">
                  {/* En un checkbox se usa "checked" y event.target.checked
                      (true/false) en vez de value. */}
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                  />{' '}
                  Recordarme
                </label>
                <Link to="/recuperar" className="forgot">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </>
          )}
          {/* Mensaje de error; role="status" lo anuncia a lectores de pantalla. */}
          <p role="status">{message}</p>
          <button type="submit">{buttonText}</button>
        </form>
        <div className="register">
          {mode === 'login' && (
            <p>
              ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          )}
          {mode !== 'login' && (
            <p>
              <Link to="/login">Volver a iniciar sesión</Link>
            </p>
          )}
          <Link to="/">Volver a la tienda</Link>
        </div>
      </section>
    </main>
  )
}
