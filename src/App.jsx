import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Inicio } from './pages/Inicio'
import { Cartas } from './pages/Cartas'
import { Nosotros } from './pages/Nosotros'
import { Login } from './pages/Login'
import { MiCuenta } from './pages/MiCuenta'
import { Productos } from './pages/Productos'
import { Admin } from './pages/Admin'
import { send } from './services/api'
import { getProducts } from './services/productService'

function readSavedData(storage, key, initialValue) {
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

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  // guardar aqui los datos que usan varias paginas
  const [cart, setCart] = useState(() =>
    readSavedData(localStorage, 'pokestore-cart', [])
  )
  const [orders, setOrders] = useState(() =>
    readSavedData(localStorage, 'pokestore-orders', [])
  )
  const [user, setUser] = useState(() => {
    const savedUser = readSavedData(localStorage, 'pokestore-user', null)
    const account = savedUser || readSavedData(sessionStorage, 'pokestore-user', null)
    return account?.token && account.expiresAt > Date.now() ? account : null
  })
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    const controller = new AbortController()
    getProducts(controller.signal).then(cards => {
      if (controller.signal.aborted) return
      setProducts(cards)
      setStatus('ready')
    }).catch(() => {
      if (!controller.signal.aborted) setStatus('error')
    })
    return () => controller.abort()
  }, [])
  useEffect(() => {
    if (!user) return
    const timer = setTimeout(() => setUser(null), Math.max(0, user.expiresAt - Date.now()))
    return () => clearTimeout(timer)
  }, [user])
  const [cartOpen, setCartOpen] = useState(false)

  // guardar el carrito para no perderlo al recargar
  useEffect(() => {
    localStorage.setItem('pokestore-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('pokestore-orders', JSON.stringify(orders))
  }, [orders])

  function addItem(id, quantity = 1) {
    const existingItem = cart.find((item) => item.id === id)
    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { id: item.id, quantity: item.quantity + quantity }
        }
        return item
      })
      setCart(updatedCart)
    } else {
      setCart([...cart, { id: id, quantity: quantity }])
    }
    setCartOpen(true)
  }

  function changeQuantity(id, quantity) {
    if (quantity <= 0) {
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

  function login(account, remember) {
    localStorage.removeItem('pokestore-user')
    sessionStorage.removeItem('pokestore-user')
    if (remember) {
      localStorage.setItem('pokestore-user', JSON.stringify(account))
    } else {
      sessionStorage.setItem('pokestore-user', JSON.stringify(account))
    }
    setUser(account)
  }

  async function updateUser(nombre) {
    const saved = await send('/auth/perfil', 'PATCH', user.token, {nombre})
    const account = {...user, name: saved.nombre}
    const storage = localStorage.getItem('pokestore-user') ? localStorage : sessionStorage
    if (!storage.getItem('pokestore-user')) return
    storage.setItem('pokestore-user', JSON.stringify(account))
    setUser(account)
  }

  function logout() {
    localStorage.removeItem('pokestore-user')
    sessionStorage.removeItem('pokestore-user')
    setUser(null)
    setCartOpen(false)
    navigate('/login')
  }

  // calcular el total usando las cantidades del carrito
  const items = []
  let total = 0
  let count = 0
  for (const item of cart) {
    const product = products.find((product) => product.id === item.id)
    if (product) {
      items.push({ id: item.id, quantity: item.quantity, product: product })
      total = total + product.price * item.quantity
      count = count + item.quantity
    }
  }

  function checkout() {
    if (!user || items.length === 0) {
      return
    }
    const order = {
      id: String(Date.now()),
      email: user.email,
      date: new Date().toISOString(),
      items: items,
      total: total
    }
    setOrders([...orders, order])
    setCart([])
  }

  const isLoginPage =
    location.pathname === '/login' ||
    location.pathname === '/registro' ||
    location.pathname === '/recuperar'

  return (
    <>
      {!isLoginPage && (
        <Header
          items={items}
          total={total}
          count={count}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          changeQuantity={changeQuantity}
          user={user}
          isAdmin={user?.role === 'admin'}
          logout={logout}
          checkout={checkout}
        />
      )}
      <Routes>
        <Route path="/" element={<Inicio products={products} status={status} addItem={addItem} />} />
        <Route path="/cartas" element={<Cartas products={products} status={status} addItem={addItem} />} />
        <Route path="/nosotros" element={<Nosotros />} />
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
              updateUser={updateUser}
              user={user}
              logout={logout}
              orders={orders}
            />
          }
        />
        <Route path="/admin" element={<Admin onProducts={setProducts} user={user} products={products} status={status} />} />
        <Route
          path="/productos/:id"
          element={<Productos key={location.pathname} products={products} status={status} addItem={addItem} />}
        />
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
