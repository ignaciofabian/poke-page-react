import { describe, expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from '../App'

describe('Acciones de los usuarios', () => {
  test('permite agregar una carta, cambiar su cantidad y quitarla del carrito', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/productos/pikachu']}><App /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'A\u00f1adir al carrito' }))
    const carrito = within(screen.getByRole('complementary', { name: 'Tu carrito' }))
    expect(carrito.getByRole('link', { name: 'Pikachu' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('pokestore-cart'))).toEqual([{ id: 'pikachu', quantity: 1 }])
    await user.click(carrito.getByRole('button', { name: 'Sumar Pikachu' }))
    expect(JSON.parse(localStorage.getItem('pokestore-cart'))).toEqual([{ id: 'pikachu', quantity: 2 }])
    await user.click(carrito.getByRole('button', { name: 'Restar Pikachu' }))
    expect(JSON.parse(localStorage.getItem('pokestore-cart'))).toEqual([{ id: 'pikachu', quantity: 1 }])
    await user.click(carrito.getByRole('button', { name: 'Quitar' }))
    expect(carrito.getByText(/Tu carrito est\u00e1 vac\u00edo/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('pokestore-cart'))).toEqual([])
  })

  test('permite navegar al catalogo y buscar una carta por nombre', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><App /></MemoryRouter>)
    await user.click(screen.getByRole('link', { name: 'Ver todas las cartas' }))
    expect(screen.getByRole('heading', { name: 'Cat\u00e1logo de cartas' })).toBeInTheDocument()
    await user.type(screen.getByRole('searchbox', { name: 'Buscar carta Pok\u00e9mon' }), 'Pikachu')
    expect(screen.getByRole('heading', { name: 'Pikachu' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Charizard' })).not.toBeInTheDocument()
    expect(screen.getByText('1 cartas encontradas')).toBeInTheDocument()
  })

  test('permite iniciar sesion como Ignacio y cerrar la sesion', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>)
    await user.type(screen.getByLabelText('Correo electr\u00f3nico'), 'ignacio@pokestore.cl')
    await user.type(screen.getByLabelText('Contrase\u00f1a'), '123456')
    await user.click(screen.getByRole('button', { name: 'INICIAR SESI\u00d3N' }))
    expect(screen.getByLabelText('Nombre')).toHaveValue('Ignacio')
    expect(JSON.parse(sessionStorage.getItem('pokestore-user')).email).toBe('ignacio@pokestore.cl')
    await user.click(screen.getByRole('button', { name: 'Cerrar sesi\u00f3n' }))
    expect(screen.getByRole('button', { name: 'INICIAR SESI\u00d3N' })).toBeInTheDocument()
    expect(sessionStorage.getItem('pokestore-user')).toBeNull()
    expect(localStorage.getItem('pokestore-user')).toBeNull()
  })
})
