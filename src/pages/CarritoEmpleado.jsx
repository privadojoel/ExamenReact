/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils"
import PageHeader from "../components/PageHeader";
function CarritoEmpleado() {
    const [listaItems, setListaItems] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        leerDatosListaEmpleado()
    }, [])

    const leerDatosListaEmpleado = () => {
        let datosEmpleado = JSON.parse(sessionStorage.getItem("empleadoslista"))
        setListaItems(datosEmpleado)
        //if (datosEmpleado !== null) {
        //    calcularTotal(datosEmpleado)
        //}
    }

    //const calcularTotal = (datosCarrito) => {
    //    let sumaTotal = datosCarrito.reduce((acumulador, fila) => acumulador + fila["precio"] * fila["cantidad"], 0)
    //    setTotal(sumaTotal)
    //}

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th >Apellidos</th>
                        <th >Nombres</th>
                        <th >Cargo</th>
                        <th >País</th>
                        <th >Dirección</th>
                        <th >Foto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaItems !== null
                        ? listaItems.map(item =>
                            <tr key={item.idempleado}>
                                <td>{item.idempleado}</td>
                                <td>{item.apellidos}</td>
                                <td>{item.nombres}</td>
                                <td>{item.cargo}</td>
                                <td>{item.pais}</td>
                                <td>{item.direccion}</td>
                                <td> 
                                    <img src={ApiWebURL + "fotos/" + item.foto} className="img-fluid" alt="..."/>                                
                                </td>
                                
                                <td><i className="bi bi-x-lg eliminar-item" title="Eliminar item"
                                    onClick={() => eliminarItem(item)}></i></td>
                            </tr>
                        )
                        : <></>
                    }
                </tbody>
            </table>
        )
    }

    const eliminarItem = (item) => {
        let carritoMenos = listaItems.filter(itemCart => itemCart.idempleado !== item.idempleado) 
        setListaItems(carritoMenos)
        sessionStorage.setItem("empleadoslista", JSON.stringify(carritoMenos))
        //calcularTotal(carritoMenos)
    }

    const vaciarEmpleadoLista = () => {
        setListaItems([])
        sessionStorage.removeItem("empleadoslista")
        //setTotal(0)
    }

    return (
        <>
            <PageHeader titulo="Listado de Empleados - Carrito" />
            <section id="proveedores" className='padded'>
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            {dibujarTabla()}
                            <button className="btn btn-danger" onClick={() => vaciarEmpleadoLista()}>Vaciar Listado</button>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default CarritoEmpleado