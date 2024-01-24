import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils";
import PageHeader from "../components/PageHeader";
function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([])
    const [textoBuscar, setTextoBuscar] = useState([])
    const [columnaAnterior, setColumnaAnterior] = useState("")
    const [estadoAscendente, setEstadoAscendente] = useState(1)
    const [pagina, setPagina] = useState(0)
    const [filasPagina, setFilasPagina] = useState(10)
    const [totalPaginas, setTotalPaginas] = useState(0)

    const [idproveedor, setIdproveedor] = useState("")
    const [nombreempresa, setNombreempresa] = useState("")  
    const [nombrecontacto, setNombrecontacto] = useState("") 
    const [cargocontacto, setCargocontacto] = useState("") 
    const [ciudad, setCiudad] = useState("") 
    const [codigopostal, setCodigopostal] = useState("") 
    const [direccion, setDireccion] = useState("") 
    const [fax, setFax] = useState("") 
    const [pais, setPais] = useState("") 
    const [region, setRegion] = useState("") 
    const [telefono, setTelefono] = useState("") 

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "proveedores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaProveedores(data)
                setListaProveedoresFiltrados(data)
                setTotalPaginas(Math.ceil(data.length/filasPagina))
            })
    }

    const llenarCampos = (item) => {

        setIdproveedor(item.idproveedor)
        setNombreempresa(item.nombreempresa)
        setNombrecontacto(item.nombrecontacto)

        setCargocontacto(item.cargocontacto)
        setCiudad(item.ciudad)
        setCodigopostal(item.codigopostal)
        setDireccion(item.direccion)
        setFax(item.fax)
        setPais(item.pais)
        setRegion(item.region)
        setTelefono(item.telefono)
    }

   

    /*
        function dibujarTabla(){
        }
    */
    const dibujarTabla = () => {
        return (
            <table className="table" id="tabla-proveedores">
                <thead>
                    <tr>
                        <th onClick={(event) => seleccionarColumna(event,"idproveedor")}>Código</th>
                        <th onClick={(event) => seleccionarColumna(event,"nombreempresa")}>Empresa</th>
                        <th onClick={(event) => seleccionarColumna(event,"nombrecontacto")}>Contacto</th>
                        <th onClick={(event) => seleccionarColumna(event,"cargocontacto")}>Cargo</th>
                        <th onClick={(event) => seleccionarColumna(event,"pais")}>País</th>
                        <th onClick={(event) => seleccionarColumna(event,"ciudad")}>Ciudad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.slice(pagina*filasPagina , (pagina+1)*filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.pais}</td>
                            <td>{item.ciudad}</td> 
                            <td>
                                <i className="bi bi-eye-fill" title="Ver"
                                    onClick={() => llenarCampos(item)}
                                    data-bs-toggle="modal" data-bs-target="#viewModal">
                                </i>
                            </td>                                                    
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const dibujarViewModal = () => {
        return (
            <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Ver Proveedor</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input type="text" className="form-control"
                                    value={idproveedor}
                                    readOnly />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control"
                                    value={nombreempresa} 
                                    readOnly />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control"
                                    value={nombrecontacto} 
                                    readOnly />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control"
                                    value={cargocontacto} 
                                    readOnly />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control"
                                    value={ciudad} 
                                    readOnly />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control"
                                    value={direccion} 
                                    readOnly />
                            </div>                                                                                    
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }     

    const seleccionarColumna = (event, columna) => {
        let iconosOrden = document.querySelectorAll("#tabla-proveedores th i")
        iconosOrden.forEach(item => item.remove())

        
        let ascendente = estadoAscendente
        if (columna !== columnaAnterior) {
            ascendente = 1
        }
        else {
            ascendente = -ascendente
        }
        setEstadoAscendente(ascendente)
        let icono = (ascendente === 1 ? '<i class="bi bi-caret-up-fill"></i>' :  '<i class="bi bi-caret-down-fill"></i>')
        event.currentTarget.innerHTML += icono
        console.log(columna)
        const resultado = [...listaProveedoresFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente)
        setListaProveedoresFiltrados(resultado)
        setColumnaAnterior(columna)
    }

    const buscarTexto = (event) => {
        let texto = event.target.value
        setTextoBuscar(texto)
        console.log(texto)
        const resultado = listaProveedores.filter(item =>
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["cargocontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase())
        )
        setListaProveedoresFiltrados(resultado)
        setTotalPaginas(Math.ceil(resultado.length/filasPagina))
    }


    const dibujarNumerosPaginacion = () => {
        return(
            <>
                {
                    Array.from({length: totalPaginas}).map((item, index) =>
                        <li className="page-item" key={index}>
                            <a className={index === pagina ? "page-link active" : "page-link" }
                                href="#" onClick={() => setPagina(index)}>
                                {index + 1}</a>
                        </li>
                    )
                }
            </>
        )
    }

    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => retroceder()}>Anterior</a></li>
                    {dibujarNumerosPaginacion()}
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => avanzar()}>Siguiente</a></li>
                </ul>
            </nav>
        )
    }

    const retroceder = () => {
        if(pagina>0){
            setPagina(pagina - 1)
        }
    }
    const avanzar = () => {
        if(pagina < totalPaginas - 1){
            setPagina(pagina + 1)
        }
    }

    return (
        <>
            <PageHeader titulo="Proveedores" />
            <section id="proveedores" className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                            value={textoBuscar} onChange={(event) => buscarTexto(event)} />
                    </div>
                    {dibujarTabla()}
                    {dibujarPaginacion()}
                    {dibujarViewModal()}
                </div>
            </section>
        </>
    )
}

export default Proveedores