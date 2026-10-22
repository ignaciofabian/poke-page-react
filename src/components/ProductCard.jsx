// =============================================================================
// ProductCard.jsx — TARJETA DE UNA CARTA
// -----------------------------------------------------------------------------
// Ejemplo típico de COMPONENTE REUTILIZABLE: el mismo componente dibuja
// Pikachu, Charizard o cualquier carta; solo cambian las props que recibe.
// Se usa en Catalog.jsx (catálogo y destacadas) y en Productos.jsx
// (productos relacionados). En la versión HTML cada tarjeta se creaba con JS
// concatenando strings de HTML; aquí es una "plantilla" con datos.
// =============================================================================

import { Link } from 'react-router'
import { money } from '../data/products'

// Props (desestructuradas):
//   product -> objeto { id, type, name, price, image }
//   addItem -> función de App.jsx para agregar al carrito
export function ProductCard({ product, addItem }) {
  return (
    // data-tipo: atributo personalizado que el CSS usa para dar color según el tipo.
    <article className="card" data-tipo={product.type}>
      {/* Template literal para armar la URL: `/productos/${'pikachu'}` -> '/productos/pikachu' */}
      <Link className="card-img" to={`/productos/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="card-info">
        <h3 className="card-title">
          <Link to={`/productos/${product.id}`}>{product.name}</Link>
        </h3>
        {/* money() formatea el número como pesos chilenos: 15000 -> "$15.000" */}
        <p className="card-price">{money(product.price)}</p>
        {/* Función flecha para pasar el id al hacer clic. addItem viene de
            App.jsx, pasando por la página y Catalog ("prop drilling"). */}
        <button className="btn-comprar" onClick={() => addItem(product.id)}>
          Agregar al carro
        </button>
      </div>
    </article>
  )
}
