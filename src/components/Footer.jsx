// =============================================================================
// Footer.jsx — PIE DE PÁGINA + FORMULARIO DE NEWSLETTER
// -----------------------------------------------------------------------------
// A diferencia del Header, este componente SÍ tiene estado propio (useState),
// porque el correo escrito y el mensaje solo le importan a él.
// Regla general: el estado vive en el componente más bajo que lo necesite;
// solo se "sube" a App cuando varias páginas lo comparten.
// =============================================================================

import '../assets/CSS/layout.css'
import { useState } from 'react'
import { Link } from 'react-router'

export function Footer() {
  // message: texto que se muestra después de suscribirse.
  const [message, setMessage] = useState('')
  // email: lo que el usuario escribe en el input (ver "input controlado" abajo).
  const [email, setEmail] = useState('')

  // Se ejecuta al enviar el formulario.
  function subscribe(event) {
    // Por defecto un <form> recarga la página al enviarse. En una SPA no
    // queremos eso (perderíamos el estado), así que lo evitamos.
    event.preventDefault()
    const savedEmail = email.trim().toLowerCase()
    let saved
    // Leer la lista de correos guardados. "|| '[]'" significa: si getItem
    // devuelve null (no hay nada guardado), usar el texto '[]' (array vacío).
    try {
      saved = JSON.parse(localStorage.getItem('pokestore-newsletter') || '[]')
    } catch {
      saved = []
    }
    // Por si lo guardado no era un array (dato corrupto).
    if (!Array.isArray(saved)) saved = []
    // .includes() -> true si el array ya contiene ese valor (evita duplicados).
    if (!saved.includes(savedEmail)) {
      saved.push(savedEmail)
    }
    localStorage.setItem('pokestore-newsletter', JSON.stringify(saved))
    setMessage('Gracias. Hemos registrado tu correo.')
    // Limpiar el input: como es controlado, basta con cambiar el estado.
    setEmail('')
  }
  return (
    <>
      <footer>
        <div className="footer-contenedor">
          <div className="footer-col footer-marca">
            <h3>PokéStore</h3>
            <p>Tu tienda de cartas Pokémon</p>
          </div>

          <div className="footer-col">
            <h4>Categorías</h4>
            {/* Enlaces con "query string" (?tipo=...). El componente Catalog
                lee ese parámetro y filtra las cartas por tipo. */}
            <ul className="footer-links">
              <li>
                <Link to="/cartas?tipo=fuego">Fuego</Link>
              </li>
              <li>
                <Link to="/cartas?tipo=agua">Agua</Link>
              </li>
              <li>
                <Link to="/cartas?tipo=planta">Planta</Link>
              </li>
              <li>
                <Link to="/cartas?tipo=electrico">Eléctrico</Link>
              </li>
              <li>
                <Link to="/cartas?tipo=psiquico">Psíquico</Link>
              </li>
              <li>
                <Link to="/cartas?tipo=normal">Normal</Link>
              </li>
              <li>
                <Link to="/cartas?tipo=lucha">Lucha</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Medios de pago</h4>
            <ul className="footer-pagos">
              <li title="Visa">💳 Visa</li>
              <li title="Mastercard">💳 Mastercard</li>
              <li title="Webpay">🏦 Webpay</li>
              <li title="PayPal">💰 PayPal</li>
            </ul>
          </div>

          <div className="footer-col footer-newsletter">
            <h4>Newsletter</h4>
            <p>Recibe ofertas y novedades en tu correo.</p>
            {/* onSubmit: se ejecuta al presionar el botón submit o Enter. */}
            <form
              id="formNewsletter"
              className="newsletter-form"
              onSubmit={subscribe}
            >
              {/* htmlFor (no "for", que es palabra reservada en JS) conecta
                  el label con el input del mismo id. */}
              <label htmlFor="inputNewsletter">Correo electrónico</label>
              {/* INPUT CONTROLADO: el valor del input viene del estado
                  (value={email}) y cada tecla actualiza el estado
                  (onChange). Así React siempre "sabe" qué hay escrito.
                  event.target es el input; event.target.value es su texto. */}
              <input
                type="email"
                id="inputNewsletter"
                name="inputNewsletter"
                placeholder="tu@correo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button type="submit">Suscribirme</button>
              {/* role="status": los lectores de pantalla leen el mensaje
                  cuando cambia (accesibilidad). */}
              <span role="status">{message}</span>
            </form>
          </div>
        </div>

        <p className="footer-copy">
          © 2026 PokéStore - Todos los derechos reservados
        </p>
      </footer>
    </>
  )
}
