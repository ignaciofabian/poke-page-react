// =============================================================================
// usuarios.js — USUARIOS DE PRUEBA
// -----------------------------------------------------------------------------
// Tres cuentas normales (rol 'user') para probar la app. La primera vez que
// se ejecuta getUsers() (userService.js) se copian a localStorage.
// El administrador NO está aquí: sus datos están en userService.js
// (ADMIN_EMAIL / ADMIN_PASSWORD).
// Los tests (Usuarios.test.jsx) usan este mismo array con test.each para
// probar el login de cada usuario.
// =============================================================================
export const usuariosIniciales = [
  {
    id: 1,
    name: 'Ignacio',
    email: 'ignacio@pokestore.cl',
    password: '123456',
    role: 'user'
  },
  {
    id: 2,
    name: 'Bryan',
    email: 'bryan@pokestore.cl',
    password: '123456',
    role: 'user'
  },
  {
    id: 3,
    name: 'Felipe',
    email: 'felipe@pokestore.cl',
    password: '123456',
    role: 'user'
  }
]
