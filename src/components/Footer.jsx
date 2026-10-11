import '../assets/CSS/layout.css'
import { useState } from 'react'
import { Link } from 'react-router'

export function Footer() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  function subscribe(event) {
    event.preventDefault()
    const savedEmail = email.trim().toLowerCase()
    let saved
    try {
      saved = JSON.parse(localStorage.getItem('pokestore-newsletter') || '[]')
    } catch {
      saved = []
    }
    if (!Array.isArray(saved)) saved = []
    if (!saved.includes(savedEmail)) {
      saved.push(savedEmail)
    }
    localStorage.setItem('pokestore-newsletter', JSON.stringify(saved))
    setMessage('Gracias. Hemos registrado tu correo.')
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
            <form
              id="formNewsletter"
              className="newsletter-form"
              onSubmit={subscribe}
            >
              <label htmlFor="inputNewsletter">Correo electrónico</label>
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
