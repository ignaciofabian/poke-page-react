// =============================================================================
// Catalog.jsx — CATEGORÍAS + BUSCADOR + GRILLA DE CARTAS
// -----------------------------------------------------------------------------
// Lo usan dos páginas:
//   - Inicio.jsx  -> <Catalog featured addItem={addItem} />  (solo destacadas)
//   - Cartas.jsx  -> <Catalog addItem={addItem} />           (todas)
//
// Los filtros (tipo y búsqueda) NO se guardan con useState sino en la URL:
//   /cartas?tipo=fuego&q=char
// Ventajas: se puede compartir el enlace, el botón "atrás" funciona y los
// links del Footer (/cartas?tipo=agua) llegan ya filtrados.
// =============================================================================

import { useSearchParams } from 'react-router'
import { products } from '../data/products'
import { ProductCard } from './ProductCard'

// Lista de botones de categoría. Está FUERA del componente porque nunca
// cambia (no hace falta crearla de nuevo en cada render).
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

// "featured = false" es un VALOR POR DEFECTO en la desestructuración:
// si el padre no pasa la prop featured, vale false.
// Escribir <Catalog featured /> (sin valor) es lo mismo que featured={true}.
export function Catalog({ featured = false, addItem }) {
  // useSearchParams funciona como useState pero para los parámetros de la URL
  // (lo que va después del "?"). params.get('tipo') lee; setParams escribe.
  const [params, setParams] = useSearchParams()
  // "||" da un valor por defecto: si params.get devuelve null, usa 'todos'.
  const type = params.get('tipo') || 'todos'
  const query = params.get('q') || ''
  // ¿Hay algún filtro activo?
  const hasFilters = query.trim() !== '' || type !== 'todos'
  // ids de las cartas que se muestran en el inicio.
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
  // .filter() se queda solo con las cartas para las que la función devuelve true.
  const visible = products.filter((product) => {
    // En el inicio sin filtros: solo las destacadas.
    if (featured && !hasFilters && !featuredIds.includes(product.id)) {
      return false
    }
    // Si hay un tipo elegido, descartar las de otro tipo.
    if (type !== 'todos' && product.type !== type) {
      return false
    }
    // Búsqueda por nombre sin importar mayúsculas: 'Pikachu'.includes('pika') ...
    return product.name.toLowerCase().includes(query.trim().toLowerCase())
  })

  // Al escribir en el buscador se actualiza ?q= en la URL.
  // { replace: true } reemplaza la entrada del historial en vez de agregar
  // una nueva por cada letra (si no, "atrás" iría letra por letra).
  function changeSearch(value) {
    setParams({ tipo: type, q: value }, { replace: true })
  }

  // Al hacer clic en una categoría se actualiza ?tipo= en la URL.
  function changeCategory(value) {
    setParams({ tipo: value, q: query })
  }

  // El filtro ya se aplica mientras se escribe; el botón "Buscar" solo
  // evita que el formulario recargue la página.
  function search(event) {
    event.preventDefault()
  }

  // Título y clase CSS según el modo.
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
          {/* Un botón por categoría usando .map(). key = valor único.
              aria-pressed marca visualmente/para lectores el botón activo.
              (En la versión HTML esto era onclick="filtrar('fuego')".) */}
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
            {/* Input controlado: su valor viene de la URL (query). */}
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
            {/* Una ProductCard por cada carta visible. Le pasamos la carta
                completa y la función addItem que recibimos de la página. */}
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
