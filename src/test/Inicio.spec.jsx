// =============================================================================
// Inicio.spec.jsx — PRUEBAS DE LA PÁGINA DE INICIO Y DEL CATÁLOGO
// -----------------------------------------------------------------------------
// ".spec.jsx" y ".test.jsx" son equivalentes: Vitest ejecuta ambos.
// Aquí se usa "it" en vez de "test" (son exactamente lo mismo; "it" se lee
// como frase en inglés: "it shows...").
// =============================================================================

// NOTA: requestInterceptor de jsdom no es necesario para estos tests (ver
// comentario en los "it" de abajo). Las verificaciones reales son las que
// usan render + screen.
import { requestInterceptor } from "jsdom";
import { describe, expect, it } from "vitest";
// screen: representa la "pantalla" del navegador simulado; sirve para
// BUSCAR elementos como lo haría un usuario (por rol, texto, label...).
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
// "import { Inicio as PaginaInicio }" importa Inicio y le cambia el nombre
// a PaginaInicio dentro de este archivo (alias).
import { Inicio as PaginaInicio } from '../pages/Inicio'
import { Catalog as Catalogo } from '../components/Catalog'

describe("Inicio", () => {
  it("muestra la página de inicio con contacto y acceso al catálogo", () => {
    // Estas dos líneas solo comprueban que la llamada devuelva "algo"
    // (toBeDefined = no es undefined). No prueban el componente en sí.
    const Inicio = requestInterceptor("../src/pages/Inicio.jsx");
    expect(Inicio).toBeDefined(); // Ejemplo de prueba simple
    // Se dibuja SOLO la página Inicio (no toda la App). Necesita un Router
    // porque usa Link y useLocation.
    render(<MemoryRouter><PaginaInicio /></MemoryRouter>)
    // getByRole('heading', { name: 'Contacto' }) busca un título (h1..h6)
    // con ese texto. Si no existe, getBy... lanza error y el test falla.
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument()
    // Busca un enlace por su texto y verifica a dónde apunta.
    expect(screen.getByRole('link', { name: 'Ver todas las cartas' })).toHaveAttribute('href', '/cartas')
  });

  it("muestra cartas destacadas y excluye las que no son destacadas", () => {
    const Catalog = requestInterceptor("../src/components/Catalog.jsx");
    expect(Catalog).toBeDefined(); // Ejemplo de prueba simple
    // Se prueba el componente Catalog aislado, con la prop featured.
    render(<MemoryRouter><Catalogo featured /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Cartas destacadas' })).toBeInTheDocument()
    // Pikachu es destacada -> debe aparecer.
    expect(screen.getByRole('heading', { name: 'Pikachu' })).toBeInTheDocument()
    // queryBy... devuelve null si no encuentra (en vez de lanzar error).
    // Por eso se usa para comprobar que algo NO está: .not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Bulbasaur' })).not.toBeInTheDocument()
  });
});
