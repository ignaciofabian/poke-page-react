const base = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')
export async function request(path, options) {
  const response = await fetch(base + path, options)
  if (!response.ok) {
    const detail = await response.json?.().catch(() => ({}))
    const error = new Error(detail?.error || 'Error de la API')
    error.status = response.status
    throw error
  }
  return response.json()
}

export function send(path, method, token, body) {
  return request(path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token && {Authorization: 'Bearer ' + token}) },
    body: body === undefined ? undefined : JSON.stringify(body)
  })
}
