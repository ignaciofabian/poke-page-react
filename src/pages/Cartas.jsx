
export function Cartas() {

    return <>
        
        <section className="categorias">
            <h2>Categorías</h2>

            <div className="lista-categorias">
                <button data-categoria="todos">⭐ Todos</button>
                <button data-categoria="fuego">🔥 Fuego</button>
                <button data-categoria="agua">💧 Agua</button>
                <button data-categoria="planta">🌿 Planta</button>
                <button data-categoria="electrico">⚡ Eléctrico</button>
                <button data-categoria="psiquico">🔮 Psíquico</button>
                <button data-categoria="normal">⚪ Normal</button>
                <button data-categoria="lucha">🥊 Lucha</button>
            </div>
        </section>

        <main className="catalogo">
            <section className="seccion-cartas">
                <div className="buscador">
                    <input
                        type="text"
                        id="buscarCarta"
                        placeholder="Buscar carta Pokémon..."
                    />
                    <button>Buscar</button>
                </div>

                <div className="grilla-productos pagina-cartas">

                    <article className="card" data-tipo="electrico" data-id="pikachu">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/58.png"
                                alt="Pikachu"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Pikachu</h3>
                            <p className="card-price">$15.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>


                    <article className="card" data-tipo="fuego" data-id="charizard">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/4.png"
                                alt="Charizard"
                            />
                            <span className="badge">-20% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Charizard</h3>
                            <p className="card-price">$50.000</p>
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


                    <article className="card" data-tipo="planta" data-id="venusaur">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/15.png"
                                alt="Venusaur"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Venusaur</h3>
                            <p className="card-price">$30.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>


                    <article className="card" data-tipo="planta" data-id="bulbasaur">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/44.png"
                                alt="Bulbasaur"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Bulbasaur</h3>
                            <p className="card-price">$8.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>


                    <article className="card" data-tipo="fuego" data-id="charmander">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/46.png"
                                alt="Charmander"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Charmander</h3>
                            <p className="card-price">$9.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>


                    <article className="card" data-tipo="agua" data-id="squirtle">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/63.png"
                                alt="Squirtle"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Squirtle</h3>
                            <p className="card-price">$8.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>


                    <article className="card" data-tipo="planta" data-id="caterpie">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/45.png"
                                alt="Caterpie"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Caterpie</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>


                    <article className="card" data-tipo="planta" data-id="metapod">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/54.png"
                                alt="Metapod"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Metapod</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>


                    <article className="card" data-tipo="planta" data-id="butterfree">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/33.png"
                                alt="Butterfree"
                            />
                            <span className="badge">-10% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Butterfree</h3>
                            <p className="card-price">$10.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="weedle">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/69.png"
                                alt="Weedle"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Weedle</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="kakuna">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/33.png"
                                alt="Kakuna"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Kakuna</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="beedrill">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/17.png"
                                alt="Beedrill"
                            />
                            <span className="badge">-15% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Beedrill</h3>
                            <p className="card-price">$9.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="pidgey">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/57.png"
                                alt="Pidgey"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Pidgey</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="pidgeotto">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/22.png"
                                alt="Pidgeotto"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Pidgeotto</h3>
                            <p className="card-price">$6.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="rattata">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/61.png"
                                alt="Rattata"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Rattata</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="spearow">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/62.png"
                                alt="Spearow"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Spearow</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="ekans">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/46.png"
                                alt="Ekans"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Ekans</h3>
                            <p className="card-price">$5.000</p>
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

                    <article className="card" data-tipo="lucha" data-id="sandshrew">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/64.png"
                                alt="Sandshrew"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Sandshrew</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="nidoran">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/55.png"
                                alt="Nidoran"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Nidoran</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="nidorino">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/37.png"
                                alt="Nidorino"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Nidorino</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="clefairy">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/5.png"
                                alt="Clefairy"
                            />
                            <span className="badge">-10% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Clefairy</h3>
                            <p className="card-price">$9.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="fuego" data-id="vulpix">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/68.png"
                                alt="Vulpix"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Vulpix</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="jigglypuff">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/54.png"
                                alt="Jigglypuff"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Jigglypuff</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="zubat">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/57.png"
                                alt="Zubat"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Zubat</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="oddish">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/63.png"
                                alt="Oddish"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Oddish</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="paras">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/59.png"
                                alt="Paras"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Paras</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="planta" data-id="venonat">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/63.png"
                                alt="Venonat"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Venonat</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="lucha" data-id="diglett">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/47.png"
                                alt="Diglett"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Diglett</h3>
                            <p className="card-price">$4.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="normal" data-id="meowth">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/56.png"
                                alt="Meowth"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Meowth</h3>
                            <p className="card-price">$6.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="agua" data-id="psyduck">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/53.png"
                                alt="Psyduck"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Psyduck</h3>
                            <p className="card-price">$6.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="lucha" data-id="mankey">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/55.png"
                                alt="Mankey"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Mankey</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="fuego" data-id="growlithe">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/28.png"
                                alt="Growlithe"
                            />
                            <span className="badge">-10% OFF</span>
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Growlithe</h3>
                            <p className="card-price">$7.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="agua" data-id="poliwag">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/59.png"
                                alt="Poliwag"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Poliwag</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="psiquico" data-id="abra">
                        <div className="card-img">
                            <img src="https://images.pokemontcg.io/base1/43.png" alt="Abra" />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Abra</h3>
                            <p className="card-price">$6.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="lucha" data-id="machop">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/52.png"
                                alt="Machop"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Machop</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="electrico" data-id="magnemite">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/53.png"
                                alt="Magnemite"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Magnemite</h3>
                            <p className="card-price">$5.000</p>
                            <button className="btn-comprar">Agregar al carro</button>
                        </div>
                    </article>

                    <article className="card" data-tipo="psiquico" data-id="gastly">
                        <div className="card-img">
                            <img
                                src="https://images.pokemontcg.io/base1/33.png"
                                alt="Gastly"
                            />
                        </div>

                        <div className="card-info">
                            <h3 className="card-title">Gastly</h3>
                            <p className="card-price">$6.000</p>
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
                </div>
            </section>
        </main>

    </>
}