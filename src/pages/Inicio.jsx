import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useEffect } from "react";
import { useLocation } from "react-router";


export function Inicio() {

    const location = useLocation();

    useEffect(() => {
        if (location.hash === "#contacto") {
            const contacto = document.getElementById("contacto");
            if(contacto){
                contacto.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    }, [location]);

    return <>
            
        <Header />

        <section className="categorias">
            <h2>Encuentra tus cartas por categoría</h2>

            <div className="lista-categorias">
                <button onclick="window.location.href = 'cartas.html'">⭐ Todas</button>

                <button onclick="window.location.href = 'cartas.html?tipo=fuego'">
                    🔥 Fuego
                </button>

                <button onclick="window.location.href = 'cartas.html?tipo=agua'">
                    💧 Agua
                </button>

                <button onclick="window.location.href = 'cartas.html?tipo=planta'">
                    🌿 Planta
                </button>

                <button onclick="window.location.href = 'cartas.html?tipo=electrico'">
                    ⚡ Eléctrico
                </button>

                <button onclick="window.location.href = 'cartas.html?tipo=psiquico'">
                    🔮 Psíquico
                </button>
            </div>
        </section>

        <main className="catalogo">
            <section className="seccion-cartas" id="cartas">
                <div className="buscador">
                    <input
                        type="text"
                        id="buscarCarta"
                        placeholder="Buscar carta Pokémon..."
                    />

                    <button>Buscar</button>
                </div>

                <h2>Cartas Destacadas</h2>

                <div className="grilla-productos">
                    <article className="card" data-tipo="planta" data-id="venusaur">
                        <div className="card-img">
                            <img
                                src="https://dz3we2x72f7ol.cloudfront.net/expansions/mega-evolution/es-es/JL2G_ES_3.png"
                                alt="Venusaur"
                            />
                            <span className="badge">-20% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Venusaur</h3>

                            <p className="card-price">
                                <span className="old-price">$55.990</span>
                                $44.792
                            </p>

                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="dragonite">
                        <div className="card-img">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qd-LVsziDa-_FbQpZEJ0B1Ez1lSlRmmbX3BPHohdiQ&s"
                                alt="Dragonite"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Dragonite</h3>

                            <p className="card-price">
                                <span className="old-price">$65.990</span>
                                $56.091
                            </p>

                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="fuego" data-id="charizard">
                        <div className="card-img">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrLwVAaOqd5CvoYBuXRWfIB3sbNTsBDG0AseNpxnp5-A&s=10"
                                alt="Charizard"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Charizard</h3>

                            <p className="card-price">$65.990</p>

                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="electrico" data-id="pikachu">
                        <div className="card-img">
                            <img
                                src="https://dz3we2x72f7ol.cloudfront.net/expansions/30th-celebration/es-mx/2M6P_LA_23.png"
                                alt="Pikachu"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Pikachu</h3>

                            <p className="card-price">$65.990</p>

                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="psiquico" data-id="mewtwo">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/10.png"
                                alt="Mewtwo"
                            />
                            <span className="badge">-20% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Mewtwo</h3>

                            <p className="card-price">$30.000</p>

                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="agua" data-id="blastoise">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/2.png"
                                alt="Blastoise"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Blastoise</h3>

                            <p className="card-price">$35.000</p>

                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="electrico" data-id="raichu">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/14.png"
                                alt="Raichu"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Raichu</h3>

                            <p className="card-price">$18.000</p>

                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>
                </div>
            </section>
        </main>

        <div className="ver-mas">
            <a href="cartas.html">Ver todas las cartas</a>
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
            <a href="nosotros.html">Conoce más sobre nosotros</a>
        </div>

        <section id="contacto" className="info-seccion">
            <h2>Contacto</h2>

            <p>¿Tienes alguna pregunta? Contáctanos.</p>
            <p>📧 Email: pokestore@gmail.com</p>
            <p>📱 Teléfono: +56 9 1234 5678</p>
        </section>

        <Footer />
    
    </>
 
}