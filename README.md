# PokeStore

Aplicacion de una tienda de cartas Pokemon desarrollada con React y Vite. Permite explorar productos, administrar un carrito, iniciar sesion y gestionar cartas y usuarios desde un panel de administrador.

El proyecto funciona en el navegador y guarda los datos de prueba mediante `localStorage` y `sessionStorage`. No utiliza un backend ni una base de datos externa.

Demo en vivo
🚀 Ver PokéStore en funcionamiento
https://poke-page-react.vercel.app
Despliegue: Vercel, conectado a la rama main de GitHub.

## Tecnologias

- **React 19:** componentes funcionales, estado con `useState` y efectos con `useEffect`.
- **Vite:** servidor de desarrollo y compilacion para produccion.
- **React Router:** rutas, navegacion y parametros de busqueda.
- **CSS:** estilos de las paginas y componentes.
- **Vitest y Testing Library:** pruebas de componentes, rutas y comportamiento de usuarios.
- **jsdom y jest-axe:** entorno de navegador para pruebas y comprobaciones automaticas de accesibilidad.
- **ESLint:** revision estatica del codigo.

## Requisitos e instalacion

La version instalada de Vite requiere Node.js `20.19+` dentro de la rama 20, o `22.12+`. Tambien necesitas npm.

Desde la carpeta del proyecto, instala las dependencias e inicia el servidor:

```bash
npm install
npm run dev
```

Abre la direccion que indique la terminal. Por defecto, Vite suele utilizar `http://localhost:5173`.

Si PowerShell bloquea la ejecucion de `npm.ps1`, puedes usar `npm.cmd` en los mismos comandos, por ejemplo `npm.cmd run dev`.

## Funcionalidades

- Catalogo con busqueda por nombre y filtros por tipo de Pokemon.
- Pagina de inicio con cartas destacadas e informacion de contacto.
- Detalle de cada carta, selector de cantidad y productos relacionados.
- Carrito con opciones para agregar, aumentar, disminuir y eliminar productos.
- Registro e inicio de sesion con cuentas de prueba.
- Opcion de recordar la sesion y cierre de sesion.
- Cuenta personal para editar el nombre y consultar pedidos propios.
- Confirmacion de pedidos de prueba para usuarios con sesion iniciada.
- Panel de administrador para agregar, editar, eliminar y restaurar cartas.
- Administracion de usuarios mediante bloqueo, desbloqueo y eliminacion.
- Suscripcion al newsletter guardada en el navegador.

## Estructura del proyecto

```text
poke-page-react/
|-- public/                 # Archivos publicos e imagenes
|-- src/
|   |-- assets/             # Imagenes y estilos de las paginas
|   |-- components/         # Header, Footer, Catalog y ProductCard
|   |-- data/               # Productos y usuarios iniciales
|   |-- pages/              # Paginas de la aplicacion
|   |-- services/           # Operaciones sobre usuarios y productos
|   |-- test/               # Pruebas y configuracion compartida
|   |-- App.jsx             # Rutas, carrito, pedidos y sesion
|   |-- main.jsx            # Inicio de React y BrowserRouter
|   |-- index.css           # Estilos globales
|-- package.json            # Dependencias y comandos
|-- vite.config.js          # Configuracion de Vite y Vitest
```

`App.jsx` mantiene el estado compartido del carrito, los pedidos y la sesion, y pasa datos y funciones a las paginas mediante props. Los servicios concentran las operaciones de usuarios y productos para mantener esa logica fuera de los componentes de interfaz.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio y cartas destacadas |
| `/cartas` | Catalogo completo |
| `/productos/:id` | Detalle de una carta |
| `/nosotros` | Informacion de la tienda |
| `/login` | Inicio de sesion |
| `/registro` | Registro de usuarios |
| `/recuperar` | Informacion sobre recuperacion de acceso |
| `/mi-cuenta` | Datos personales y pedidos; requiere sesion |
| `/admin` | Panel exclusivo del administrador |

El catalogo utiliza los parametros `tipo` y `q` en la URL. Por ejemplo, `/cartas?tipo=fuego` muestra las cartas de fuego.

## Cuentas de prueba

| Cuenta | Correo | Contrasena |
| --- | --- | --- |
| Administrador | `admin@pokestore.cl` | `Pokemon123!` |
| Ignacio | `ignacio@pokestore.cl` | `123456` |
| Bryan | `bryan@pokestore.cl` | `123456` |
| Felipe | `felipe@pokestore.cl` | `123456` |

Los tres usuarios normales estan definidos en `src/data/usuarios.js` con el rol `user`. Las credenciales del administrador y la validacion de acceso se encuentran en `src/services/userService.js`. El permiso de administrador se comprueba mediante su correo.

Los usuarios iniciales se incorporan una sola vez al almacenamiento sin reemplazar cuentas existentes. Si una cuenta ya tiene una contrasena guardada, se conserva esa contrasena. Los usuarios eliminados desde el panel no se vuelven a crear automaticamente.

El registro conserva el mecanismo de prueba del proyecto: para crear una cuenta nueva se utiliza la contrasena `Pokemon123!`.

## Almacenamiento y sesion

| Clave | Almacenamiento | Uso |
| --- | --- | --- |
| `pokestore-users` | localStorage | Usuarios registrados y estado de bloqueo |
| `pokestore-users-initialized` | localStorage | Marca de inicializacion de los usuarios de prueba |
| `pokestore-user` | localStorage o sessionStorage | Sesion actual |
| `pokestore-cart` | localStorage | Productos y cantidades del carrito |
| `pokestore-orders` | localStorage | Pedidos de prueba |
| `pokestore-products` | localStorage | Cambios realizados al catalogo |
| `pokestore-newsletter` | localStorage | Correos suscritos al newsletter |

Al marcar **Recordarme**, la sesion se guarda en `localStorage`. En caso contrario se guarda en `sessionStorage`. Al cerrar sesion se elimina la cuenta activa de ambos almacenamientos.

Los datos pertenecen al navegador y al origen utilizado para abrir la aplicacion. No se sincronizan entre dispositivos. Borrar el almacenamiento del sitio elimina los datos guardados localmente.

## Pruebas

Para ejecutar la suite una vez:

```bash
npm test
```

Para trabajar con las pruebas en modo observacion:

```bash
npm test -- --watch
```

Para generar el reporte de cobertura:

```bash
npm test -- --coverage
```

Las pruebas estan en `src/test`. Incluyen inicio, renderizado, rutas, validacion de credenciales, usuarios, persistencia con mocks y accesibilidad del login. `setup.js` carga los matchers de Testing Library y `toHaveNoViolations` de jest-axe. Vitest utiliza `jsdom`, configurado en `vite.config.js`.

## Comandos disponibles

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm test` | Ejecuta las pruebas con Vitest |
| `npm run lint` | Revisa el codigo con ESLint |
| `npm run build` | Genera la compilacion en `dist/` |
| `npm run preview` | Sirve localmente la compilacion generada |

Antes de entregar cambios, ejecuta:

```bash
npm test
npm run lint
npm run build
```

Para revisar la compilacion en el navegador, ejecuta `npm run preview` despues de `npm run build`.
