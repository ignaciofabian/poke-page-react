// =============================================================================
// vite.config.js — CONFIGURACIÓN DE VITE (y también de VITEST)
// -----------------------------------------------------------------------------
// Vite: herramienta que levanta el servidor de desarrollo (npm run dev) y
// genera la versión final (npm run build).
// Vitest: el "test runner" (quien ejecuta los tests). Lee su configuración
// desde la sección "test" de este mismo archivo.
// =============================================================================

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Plugin que le enseña a Vite a entender JSX y React.
  plugins: [react()],
  test: {
    // Los tests corren en Node.js, que NO tiene navegador (no hay document,
    // window, localStorage...). jsdom SIMULA un navegador en memoria para
    // que podamos dibujar componentes y buscar elementos en los tests.
    environment: 'jsdom',
    // Permite usar describe/test/expect sin importarlos en cada archivo
    // (igual los tests de este proyecto los importan explícitamente).
    globals: true,
    // Archivo que se ejecuta ANTES de cada archivo de test (ver setup.js).
    setupFiles: './src/test/setup.js',
  }
})
