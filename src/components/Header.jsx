import "../assets/CSS/layout.css"
import { NavLink } from "react-router";

export function Header() {
    return <>
        <header className="catalogo-header">
            <div className="header-contenedor">
                <div className="logo-tienda">
                    <NavLink to="/" className="logo-link">
                        <div className="logo-titulo">
                            <h1>PokéStore</h1>
                            <img src="img/poke-bola.png" alt="Pokébola" className="pokebola-logo" />
                        </div>
                    </NavLink>

                    <p>Cartas Pokémon para coleccionistas</p>
                </div>

                <nav className="menu">
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/cartas">Cartas</NavLink>
                    <NavLink to="/nosotros">Nosotros</NavLink>
                    <NavLink to="/#contacto">Contacto</NavLink>
                    <NavLink to="/login" id="usuario-header" className="usuario-header">👤 <span id="nombre-header">Iniciar sesión</span></NavLink>
                    <button id="btn-cerrar-sesion-header" className="btn-salir-header" hidden>Salir</button>

                    <button className="cart-btn" id="openCart">
                        Carrito 🛒
                        <span className="cart-count" id="cartCount">0</span>
                    </button>
                </nav>
            </div>

            <aside className="drawer" id="drawer">
                <div className="drawer-head">
                    <h3>Tu carrito</h3>
                    <button className="drawer-close" id="closeCart">×</button>
                </div>

                <div className="drawer-items" id="drawerItems">
                    <div className="drawer-empty">
                        Tu carrito está vacío.<br />
                        Agrega alguna carta del catálogo.
                    </div>
                </div>

                <div className="drawer-foot">
                    <div className="drawer-total">
                        <span>Total</span>
                        <span id="drawerTotal">$0</span>
                    </div>

                    <button className="checkout-btn" id="checkoutBtn" disabled>
                        Confirmar pedido
                    </button>
                </div>
            </aside>
        </header>
    </>
}