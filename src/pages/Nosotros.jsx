import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import "../assets/CSS/nosotros.css"
export function Nosotros() {

    return <>

        <Header />
        <main className="catalogo nosotros-contenido">
            <section className="nosotros-presentacion" aria-labelledby="nosotros-titulo">
                <img src="img/poke-bola.png" alt="" width="96" height="96" />
                <p className="nosotros-etiqueta">¡Bienvenido, entrenador!</p>
                <h1 id="nosotros-titulo">Sobre nosotros</h1>
                <p>En PokéStore compartimos la emoción de encontrar esa carta especial.
                    Somos una tienda dedicada a las cartas Pokémon y un espacio para
                    quienes disfrutan coleccionar, jugar y descubrir nuevos favoritos.</p>
                <div className="ver-mas"><a href="cartas.html">Explora nuestras cartas</a></div>
            </section>

            <section className="nosotros-seccion" aria-labelledby="mision-titulo">
                <h2 id="mision-titulo">Nuestra misión</h2>
                <p>Queremos acercar el mundo de las cartas Pokémon a todos los fanáticos,
                    desde quienes comienzan su primera colección hasta quienes buscan
                    completar su álbum. Cada colección tiene una historia y queremos
                    acompañarte en la tuya.</p>
            </section>

            <section className="nosotros-seccion" aria-labelledby="valores-titulo">
                <h2 id="valores-titulo">Lo que nos mueve</h2>
                <div className="nosotros-valores">
                    <article className="nosotros-valor">
                        <span aria-hidden="true">⚡</span>
                        <h3>Pasión Pokémon</h3>
                        <p>Nos entusiasman los Pokémon, sus historias y la emoción de descubrir una nueva carta favorita.</p>
                    </article>
                    <article className="nosotros-valor">
                        <span aria-hidden="true">🤝</span>
                        <h3>Comunidad</h3>
                        <p>Creemos en compartir esta afición con respeto y dar la bienvenida a nuevos coleccionistas.</p>
                    </article>
                    <article className="nosotros-valor">
                        <span aria-hidden="true">🌱</span>
                        <h3>Para comenzar y crecer</h3>
                        <p>No importa cuántas cartas tengas: lo mejor es disfrutar cada paso de tu colección.</p>
                    </article>
                </div>
            </section>

            <section className="nosotros-consejos" aria-labelledby="consejos-titulo">
                <h2 id="consejos-titulo">Cuida tu colección</h2>
                <ul>
                    <li>Usa fundas para proteger tus cartas de rayones.</li>
                    <li>Guárdalas en un álbum, lejos de la humedad y del sol directo.</li>
                    <li>Ordénalas por tipo, expansión o Pokémon favorito para encontrarlas fácilmente.</li>
                </ul>
            </section>

            <section className="nosotros-seccion nosotros-contacto" aria-labelledby="contacto-titulo">
                <h2 id="contacto-titulo">Tu próxima aventura comienza aquí</h2>
                <p>¿Tienes alguna pregunta? Nos encantará saber de ti.</p>
                <div className="ver-mas"><a href="index.html#contacto">Contáctanos</a></div>
            </section>
        </main>

        <Footer />

    </>
}