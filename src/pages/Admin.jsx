import { useState } from 'react'
import { Navigate } from 'react-router'
import { money } from '../data/products'
import * as productService from '../services/productService'
import * as userService from '../services/userService'
import '../assets/CSS/mi-cuenta.css'
import '../assets/CSS/admin.css'

const types = ['fuego', 'agua', 'planta', 'electrico', 'psiquico', 'normal', 'lucha']

export function Admin({ user }) {
  const [products, setProducts] = useState(productService.getProducts())
  const [users, setUsers] = useState(userService.getUsers())
  // datos del formulario de cartas
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('fuego')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  if (!user || user.email !== userService.ADMIN_EMAIL) {
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
    if (editingId) {
      productService.updateProduct(editingId, name.trim(), type, priceNumber, image.trim())
      setMessage('Carta actualizada.')
    } else {
      productService.addProduct(name.trim(), type, priceNumber, image.trim())
      setMessage('Carta agregada.')
    }
    setProducts(productService.getProducts())
    clearForm()
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
      productService.deleteProduct(product.id)
      setProducts(productService.getProducts())
    }
  }

  function reset() {
    if (window.confirm('¿Volver a las cartas originales?')) {
      productService.resetProducts()
      setProducts(productService.getProducts())
      clearForm()
    }
  }

  function toggleUser(email) {
    userService.toggleBlocked(email)
    setUsers(userService.getUsers())
  }

  function removeUser(email) {
    if (window.confirm(`¿Eliminar el usuario ${email}?`)) {
      userService.deleteUser(email)
      setUsers(userService.getUsers())
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
            <button className="btn-actualizar" type="submit">
              {editingId ? 'Guardar cambios' : 'Agregar carta'}
            </button>
            {editingId && (
              <button className="admin-btn" type="button" onClick={clearForm}>
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
                  <strong>{item.name}</strong>
                  <p>
                    {item.email} · {item.blocked ? 'Bloqueado' : 'Activo'}
                  </p>
                </div>
                {item.email !== user.email && (
                  <div>
                    <button className="admin-btn" onClick={() => toggleUser(item.email)}>
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
                <button className="admin-btn" onClick={() => edit(product)}>
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
          <button className="btn-cerrar-sesion" onClick={reset}>
            Restaurar cartas originales
          </button>
        </div>
      </section>
    </main>
  )
}
