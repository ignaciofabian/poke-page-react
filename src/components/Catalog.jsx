import { useSearchParams } from 'react-router'
import { products } from '../data/products'
import { ProductCard } from './ProductCard'

const categories = [
  { type: 'todos', name: '⭐ Todas' },
  { type: 'fuego', name: '🔥 Fuego' },
  { type: 'agua', name: '💧 Agua' },
  { type: 'planta', name: '🌿 Planta' },
  { type: 'electrico', name: '⚡ Eléctrico' },
  { type: 'psiquico', name: '🔮 Psíquico' },
  { type: 'normal', name: '⚪ Normal' },
  { type: 'lucha', name: '🥊 Lucha' }
]

export function Catalog({ featured = false, addItem }) {
  const [params, setParams] = useSearchParams()
  const type = params.get('tipo') || 'todos'
  const query = params.get('q') || ''
  const hasFilters = query.trim() !== '' || type !== 'todos'
  const featuredIds = [
    'venusaur',
    'dragonite',
    'charizard',
    'pikachu',
    'mewtwo',
    'blastoise',
    'raichu'
  ]

  // revisar el nombre y la categoria antes de mostrar la carta
  const visible = products.filter((product) => {
    if (featured && !hasFilters && !featuredIds.includes(product.id)) {
      return false
    }
    if (type !== 'todos' && product.type !== type) {
      return false
    }
    return product.name.toLowerCase().includes(query.trim().toLowerCase())
  })

  function changeSearch(value) {
    setParams({ tipo: type, q: value }, { replace: true })
  }

  function changeCategory(value) {
    setParams({ tipo: value, q: query })
  }

  function search(event) {
    event.preventDefault()
  }

  let title = 'Catálogo de cartas'
  let gridClass = 'grilla-productos pagina-cartas'
  if (featured && !hasFilters) {
    title = 'Cartas destacadas'
    gridClass = 'grilla-productos'
  }

  return (
    <>
      <section className="categorias">
        <h2>Categorías</h2>
        <div className="lista-categorias">
          {categories.map((category) => (
            <button
              key={category.type}
              aria-pressed={type === category.type}
              onClick={() => changeCategory(category.type)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>
      <main className="catalogo">
        <section className="seccion-cartas">
          <form className="buscador" onSubmit={search}>
            <input
              type="search"
              aria-label="Buscar carta Pokémon"
              placeholder="Buscar carta Pokémon..."
              value={query}
              onChange={(event) => changeSearch(event.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
          <h2>{title}</h2>
          <p role="status">{visible.length} cartas encontradas</p>
          <div className={gridClass}>
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addItem={addItem}
              />
            ))}
          </div>
          {visible.length === 0 && (
            <p>No encontramos cartas. Busca otro nombre o categoría.</p>
          )}
        </section>
      </main>
    </>
  )
}
