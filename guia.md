# Guía del proyecto PokéStore (React + Testing)

> Guía para integrantes del equipo que saben **poco o nada de React**.
> Explica qué hace cada archivo, cómo fluyen los datos, el JavaScript "moderno" que aparece en el código y cómo funcionan los tests.
> Todo el código del proyecto también está **comentado línea a línea** con estas mismas explicaciones: lee la guía y después abre los archivos.

---

## Índice

0. [Cómo usar esta guía para la evaluación](#0-cómo-usar-esta-guía-para-la-evaluación)
1. [Mapa del proyecto](#1-mapa-del-proyecto)
2. [JavaScript moderno que tienes que entender](#2-javascript-moderno-que-tienes-que-entender)
3. [React desde cero](#3-react-desde-cero)
4. [React Router](#4-react-router)
5. [Estado y props en ESTE proyecto (flujo de datos)](#5-estado-y-props-en-este-proyecto-flujo-de-datos)
6. [Recorrido archivo por archivo](#6-recorrido-archivo-por-archivo)
7. [Flujos paso a paso](#7-flujos-paso-a-paso)
8. [La migración desde HTML/CSS/JS](#8-la-migración-desde-htmlcssjs)
9. [Testing](#9-testing)
10. [Preguntas tipo "¿qué pasaría si...?"](#10-preguntas-tipo-qué-pasaría-si)
11. [Cosas raras o mejorables que pueden preguntar](#11-cosas-raras-o-mejorables-que-pueden-preguntar)
12. [Guion para la demo de 5 minutos](#12-guion-para-la-demo-de-5-minutos)
13. [Glosario rápido](#13-glosario-rápido)

---

## 0. Cómo usar esta guía para la evaluación

Según el mensaje del profesor, la evaluación es:

1. **Demo de máximo 5 minutos** recorriendo el sitio (guion en la [sección 12](#12-guion-para-la-demo-de-5-minutos)).
2. **Dos preguntas por integrante** sobre:
   - **Desarrollo en React**: migración, componentes creados, React Router, estado y props.
   - **Testing**: tests creados, `describe`, `it`/`test`, `expect`, configuración.
3. Las preguntas pueden pedir **cambiar código** o razonar "**¿qué pasaría si...?**".

**Prioridad de estudio** (de más a menos importante):

| Prioridad | Tema | Sección |
| --- | --- | --- |
| ⭐⭐⭐ | Estado (`useState`) y props, y cómo viajan entre componentes | [3](#3-react-desde-cero), [5](#5-estado-y-props-en-este-proyecto-flujo-de-datos) |
| ⭐⭐⭐ | React Router (`Routes`, `Route`, `Link`, `useNavigate`, `useParams`...) | [4](#4-react-router) |
| ⭐⭐⭐ | `describe`, `it`/`test`, `expect`, configuración de Vitest | [9](#9-testing) |
| ⭐⭐⭐ | Preguntas "¿qué pasaría si...?" | [10](#10-preguntas-tipo-qué-pasaría-si) |
| ⭐⭐ | Experiencia migrando desde HTML | [8](#8-la-migración-desde-htmlcssjs) |
| ⭐⭐ | Destructuring, spread, `map`/`filter`, funciones flecha | [2](#2-javascript-moderno-que-tienes-que-entender) |
| ⭐ | Detalle de cada archivo | [6](#6-recorrido-archivo-por-archivo) |

**Consejo:** cada integrante debería poder explicar **con sus palabras** al menos un componente (por ejemplo `ProductCard` o `Header`) y al menos un archivo de test (por ejemplo `Validaciones.test.js`, que es el más simple).

---

## 1. Mapa del proyecto

```text
poke-page-react/
├── index.html              ← la ÚNICA página HTML; tiene <div id="root">
├── vite.config.js          ← configuración de Vite y de Vitest (tests)
├── package.json            ← dependencias y comandos (npm run dev, npm test...)
├── public/img/             ← imágenes estáticas (poke-bola.png)
└── src/
    ├── main.jsx            ← PUNTO DE ENTRADA: monta <App /> dentro de #root
    ├── App.jsx             ← CEREBRO: estado global + funciones + rutas
    ├── index.css           ← estilos globales
    ├── components/         ← piezas reutilizables
    │   ├── Header.jsx      ← menú + panel del carrito
    │   ├── Footer.jsx      ← pie + newsletter
    │   ├── Catalog.jsx     ← categorías + buscador + grilla
    │   └── ProductCard.jsx ← tarjeta de UNA carta
    ├── pages/              ← una por ruta
    │   ├── Inicio.jsx      ← /
    │   ├── Cartas.jsx      ← /cartas
    │   ├── Productos.jsx   ← /productos/:id
    │   ├── Nosotros.jsx    ← /nosotros
    │   ├── Login.jsx       ← /login, /registro, /recuperar
    │   ├── MiCuenta.jsx    ← /mi-cuenta (requiere sesión)
    │   └── Admin.jsx       ← /admin (solo administrador)
    ├── data/
    │   ├── products.js     ← las 40 cartas + función money()
    │   └── usuarios.js     ← 3 usuarios de prueba
    ├── services/           ← lógica de datos SIN React (localStorage)
    │   ├── productService.js
    │   └── userService.js
    ├── assets/CSS/         ← CSS por página
    └── test/               ← tests (Vitest + Testing Library)
```

**Comandos:**

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala dependencias (solo la primera vez) |
| `npm run dev` | Levanta la app en `http://localhost:5173` |
| `npm test` | Ejecuta todos los tests una vez |
| `npm test -- --watch` | Tests en modo "observación" (se re-ejecutan al guardar) |
| `npm run test:coverage` | Tests + reporte de cobertura |
| `npm run build` | Genera la versión de producción en `dist/` |

**Cuentas de prueba:** admin `admin@pokestore.cl` / `Pokemon123!` · usuarios `ignacio@`, `bryan@`, `felipe@pokestore.cl` / `123456`.

---

## 2. JavaScript moderno que tienes que entender

Esto no es React: es JavaScript. Pero el código de React lo usa **todo el tiempo**, así que si no lo entiendes, el código se ve como magia.

### 2.1 `const` y `let`

```js
const nombre = 'Pikachu' // no se puede reasignar
let total = 0            // se puede reasignar: total = total + 100
```

> Ojo: `const` con un array/objeto impide **reasignar** la variable, pero no impide modificar su contenido (`const a = []; a.push(1)` funciona).

### 2.2 Funciones flecha (arrow functions)

```js
// función normal
function doble(n) { return n * 2 }

// lo mismo como función flecha
const doble = (n) => n * 2          // si es una sola expresión, el return es implícito
const doble = (n) => { return n * 2 } // con llaves hay que escribir return
```

En el proyecto aparecen sobre todo **como argumentos** de otras funciones:

```js
cart.find((item) => item.id === id)
// "para cada item, devuelve true si su id es igual al id buscado"
```

Y en eventos de React:

```jsx
onClick={() => addItem(product.id)}
// "cuando hagan clic, ejecuta addItem con este id"
```

### 2.3 Template literals (comillas invertidas)

```js
const id = 'pikachu'
`/productos/${id}`          // → '/productos/pikachu'
`drawer ${cartOpen ? 'open' : ''}` // → 'drawer open' o 'drawer '
```

Usan **backticks** `` ` `` y permiten meter variables con `${ }`.

### 2.4 Desestructuración (destructuring) ⭐

Es **sacar valores** de un objeto o array y guardarlos en variables, en una sola línea.

**De objetos** (se usa con las props y `useParams`):

```js
const carta = { id: 'pikachu', name: 'Pikachu', price: 15000 }

// sin desestructurar
const name = carta.name
const price = carta.price

// desestructurando: mismo resultado
const { name, price } = carta
```

**En los parámetros de una función** (así reciben las props TODOS los componentes):

```jsx
// sin desestructurar
function ProductCard(props) {
  return <h3>{props.product.name}</h3>
}

// desestructurando (así está en el proyecto)
function ProductCard({ product, addItem }) {
  return <h3>{product.name}</h3>
}
```

**Con valor por defecto:**

```js
function Catalog({ featured = false, addItem }) { ... }
// si nadie pasa "featured", vale false
```

**De arrays** (así funciona `useState`):

```js
const colores = ['rojo', 'azul']
const [primero, segundo] = colores // primero = 'rojo', segundo = 'azul'

const [cart, setCart] = useState([])
// useState devuelve un array de 2 cosas: [valorActual, funcionParaCambiarlo]
```

### 2.5 Spread operator `...` ⭐

Los tres puntos **"desparraman"** el contenido de un array u objeto dentro de otro.

**En arrays** — agregar sin modificar el original (en React se hace así):

```js
const cart = [a, b]
const nuevo = [...cart, c]   // [a, b, c]   ← cart sigue siendo [a, b]
```

En `App.jsx`:

```js
setCart([...cart, { id: id, quantity: quantity }])  // agregar al carrito
setOrders([...orders, order])                       // agregar un pedido
```

**Copiar un array:**

```js
return [...products]   // productService.getProducts(): copia de la lista
```

**En objetos** — copiar y agregar/sobrescribir propiedades:

```js
const usuario = { name: 'Ana', email: 'ana@x.cl' }
const copia = { ...usuario, blocked: false }
// { name: 'Ana', email: 'ana@x.cl', blocked: false }
```

En `userService.js`: `users.push({ ...initialUser, blocked: false })`.

**Como argumentos de una función:**

```js
products.splice(0, products.length, ...saved)
// pasa cada carta de "saved" como un argumento separado
```

> ¿Por qué tanto spread? Porque **React detecta cambios comparando si el array/objeto es otro distinto**. Si haces `cart.push(x)` el array es el mismo y React no se entera. Con `[...cart, x]` creas uno nuevo y React re-dibuja.

### 2.6 Métodos de arrays ⭐

Ninguno de estos (salvo `push`/`splice`) modifica el array original: **devuelven uno nuevo**.

| Método | Qué devuelve | Ejemplo en el proyecto |
| --- | --- | --- |
| `map(fn)` | array nuevo transformando cada elemento | convertir cartas en `<ProductCard />` |
| `filter(fn)` | array nuevo solo con los que cumplen | quitar del carrito, buscar por tipo |
| `find(fn)` | el **primer** elemento que cumple, o `undefined` | buscar una carta por id |
| `findIndex(fn)` | la posición, o `-1` | `deleteProduct` |
| `some(fn)` | `true` si **al menos uno** cumple | ¿ya existe ese usuario? |
| `includes(valor)` | `true` si contiene el valor | ¿es carta destacada? |
| `slice(a, b)` | copia desde a hasta b (sin incluir b) | 4 productos relacionados |
| `push(x)` | ⚠️ agrega al final **modificando** el array | servicios (no estado de React) |
| `splice(...)` | ⚠️ borra/inserta **modificando** el array | servicios |

```js
const numeros = [1, 2, 3, 4]
numeros.map((n) => n * 10)       // [10, 20, 30, 40]
numeros.filter((n) => n > 2)     // [3, 4]
numeros.find((n) => n > 2)       // 3
numeros.some((n) => n > 3)       // true
numeros.includes(5)              // false
```

### 2.7 Operadores lógicos y condicionales

```js
// Ternario: condición ? siVerdadero : siFalso
user ? user.name : 'Iniciar sesión'

// && (Y): si lo de la izquierda es falso, se queda ahí; si no, devuelve lo de la derecha
isAdmin && <NavLink to="/admin">Admin</NavLink>   // solo se dibuja si isAdmin es true

// || (O): primer valor "verdadero" → sirve como valor por defecto
params.get('tipo') || 'todos'    // si get devuelve null, usa 'todos'

// ?? (nullish coalescing): como ||, pero solo salta si es null o undefined
user.password ?? initialUser?.password ?? ADMIN_PASSWORD

// ?. (encadenamiento opcional): no explota si algo es null/undefined
account?.name   // si account es null → undefined (en vez de error)
```

**Valores "falsos" en JS** (falsy): `false`, `0`, `''`, `null`, `undefined`, `NaN`. Todo lo demás es "verdadero".

### 2.8 `import` / `export`

```js
// products.js
export const products = [...]          // exportación con nombre
export const money = (value) => ...

// App.jsx
export default function App() {...}    // exportación por defecto (una por archivo)

// otro archivo
import { products, money } from './data/products'  // con nombre → con llaves
import App from './App'                            // por defecto → sin llaves
import * as userService from './services/userService' // todo en un objeto
import { Inicio as PaginaInicio } from './pages/Inicio' // con alias
```

### 2.9 `localStorage`, `sessionStorage` y JSON

- `localStorage`: datos que **sobreviven** al cerrar el navegador.
- `sessionStorage`: datos que se borran al **cerrar la pestaña**.
- Ambos solo guardan **texto**, por eso:

```js
localStorage.setItem('pokestore-cart', JSON.stringify(cart)) // objeto → texto
const cart = JSON.parse(localStorage.getItem('pokestore-cart')) // texto → objeto
```

---

## 3. React desde cero

### 3.1 ¿Qué es React?

Una librería para construir interfaces con **componentes**. En vez de modificar el HTML a mano (`document.getElementById(...).innerHTML = ...`), **describes cómo debe verse la pantalla según los datos**, y React se encarga de actualizarla cuando los datos cambian.

> Idea central: **pantalla = función(datos)**. Cambias los datos (estado) → React vuelve a dibujar.

### 3.2 Componente

Una **función** que devuelve **JSX**. Nombre con **mayúscula**.

```jsx
export function Saludo() {
  return <h1>Hola entrenador</h1>
}

// se usa como una etiqueta:
<Saludo />
```

### 3.3 JSX

Parece HTML pero es JavaScript. Diferencias que aparecieron en la migración:

| HTML | JSX |
| --- | --- |
| `class="..."` | `className="..."` |
| `for="..."` (en label) | `htmlFor="..."` |
| `onclick="hacerAlgo()"` (texto) | `onClick={hacerAlgo}` (función) |
| `<img src="...">` | `<img src="..." />` (cerrar siempre) |
| `autocomplete` | `autoComplete` (camelCase) |
| `<a href="cartas.html">` (interno) | `<Link to="/cartas">` |

Con `{ }` metes **cualquier expresión de JS**:

```jsx
<p>{money(product.price)}</p>
<p>{products.length} cartas</p>
```

Un componente devuelve **un solo elemento padre**. Si no quieres agregar un `<div>`, usas un **Fragment**: `<> ... </>`.

### 3.4 Props (propiedades)

Son los **datos que un componente padre le pasa a un hijo**, como los atributos de HTML.

```jsx
// Padre (Catalog.jsx)
<ProductCard product={pikachu} addItem={addItem} />

// Hijo (ProductCard.jsx)
export function ProductCard({ product, addItem }) {
  return <h3>{product.name}</h3>
}
```

Reglas:
- Las props **van de padre a hijo** (hacia abajo).
- El hijo **no puede modificar** sus props (son de solo lectura).
- Se pueden pasar **funciones** como props. Así el hijo le "avisa" al padre: `addItem` vive en `App`, pero el botón está en `ProductCard`.

### 3.5 Estado (`useState`) ⭐

Datos que **cambian con el tiempo** y que, al cambiar, **re-dibujan** el componente.

```jsx
const [quantity, setQuantity] = useState(1)
//     valor     función para    valor
//     actual    cambiarlo       inicial

<button onClick={() => setQuantity(quantity + 1)}>+</button>
<span>{quantity}</span>
```

Reglas de oro:
1. **Nunca** modificar el estado directamente (`quantity = 5` ❌, `cart.push(x)` ❌). Usar la función `set...` ✅.
2. Al llamar `setX(nuevo)`, React **vuelve a ejecutar la función del componente** con el nuevo valor y actualiza la pantalla.
3. Cada componente tiene **su propio** estado. Si dos componentes necesitan el mismo dato, el estado se **sube** al padre común (en este proyecto: `App`).

**Props vs estado:**

| | Props | Estado |
| --- | --- | --- |
| ¿Quién lo controla? | El padre | El propio componente |
| ¿Se puede cambiar? | No (solo lectura) | Sí, con `setX` |
| Ejemplo | `product` en `ProductCard` | `quantity` en `Productos` |

> Lo que para `App` es **estado** (`cart`), para `Header` es una **prop** (`items`, `count`). El mismo dato, visto desde distintos componentes.

### 3.6 Eventos

```jsx
<button onClick={logout}>Salir</button>                 // función sin argumentos
<button onClick={() => addItem(product.id)}>Agregar</button> // con argumentos → flecha
<input onChange={(event) => setEmail(event.target.value)} /> // event.target = el input
<form onSubmit={submit}>...</form>
```

⚠️ `onClick={addItem(product.id)}` (sin flecha) **ejecuta la función al dibujar**, no al hacer clic.

En los formularios siempre se llama `event.preventDefault()` para que el navegador **no recargue la página**.

### 3.7 Inputs controlados

El valor del input lo maneja React:

```jsx
const [email, setEmail] = useState('')

<input
  value={email}                                   // el input muestra el estado
  onChange={(event) => setEmail(event.target.value)} // cada tecla actualiza el estado
/>
```

Ventaja: en cualquier momento `email` tiene lo escrito, y para **limpiar** el input basta con `setEmail('')`.

### 3.8 Renderizado condicional

```jsx
{user && <button>Salir</button>}                       // mostrar o no
{user ? 'Confirmar pedido' : 'Iniciar sesión'}          // elegir entre dos
if (!user) return <Navigate to="/login" />              // return temprano
```

### 3.9 Listas y `key`

```jsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} addItem={addItem} />
))}
```

Cada elemento de una lista necesita una `key` **única y estable** (el id). React la usa para saber qué elemento cambió, se agregó o se borró. Sin `key` → advertencia en consola y posibles errores al actualizar.

### 3.10 Efectos (`useEffect`)

Para hacer cosas **fuera de React** después de dibujar: guardar en `localStorage`, hacer scroll, llamar a una API, timers...

```jsx
useEffect(() => {
  localStorage.setItem('pokestore-cart', JSON.stringify(cart))
}, [cart])   // ← lista de dependencias
```

| Dependencias | Cuándo se ejecuta |
| --- | --- |
| `[cart]` | Al inicio y cada vez que `cart` cambie |
| `[]` | Solo una vez, al inicio |
| (sin array) | Después de **cada** render |

### 3.11 Reglas de los hooks

Los **hooks** son las funciones que empiezan con `use` (`useState`, `useEffect`, `useNavigate`, `useParams`...).
1. Solo se llaman **dentro de componentes** (o de otros hooks).
2. Siempre en el **mismo orden**: nunca dentro de un `if`, ni después de un `return` condicional. Por eso en `Login`, `MiCuenta` y `Admin` los `useState` están **antes** del `if (!user) return <Navigate ... />`.

### 3.12 `StrictMode`

En `main.jsx`. Solo en desarrollo: ejecuta algunas cosas dos veces para detectar errores. No afecta la versión publicada.

---

## 4. React Router

En la versión HTML había un archivo por página (`index.html`, `cartas.html`...). Con React hay **una sola página** (SPA) y **React Router** decide qué componente mostrar según la URL, **sin recargar**.

### 4.1 Piezas usadas en el proyecto

| Pieza | Qué hace | Dónde |
| --- | --- | --- |
| `<BrowserRouter>` | Activa el router usando la URL real del navegador | `main.jsx` |
| `<MemoryRouter>` | Router con URL en memoria (para tests) | `src/test/*` |
| `<Routes>` | Mira la URL y dibuja el `<Route>` que coincide | `App.jsx` |
| `<Route path element>` | "En esta URL, muestra este componente" | `App.jsx` |
| `<Link to>` | Enlace interno sin recargar (reemplaza `<a href>`) | todos |
| `<NavLink to>` | Como `Link` + clase `active` si es la página actual | `Header.jsx` |
| `<Navigate to>` | Redirige al dibujarse (rutas protegidas) | `Login`, `MiCuenta`, `Admin` |
| `useNavigate()` | Navegar **desde código**: `navigate('/mi-cuenta')` | `App`, `Header`, `Login` |
| `useLocation()` | Info de la URL actual (`pathname`, `hash`) | `App`, `Inicio` |
| `useParams()` | Lee parámetros de la ruta (`:id`) | `Productos` |
| `useSearchParams()` | Lee/escribe `?tipo=fuego&q=pika` | `Catalog` |

### 4.2 Tabla de rutas (`App.jsx`)

```jsx
<Routes>
  <Route path="/" element={<Inicio addItem={addItem} />} />
  <Route path="/cartas" element={<Cartas addItem={addItem} />} />
  <Route path="/nosotros" element={<Nosotros />} />
  <Route path="/login" element={<Login key="login" user={user} login={login} />} />
  <Route path="/registro" element={<Login key="registro" mode="register" ... />} />
  <Route path="/recuperar" element={<Login key="recuperar" mode="recover" ... />} />
  <Route path="/mi-cuenta" element={<MiCuenta ... />} />
  <Route path="/admin" element={<Admin user={user} />} />
  <Route path="/productos/:id" element={<Productos ... />} />  {/* ruta dinámica */}
  <Route path="*" element={<main>...Página no encontrada...</main>} /> {/* 404 */}
</Routes>
```

### 4.3 Conceptos clave

**Ruta dinámica** — `/productos/:id`: el `:id` es variable.

```jsx
// URL: /productos/charizard
const { id } = useParams()   // id = 'charizard'
```

**Query params** — `/cartas?tipo=fuego&q=char`: el catálogo guarda los filtros **en la URL**, no en `useState`. Ventaja: el link `/cartas?tipo=agua` del footer llega ya filtrado y el botón "atrás" funciona.

```jsx
const [params, setParams] = useSearchParams()
const type = params.get('tipo') || 'todos'
setParams({ tipo: 'fuego', q: '' })
```

**Ruta protegida** — no hay un componente especial; cada página revisa:

```jsx
if (!user) {
  return <Navigate to="/login" replace />
}
```

`replace` reemplaza la entrada del historial (el botón "atrás" no vuelve a la página protegida).

**Ruta 404** — `path="*"` coincide con **cualquier** URL que no coincidió antes.

**`Link` vs `<a href>`** — `<a href>` hace que el navegador **recargue todo**: se re-descarga la app y se reinicia el estado en memoria. `Link` solo cambia la URL y React cambia el componente. Para links **externos** (`mailto:`, `tel:`, otros sitios) se sigue usando `<a>`.

**¿Por qué `key` en las rutas de Login?** `/login`, `/registro` y `/recuperar` usan el **mismo** componente `Login`. Sin `key`, React reutilizaría la misma instancia y lo escrito en el formulario se mantendría al cambiar de ruta. Con `key` distinta, React crea un componente nuevo (formulario vacío).

---

## 5. Estado y props en ESTE proyecto (flujo de datos)

### 5.1 Dónde vive cada estado

| Estado | Componente | ¿Por qué ahí? |
| --- | --- | --- |
| `cart`, `orders`, `user`, `cartOpen` | `App` | Los usan varias páginas + el Header |
| `email`, `message` (newsletter) | `Footer` | Solo le importan al Footer |
| `quantity` | `Productos` | Solo para esa página |
| campos del formulario (`email`, `password`, ...) | `Login` | Solo para el formulario |
| `name`, `message` | `MiCuenta` | Solo para el formulario |
| `products`, `users`, campos del form | `Admin` | Solo para el panel |
| filtros `tipo` y `q` | **la URL** (`useSearchParams`) | Para poder compartir/enlazar |

### 5.2 Diagrama

```text
                         ┌───────────────────────────────┐
                         │             App               │
                         │ estado: cart, orders, user,   │
                         │         cartOpen              │
                         │ funciones: addItem,           │
                         │   changeQuantity, login,      │
                         │   logout, updateUser, checkout│
                         └──────────────┬────────────────┘
          props ↓ (datos + funciones)   │
   ┌──────────────┬───────────────┬─────┴───────┬──────────────┬──────────┐
   ▼              ▼               ▼             ▼              ▼          ▼
 Header        Inicio          Cartas         Login         MiCuenta    Admin
 items,total   addItem         addItem        user,login    user,orders  user
 count,user..     │               │                         updateUser,
                  ▼               ▼                         logout
               Catalog         Catalog
               addItem         addItem
                  │               │
                  ▼               ▼
              ProductCard     ProductCard
              product,addItem
                  │
                  │ clic en "Agregar al carro"
                  └──► addItem('pikachu')  ──► se ejecuta en App ──► setCart(...)
                                                    │
                       React re-dibuja App ◄────────┘
                       → Header recibe el count nuevo → el número del carrito sube
```

**Resumen en una frase:** *los datos bajan por props, los eventos suben llamando funciones que vinieron por props.*

### 5.3 Prop drilling

`addItem` viaja **App → Cartas → Catalog → ProductCard**. `Cartas` y `Catalog` no la usan, solo la "pasan". Eso se llama **prop drilling**. En apps grandes se evita con **Context** (`createContext` / `useContext`) o librerías como Redux/Zustand; aquí, con pocos niveles, es aceptable y más fácil de entender.

### 5.4 Valores derivados (no son estado)

En `App`, `items`, `total` y `count` **se calculan** a partir de `cart` en cada render. No se guardan con `useState` porque se pueden obtener de otro estado. Si se guardaran aparte, habría que mantenerlos sincronizados a mano (fuente de bugs).

---

## 6. Recorrido archivo por archivo

> Cada archivo tiene un comentario al inicio que resume su función. Aquí va lo esencial.

### `index.html` + `main.jsx`
`index.html` tiene un `<div id="root">` vacío. `main.jsx` hace `createRoot(document.getElementById('root')).render(<App />)` envuelto en `<StrictMode>` y `<BrowserRouter>`.

### `App.jsx`
- `readSavedData()`: lee de `localStorage`/`sessionStorage` con `try/catch`.
- Estado: `cart`, `orders`, `user`, `cartOpen` (inicializados desde storage).
- `useEffect` que guardan `cart` y `orders` cada vez que cambian.
- Funciones: `addItem`, `changeQuantity`, `login`, `logout`, `updateUser`, `checkout`.
- Calcula `items`, `total`, `count`.
- Oculta `Header`/`Footer` en `/login`, `/registro`, `/recuperar`.
- Define todas las rutas.

### `components/Header.jsx`
Sin estado propio. Recibe todo por props. Menú con `NavLink`, link "Admin" solo si `isAdmin`, botón carrito, y el panel lateral (`<aside className="drawer">`) que se abre/cierra cambiando la clase con `cartOpen`. Botones − / + / Quitar llaman a `changeQuantity`. "Confirmar pedido" llama a `checkout` o manda a `/login` si no hay sesión. Se cierra con Escape.

### `components/Footer.jsx`
Tiene estado propio (`email`, `message`). El newsletter guarda correos (sin duplicar) en `localStorage['pokestore-newsletter']`.

### `components/Catalog.jsx`
Botones de categoría + buscador + grilla. Filtros en la URL con `useSearchParams`. Con `featured` y sin filtros muestra solo destacadas. Filtra con `products.filter(...)` y dibuja con `visible.map(...)` → `ProductCard`.

### `components/ProductCard.jsx`
Componente "tonto" (solo props, sin estado): imagen, nombre (links a `/productos/:id`), precio con `money()`, botón que llama `addItem(product.id)`.

### `pages/Inicio.jsx`
`<Catalog featured />` + secciones Nosotros y Contacto. `useEffect` que hace scroll a `#contacto` cuando la URL es `/#contacto`.

### `pages/Cartas.jsx`
Solo `<Catalog addItem={addItem} />` → todas las cartas.

### `pages/Productos.jsx`
Lee `id` con `useParams`, busca la carta, estado `quantity`, botón que llama `addItem(id, quantity)`, y 4 relacionados (`filter` → `slice` → `map`). Si el id no existe: "Carta no encontrada".

### `pages/Nosotros.jsx`
Contenido estático (HTML convertido a JSX).

### `pages/Login.jsx`
Un componente para 3 modos (`login`, `register`, `recover`). Inputs controlados. `submit()` valida con `authenticateUser`, revisa `isBlocked`, llama `registerUser` y la función `login` de App, y navega a `/mi-cuenta`. Si ya hay sesión → `<Navigate to="/mi-cuenta" />`.

### `pages/MiCuenta.jsx`
Protegida. Cambiar nombre (`updateUser`), ver pedidos propios (`orders.filter(...)`), cerrar sesión.

### `pages/Admin.jsx`
Protegida (solo `ADMIN_EMAIL`). CRUD de cartas con `productService` y bloquear/eliminar usuarios con `userService`. Después de cada cambio vuelve a pedir la lista y la guarda en el estado para re-dibujar.

### `data/products.js` y `data/usuarios.js`
Datos fijos (40 cartas y 3 usuarios) + `money()` para formatear CLP.

### `services/productService.js`
JS puro. Al importarse, si hay cartas guardadas en `localStorage`, **reemplaza el contenido** del array `products` (con `splice`). Funciones: `getProducts`, `addProduct`, `updateProduct`, `deleteProduct`, `resetProducts`.

### `services/userService.js`
JS puro. `getUsers` (carga los iniciales una sola vez), `authenticateUser`, `registerUser`, `isBlocked`, `toggleBlocked`, `deleteUser`. Constantes `ADMIN_EMAIL` y `ADMIN_PASSWORD`.

**¿Por qué "services"?** Separar la **lógica de datos** de la **interfaz**: los componentes quedan más simples y la lógica se puede testear sin dibujar nada (ver `Validaciones.test.js`).

---

## 7. Flujos paso a paso

### 7.1 Agregar una carta al carrito

1. Usuario en `/cartas` hace clic en **"Agregar al carro"** de Pikachu.
2. `ProductCard` ejecuta `addItem('pikachu')` (función que recibió por props).
3. Esa función es la de `App`: busca si Pikachu ya está en `cart`.
   - No está → `setCart([...cart, { id: 'pikachu', quantity: 1 }])`.
   - Está → `setCart(cart.map(...))` sumando 1.
4. También `setCartOpen(true)`.
5. React re-dibuja `App`: recalcula `items`, `total`, `count`.
6. `Header` recibe los nuevos valores → el número del botón sube y el panel se abre.
7. El `useEffect([cart])` guarda el carrito en `localStorage`.

### 7.2 Iniciar sesión

1. `/login` → `Login` con `mode='login'`.
2. Se escribe correo y clave → `setEmail`, `setPassword` en cada tecla.
3. Enviar → `submit(event)` → `event.preventDefault()`.
4. `authenticateUser(email, password)` → usuario o `null`.
   - `null` → `setMessage('El correo o la contraseña son incorrectos.')`.
5. `isBlocked(email)` → si está bloqueado, mensaje y fin.
6. `login(email, remember, nombre)` → en `App`: guarda en `localStorage` (Recordarme) o `sessionStorage`, y `setUser(account)`.
7. `navigate('/mi-cuenta')`.
8. Header ahora muestra "👤 Ignacio" y el botón "Salir" (porque `user` cambió en `App`).

### 7.3 Confirmar pedido

1. Clic en "Confirmar pedido" en el carrito → `confirm()` en `Header`.
2. Sin sesión → cierra carrito y `navigate('/login')`.
3. Con sesión → `checkout()` en `App`: crea `{ id, email, date, items, total }`, `setOrders([...orders, order])`, `setCart([])`.
4. `navigate('/mi-cuenta')` → `MiCuenta` filtra `orders` por el email y muestra el pedido.

### 7.4 Filtrar por tipo

1. Clic en "🔥 Fuego" → `changeCategory('fuego')` → `setParams({ tipo: 'fuego', q: query })`.
2. La URL cambia a `/cartas?tipo=fuego&q=`.
3. `Catalog` se re-dibuja: `params.get('tipo')` = `'fuego'` → `filter` deja solo las de fuego.

### 7.5 Admin agrega una carta

1. Admin llena el formulario y envía → `submit` en `Admin`.
2. `productService.addProduct(...)` → hace `push` al array `products` compartido y guarda en `localStorage`.
3. `setProducts(productService.getProducts())` → `Admin` se re-dibuja con la carta nueva.
4. Como `Catalog` importa el **mismo** array `products`, al ir a `/cartas` la carta nueva aparece.

---

## 8. La migración desde HTML/CSS/JS

Repositorio original: <https://github.com/rfelipe715/poke-page>

### 8.1 Antes y después

| Versión HTML (antes) | Versión React (ahora) |
| --- | --- |
| 6 archivos `.html` (`index`, `cartas`, `producto`, `login`, `mi-cuenta`, `nosotros`) | 1 `index.html` + componentes en `pages/` |
| Header y footer **copiados** en cada `.html` | `Header.jsx` y `Footer.jsx` escritos **una vez** |
| `JS/js.js` manipulaba el DOM (`getElementById`, `innerHTML`, `classList`) | El JSX se dibuja a partir del **estado** |
| Tarjetas creadas concatenando strings HTML | Componente `ProductCard` con props |
| `<a href="cartas.html">` → recarga | `<Link to="/cartas">` → sin recarga |
| Filtro con `?tipo=` leído a mano | `useSearchParams` |
| `producto.html` con JS para elegir la carta | Ruta dinámica `/productos/:id` + `useParams` |
| Carrito en `localStorage` leído en cada página | Estado en `App` + `useEffect` que lo guarda |
| Login contra 3 usuarios fijos (clave `1234`) | `userService` con registro, bloqueo, admin |
| Sin tests | Vitest + Testing Library + jest-axe |

### 8.2 Pasos típicos de la migración (para contar en la presentación)

1. Crear el proyecto con **Vite** (`npm create vite@latest`, plantilla React).
2. Copiar el CSS a `src/assets/CSS/` e importarlo desde cada componente.
3. Copiar imágenes a `public/`.
4. Pasar cada `.html` a un componente en `pages/` y convertir HTML → JSX (`class`→`className`, `for`→`htmlFor`, cerrar etiquetas, `onclick` → `onClick={...}`).
5. Extraer lo repetido (header, footer, tarjeta) a `components/`.
6. Instalar **React Router** y reemplazar los `<a href>` internos por `<Link>`.
7. Reemplazar el JS que tocaba el DOM por **estado** (`useState`) y **props**.
8. Mover la lógica de usuarios/productos a `services/`.
9. Agregar tests.

### 8.3 Dificultades típicas (ejemplos para responder "¿cómo fue migrar?")

- Acostumbrarse a **no tocar el DOM** directamente: en vez de `elemento.classList.add('open')`, cambiar un estado y que la clase dependa de él (`className={`drawer ${cartOpen ? 'open' : ''}`}`).
- Decidir **dónde poner el estado**: el carrito se necesitaba en el Header y en las páginas → se subió a `App`.
- Atributos HTML que no funcionan en JSX (`class`, `for`, `onclick` como texto).
- El header repetido en cada HTML pasó a ser un único componente.

---

## 9. Testing

### 9.1 Herramientas y configuración ⭐

| Herramienta | Para qué |
| --- | --- |
| **Vitest** | El *test runner*: encuentra los archivos `.test.js(x)` / `.spec.js(x)`, los ejecuta y muestra resultados. Da `describe`, `test`/`it`, `expect`, `vi`. |
| **jsdom** | Simula un navegador (document, window, localStorage) dentro de Node. |
| **@testing-library/react** | `render` (dibujar componentes), `screen` (buscar elementos), `fireEvent` (simular clics/escritura), `cleanup`. |
| **@testing-library/jest-dom** | Matchers del DOM: `toBeInTheDocument`, `toHaveValue`, `toHaveAttribute`... |
| **jest-axe** | Revisa accesibilidad: `toHaveNoViolations`. |
| **@vitest/coverage-v8** | Reporte de cobertura (`npm run test:coverage`). |

**`vite.config.js`:**

```js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',              // navegador simulado
    globals: true,                     // describe/test/expect sin importar
    setupFiles: './src/test/setup.js', // se ejecuta antes de cada archivo de test
  }
})
```

**`src/test/setup.js`:**

```js
import '@testing-library/jest-dom'          // agrega toBeInTheDocument, etc.
import { expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)           // agrega toHaveNoViolations
```

**`package.json`:** `"test": "vitest run"` y `"test:coverage": "vitest run --coverage"`.

### 9.2 `describe`, `it` / `test`, `expect` ⭐⭐⭐

```js
describe('Validacion real de credenciales', () => {      // ← GRUPO de tests
  test('rechaza una contrasena incorrecta', () => {       // ← UN caso de prueba
    const resultado = authenticateUser('bryan@pokestore.cl', 'incorrecta')
    expect(resultado).toBeNull()                          // ← VERIFICACIÓN
  })
})
```

- **`describe(nombre, fn)`**: agrupa tests relacionados. Solo organiza (y el nombre aparece en el reporte). Se pueden anidar.
- **`test(nombre, fn)`** o **`it(nombre, fn)`**: **son lo mismo**. Define un caso. Si cualquier `expect` falla (o se lanza un error), el test falla. `it` se usa para que se lea como frase: *"it muestra la página..."*.
- **`expect(valorReal).matcher(valorEsperado)`**: compara. El **matcher** es la regla de comparación.

**Patrón AAA** (cómo pensar un test):
1. **Arrange** (preparar): datos, `render(...)`.
2. **Act** (actuar): `fireEvent.click(...)`, llamar la función.
3. **Assert** (verificar): `expect(...)`.

### 9.3 Matchers usados en el proyecto

| Matcher | Pasa si... |
| --- | --- |
| `toBe(x)` | es exactamente `x` (`===`). Para números, strings, booleanos |
| `toEqual(x)` | tiene el **mismo contenido** (objetos/arrays) |
| `toMatchObject(x)` | contiene **al menos** esas propiedades |
| `toBeNull()` | es `null` |
| `toBeDefined()` | no es `undefined` |
| `toHaveLength(n)` | el array/string tiene largo `n` |
| `toContainEqual(x)` | el array contiene un elemento igual a `x` |
| `toBeInTheDocument()` | el elemento está en la pantalla *(jest-dom)* |
| `toHaveValue(x)` | el input tiene ese valor *(jest-dom)* |
| `toHaveAttribute(a, v)` | el elemento tiene ese atributo/valor *(jest-dom)* |
| `toHaveBeenCalledTimes(n)` | el espía se llamó `n` veces |
| `toHaveBeenCalledWith(...)` | el espía se llamó con esos argumentos |
| `toHaveNoViolations()` | axe no encontró problemas de accesibilidad *(jest-axe)* |
| `.not.` | invierte: `expect(x).not.toBeInTheDocument()` |

### 9.4 Buscar elementos con `screen`

| Tipo | Si no encuentra | Cuándo usarlo |
| --- | --- | --- |
| `getBy...` | **lanza error** (test falla) | el elemento **debe** estar |
| `queryBy...` | devuelve `null` | comprobar que **NO** está |
| `findBy...` | espera (async) | aparece después de un tiempo |
| `getAllBy...` | array (error si 0) | hay varios iguales |

Formas de buscar (preferir las que usaría un usuario):
- `getByRole('button', { name: 'INICIAR SESIÓN' })` — por rol accesible y texto.
- `getByRole('heading', { name: 'Mi cuenta' })` — títulos `h1`…`h6`.
- `getByRole('link', { name: 'Admin' })` — enlaces.
- `getByLabelText('Correo electrónico')` — inputs por su `<label>` (por eso importa `htmlFor`).
- `getByText('...')` — por texto visible.

### 9.5 Los tests del proyecto (7 archivos, 28 tests)

| Archivo | Tipo | Qué prueba |
| --- | --- | --- |
| `Renderizado.test.jsx` | humo (smoke) | La app completa se dibuja sin errores |
| `Rutas.test.jsx` | humo / rutas | `/`, `/login` y `/mi-cuenta` cargan sin errores |
| `Inicio.spec.jsx` | componente | Inicio muestra "Contacto" y link a `/cartas`; Catalog `featured` muestra Pikachu y no Bulbasaur |
| `Validaciones.test.js` | **unitario** | `authenticateUser`: normaliza mayúsculas/espacios, rechaza clave mala, correo desconocido y vacíos |
| `Mock.test.js` | unitario con **mock/spy** | `registerUser` guarda 1 sola vez y no duplica |
| `Accesibilidad.test.jsx` | accesibilidad | `/login` sin violaciones de axe |
| `Usuarios.test.jsx` | **integración** | Login admin y usuarios, credenciales malas, Recordarme, bloqueo, borrado, registro |

**Tipos de test (vocabulario):**
- **Unitario**: una función/componente aislado (`Validaciones.test.js`).
- **Integración**: varias piezas juntas, simulando al usuario (`Usuarios.test.jsx`).
- **Humo**: lo mínimo, "¿arranca?" (`Renderizado.test.jsx`).

### 9.6 Conceptos que aparecen en los tests

**`MemoryRouter`**: los componentes que usan `Link`, `useNavigate`, etc. **necesitan** estar dentro de un Router. En tests se usa `MemoryRouter` con `initialEntries={['/login']}` para empezar en una URL concreta.

```jsx
render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>)
```

**`fireEvent`**: simula acciones.

```js
fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } }) // escribir
fireEvent.click(screen.getByRole('button', { name: 'INICIAR SESIÓN' }))                // clic
```

**`beforeEach` / `afterEach`**: se ejecutan antes/después de **cada** test. En `Usuarios.test.jsx` limpian `localStorage`/`sessionStorage` para que **los tests no dependan entre sí**.

**`test.each`**: el mismo test con distintos datos.

```js
test.each(usuariosIniciales)('$name inicia sesión...', ({ email, name }) => { ... }) // 3 tests
test.each([['a@x.cl', 'mala'], ['b@x.cl', 'mala']])('rechaza %s / %s', (email, password) => { ... })
```

**Mocks / spies (`vi`)**:

```js
const guardar = vi.spyOn(Storage.prototype, 'setItem') // espía (sigue funcionando normal)
registerUser('nuevo@pokestore.cl', 'Nuevo')
expect(guardar).toHaveBeenCalledTimes(1)

const addItem = vi.fn()   // función falsa que solo registra sus llamadas
```

**`async` / `await`**: en `Accesibilidad.test.jsx`, `axe(container)` tarda, así que el test es `async` y se espera con `await`.

### 9.7 Cómo escribir un test nuevo (ejemplos que funcionan)

Estos ejemplos se probaron y pasan. Sirven si piden "escribe un test para...". Crear por ejemplo `src/test/Carrito.test.jsx`:

```jsx
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from '../App'
import { ProductCard } from '../components/ProductCard'
import { money } from '../data/products'

beforeEach(() => localStorage.clear())

describe('Carrito', () => {
  test('agregar una carta suma 1 al contador del carrito', () => {
    // Arrange
    render(<MemoryRouter initialEntries={['/cartas']}><App /></MemoryRouter>)
    // Act
    const botones = screen.getAllByRole('button', { name: 'Agregar al carro' })
    fireEvent.click(botones[0])
    // Assert
    expect(screen.getByRole('button', { name: /Carrito/ })).toHaveTextContent('1')
  })
})

describe('ProductCard', () => {
  test('llama a addItem con el id de la carta al hacer clic', () => {
    const addItem = vi.fn() // función falsa (mock)
    const carta = { id: 'pikachu', type: 'electrico', name: 'Pikachu', price: 15000, image: 'x.png' }
    render(<MemoryRouter><ProductCard product={carta} addItem={addItem} /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carro' }))
    expect(addItem).toHaveBeenCalledWith('pikachu')
    expect(screen.getByText(money(15000))).toBeInTheDocument()
  })
})

describe('Catálogo', () => {
  test('filtra por tipo con ?tipo=fuego', () => {
    render(<MemoryRouter initialEntries={['/cartas?tipo=fuego']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Charizard' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Pikachu' })).not.toBeInTheDocument()
  })

  test('una ruta inexistente muestra la página 404', () => {
    render(<MemoryRouter initialEntries={['/no-existe']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument()
  })
})
```

> Nota: `/Carrito/` (entre barras) es una **expresión regular**: busca un botón cuyo nombre *contenga* "Carrito" (el nombre completo incluye el emoji y el número).

### 9.8 Ejecutar y leer resultados

```bash
npm test                  # todos los tests
npx vitest run Usuarios   # solo archivos cuyo nombre contenga "Usuarios"
npm test -- --watch       # modo observación
npm run test:coverage     # cobertura → carpeta coverage/ (abrir coverage/index.html)
```

Un test que falla muestra el nombre del `describe` + `test`, el `expect` que falló, el valor **esperado** (*expected*) y el **recibido** (*received*).

**Cobertura**: % de líneas/funciones/ramas del código que se ejecutaron durante los tests. No dice si los tests son buenos, solo qué código "tocaron".

---

## 10. Preguntas tipo "¿qué pasaría si...?"

### React

**¿Qué pasa si en `addItem` hago `cart.push(...)` en vez de `setCart([...cart, ...])`?**
El array cambia en memoria, pero React **no se entera** (no se llamó a `setCart` y además es el mismo array), así que la pantalla no se actualiza y el carrito no se guarda.

**¿Qué pasa si escribo `onClick={addItem(product.id)}` sin la flecha?**
La función se ejecuta **al dibujar**, no al hacer clic: se agregarían cartas al carrito solas y, como eso cambia el estado y vuelve a dibujar, React entra en un bucle de renders y muestra un error.

**¿Qué pasa si quito `key` en un `.map()`?**
Funciona, pero React muestra una advertencia en consola y puede confundirse al actualizar la lista (por ejemplo, conservar el estado en el elemento equivocado).

**¿Qué pasa si quito `event.preventDefault()` en un formulario?**
El navegador envía el formulario de la forma tradicional y **recarga la página**: se pierde lo que estaba en memoria y la lógica no termina como se espera.

**¿Qué pasa si cambio `[cart]` por `[]` en el `useEffect` que guarda el carrito?**
Solo se guardaría al iniciar la app, no cuando cambia: al recargar, el carrito volvería al estado anterior.
¿Y si quito el array completo? Se guardaría después de **cada** render (funciona, pero hace trabajo innecesario).

**¿Qué pasa si muevo el estado `cart` de `App` a `Cartas`?**
El `Header` no podría mostrar el carrito (no tendría acceso a ese estado) y al cambiar de página se perdería, porque `Cartas` se desmonta. Por eso está en `App`.

**¿Qué pasa si `MiCuenta` intenta hacer `user.name = 'X'` directamente?**
Las props son de solo lectura: no se debe hacer. La forma correcta es llamar a `updateUser(name)`, que hace `setUser` en `App`.

**¿Cómo agrego un componente nuevo, por ejemplo un contador de cartas en el Header?**
Ya existe `count`: viene de `App` como prop. El patrón es: calcular en `App` → pasar como prop → usar en el hijo.

**¿Cómo hago que el botón "Agregar al carro" agregue 2 en vez de 1?**
En `ProductCard.jsx`: `onClick={() => addItem(product.id, 2)}` (el segundo parámetro de `addItem` es la cantidad).

**¿Cómo agrego una nueva carta destacada?**
Agregar su `id` a `featuredIds` en `Catalog.jsx`.

### React Router

**¿Cómo agrego una página nueva `/ofertas`?**
1. Crear `src/pages/Ofertas.jsx`:
   ```jsx
   export function Ofertas() {
     return <main className="catalogo"><h1>Ofertas</h1></main>
   }
   ```
2. En `App.jsx`: `import { Ofertas } from './pages/Ofertas'`.
3. Agregar **antes** de `path="*"`: `<Route path="/ofertas" element={<Ofertas />} />`.
4. Link en `Header.jsx`: `<NavLink to="/ofertas">Ofertas</NavLink>`.

**¿Qué pasa si saco `<BrowserRouter>` de `main.jsx`?**
La app se rompe con un error del tipo *"useNavigate() may be used only in the context of a `<Router>` component"*, porque `App` y los `Link` necesitan un Router.

**¿Qué pasa si cambio un `<Link to="/cartas">` por `<a href="/cartas">`?**
Funciona, pero **recarga toda la página**: más lento, y se pierde el estado en memoria (por ejemplo, si el carrito estaba abierto). El carrito no se pierde porque está en `localStorage`.

**¿Qué pasa si pongo la ruta `path="*"` al principio?**
En React Router v6+ el orden no importa para elegir la ruta: se elige la **más específica**, así que `*` solo se usa si nada más coincide. (Igual se acostumbra dejarla al final por claridad.)

**¿Qué pasa si quito la `key` en las rutas de `Login`?**
Al ir de `/login` a `/registro` React reutilizaría el mismo componente y **se mantendría lo escrito** en el correo/clave.

**¿Cómo protejo una ruta nueva para que solo entren usuarios con sesión?**
Pasarle `user` como prop y al inicio: `if (!user) return <Navigate to="/login" replace />` (después de los hooks).

**¿Qué diferencia hay entre `useNavigate` y `<Navigate>`?**
`useNavigate` da una función para navegar **en respuesta a algo** (un clic, un submit). `<Navigate>` es un componente que redirige **al dibujarse** (ideal para "si no hay sesión, fuera").

### Testing

**¿Qué pasa si quito `environment: 'jsdom'` de `vite.config.js`?**
Los tests de componentes fallan con *"document is not defined"*: Node no tiene navegador. Los que usan `localStorage` (como `Validaciones.test.js`, a través de `userService`) también dependen del navegador simulado.

**¿Qué pasa si borro `setup.js` (o lo saco de `setupFiles`)?**
`toBeInTheDocument`, `toHaveValue`, `toHaveNoViolations`, etc. **no existirían** → error *"Invalid Chai property"* / *"is not a function"*.

**¿Qué pasa si quito el `MemoryRouter` en un test?**
Error: los componentes usan `Link`/`useNavigate` y necesitan un Router.

**¿Qué pasa si cambio `getByRole` por `queryByRole` en un test que verifica que algo existe?**
Si el elemento no está, `queryBy` devuelve `null` y el error lo da el `expect(...).toBeInTheDocument()`. El test sigue fallando correctamente, pero el mensaje es menos claro. `queryBy` se reserva para comprobar que algo **no** está.

**¿Qué pasa si quito el `beforeEach` que limpia `localStorage` en `Usuarios.test.jsx`?**
Los tests quedarían **dependientes entre sí**: por ejemplo, el que bloquea a Bryan o borra a Felipe afectaría a los siguientes y podrían fallar según el orden.

**¿Qué pasa si cambio el texto del botón "INICIAR SESIÓN" a "Entrar"?**
Fallan los tests que lo buscan por nombre (`getByRole('button', { name: 'INICIAR SESIÓN' })`). Hay que actualizar el test. (Es buena señal: el test detecta cambios visibles para el usuario.)

**¿Qué pasa si cambio la contraseña de Ignacio en `usuarios.js`?**
Fallan los tests que usan `'123456'` para Ignacio (`Validaciones`, `Usuarios`).

**Escribe un test que falle a propósito.**
```js
test('falla a propósito', () => {
  expect(1 + 1).toBe(3)   // Expected: 3, Received: 2
})
```

**¿Diferencia entre `toBe` y `toEqual`?**
`toBe` compara identidad (`===`): `expect({a:1}).toBe({a:1})` **falla** porque son dos objetos distintos. `toEqual` compara contenido: `expect({a:1}).toEqual({a:1})` **pasa**.

**¿Qué es un mock y para qué sirve?**
Una función falsa o "espía" que registra cómo fue llamada (`vi.fn()`, `vi.spyOn()`). Sirve para comprobar **interacciones** (¿se llamó? ¿con qué?) o para reemplazar algo difícil de usar en tests (una API, la fecha actual...).

---

## 11. Cosas raras o mejorables que pueden preguntar

Es mejor conocerlas antes de que las encuentre el profesor:

1. **`requestInterceptor` en `Inicio.spec.jsx`**: se importa desde `jsdom` y solo se comprueba que devuelva algo (`toBeDefined()`). **No prueba nada del componente** y se podría borrar; las verificaciones reales son las de `render` + `screen` que vienen después.
2. **`Rutas.test.jsx` y `Renderizado.test.jsx` son débiles**: solo comprueban que `document.body` existe. Mejora: verificar contenido real, por ejemplo `expect(screen.getByRole('button', { name: 'INICIAR SESIÓN' })).toBeInTheDocument()` en `/login`. Además `screen` se importa sin usarse y por eso `npm run lint` marca un error en ese archivo.
3. **`'dragonite'` está en `featuredIds`** (`Catalog.jsx`) pero no existe en `products.js` → en el inicio se ven 6 destacadas, no 7.
4. **Registro con un correo que ya existe**: en `/registro`, si alguien usa el correo de otro usuario (ej. `ignacio@pokestore.cl`) con la clave `Pokemon123!`, `registerUser` no lo duplica, pero igual se inicia sesión con ese correo. Arreglo posible en `Login.jsx`: antes de registrar, si `getUsers()` ya tiene ese correo, mostrar "Ese correo ya está registrado" y hacer `return`.
5. **Seguridad**: las contraseñas están en texto plano en el código/`localStorage` y la validación es en el navegador. Está bien para un proyecto académico sin backend; en producción la autenticación va en un servidor.
6. **Prop drilling** de `addItem` (ver [5.3](#53-prop-drilling)); se podría usar Context.
7. **`userEvent`** (`@testing-library/user-event`) está instalado pero los tests usan `fireEvent`. `userEvent` simula más fielmente a un usuario real (teclas una a una, foco...).

---

## 12. Guion para la demo de 5 minutos

Sugerencia (aprox. 1 minuto por bloque). Antes de la demo: abrir el sitio, **borrar los datos del sitio** (o usar ventana incógnito) y tener la terminal lista con `npm test`.

1. **Inicio (0:00–0:45)** — Cartas destacadas, menú. Mencionar: "es una SPA en React; el header y el footer son componentes reutilizados en todas las páginas".
2. **Catálogo (0:45–1:45)** — Ir a *Cartas*, filtrar por *Fuego* (mostrar que la URL cambia a `?tipo=fuego`), buscar "char". Mencionar `useSearchParams` y el componente `ProductCard` reutilizado.
3. **Detalle + carrito (1:45–2:45)** — Abrir una carta (`/productos/charizard`, ruta dinámica con `useParams`), subir la cantidad, agregar al carrito, mostrar el panel, sumar/restar. Mencionar que el carrito es **estado en `App`** que baja por **props** al `Header`.
4. **Login y pedido (2:45–3:45)** — Intentar confirmar sin sesión → redirige a login. Iniciar sesión como `ignacio@pokestore.cl`, confirmar pedido, verlo en *Mi cuenta*. Mencionar rutas protegidas con `<Navigate>`.
5. **Admin (3:45–4:30)** — Cerrar sesión, entrar como admin, agregar una carta y mostrarla en el catálogo; bloquear un usuario.
6. **Tests (4:30–5:00)** — Ejecutar `npm test`: "7 archivos, 28 tests pasando: unitarios, integración, mocks y accesibilidad".

---

## 13. Glosario rápido

| Término | Significado corto |
| --- | --- |
| **SPA** | Single Page Application: una sola página HTML, el contenido cambia con JS |
| **Componente** | Función que devuelve JSX; pieza reutilizable de interfaz |
| **JSX** | Sintaxis tipo HTML dentro de JavaScript |
| **Props** | Datos que un padre le pasa a un hijo (solo lectura) |
| **Estado** | Datos que cambian y re-dibujan el componente (`useState`) |
| **Hook** | Función de React que empieza con `use` |
| **Render** | Ejecutar el componente para obtener lo que se dibuja |
| **Re-render** | Volver a dibujar porque cambió el estado o las props |
| **Efecto** | Código que se ejecuta después de dibujar (`useEffect`) |
| **Lifting state up** | Subir el estado al padre común de quienes lo necesitan |
| **Prop drilling** | Pasar una prop por varios niveles intermedios |
| **Input controlado** | Input cuyo valor viene del estado |
| **Ruta dinámica** | Ruta con parámetro, ej. `/productos/:id` |
| **Query params** | Parte de la URL después de `?`, ej. `?tipo=fuego` |
| **Test runner** | Programa que ejecuta los tests (Vitest) |
| **Matcher** | La comparación de `expect` (`toBe`, `toEqual`...) |
| **Mock / spy** | Función falsa o espía para verificar llamadas |
| **jsdom** | Navegador simulado para correr tests en Node |
| **Cobertura** | % del código ejecutado por los tests |
| **Destructuring** | Sacar valores de objetos/arrays a variables: `const { a } = obj` |
| **Spread** | `...` para copiar/expandir arrays y objetos |
