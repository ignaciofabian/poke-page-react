# PokéStore

[![Live](https://img.shields.io/badge/live-poke--page--react.vercel.app-brightgreen?logo=vercel)](https://poke-page-react.vercel.app)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/tests-28%20pasando-success?logo=vitest&logoColor=white)
![Estado](https://img.shields.io/badge/estado-actualizado-blue)

**🔴 Live:** **[https://poke-page-react.vercel.app](https://poke-page-react.vercel.app)**

Tienda en línea de cartas Pokémon desarrollada con React y Vite como proyecto académico de DUOC UC. Permite explorar un catálogo de cartas, filtrarlas por tipo, administrar un carrito, registrarse, iniciar sesión, confirmar pedidos de prueba y gestionar cartas y usuarios desde un panel de administrador.

El proyecto nació como un sitio HTML estático de varias páginas y fue migrado a una SPA en React. Funciona completamente en el navegador: los datos de prueba se guardan con `localStorage` y `sessionStorage`, sin backend ni base de datos externa.

## Estado del proyecto

✅ **Actualizado (octubre 2026).** La migración a React está completa y todas las funcionalidades descritas en este documento están implementadas y desplegadas.

- Rutas, carrito, sesión y pedidos funcionando en React (`App.jsx`).
- Panel de administrador para cartas y usuarios.
- Suite de pruebas con Vitest: 7 archivos y 28 pruebas pasando, incluidas pruebas de accesibilidad con jest-axe.
- Despliegue continuo en Vercel desde la rama `main` de GitHub: cada cambio fusionado en `main` se publica automáticamente en el enlace **Live**.

## Demo en vivo

| | |
| --- | --- |
| **URL** | [https://poke-page-react.vercel.app](https://poke-page-react.vercel.app) |
| **Plataforma** | Vercel |
| **Rama desplegada** | `main` |
| **Repositorio** | [github.com/ignaciofabian/poke-page-react](https://github.com/ignaciofabian/poke-page-react) |

Para probar la demo puedes usar cualquiera de las [cuentas de prueba](#cuentas-de-prueba). Con la cuenta de administrador se habilita el acceso a `/admin`.

> Los datos que crees en la demo (usuarios, pedidos, cambios al catálogo) se guardan solo en tu navegador. Para volver al estado inicial, borra los datos del sitio desde la configuración del navegador.

## Funcionalidades

**Para clientes**

- Página de inicio con cartas destacadas e información de contacto.
- Catálogo de 40 cartas con búsqueda por nombre y filtros por tipo (agua, eléctrico, fuego, lucha, normal, planta y psíquico).
- Detalle de cada carta, con selector de cantidad y productos relacionados.
- Carrito para agregar, aumentar, disminuir y eliminar productos; se conserva al recargar la página.
- Registro e inicio de sesión, con opción **Recordarme** y cierre de sesión.
- Mi cuenta: edición del nombre y consulta de los pedidos propios.
- Confirmación de pedidos de prueba para usuarios con sesión iniciada.
- Suscripción al newsletter.
- Página 404 para rutas inexistentes.

**Para el administrador**

- Agregar, editar, eliminar y restaurar cartas del catálogo.
- Bloquear, desbloquear y eliminar usuarios.

## Tecnologías

- **React 19:** componentes funcionales, estado con `useState` y efectos con `useEffect`.
- **Vite:** servidor de desarrollo y compilación para producción.
- **React Router:** rutas, navegación y parámetros de búsqueda.
- **CSS:** estilos por página y componente.
- **Vitest y Testing Library:** pruebas de componentes, rutas y comportamiento de usuarios.
- **jsdom y jest-axe:** entorno de navegador para pruebas y comprobaciones automáticas de accesibilidad.
- **ESLint:** revisión estática del código.
- **Vercel:** hosting y despliegue continuo.

## Requisitos e instalación

La versión instalada de Vite requiere Node.js `20.19+` dentro de la rama 20, o `22.12+`. También necesitas npm.

Clona el repositorio, instala las dependencias e inicia el servidor:

```bash
git clone https://github.com/ignaciofabian/poke-page-react.git
cd poke-page-react
npm install
npm run dev
```

Abre la dirección que indique la terminal. Por defecto, Vite suele utilizar `http://localhost:5173`.

Si PowerShell bloquea la ejecución de `npm.ps1`, puedes usar `npm.cmd` en los mismos comandos, por ejemplo `npm.cmd run dev`.

## Estructura del proyecto

```text
poke-page-react/
|-- public/                 # Archivos públicos e imágenes
|-- src/
|   |-- assets/             # Imágenes y estilos de las páginas
|   |-- components/         # Header, Footer, Catalog y ProductCard
|   |-- data/               # Productos y usuarios iniciales
|   |-- pages/              # Páginas de la aplicación
|   |-- services/           # Operaciones sobre usuarios y productos
|   |-- test/               # Pruebas y configuración compartida
|   |-- App.jsx             # Rutas, carrito, pedidos y sesión
|   |-- main.jsx            # Inicio de React y BrowserRouter
|   |-- index.css           # Estilos globales
|-- package.json            # Dependencias y comandos
|-- vite.config.js          # Configuración de Vite y Vitest
```

`App.jsx` mantiene el estado compartido del carrito, los pedidos y la sesión, y pasa datos y funciones a las páginas mediante props. Los servicios (`src/services/`) concentran las operaciones de usuarios y productos para mantener esa lógica fuera de los componentes de interfaz.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio y cartas destacadas |
| `/cartas` | Catálogo completo |
| `/productos/:id` | Detalle de una carta |
| `/nosotros` | Información de la tienda |
| `/login` | Inicio de sesión |
| `/registro` | Registro de usuarios |
| `/recuperar` | Información sobre recuperación de acceso |
| `/mi-cuenta` | Datos personales y pedidos; requiere sesión |
| `/admin` | Panel exclusivo del administrador |
| `*` | Página no encontrada |

El catálogo utiliza los parámetros `tipo` y `q` en la URL. Por ejemplo, [`/cartas?tipo=fuego`](https://poke-page-react.vercel.app/cartas?tipo=fuego) muestra las cartas de fuego.

## Cuentas de prueba

| Cuenta | Correo | Contraseña |
| --- | --- | --- |
| Administrador | `admin@pokestore.cl` | `Pokemon123!` |
| Ignacio | `ignacio@pokestore.cl` | `123456` |
| Bryan | `bryan@pokestore.cl` | `123456` |
| Felipe | `felipe@pokestore.cl` | `123456` |

Los tres usuarios normales están definidos en `src/data/usuarios.js` con el rol `user`. Las credenciales del administrador y la validación de acceso se encuentran en `src/services/userService.js`. El permiso de administrador se comprueba mediante su correo.

Los usuarios iniciales se incorporan una sola vez al almacenamiento sin reemplazar cuentas existentes. Si una cuenta ya tiene una contraseña guardada, se conserva esa contraseña. Los usuarios eliminados desde el panel no se vuelven a crear automáticamente.

El registro conserva el mecanismo de prueba del proyecto: para crear una cuenta nueva se utiliza la contraseña `Pokemon123!`.

## Almacenamiento y sesión

| Clave | Almacenamiento | Uso |
| --- | --- | --- |
| `pokestore-users` | localStorage | Usuarios registrados y estado de bloqueo |
| `pokestore-users-initialized` | localStorage | Marca de inicialización de los usuarios de prueba |
| `pokestore-user` | localStorage o sessionStorage | Sesión actual |
| `pokestore-cart` | localStorage | Productos y cantidades del carrito |
| `pokestore-orders` | localStorage | Pedidos de prueba |
| `pokestore-products` | localStorage | Cambios realizados al catálogo |
| `pokestore-newsletter` | localStorage | Correos suscritos al newsletter |

Al marcar **Recordarme**, la sesión se guarda en `localStorage`. En caso contrario se guarda en `sessionStorage`. Al cerrar sesión se elimina la cuenta activa de ambos almacenamientos.

Los datos pertenecen al navegador y al origen utilizado para abrir la aplicación (por ejemplo, la demo en Vercel y `localhost` tienen datos separados). No se sincronizan entre dispositivos. Borrar el almacenamiento del sitio elimina los datos guardados localmente.

## Pruebas

Para ejecutar la suite una vez:

```bash
npm test
```

Para trabajar con las pruebas en modo observación:

```bash
npm test -- --watch
```

Para generar el reporte de cobertura:

```bash
npm test -- --coverage
```

Las pruebas están en `src/test` e incluyen inicio, renderizado, rutas, validación de credenciales, usuarios, persistencia con mocks y accesibilidad del login. `setup.js` carga los matchers de Testing Library y `toHaveNoViolations` de jest-axe. Vitest utiliza `jsdom`, configurado en `vite.config.js`.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm test` | Ejecuta las pruebas con Vitest |
| `npm run lint` | Revisa el código con ESLint |
| `npm run build` | Genera la compilación en `dist/` |
| `npm run preview` | Sirve localmente la compilación generada |

Antes de entregar cambios, ejecuta:

```bash
npm test
npm run lint
npm run build
```

Para revisar la compilación en el navegador, ejecuta `npm run preview` después de `npm run build`.

## Equipo

Proyecto desarrollado por Ignacio, Bryan y Felipe para DUOC UC.
