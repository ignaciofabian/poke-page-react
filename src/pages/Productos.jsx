// =============================================================================
// Productos.jsx — PÁGINA /productos/:id (detalle de una carta)
// -----------------------------------------------------------------------------
// Una sola página sirve para TODAS las cartas gracias a la ruta dinámica
// "/productos/:id" definida en App.jsx. Ej: /productos/pikachu -> id = 'pikachu'.
// En la versión HTML existía producto.html y la carta se elegía con JS.
// =============================================================================

import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { products, money } from '../data/products'
import { ProductCard } from '../components/ProductCard'
export function Productos({ addItem }) {
  // useParams() devuelve un objeto con los parámetros de la URL: { id: 'pikachu' }.
  // const { id } = ... es DESESTRUCTURACIÓN: saca la propiedad "id" del
  // objeto a una variable. Igual a: const id = useParams().id
  const { id } = useParams()
  // Buscar la carta con ese id (undefined si no existe).
  const product = products.find((item) => item.id === id)
  // Estado local: cantidad elegida con los botones − / +. Empieza en 1.
  const [quantity, setQuantity] = useState(1)
  // Si el id no existe (ej: /productos/xyz) se muestra un mensaje.
  // Un "return" temprano es otra forma de renderizado condicional.
  if (!product)
    return (
      <>
        <main className="catalogo">
          <h1>Carta no encontrada</h1>
          <Link to="/cartas">Volver al catálogo</Link>
        </main>
      </>
    )
  return (
    <>
      <main className="catalogo">
        {/* Migas de pan: Inicio › tipo › nombre. {' '} agrega un espacio
            (en JSX los espacios al final de línea se pierden). */}
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link> ›{' '}
          <Link to={`/cartas?tipo=${product.type}`}>{product.type}</Link> ›{' '}
          <span>{product.name}</span>
        </nav>
        <section className="detalle-producto">
          <div className="producto-galeria">
            <div className="card-img producto-img-principal">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="producto-info">
            <h1>{product.name}</h1>
            <p className="card-price">{money(product.price)}</p>
            <p>Carta Pokémon de tipo {product.type} para tu colección.</p>
            <div className="qty-row">
              {/* disabled: no se puede bajar de 1. */}
              <button
                aria-label="Restar cantidad"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                aria-label="Sumar cantidad"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            {/* Aquí sí se pasa la cantidad elegida a addItem (en ProductCard
                se usa el valor por defecto 1). */}
            <button
              className="btn-comprar"
              onClick={() => addItem(product.id, quantity)}
            >
              Añadir al carrito
            </button>
          </div>
        </section>
        <section className="productos-relacionados">
          <h2>Productos relacionados</h2>
          <div className="grilla-productos">
            {/* ENCADENAR MÉTODOS DE ARRAY: cada uno devuelve un array nuevo.
                1. filter: mismo tipo y que no sea la carta actual
                2. slice(0, 4): quedarse con las primeras 4
                3. map: convertir cada una en una ProductCard */}
            {products
              .filter((item) => item.type === product.type && item.id !== id)
              .slice(0, 4)
              .map((item) => (
                <ProductCard key={item.id} product={item} addItem={addItem} />
              ))}
          </div>
        </section>
      </main>
    </>
  )
}
