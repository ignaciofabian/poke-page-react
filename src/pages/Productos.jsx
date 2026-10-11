import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { products, money } from '../data/products'
import { ProductCard } from '../components/ProductCard'
export function Productos({ addItem }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)
  const [quantity, setQuantity] = useState(1)
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
