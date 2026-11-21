import { expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'

test.each([true, false])('inicia y cierra sesión con Recordarme=%s', async remember => {
  const token = 'header.' + btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })) + '.signature'
  vi.mocked(fetch).mockImplementation(async path => ({
    ok: true, json: async () => path.endsWith('/cards') ? [] :
      { email: 'ana@example.com', nombre: 'Ana', rol: 'admin', token }
  }))
  render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>)
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@example.com' } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'prueba' } })
  if (remember) fireEvent.click(screen.getByLabelText('Recordarme'))
  fireEvent.click(screen.getByRole('button', { name: 'INICIAR SESIÓN' }))
  expect(await screen.findByLabelText('Nombre')).toHaveValue('Ana')
  expect(screen.getByRole('link', { name: 'Admin' })).toBeInTheDocument()
  const storage = remember ? localStorage : sessionStorage
  expect(JSON.parse(storage.getItem('pokestore-user')).token).toBe(token)
  fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
  expect(storage.getItem('pokestore-user')).toBeNull()
})
