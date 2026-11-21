import { expect, test, vi } from 'vitest'
import { authenticateUser } from '../services/userService'

test('envía las credenciales a la API y conserva el error de acceso', async () => {
  vi.mocked(fetch).mockResolvedValue({ ok: false, status: 401 })
  await expect(authenticateUser(' A@DEMO.CL ', 'prueba')).rejects.toMatchObject({ status: 401 })
  expect(fetch).toHaveBeenCalledWith('/api/v1/auth/iniciar-sesion', expect.objectContaining({
    method: 'POST', body: JSON.stringify({ email: 'a@demo.cl', password: 'prueba' })
  }))
})
