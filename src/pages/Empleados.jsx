import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL, agregarCarritoEmpleado } from "../utils"
import PageHeader from "../components/PageHeader";
function Empleados() {
    const [listaEmpleados, setListaEmpleados] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "empleados.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaEmpleados(data)
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
            {listaEmpleados.map(item =>
                <div className="col" key={item.idempleado}>
                    <div className="card h-100">
                        <img src={ApiWebURL + "fotos/" + item.foto} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                <p className="card-text">{item.cargo}</p>
                                <div className="mb-3">
                                <button type="button" className="btn btn-primary"
                                    onClick={() => agregarCarritoEmpleado(item)}>Añadir al Listado Empleados</button>
                            </div>                                
                            </div>
                    </div>
                </div>
            )}
            </div>
        )
    }

    return (
        <>
        <PageHeader titulo="Empleados" />
        <section id="empleados" className='padded'>
            <div className="container">
                {dibujarCuadricula()}
            </div>
        </section>
        </>
    )
}

export default Empleados