// =============================================================================
// Inicio.jsx — PÁGINA / (home)
// -----------------------------------------------------------------------------
// Muestra las cartas destacadas, una sección "Nosotros" y "Contacto".
// Equivale al index.html de la versión original.
// =============================================================================

import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Catalog } from '../components/Catalog'
export function Inicio({ addItem }) {
  const location = useLocation()

  // Si la URL es "/#contacto" (link "Contacto" del menú), bajamos suavemente
  // hasta la sección de contacto. Se hace en un useEffect porque:
  //   1) hay que esperar a que React dibuje la página (antes el elemento
  //      #contacto no existe todavía), y
  //   2) document.getElementById/scrollIntoView es "tocar el DOM" directo,
  //      algo externo a React = efecto secundario.
  // [location] -> se vuelve a ejecutar cada vez que cambia la URL.
  useEffect(() => {
    if (location.hash === '#contacto') {
      const contact = document.getElementById('contacto')
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])
  return (
    <>
      {/* "featured" sin valor = featured={true}: solo cartas destacadas. */}
      <Catalog featured addItem={addItem} />
      <div className="ver-mas">
        {/* Antes: <a href="cartas.html">. Ahora Link, sin recargar. */}
        <Link to="/cartas">Ver todas las cartas</Link>
      </div>
      <section id="nosotros" className="info-seccion">
        <h2>Nosotros</h2>
        <p>
          Somos una tienda dedicada a la venta y colección de cartas Pokémon.
          Nuestro objetivo es ofrecer cartas para todos los fanáticos y
          coleccionistas.
        </p>
      </section>
      <div className="ver-mas">
        <Link to="/nosotros">Conoce más sobre nosotros</Link>
      </div>
      <section id="contacto" className="info-seccion">
        <h2>Contacto</h2>
        <p>¿Tienes alguna pregunta? Contáctanos.</p>
        {/* Para enlaces externos (mail, teléfono, otros sitios) se sigue
            usando <a href>; Link es solo para rutas internas de la app. */}
        <p>
          📧 <a href="mailto:pokestore@gmail.com">pokestore@gmail.com</a>
        </p>
        <p>
          📱 <a href="tel:+56912345678">+56 9 1234 5678</a>
        </p>
      </section>
    </>
  )
}
