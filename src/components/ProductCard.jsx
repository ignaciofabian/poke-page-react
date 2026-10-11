import { Link } from 'react-router'
import { money } from '../data/products'
export function ProductCard({ product, addItem }) {
  return (
    <article className="card" data-tipo={product.type}>
      <Link className="card-img" to={`/productos/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="card-info">
        <h3 className="card-title">
          <Link to={`/productos/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="card-price">{money(product.price)}</p>
        <button className="btn-comprar" onClick={() => addItem(product.id)}>
          Agregar al carro
        </button>
      </div>
    </article>
  )
}
