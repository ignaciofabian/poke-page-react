// =============================================================================
// App.jsx — COMPONENTE RAÍZ ("el cerebro" de la aplicación)
// -----------------------------------------------------------------------------
// Responsabilidades:
//   1. Guardar el ESTADO COMPARTIDO: carrito, pedidos y usuario con sesión.
//      Se guarda aquí (arriba de todo) porque varias páginas lo necesitan.
//      A esto en React se le llama "levantar el estado" (lifting state up).
//   2. Definir las FUNCIONES que modifican ese estado (addItem, login, ...).
//   3. Definir las RUTAS: qué página se muestra para cada URL.
//   4. Repartir datos y funciones a las páginas mediante PROPS.
//
// Flujo de datos en React: los datos bajan (padre -> hijo, por props) y los
// hijos avisan cambios llamando funciones que el padre les pasó.
//
//          App (cart, orders, user)
//           |-- Header  (recibe items, total, user, changeQuantity, ...)
//           |-- <Routes> -> Inicio / Cartas / Login / MiCuenta / Admin / ...
//           |-- Footer
// =============================================================================

// useState y useEffect son "hooks": funciones especiales de React que
// empiezan con "use" y solo se pueden llamar dentro de un componente.
import { useEffect, useState } from 'react'
// Piezas de React Router (se explican donde se usan).
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router'
// Componentes y páginas. Van con llaves porque son exportaciones con nombre
// (ej: "export function Header()").
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Inicio } from './pages/Inicio'
import { Cartas } from './pages/Cartas'
import { Nosotros } from './pages/Nosotros'
import { Login } from './pages/Login'
import { MiCuenta } from './pages/MiCuenta'
import { Productos } from './pages/Productos'
import { Admin } from './pages/Admin'
import { ADMIN_EMAIL } from './services/userService'
import { products } from './data/products'

// Función auxiliar (NO es un componente, es JS normal).
// Lee un dato guardado en localStorage o sessionStorage.
//   storage      -> localStorage o sessionStorage
//   key          -> nombre con el que se guardó, ej: 'pokestore-cart'
//   initialValue -> lo que se devuelve si no hay nada guardado o hay error
// El storage solo guarda TEXTO, por eso los datos se guardan con
// JSON.stringify (objeto -> texto) y se leen con JSON.parse (texto -> objeto).
function readSavedData(storage, key, initialValue) {
  // try/catch: si algo dentro del try falla (ej: el texto guardado no es JSON
  // válido), en vez de romper la app se ejecuta el catch.
  try {
    const saved = storage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    return initialValue
  }
  return initialValue
}

// "export default" = esta es la exportación principal del archivo.
// Un COMPONENTE en React es una función que devuelve JSX (lo que parece HTML).
// Su nombre SIEMPRE empieza con mayúscula.
export default function App() {
  // useNavigate() devuelve una función para cambiar de página desde código,
  // ej: navigate('/login'). Equivale a window.location.href = ... pero sin
  // recargar la página.
  const navigate = useNavigate()
  // useLocation() devuelve info de la URL actual (location.pathname = '/cartas').
  const location = useLocation()

  // ---------------------------------------------------------------------------
  // ESTADO (useState)
  // ---------------------------------------------------------------------------
  // const [valor, setValor] = useState(valorInicial)
  //
  // Esto es DESESTRUCTURACIÓN DE ARRAYS: useState devuelve un array de 2
  // elementos [valorActual, funcionParaCambiarlo] y los guardamos en dos
  // variables de una vez. Es lo mismo que:
  //     const resultado = useState([])
  //     const cart = resultado[0]
  //     const setCart = resultado[1]
  //
  // REGLA CLAVE: el estado NO se modifica directo (cart.push(...) está MAL).
  // Se usa la función set (setCart(nuevoValor)). Al llamarla, React vuelve a
  // ejecutar el componente ("re-render") y actualiza la pantalla.
  //
  // Aquí se pasa una función flecha () => ... a useState en vez de un valor.
  // Se llama "inicialización perezosa": React la ejecuta solo la PRIMERA vez,
  // así no leemos localStorage en cada render.

  // guardar aqui los datos que usan varias paginas
  // cart: array de { id, quantity }, ej: [{ id: 'pikachu', quantity: 2 }]
  const [cart, setCart] = useState(() =>
    readSavedData(localStorage, 'pokestore-cart', [])
  )
  // orders: array de pedidos confirmados.
  const [orders, setOrders] = useState(() =>
    readSavedData(localStorage, 'pokestore-orders', [])
  )
  // user: el usuario con sesión iniciada ({ email, name }) o null si no hay.
  // Primero busca en localStorage ("Recordarme" marcado) y si no, en
  // sessionStorage (la sesión dura solo mientras la pestaña esté abierta).
  const [user, setUser] = useState(() => {
    const savedUser = readSavedData(localStorage, 'pokestore-user', null)
    if (savedUser) {
      return savedUser
    }
    return readSavedData(sessionStorage, 'pokestore-user', null)
  })
  // cartOpen: true/false, si el panel lateral del carrito está abierto.
  const [cartOpen, setCartOpen] = useState(false)

  // ---------------------------------------------------------------------------
  // EFECTOS (useEffect)
  // ---------------------------------------------------------------------------
  // useEffect(funcion, [dependencias])
  // Ejecuta "funcion" DESPUÉS de dibujar la pantalla, y la vuelve a ejecutar
  // cada vez que cambia algo de la lista de dependencias.
  // Se usa para "efectos secundarios": cosas fuera de React como
  // localStorage, timers, peticiones a una API, etc.

  // guardar el carrito para no perderlo al recargar
  // -> cada vez que "cart" cambie, se guarda en localStorage.
  useEffect(() => {
    localStorage.setItem('pokestore-cart', JSON.stringify(cart))
  }, [cart])

  // Lo mismo para los pedidos.
  useEffect(() => {
    localStorage.setItem('pokestore-orders', JSON.stringify(orders))
  }, [orders])

  // ---------------------------------------------------------------------------
  // FUNCIONES DEL CARRITO
  // ---------------------------------------------------------------------------

  // Agrega una carta al carrito. "quantity = 1" es un PARÁMETRO POR DEFECTO:
  // si se llama addItem('pikachu') sin cantidad, quantity vale 1.
  // Esta función se pasa como prop a Inicio, Cartas, Productos, ProductCard...
  function addItem(id, quantity = 1) {
    // .find() recorre el array y devuelve el PRIMER elemento que cumple la
    // condición, o undefined si ninguno la cumple.
    // (item) => item.id === id  es una FUNCIÓN FLECHA: recibe "item" y
    // devuelve true/false. Equivale a: function (item) { return item.id === id }
    const existingItem = cart.find((item) => item.id === id)
    if (existingItem) {
      // Ya estaba: sumamos la cantidad. .map() crea un ARRAY NUEVO
      // transformando cada elemento; no modifica el original.
      // (En React siempre creamos datos nuevos en vez de modificar el estado,
      // así React detecta el cambio.)
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { id: item.id, quantity: item.quantity + quantity }
        }
        return item
      })
      setCart(updatedCart)
    } else {
      // No estaba: lo agregamos al final.
      // [...cart, nuevo] usa el SPREAD OPERATOR (...): "desparrama" todos los
      // elementos de cart dentro de un array nuevo y agrega uno más al final.
      // Ej: cart = [a, b]  ->  [...cart, c]  ->  [a, b, c]
      // Es la forma "React" de hacer un push sin modificar el array original.
      // { id: id, quantity: quantity } se podría escribir abreviado { id, quantity }.
      setCart([...cart, { id: id, quantity: quantity }])
    }
    // Abrimos el panel del carrito para que el usuario vea lo que agregó.
    setCartOpen(true)
  }

  // Cambia la cantidad de una carta. Si la cantidad llega a 0, la quita.
  // Se usa en los botones − / + / Quitar del carrito (Header.jsx).
  function changeQuantity(id, quantity) {
    if (quantity <= 0) {
      // .filter() crea un array nuevo SOLO con los elementos que cumplen la
      // condición: aquí, todos menos el que tiene ese id.
      setCart(cart.filter((item) => item.id !== id))
      return
    }
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { id: item.id, quantity: quantity }
      }
      return item
    })
    setCart(updatedCart)
  }

  // ---------------------------------------------------------------------------
  // FUNCIONES DE SESIÓN
  // ---------------------------------------------------------------------------

  // Inicia sesión. La llama Login.jsx después de validar el correo y la clave.
  //   remember = true  -> se guarda en localStorage (sobrevive al cerrar el navegador)
  //   remember = false -> se guarda en sessionStorage (se borra al cerrar la pestaña)
  function login(email, remember, name) {
    let accountName = name
    if (!accountName) {
      // Si no hay nombre, usamos lo que está antes del @.
      // 'ana@mail.cl'.split('@') -> ['ana', 'mail.cl'] -> [0] -> 'ana'
      accountName = email.split('@')[0]
    }
    // trim() quita espacios al inicio/final; toLowerCase() pasa a minúsculas.
    const account = { email: email.trim().toLowerCase(), name: accountName }
    // Borramos cualquier sesión anterior de los dos storages.
    localStorage.removeItem('pokestore-user')
    sessionStorage.removeItem('pokestore-user')
    if (remember) {
      localStorage.setItem('pokestore-user', JSON.stringify(account))
    } else {
      sessionStorage.setItem('pokestore-user', JSON.stringify(account))
    }
    // Actualizamos el estado -> React re-dibuja: el Header muestra el nombre, etc.
    setUser(account)
  }

  // Cierra sesión: borra los datos guardados, limpia el estado y va a /login.
  function logout() {
    localStorage.removeItem('pokestore-user')
    sessionStorage.removeItem('pokestore-user')
    setUser(null)
    setCartOpen(false)
    navigate('/login')
  }

  // Cambia el nombre del usuario (desde MiCuenta.jsx). Lo guarda en el mismo
  // storage donde estaba la sesión.
  function updateUser(name) {
    const account = { email: user.email, name: name.trim() }
    if (localStorage.getItem('pokestore-user')) {
      localStorage.setItem('pokestore-user', JSON.stringify(account))
    } else {
      sessionStorage.setItem('pokestore-user', JSON.stringify(account))
    }
    setUser(account)
  }

  // ---------------------------------------------------------------------------
  // VALORES CALCULADOS (se recalculan en cada render)
  // ---------------------------------------------------------------------------
  // No se guardan en el estado porque se pueden obtener a partir de "cart".
  // Regla de React: si un dato se puede CALCULAR desde otro estado, no lo
  // guardes como estado aparte (evitas que queden desincronizados).

  // calcular el total usando las cantidades del carrito
  const items = [] // [{ id, quantity, product }] con los datos completos de cada carta
  let total = 0 // precio total en CLP
  let count = 0 // cantidad total de cartas (el numerito del botón Carrito)
  // for...of recorre cada elemento del array.
  for (const item of cart) {
    const product = products.find((product) => product.id === item.id)
    // Puede que la carta ya no exista (el admin la eliminó): en ese caso se ignora.
    if (product) {
      items.push({ id: item.id, quantity: item.quantity, product: product })
      total = total + product.price * item.quantity
      count = count + item.quantity
    }
  }

  // Confirma el pedido: crea un "order" con lo que hay en el carrito,
  // lo agrega a la lista de pedidos y vacía el carrito.
  function checkout() {
    // Sin sesión o con el carrito vacío no se hace nada.
    // "!user" es true cuando user es null.
    if (!user || items.length === 0) {
      return
    }
    const order = {
      // Date.now() = milisegundos desde 1970 -> sirve como id único simple.
      id: String(Date.now()),
      email: user.email,
      date: new Date().toISOString(),
      items: items,
      total: total
    }
    // Spread de nuevo: array nuevo con los pedidos anteriores + el nuevo.
    setOrders([...orders, order])
    setCart([])
  }

  // true si estamos en una de las páginas de login. En esas páginas no se
  // muestra el Header ni el Footer (diseño de pantalla completa).
  const isLoginPage =
    location.pathname === '/login' ||
    location.pathname === '/registro' ||
    location.pathname === '/recuperar'

  // ---------------------------------------------------------------------------
  // LO QUE SE DIBUJA (JSX)
  // ---------------------------------------------------------------------------
  // JSX parece HTML pero es JavaScript. Diferencias importantes:
  //   - class   -> className      - for -> htmlFor
  //   - onclick="..." (texto)     -> onClick={funcion}
  //   - {expresion} inserta cualquier valor de JS dentro del HTML.
  //   - Un componente debe devolver UN solo elemento padre; <>...</> es un
  //     "Fragment": un contenedor invisible que no agrega nada al HTML.
  return (
    <>
      {/* RENDERIZADO CONDICIONAL con &&:
          condicion && <Algo />  ->  si la condición es true se dibuja <Algo />,
          si es false no se dibuja nada. */}
      {!isLoginPage && (
        // PROPS: atributos que le pasamos a un componente hijo.
        // El Header los recibe como un objeto: { items, total, count, ... }.
        // Se pasan tanto DATOS (items, total) como FUNCIONES (changeQuantity,
        // logout) para que el hijo pueda pedirle cambios al padre.
        <Header
          items={items}
          total={total}
          count={count}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          changeQuantity={changeQuantity}
          user={user}
          isAdmin={user !== null && user.email === ADMIN_EMAIL}
          logout={logout}
          checkout={checkout}
        />
      )}
      {/* <Routes> mira la URL actual y dibuja SOLO el <Route> que coincide.
          path    = la URL
          element = el componente (con sus props) que se muestra en esa URL */}
      <Routes>
        <Route path="/" element={<Inicio addItem={addItem} />} />
        <Route path="/cartas" element={<Cartas addItem={addItem} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        {/* Las 3 rutas de login usan el MISMO componente Login con un
            "mode" distinto. La prop especial "key" obliga a React a crear un
            componente nuevo al cambiar de ruta, así el formulario se limpia
            (si no, React reutilizaría el mismo y conservaría lo escrito). */}
        <Route
          path="/login"
          element={<Login key="login" user={user} login={login} />}
        />
        <Route
          path="/registro"
          element={
            <Login key="registro" mode="register" user={user} login={login} />
          }
        />
        <Route
          path="/recuperar"
          element={
            <Login key="recuperar" mode="recover" user={user} login={login} />
          }
        />
        <Route
          path="/mi-cuenta"
          element={
            <MiCuenta
              user={user}
              updateUser={updateUser}
              logout={logout}
              orders={orders}
            />
          }
        />
        <Route path="/admin" element={<Admin user={user} />} />
        {/* RUTA DINÁMICA: ":id" es un parámetro. /productos/pikachu y
            /productos/charizard usan esta misma ruta; Productos.jsx lee el
            valor con useParams(). La key con la URL hace que al pasar de una
            carta a otra el componente se reinicie (la cantidad vuelve a 1). */}
        <Route
          path="/productos/:id"
          element={<Productos key={location.pathname} addItem={addItem} />}
        />
        {/* path="*" atrapa cualquier URL que no coincidió arriba = página 404. */}
        <Route
          path="*"
          element={
            <main className="catalogo">
              <h1>Página no encontrada</h1>
              <Link to="/">Volver al inicio</Link>
            </main>
          }
        />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  )
}
