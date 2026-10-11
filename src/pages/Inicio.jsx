import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Catalog } from '../components/Catalog'
export function Inicio({ addItem }) {
  const location = useLocation()
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
      <Catalog featured addItem={addItem} />
      <div className="ver-mas">
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
