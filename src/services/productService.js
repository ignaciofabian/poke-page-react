import { products } from '../data/products'

// servicio para administrar las cartas.
// modifica la misma lista "products" que usan las demas paginas
// y la guarda en localStorage para no perder los cambios al recargar.
const KEY = 'pokestore-products'

// copia de las cartas originales para poder restaurarlas
const originalProducts = products.map((product) => ({ ...product }))

// al cargar la pagina, usar las cartas guardadas si existen
try {
  const saved = JSON.parse(localStorage.getItem(KEY))
  if (Array.isArray(saved)) {
    products.splice(0, products.length, ...saved)
  }
} catch {
  // si hay un error se quedan las cartas originales
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(products))
}

export function getProducts() {
  return [...products]
}

export function addProduct(name, type, price, image) {
  // crear el id a partir del nombre, ej: "Mr Mime" -> "mr-mime"
  let id = name.toLowerCase().replaceAll(' ', '-')
  if (products.find((product) => product.id === id)) {
    id = id + '-' + Date.now()
  }
  products.push({
    id: id,
    type: type,
    name: name,
    price: price,
    image: image || '/img/poke-bola.png'
  })
  save()
}

export function updateProduct(id, name, type, price, image) {
  const product = products.find((product) => product.id === id)
  if (product) {
    product.name = name
    product.type = type
    product.price = price
    product.image = image || '/img/poke-bola.png'
    save()
  }
}

export function deleteProduct(id) {
  const index = products.findIndex((product) => product.id === id)
  if (index !== -1) {
    products.splice(index, 1)
    save()
  }
}

export function resetProducts() {
  products.splice(0, products.length, ...originalProducts)
  localStorage.removeItem(KEY)
}
