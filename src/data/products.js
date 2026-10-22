// =============================================================================
// products.js — DATOS DE LAS CARTAS (catálogo inicial)
// -----------------------------------------------------------------------------
// No hay base de datos: las cartas son un array de objetos escrito a mano.
// Cada carta tiene:
//   id    -> identificador único, se usa en la URL (/productos/pikachu)
//   type  -> tipo, se usa para filtrar (?tipo=fuego)
//   name  -> nombre visible
//   price -> precio en pesos chilenos (número)
//   image -> URL de la imagen
//
// "export const" permite importarlo en otros archivos con
//   import { products } from '../data/products'
//
// IMPORTANTE: productService.js MODIFICA este mismo array cuando el admin
// agrega/edita/elimina cartas (y lo guarda en localStorage). Por eso todos
// los componentes que importan "products" ven los cambios del admin.
// =============================================================================
export const products = [
  {
    id: 'pikachu',
    type: 'electrico',
    name: 'Pikachu',
    price: 15000,
    image: 'https://images.pokemontcg.io/base1/58.png',
  },
  {
    id: 'charizard',
    type: 'fuego',
    name: 'Charizard',
    price: 50000,
    image: 'https://images.pokemontcg.io/base1/4.png',
  },
  {
    id: 'blastoise',
    type: 'agua',
    name: 'Blastoise',
    price: 35000,
    image: 'https://images.pokemontcg.io/base1/2.png',
  },
  {
    id: 'venusaur',
    type: 'planta',
    name: 'Venusaur',
    price: 30000,
    image: 'https://images.pokemontcg.io/base1/15.png',
  },
  {
    id: 'bulbasaur',
    type: 'planta',
    name: 'Bulbasaur',
    price: 8000,
    image: 'https://images.pokemontcg.io/base1/44.png',
  },
  {
    id: 'charmander',
    type: 'fuego',
    name: 'Charmander',
    price: 9000,
    image: 'https://images.pokemontcg.io/base1/46.png',
  },
  {
    id: 'squirtle',
    type: 'agua',
    name: 'Squirtle',
    price: 8000,
    image: 'https://images.pokemontcg.io/base1/63.png',
  },
  {
    id: 'caterpie',
    type: 'planta',
    name: 'Caterpie',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/45.png',
  },
  {
    id: 'metapod',
    type: 'planta',
    name: 'Metapod',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/54.png',
  },
  {
    id: 'butterfree',
    type: 'planta',
    name: 'Butterfree',
    price: 10000,
    image: 'https://images.pokemontcg.io/base1/33.png',
  },
  {
    id: 'weedle',
    type: 'planta',
    name: 'Weedle',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/69.png',
  },
  {
    id: 'kakuna',
    type: 'planta',
    name: 'Kakuna',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/33.png',
  },
  {
    id: 'beedrill',
    type: 'planta',
    name: 'Beedrill',
    price: 9000,
    image: 'https://images.pokemontcg.io/base1/17.png',
  },
  {
    id: 'pidgey',
    type: 'normal',
    name: 'Pidgey',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/57.png',
  },
  {
    id: 'pidgeotto',
    type: 'normal',
    name: 'Pidgeotto',
    price: 6000,
    image: 'https://images.pokemontcg.io/base1/22.png',
  },
  {
    id: 'rattata',
    type: 'normal',
    name: 'Rattata',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/61.png',
  },
  {
    id: 'spearow',
    type: 'normal',
    name: 'Spearow',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/62.png',
  },
  {
    id: 'ekans',
    type: 'planta',
    name: 'Ekans',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/46.png',
  },
  {
    id: 'raichu',
    type: 'electrico',
    name: 'Raichu',
    price: 18000,
    image: 'https://images.pokemontcg.io/base1/14.png',
  },
  {
    id: 'sandshrew',
    type: 'lucha',
    name: 'Sandshrew',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/64.png',
  },
  {
    id: 'nidoran',
    type: 'planta',
    name: 'Nidoran',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/55.png',
  },
  {
    id: 'nidorino',
    type: 'planta',
    name: 'Nidorino',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/37.png',
  },
  {
    id: 'clefairy',
    type: 'normal',
    name: 'Clefairy',
    price: 9000,
    image: 'https://images.pokemontcg.io/base1/5.png',
  },
  {
    id: 'vulpix',
    type: 'fuego',
    name: 'Vulpix',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/68.png',
  },
  {
    id: 'jigglypuff',
    type: 'normal',
    name: 'Jigglypuff',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/54.png',
  },
  {
    id: 'zubat',
    type: 'planta',
    name: 'Zubat',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/57.png',
  },
  {
    id: 'oddish',
    type: 'planta',
    name: 'Oddish',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/63.png',
  },
  {
    id: 'paras',
    type: 'planta',
    name: 'Paras',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/59.png',
  },
  {
    id: 'venonat',
    type: 'planta',
    name: 'Venonat',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/63.png',
  },
  {
    id: 'diglett',
    type: 'lucha',
    name: 'Diglett',
    price: 4000,
    image: 'https://images.pokemontcg.io/base1/47.png',
  },
  {
    id: 'meowth',
    type: 'normal',
    name: 'Meowth',
    price: 6000,
    image: 'https://images.pokemontcg.io/base1/56.png',
  },
  {
    id: 'psyduck',
    type: 'agua',
    name: 'Psyduck',
    price: 6000,
    image: 'https://images.pokemontcg.io/base1/53.png',
  },
  {
    id: 'mankey',
    type: 'lucha',
    name: 'Mankey',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/55.png',
  },
  {
    id: 'growlithe',
    type: 'fuego',
    name: 'Growlithe',
    price: 7000,
    image: 'https://images.pokemontcg.io/base1/28.png',
  },
  {
    id: 'poliwag',
    type: 'agua',
    name: 'Poliwag',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/59.png',
  },
  {
    id: 'abra',
    type: 'psiquico',
    name: 'Abra',
    price: 6000,
    image: 'https://images.pokemontcg.io/base1/43.png',
  },
  {
    id: 'machop',
    type: 'lucha',
    name: 'Machop',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/52.png',
  },
  {
    id: 'magnemite',
    type: 'electrico',
    name: 'Magnemite',
    price: 5000,
    image: 'https://images.pokemontcg.io/base1/53.png',
  },
  {
    id: 'gastly',
    type: 'psiquico',
    name: 'Gastly',
    price: 6000,
    image: 'https://images.pokemontcg.io/base1/33.png',
  },
  {
    id: 'mewtwo',
    type: 'psiquico',
    name: 'Mewtwo',
    price: 30000,
    image: 'https://images.pokemontcg.io/base1/10.png',
  },
]

// Función para mostrar precios en formato chileno: money(15000) -> "$15.000".
// Es una FUNCIÓN FLECHA guardada en una constante; equivale a:
//   export function money(value) { return new Intl.NumberFormat(...).format(value) }
// Intl.NumberFormat es una herramienta nativa de JS para formatear números
// según el país ('es-CL') y la moneda ('CLP').
export const money = (value) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(
    value,
  )
