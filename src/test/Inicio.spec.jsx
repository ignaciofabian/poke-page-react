import { requestInterceptor } from "jsdom";
import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Inicio as PaginaInicio } from '../pages/Inicio'
import { Catalog as Catalogo } from '../components/Catalog'

describe("Inicio", () => {
  it("muestra la página de inicio con contacto y acceso al catálogo", () => {
    const Inicio = requestInterceptor("../src/pages/Inicio.jsx");
    expect(Inicio).toBeDefined(); // Ejemplo de prueba simple
    render(<MemoryRouter><PaginaInicio /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver todas las cartas' })).toHaveAttribute('href', '/cartas')
  });

  it("muestra cartas destacadas y excluye las que no son destacadas", () => {
    const Catalog = requestInterceptor("../src/components/Catalog.jsx");
    expect(Catalog).toBeDefined(); // Ejemplo de prueba simple
    render(<MemoryRouter><Catalogo featured /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Cartas destacadas' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Pikachu' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Bulbasaur' })).not.toBeInTheDocument()
  });
});
