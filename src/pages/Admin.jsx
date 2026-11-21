import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { money } from '../data/products'
import { getProducts } from '../services/productService'
import { send } from '../services/api'
import '../assets/CSS/mi-cuenta.css'
import '../assets/CSS/admin.css'

const types = ['fuego', 'agua', 'planta', 'electrico', 'psiquico', 'normal', 'lucha']

export function Admin({ user, products, onProducts }) {
  const [users, setUsers] = useState([])
  const [busy, setBusy] = useState(false)
  // datos del formulario de cartas
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('fuego')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user?.role !== 'admin') return
    let active = true
    send('/admin/users', 'GET', user.token).then(list => {
      if (active) setUsers(list)
    }).catch(() => { if (active) setMessage('No se pudieron cargar los usuarios.') })
    return () => { active = false }
  }, [user])

  async function change(path, method, body, success, usersOnly = false) {
    if (busy) return
    setBusy(true)
    try {
      await send('/admin/' + path, method, user.token, body)
      if (usersOnly) setUsers(await send('/admin/users', 'GET', user.token))
      else {
        onProducts(await getProducts())
        clearForm()
      }
      setMessage(success)
    } catch (error) {
      setMessage(error.status ? error.message : 'No se pudo completar la solicitud.')
    } finally {
      setBusy(false)
    }
  }
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  function clearForm() {
    setEditingId(null)
    setName('')
    setType('fuego')
    setPrice('')
    setImage('')
  }

  function submit(event) {
    event.preventDefault()
    const priceNumber = Number(price)
    if (name.trim() === '' || priceNumber <= 0) {
      setMessage('Escribe un nombre y un precio mayor a 0.')
      return
    }
    const path = editingId ? 'cards/' + encodeURIComponent(editingId) : 'cards'
    change(path, editingId ? 'PUT' : 'POST', {name: name.trim(), type, price: priceNumber, image: image.trim()},
      editingId ? 'Carta actualizada.' : 'Carta agregada.')
  }

  function edit(product) {
    setEditingId(product.id)
    setName(product.name)
    setType(product.type)
    setPrice(product.price)
    setImage(product.image)
    setMessage('')
  }

  function removeProduct(product) {
    if (window.confirm(`¿Eliminar la carta ${product.name}?`)) {
      change('cards/' + encodeURIComponent(product.id), 'DELETE', undefined, 'Carta eliminada.')
    }
  }

  function reset() {
    if (window.confirm('¿Volver a las cartas originales?')) {
      change('cards/reset', 'POST', undefined, 'Cartas restauradas.')
    }
  }

  function toggleUser(email) {
    const item = users.find(account => account.email === email)
    change('users/' + encodeURIComponent(email), 'PATCH', {blocked: !item.blocked}, 'Usuario actualizado.', true)
  }

  function removeUser(email) {
    if (window.confirm(`¿Eliminar el usuario ${email}?`)) {
      change('users/' + encodeURIComponent(email), 'DELETE', undefined, 'Usuario eliminado.', true)
    }
  }

  return (
    <main className="cuenta-contenedor">
      <section className="bienvenida">
        <h2>Panel de administración</h2>
        <p>
          {products.length} cartas · {users.length} usuarios
        </p>
      </section>

      <div className="cuenta-grid">
        <section className="cuenta-card">
          <h2>{editingId ? '✏️ Editar carta' : '➕ Agregar carta'}</h2>
          <form onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="admin-nombre">Nombre</label>
              <input
                id="admin-nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={40}
              />
            </div>
            <div className="form-group">
              <label htmlFor="admin-tipo">Tipo</label>
              <select
                id="admin-tipo"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                {types.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="admin-precio">Precio (CLP)</label>
              <input
                id="admin-precio"
                type="number"
                min="1"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="admin-imagen">URL de imagen (opcional)</label>
              <input
                id="admin-imagen"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              />
            </div>
            <button disabled={busy} className="btn-actualizar" type="submit">
              {editingId ? 'Guardar cambios' : 'Agregar carta'}
            </button>
            {editingId && (
              <button disabled={busy} className="admin-btn" type="button" onClick={clearForm}>
                Cancelar
              </button>
            )}
            <p role="status">{message}</p>
          </form>
        </section>

        <section className="cuenta-card">
          <h2>👥 Usuarios</h2>
          {users.length === 0 && <p>Todavía no hay usuarios registrados.</p>}
          <ul className="admin-lista">
            {users.map((item) => (
              <li key={item.email}>
                <div>
                  <strong>{item.nombre}</strong>
                  <p>
                    {item.email} · {item.blocked ? 'Bloqueado' : 'Activo'}
                  </p>
                </div>
                {item.email !== user.email && (
                  <div>
                    <button disabled={busy} className="admin-btn" onClick={() => toggleUser(item.email)}>
                      {item.blocked ? 'Desbloquear' : 'Bloquear'}
                    </button>
                    <button
                      className="admin-btn admin-btn-rojo"
                      onClick={() => removeUser(item.email)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="cuenta-card admin-cartas">
        <h2>🃏 Cartas</h2>
        <ul className="admin-lista">
          {products.map((product) => (
            <li key={product.id}>
              <div>
                <strong>{product.name}</strong>
                <p>
                  {product.type} · {money(product.price)}
                </p>
              </div>
              <div>
                <button disabled={busy} className="admin-btn" onClick={() => edit(product)}>
                  Editar
                </button>
                <button
                  className="admin-btn admin-btn-rojo"
                  onClick={() => removeProduct(product)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="cerrar-sesion-contenedor">
          <button disabled={busy} className="btn-cerrar-sesion" onClick={reset}>
            Restaurar cartas originales
          </button>
        </div>
      </section>
    </main>
  )
}
