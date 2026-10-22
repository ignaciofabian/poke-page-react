// =============================================================================
// Cartas.jsx — PÁGINA /cartas (catálogo completo)
// -----------------------------------------------------------------------------
// Es la página más simple: solo reutiliza el componente Catalog (sin
// "featured", así que muestra todas las cartas). Demuestra la ventaja de los
// componentes: Inicio y Cartas comparten el mismo catálogo sin copiar código.
// =============================================================================

import { Catalog } from '../components/Catalog'
// addItem llega desde App.jsx (<Cartas addItem={addItem} />) y se pasa tal
// cual al Catalog, que a su vez lo pasa a cada ProductCard.
// Pasar una prop por varios niveles así se llama "prop drilling".
export function Cartas({ addItem }) {
  return (
    <>
      <Catalog addItem={addItem} />
    </>
  )
}
