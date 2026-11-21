import { expect, test, vi } from 'vitest'
import { getProducts } from '../services/productService'

test('rechaza un catálogo con precios inválidos', async () => {
  vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => [{ id: 'agua', price: null }] })
  await expect(getProducts()).rejects.toThrow('Respuesta de cartas inválida')
})
