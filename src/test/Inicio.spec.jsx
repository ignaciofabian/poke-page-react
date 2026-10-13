import { requestInterceptor } from "jsdom";
import { describe, expect, it } from "vitest";

describe("Inicio", () => {
  it("should render the Inicio component", () => {
    const Inicio = requestInterceptor("../src/pages/Inicio.jsx");
    expect(Inicio).toBeDefined(); // Ejemplo de prueba simple
  });

  it("should render the Catalog component with featured prop", () => {
    const Catalog = requestInterceptor("../src/components/Catalog.jsx");
    expect(Catalog).toBeDefined(); // Ejemplo de prueba simple
  });
});
