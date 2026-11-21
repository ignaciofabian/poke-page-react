import { request } from './api'
export async function getProducts(signal) {
  const cards = await request('/cards', { signal })
  if (!Array.isArray(cards) || !cards.every(card => card && typeof card.id === 'string' &&
    typeof card.name === 'string' && typeof card.type === 'string' && typeof card.image === 'string' &&
    Number.isFinite(card.price))) throw new Error('Respuesta de cartas inválida')
  return cards
}
