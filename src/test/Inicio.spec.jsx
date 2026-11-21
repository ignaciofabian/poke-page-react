import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'

test('filtra las cartas de la API y suma su precio desde el detalle', async () => {
  const cards = [
    { id: 'a', name: 'Carta A', type: 'agua', price: 900, image: '/a.png' },
    { id: 'b', name: 'Carta B', type: 'fuego', price: 200, image: '/b.png' }
  ]
  vi.mocked(fetch).mockResolvedValue({ ok: true, json: async () => cards })
  render(<MemoryRouter initialEntries={['/cartas']}><App /></MemoryRouter>)
  await screen.findByRole('heading', { name: 'Carta B' })
  fireEvent.click(screen.getByRole('button', { name: /Agua/ }))
  expect(screen.queryByRole('heading', { name: 'Carta B' })).toBeNull()
  fireEvent.click(within(screen.getByRole('heading', { name: 'Carta A' })).getByRole('link'))
  fireEvent.click(screen.getByRole('button', { name: 'Sumar cantidad' }))
  fireEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }))
  const drawer = screen.getByRole('complementary', { name: 'Tu carrito' })
  expect(within(drawer).getByText(/1\.800/)).toBeInTheDocument()
})
