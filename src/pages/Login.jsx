import "../assets/CSS/login.css"

export function Login() {
    return <>
       

        <main className="login-page">

            <section className="login-card">

                <div className="card-decoration">
                    <div className="pokeball">
                        <span></span>
                    </div>
                </div>

                <div className="login-header">

                    <h1>PokeStore</h1>

                    <p>
                        Inicia sesión para continuar
                    </p>

                </div>

                <form>

                    <div className="form-group">

                        <label for="input-email">
                            Correo electrónico
                        </label>

                        <input id="input-email" type="email" placeholder="correo@ejemplo.com" required autocomplete="email" />

                        <span className="form-error" id="error-email"></span>

                    </div>

                    <div className="form-group">

                        <label for="input-password">
                            Contraseña
                        </label>

                        <input id="input-password" type="password" placeholder="Ingresa tu contraseña" required autocomplete="current-password" />

                        <span className="form-error" id="error-password"></span>

                    </div>

                    <div className="login-options">

                        <label className="remember">
                            <input type="checkbox" />
                            Recordarme
                        </label>

                        <a href="#" className="forgot">
                            ¿Olvidaste tu contraseña?
                        </a>

                    </div>

                    <span className="form-error" id="error-login"></span>

                    <button id="btn-inicio-sesion" type="button">
                        INICIAR SESIÓN
                    </button>

                </form>

                <div className="register">

                    <p>
                        ¿No tienes una cuenta?
                        <a href="#">Regístrate</a>
                    </p>

                </div>

            </section>

        </main>
    </>
}