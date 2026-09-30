import "../assets/CSS/layout.css"

export function Footer () {
    return <>
    <footer>
      <div className="footer-contenedor">
        <div className="footer-col footer-marca">
          <h3>PokéStore</h3>
          <p>Tu tienda de cartas Pokémon</p>
        </div>

        <div className="footer-col">
          <h4>Categorías</h4>
          <ul className="footer-links">
            <li><a href="cartas.html?tipo=fuego">Fuego</a></li>
            <li><a href="cartas.html?tipo=agua">Agua</a></li>
            <li><a href="cartas.html?tipo=planta">Planta</a></li>
            <li><a href="cartas.html?tipo=electrico">Eléctrico</a></li>
            <li><a href="cartas.html?tipo=psiquico">Psíquico</a></li>
            <li><a href="cartas.html?tipo=normal">Normal</a></li>
            <li><a href="cartas.html?tipo=lucha">Lucha</a></li>
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
          <form id="formNewsletter" className="newsletter-form">
            <label for="inputNewsletter">Correo electrónico</label>
            <input type="email" id="inputNewsletter" name="inputNewsletter" placeholder="tu@correo.com" required />
            <button type="submit">Suscribirme</button>
            <span className="form-error" id="errorNewsletter"></span>
          </form>
        </div>
      </div>

      <p className="footer-copy">© 2026 PokéStore - Todos los derechos reservados</p>
    </footer>
    </>
}