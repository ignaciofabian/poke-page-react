export const products = [
  {
    id: 'pikachu',
    type: 'electrico',
    name: 'Pikachu',
    price: 15000,
    image: 'https://images.pokemontcg.io/base1/58.png',
  }
]

export const money = (value) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(
    value,
  )
