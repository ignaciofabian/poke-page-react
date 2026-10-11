import { useState } from 'react'
import { Navigate } from 'react-router'
import { money } from '../data/products'
import '../assets/CSS/mi-cuenta.css'

export function MiCuenta({ user, updateUser, logout, orders }) {
  const [name, setName] = useState(user ? user.name : '')
  const [message, setMessage] = useState('')
  if (!user) {
    return <Navigate to="/login" replace />
  }

  function update(event) {
    event.preventDefault()
    if (name.trim() === '') {
      setMessage('Escribe un nombre.')
      return
    }
    updateUser(name)
    setMessage('Datos actualizados.')
  }

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
            {ownOrders.map((order) => (
              <article key={order.id}>
                <h3>Pedido #{order.id}</h3>
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
        <button className="btn-cerrar-sesion" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </main>
  )
}
