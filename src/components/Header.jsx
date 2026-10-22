// =============================================================================
// Header.jsx — ENCABEZADO + MENÚ + PANEL DEL CARRITO
// -----------------------------------------------------------------------------
// Se muestra en todas las páginas excepto login/registro/recuperar
// (lo decide App.jsx). En la versión HTML este código estaba copiado en cada
// .html y el carrito se manejaba con JS puro (document.getElementById,
// addEventListener...). Ahora es UN componente reutilizable y el carrito
// se dibuja a partir del estado que vive en App.jsx.
//
// Este componente NO tiene estado propio: todo lo recibe por PROPS desde App.
// =============================================================================

import '../assets/CSS/layout.css'
import { Link, NavLink, useNavigate } from 'react-router'
import { money } from '../data/products'

// DESESTRUCTURACIÓN DE OBJETOS en los parámetros:
// React llama a cada componente con UN solo argumento: un objeto "props" con
// todo lo que el padre le pasó. En vez de escribir
//     export function Header(props) { ... props.items ... props.total ... }
// sacamos cada propiedad a su propia variable directamente:
//     export function Header({ items, total, ... }) { ... items ... total ... }
// Los nombres deben coincidir con los usados en App.jsx (<Header items={...} />).
export function Header({
  items, // cartas del carrito con datos completos: [{ id, quantity, product }]
  total, // precio total
  count, // cantidad total de cartas
  cartOpen, // true/false: si el panel del carrito está abierto
  setCartOpen, // función para abrir/cerrar el panel (viene del useState de App)
  changeQuantity, // función de App para cambiar cantidades
  user, // usuario con sesión o null
  isAdmin, // true si el usuario es el administrador
  logout, // función de App para cerrar sesión
  checkout // función de App para confirmar el pedido
}) {
  const navigate = useNavigate()

  // Se ejecuta al presionar el botón de abajo del carrito.
  function confirm() {
    // Sin sesión -> cerramos el carrito y lo mandamos a iniciar sesión.
    if (!user) {
      setCartOpen(false)
      navigate('/login')
      return
    }
    // Con sesión -> se crea el pedido (en App) y vamos a "Mi cuenta" a verlo.
    checkout()
    setCartOpen(false)
    navigate('/mi-cuenta')
  }

  return (
    <header className="catalogo-header">
      <div className="header-contenedor">
        <div className="logo-tienda">
          {/* <Link to="/"> reemplaza a <a href="index.html">.
              Cambia de página SIN recargar el navegador (por eso es más
              rápido y no se pierde el estado). */}
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
          {/* <NavLink> es igual que <Link> pero agrega automáticamente la
              clase CSS "active" cuando estamos en esa página (sirve para
              resaltar la opción actual del menú). "end" hace que "/" solo
              quede activo en el inicio exacto, no en /cartas, /nosotros... */}
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/cartas">Cartas</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          {/* "/#contacto": va al inicio y Inicio.jsx hace scroll a la sección. */}
          <Link to="/#contacto">Contacto</Link>
          {/* Solo el admin ve el enlace al panel (renderizado condicional). */}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          {/* OPERADOR TERNARIO: condicion ? siEsVerdad : siEsFalso
              Con sesión va a /mi-cuenta y muestra el nombre;
              sin sesión va a /login y muestra "Iniciar sesión". */}
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
          {/* onClick recibe una FUNCIÓN. Escribimos () => setCartOpen(true)
              (una función que se ejecutará al hacer clic). Si escribiéramos
              onClick={setCartOpen(true)} se ejecutaría al DIBUJAR, no al
              hacer clic. */}
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
      {/* PANEL LATERAL DEL CARRITO ("drawer").
          TEMPLATE LITERAL: `texto ${variable}` (con comillas invertidas)
          permite meter variables dentro de un string. Si cartOpen es true,
          la clase queda "drawer open" y el CSS lo muestra; si no, "drawer ".
          En la versión HTML esto se hacía con classList.add('open'). */}
      <aside
        className={`drawer ${cartOpen ? 'open' : ''}`}
        id="drawer"
        aria-label="Tu carrito"
        // inert / aria-hidden: cuando está cerrado, el teclado y los lectores
        // de pantalla lo ignoran (accesibilidad).
        inert={!cartOpen}
        aria-hidden={!cartOpen}
        // Cerrar el carrito con la tecla Escape.
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
          {/* Ternario para elegir entre la lista o el mensaje "vacío".
              items.length es 0 (falso) cuando el carrito está vacío. */}
          {items.length ? (
            // LISTAS EN REACT: .map() convierte cada item del array en un
            // elemento JSX. Cada elemento necesita una prop "key" única para
            // que React sepa cuál es cuál cuando la lista cambia.
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
                    {/* Los botones llaman a changeQuantity de App.jsx.
                        El hijo NO modifica el carrito directamente: le pide
                        al padre que lo haga. */}
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
          {/* disabled cuando no hay items (!0 === true). */}
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
