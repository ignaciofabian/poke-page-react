import '../assets/CSS/layout.css'
import { Link, NavLink, useNavigate } from 'react-router'
import { money } from '../data/products'
export function Header({
  items,
  total,
  count,
  cartOpen,
  setCartOpen,
  changeQuantity,
  user,
  isAdmin,
  logout,
  checkout
}) {
  const navigate = useNavigate()
  function confirm() {
    if (!user) {
      setCartOpen(false)
      navigate('/login')
      return
    }
    checkout()
    setCartOpen(false)
    navigate('/mi-cuenta')
  }
  return (
    <header className="catalogo-header">
      <div className="header-contenedor">
        <div className="logo-tienda">
          <Link to="/" className="logo-link">
            <div className="logo-titulo">
              <h1>PokéStore</h1>
              <img
                src="/img/poke-bola.png"
                alt="Pokébola"
                className="pokebola-logo"
              />
            </div>
          </Link>
          <p>Cartas Pokémon para coleccionistas</p>
        </div>
        <nav className="menu">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/cartas">Cartas</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <Link to="/#contacto">Contacto</Link>
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          <NavLink
            to={user ? '/mi-cuenta' : '/login'}
            className="usuario-header"
          >
            👤 {user ? user.name : 'Iniciar sesión'}
          </NavLink>
          {user && (
            <button className="btn-salir-header" onClick={logout}>
              Salir
            </button>
          )}
          <button
            className="cart-btn"
            aria-expanded={cartOpen}
            aria-controls="drawer"
            onClick={() => setCartOpen(true)}
          >
            Carrito 🛒
            <span className="cart-count">{count}</span>
          </button>
        </nav>
      </div>
      <aside
        className={`drawer ${cartOpen ? 'open' : ''}`}
        id="drawer"
        aria-label="Tu carrito"
        inert={!cartOpen}
        aria-hidden={!cartOpen}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setCartOpen(false)
        }}
      >
        <div className="drawer-head">
          <h3>Tu carrito</h3>
          <button
            className="drawer-close"
            aria-label="Cerrar carrito"
            onClick={() => setCartOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="drawer-items">
          {items.length ? (
            items.map((item) => (
              <div className="drawer-item" key={item.id}>
                <img
                  className="di-art"
                  src={item.product.image}
                  alt={item.product.name}
                />
                <div className="di-info">
                  <h4>
                    <Link
                      to={`/productos/${item.id}`}
                      onClick={() => setCartOpen(false)}
                    >
                      {item.product.name}
                    </Link>
                  </h4>
                  <p>{money(item.product.price)}</p>
                  <div className="qty-row">
                    <button
                      className="qty-btn"
                      aria-label={`Restar ${item.product.name}`}
                      onClick={() => changeQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      aria-label={`Sumar ${item.product.name}`}
                      onClick={() => changeQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="di-remove"
                      onClick={() => changeQuantity(item.id, 0)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="drawer-empty">
              Tu carrito está vacío.
              <br />
              Agrega alguna carta del catálogo.
            </div>
          )}
        </div>
        <div className="drawer-foot">
          <div className="drawer-total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <button
            className="checkout-btn"
            disabled={!items.length}
            onClick={confirm}
          >
            {user
              ? 'Confirmar pedido'
              : 'Iniciar sesión para continuar'}
          </button>
        </div>
      </aside>
    </header>
  )
}
