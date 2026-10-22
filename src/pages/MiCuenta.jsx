// =============================================================================
// MiCuenta.jsx — PÁGINA /mi-cuenta (RUTA PROTEGIDA)
// -----------------------------------------------------------------------------
// Solo se puede ver con sesión iniciada. Permite cambiar el nombre, ver los
// pedidos propios y cerrar sesión. Casi todo lo recibe por props desde App.jsx.
// =============================================================================

import { useState } from 'react'
import { Navigate } from 'react-router'
import { money } from '../data/products'
import '../assets/CSS/mi-cuenta.css'

// Props:
//   user       -> usuario con sesión ({ email, name }) o null
//   updateUser -> función de App para cambiar el nombre
//   logout     -> función de App para cerrar sesión
//   orders     -> TODOS los pedidos (de todos los usuarios)
export function MiCuenta({ user, updateUser, logout, orders }) {
  // El input empieza con el nombre actual. Ternario por si user es null.
  const [name, setName] = useState(user ? user.name : '')
  const [message, setMessage] = useState('')
  // RUTA PROTEGIDA: sin sesión, redirigimos a /login.
  // (Los hooks de arriba se llaman igual, antes del return; ver Login.jsx.)
  if (!user) {
    return <Navigate to="/login" replace />
  }

  function update(event) {
    event.preventDefault()
    if (name.trim() === '') {
      setMessage('Escribe un nombre.')
      return
    }
    // El hijo pide al padre (App) que actualice el usuario. Como "user" vive
    // en App, el Header también se actualiza solo con el nombre nuevo.
    updateUser(name)
    setMessage('Datos actualizados.')
  }

  // Solo los pedidos de este usuario.
  const ownOrders = orders.filter((order) => order.email === user.email)

  return (
    <main className="cuenta-contenedor">
      <section className="bienvenida">
        <h2>Mi cuenta</h2>
        <p>Administra tus datos y revisa tus pedidos.</p>
      </section>
      <div className="cuenta-grid">
        <section className="cuenta-card">
          <h2>👤 Mis datos</h2>
          <form onSubmit={update}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={60}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              {/* readOnly: se muestra pero no se puede editar. */}
              <input id="email" type="email" value={user.email} readOnly />
            </div>
            <button className="btn-actualizar" type="submit">
              Actualizar datos
            </button>
            <p role="status">{message}</p>
          </form>
        </section>
        <section className="cuenta-card">
          <h2>📦 Mis pedidos</h2>
          <div className="lista-pedidos">
            {/* .map() ANIDADO: por cada pedido, otra lista con sus cartas. */}
            {ownOrders.map((order) => (
              <article key={order.id}>
                <h3>Pedido #{order.id}</h3>
                {/* Convertir la fecha guardada (texto ISO) a formato chileno. */}
                <p>{new Date(order.date).toLocaleString('es-CL')}</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
                <p>Total: {money(order.total)}</p>
              </article>
            ))}
            {ownOrders.length === 0 && (
              <div className="sin-pedidos">
                <p>Todavía no tienes pedidos.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <div className="cerrar-sesion-contenedor">
        {/* Se pasa la función directamente (sin flecha) porque no necesita
            argumentos: onClick={logout} */}
        <button className="btn-cerrar-sesion" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </main>
  )
}
