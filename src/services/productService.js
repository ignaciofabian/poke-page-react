// =============================================================================
// productService.js — SERVICIO DE CARTAS (lo usa el panel Admin)
// -----------------------------------------------------------------------------
// Un "service" es un archivo de JS normal (no es un componente, no tiene JSX)
// que agrupa la lógica de datos: leer, agregar, editar, borrar y guardar.
// Así los componentes solo se preocupan de la pantalla.
// =============================================================================

import { products } from '../data/products'

// servicio para administrar las cartas.
// modifica la misma lista "products" que usan las demas paginas
// y la guarda en localStorage para no perder los cambios al recargar.
const KEY = 'pokestore-products'

// copia de las cartas originales para poder restaurarlas
// ({ ...product }) usa SPREAD EN OBJETOS: crea un objeto NUEVO con las mismas
// propiedades. Si no copiáramos, originalProducts apuntaría a los mismos
// objetos y al editar una carta también cambiaría la "original".
// (Los paréntesis alrededor de { } son necesarios para que la función flecha
// devuelva un objeto y no lo confunda con el cuerpo de la función.)
const originalProducts = products.map((product) => ({ ...product }))

// al cargar la pagina, usar las cartas guardadas si existen
// Este código está suelto (fuera de una función), así que se ejecuta UNA vez,
// cuando el archivo se importa por primera vez al abrir la app.
try {
  const saved = JSON.parse(localStorage.getItem(KEY))
  if (Array.isArray(saved)) {
    // splice(inicio, cantidadABorrar, ...nuevos) modifica el array en el lugar:
    // borra todo (desde 0, products.length elementos) e inserta las guardadas.
    // ...saved (SPREAD en argumentos) pasa cada carta como argumento separado.
    // Se usa splice y no "products = saved" porque products es una constante
    // importada: hay que cambiar su CONTENIDO, no reemplazarla.
    products.splice(0, products.length, ...saved)
  }
} catch {
  // si hay un error se quedan las cartas originales
}

// Guarda la lista actual en localStorage (como texto JSON).
function save() {
  localStorage.setItem(KEY, JSON.stringify(products))
}

// Devuelve una COPIA de la lista ([...products]). El componente Admin la
// guarda en su estado; si devolviéramos el mismo array, React no notaría el
// cambio al hacer setProducts (sería "el mismo" array).
export function getProducts() {
  return [...products]
}

export function addProduct(name, type, price, image) {
  // crear el id a partir del nombre, ej: "Mr Mime" -> "mr-mime"
  let id = name.toLowerCase().replaceAll(' ', '-')
  // Si ya existe una carta con ese id, le agregamos un número único.
  if (products.find((product) => product.id === id)) {
    id = id + '-' + Date.now()
  }
  products.push({
    id: id,
    type: type,
    name: name,
    price: price,
    // Si no se escribió imagen ('' es falso) se usa la pokébola por defecto.
    image: image || '/img/poke-bola.png'
  })
  save()
}

export function updateProduct(id, name, type, price, image) {
  const product = products.find((product) => product.id === id)
  if (product) {
    // find devuelve el MISMO objeto que está dentro del array, así que al
    // cambiar sus propiedades se cambia la carta dentro de products.
    product.name = name
    product.type = type
    product.price = price
    product.image = image || '/img/poke-bola.png'
    save()
  }
}

export function deleteProduct(id) {
  // findIndex devuelve la posición (0, 1, 2...) o -1 si no la encuentra.
  const index = products.findIndex((product) => product.id === id)
  if (index !== -1) {
    // splice(posicion, 1) elimina 1 elemento en esa posición.
    products.splice(index, 1)
    save()
  }
}

// Vuelve al catálogo original y borra los cambios guardados.
export function resetProducts() {
  products.splice(0, products.length, ...originalProducts)
  localStorage.removeItem(KEY)
}
