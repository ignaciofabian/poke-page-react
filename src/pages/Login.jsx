import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { isBlocked, registerUser } from '../services/userService'
import '../assets/CSS/login.css'

export function Login({ mode = 'login', user, login }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [remember, setRemember] = useState(false)
  const [message, setMessage] = useState('')

  if (user) {
    return <Navigate to="/mi-cuenta" replace />
  }

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
    if (mode === 'recover') {
      setMessage(
        'La recuperación de contraseña no está disponible en este momento. Contáctanos para solicitar ayuda.'
      )
      return
    }
    if (password !== 'Pokemon123!') {
      setMessage('El correo o la contraseña son incorrectos.')
      return
    }
    if (mode === 'register' && name.trim() === '') {
      setMessage('Escribe un nombre.')
      return
    }
    if (isBlocked(email)) {
      setMessage('Tu cuenta está bloqueada. Contacta al administrador.')
      return
    }
    registerUser(email, name.trim())
    login(email, remember, name.trim())
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
