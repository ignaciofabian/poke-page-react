# PokéStore

Tienda académica de cartas Pokémon desarrollada por Ignacio, Bryan y Felipe para **Duoc UC**. El catálogo permite buscar cartas por nombre y tipo, consultar su precio en pesos chilenos y armar un pedido de demostración. El panel de administración permite mantener el inventario y gestionar las cuentas desde la misma aplicación.

Este repositorio contiene el frontend en **React 19, React Router y Vite**. La [API de PokéStore](https://github.com/bburgosvader/backend-pokepage) está desarrollada con **Express, TypeScript y MongoDB**.

## Qué puedes hacer

| Acceso | Funciones |
| --- | --- |
| Visitante | Explorar cartas destacadas, filtrar el catálogo, consultar detalles y relacionados, y agregar unidades al carrito. |
| Cliente | Crear una cuenta, iniciar sesión, editar el nombre, confirmar un pedido de prueba y consultar su historial en el mismo navegador. |
| Administrador | Crear, editar y eliminar cartas, restaurar el catálogo original y bloquear, desbloquear o eliminar usuarios. |

MongoDB guarda las cartas, las cuentas y los cambios administrativos. El navegador conserva el carrito, los pedidos de demostración y las suscripciones al newsletter. La sesión usa un JWT de una hora. **Recordarme** guarda la sesión en `localStorage`; en caso contrario se utiliza `sessionStorage`.

## Desarrollo local

Necesitas ambos repositorios, npm, **Node.js 24.15 o posterior de la rama 24** y una base de datos MongoDB accesible. Si vas a probar la restauración del catálogo, usa MongoDB Atlas o un replica set que admita transacciones.

### 1. Preparar la API

En la raíz de `backend-pokepage`, crea un archivo `.env` con estos valores de ejemplo y sustituye el secreto antes de iniciar el servidor.

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/pokestore
JWT_SECRET=reemplazar-por-un-secreto-aleatorio
PORT=3000
```

Desde esa misma carpeta, ejecuta en una terminal:

```sh
npm ci
npm run dev
```

La API empieza a escuchar después de conectarse a MongoDB e inicializar las cuentas. Abre [el endpoint de cartas](http://localhost:3000/api/v1/cards) para comprobarlo. Si devuelve `[]`, la conexión funciona y el catálogo está vacío.

### 2. Iniciar el frontend

En una segunda terminal, desde la raíz de `poke-page-react`, ejecuta:

```sh
npm ci
npm run dev
```

Abre la dirección que indique Vite, normalmente [localhost:5173](http://localhost:5173). En desarrollo, Vite reenvía las peticiones de `/api/v1` a `http://localhost:3000`. Si cambias el puerto de la API, ajusta también el destino del proxy en [vite.config.js](vite.config.js).

### 3. Probar los dos roles

| Rol de desarrollo | Correo | Contraseña inicial |
| --- | --- | --- |
| Administrador | `admin@pokestore.cl` | `Pokemon123!` |
| Cliente | `ignacio@pokestore.cl` | `123456` |

Entra en [Iniciar sesión](http://localhost:5173/login). Con la cuenta administradora aparecerá **Admin** en el menú. Si usas una base de desarrollo vacía, **Restaurar cartas originales** carga las 40 cartas iniciales. En una base con datos, la misma acción **reemplaza todo el catálogo**, incluidas las cartas agregadas o editadas.

Para probar el flujo de cliente, agrega una carta, cambia la cantidad y confirma el pedido. Encontrarás el resultado en **Mi cuenta**. También puedes crear un usuario desde **Registro**. La opción de recuperación de contraseña invita a contactar con la tienda para solicitar ayuda.

## Dónde encontrar el código

| Ubicación | Responsabilidad |
| --- | --- |
| [src/App.jsx](src/App.jsx) | Rutas, sesión, catálogo compartido, carrito y pedidos. |
| [src/pages/](src/pages/) | Vistas de la tienda, acceso, perfil y panel de administración. |
| [src/components/](src/components/) | Catálogo con filtros, tarjetas de producto, navegación y carrito lateral. |
| [src/services/](src/services/) | Cliente HTTP, autenticación y lectura del catálogo. |
| [src/test/](src/test/) | Pruebas de componentes, rutas, sesión, carrito y accesibilidad. |

## Pruebas y compilación

Ejecuta estos comandos desde el repositorio del frontend. Las pruebas usan Vitest, Testing Library y respuestas simuladas de la API, por lo que pueden ejecutarse con el backend apagado.

| Comando | Resultado |
| --- | --- |
| `npm test` | Ejecuta la suite una vez. |
| `npm run test:coverage` | Ejecuta la suite y genera el informe de cobertura. |
| `npm run lint` | Comprueba el código con ESLint. |
| `npm run build` | Genera el frontend de producción en `dist/`. |
| `npm run preview` | Sirve la compilación para revisarla localmente. |

## Despliegue

Publica `dist/` en un servidor de archivos estáticos. Configura el alojamiento para servir `index.html` al abrir directamente rutas de React como `/cartas` o `/mi-cuenta`.

- **API bajo el mismo dominio.** Reenvía `/api/v1/*` al backend antes de aplicar la regla de rutas de React.
- **API en otro dominio.** Define `VITE_API_BASE_URL` con la URL pública completa de la API, por ejemplo `https://api.example.com/api/v1`, **antes** de ejecutar `npm run build`. Autoriza el origen del frontend en la configuración CORS de Express.

Configura `MONGO_URI` y `JWT_SECRET` exclusivamente en el servidor. Para inicializar la cuenta `admin@pokestore.cl` en producción, establece `NODE_ENV=production` y `POKESTORE_ADMIN_PASSWORD` en el backend antes del primer arranque. Esa variable se usa al crear la cuenta y no cambia la contraseña de una cuenta existente.
