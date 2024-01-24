import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import Inversiones from './pages/Inversiones'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import Pagina404 from './pages/Pagina404'
import Football from './pages/Football'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Directores from './pages/Directores'
import Login from './pages/Login'
import Pedidos from './pages/Pedidos'
import PedidosDetalle from './pages/PedidosDetalle'
import CarritoEmpleado from './pages/CarritoEmpleado'

function App() {
  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <MainNav />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inversiones" element={<Inversiones />} />
            <Route path="/football" element={<Football />} />
            <Route path="/directores" element={<Directores />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/productodetalle/:idproducto" element={<ProductoDetalle />} />
            <Route path="/pedidosdetalle/:idpedido" element={<PedidosDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/carritoempleado" element={<CarritoEmpleado/>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Pagina404 />} />
          </Routes>
        </main>
        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App
