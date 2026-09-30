export function Productos() {

    return <>

        <main className="catalogo">
            <nav className="breadcrumb" aria-label="Ruta de navegación">
                <a href="index.html">Home</a>
                <span>›</span>
                <a href="cartas.html" id="breadcrumbCategoria">Categoría</a>
                <span>›</span>
                <span id="breadcrumbProducto" aria-current="page">Producto</span>
            </nav>

            <section className="detalle-producto">
                <div className="producto-galeria">
                    <div className="card-img producto-img-principal">
                        <img id="imagenPrincipal" src="" alt="" />
                    </div>

                    <div className="producto-miniaturas" id="miniaturas"></div>
                </div>

                <div className="producto-info">
                    <h1 className="card-title" id="productoNombre"></h1>
                    <p className="card-price" id="productoPrecio"></p>
                    <p className="producto-descripcion" id="productoDescripcion"></p>

                    <div className="selector-cantidad qty-row">
                        <button type="button" className="qty-btn" id="restarCantidad">-</button>
                        <span id="cantidadSeleccionada">1</span>
                        <button type="button" className="qty-btn" id="sumarCantidad">+</button>
                    </div>

                    <button type="button" className="btn-comprar" id="btnAgregarDetalle">
                        Añadir al carrito
                    </button>
                </div>
            </section>

            <section className="productos-relacionados">
                <h2>Productos relacionados</h2>
                <div className="grilla-productos" id="relacionadosGrid"></div>
            </section>
        </main>



    </>
}