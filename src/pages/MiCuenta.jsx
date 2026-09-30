import "../assets/CSS/mi-cuenta.css"
export function MiCuenta() {

    return <>

        <main className="cuenta-contenedor">


            <section className="bienvenida">

                <h2>Mi cuenta</h2>

                <p>
                    Administra tus datos y revisa tus pedidos.
                </p>

            </section>



            <div className="cuenta-grid">



                <section className="cuenta-card">

                    <h2>👤 Mis datos</h2>


                    <div className="form-group">

                        <label>Nombre</label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Nombre" />

                    </div>


                    <div className="form-group">

                        <label>Correo electrónico</label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Correo" />

                    </div>


                    <button
                        id="btn-actualizar"
                        className="btn-actualizar">

                        Actualizar datos

                    </button>

                </section>




                <section className="cuenta-card">

                    <h2>📦 Mis pedidos</h2>


                    <div
                        id="lista-pedidos"
                        className="lista-pedidos">


                        <div className="sin-pedidos">

                            <p>
                                Todavía no tienes pedidos.
                            </p>

                        </div>


                    </div>

                </section>


            </div>


            <div className="cerrar-sesion-contenedor">

                <button
                    id="btn-cerrar-sesion"
                    className="btn-cerrar-sesion">

                    Cerrar sesión

                </button>

            </div>


        </main>

    </>
}