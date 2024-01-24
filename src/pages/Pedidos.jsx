import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
function Pedidos() {
    const [listaPedidos, setlistaPedidos] = useState([])
    const [listaPedidosFiltrados, setlistaPedidosFiltrados] = useState([])
    const [textoBuscar, setTextoBuscar] = useState([])
    const [columnaAnterior, setColumnaAnterior] = useState("")
    const [estadoAscendente, setEstadoAscendente] = useState(1)
    const [pagina, setPagina] = useState(0)
    const [filasPagina, setFilasPagina] = useState(30)
    const [totalPaginas, setTotalPaginas] = useState(0)

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidos.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setlistaPedidos(data)
                setlistaPedidosFiltrados(data)
                setTotalPaginas(Math.ceil(data.length/filasPagina))
            })
    }
    /*
        function dibujarTabla(){
        }
    */
    const dibujarTabla = () => {
        return (
            <table className="table" id="tabla-pedidos">
                <thead>
                    <tr>
                        <th onClick={(event) => seleccionarColumna(event,"idpedido")}>Código</th>
                        <th onClick={(event) => seleccionarColumna(event,"fechapedido")}>Fecha Pedido</th>
                        <th onClick={(event) => seleccionarColumna(event,"usuario")}>Usuario</th>
                        <th onClick={(event) => seleccionarColumna(event,"nombres")}>Nombres</th>
                        <th onClick={(event) => seleccionarColumna(event,"total")}>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidosFiltrados.slice(pagina*filasPagina , (pagina+1)*filasPagina).map(item =>
                        <tr key={item.idpedido}>
                            <td>{item.idpedido}</td>
                            <td>{item.fechapedido}</td>
                            <td>{item.usuario}</td>
                            <td>{item.nombres}</td>
                            <td>{item.total}</td>
                            <td>
                                <Link to={"/pedidosdetalle/" + item.idpedido}>
                                    <i className="bi bi-eye-fill"></i>
                                </Link>                                
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const seleccionarColumna = (event, columna) => {
        let iconosOrden = document.querySelectorAll("#tabla-pedidos th i")
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
        const resultado = [...listaPedidosFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? ascendente : -ascendente)
        setlistaPedidosFiltrados(resultado)
        setColumnaAnterior(columna)
    }

    const buscarTexto = (event) => {
        let texto = event.target.value
        setTextoBuscar(texto)
        console.log(texto)
        const resultado = listaPedidos.filter(item =>
            item["fechapedido"].toUpperCase().includes(texto.toUpperCase()) ||
            item["usuario"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombres"].toUpperCase().includes(texto.toUpperCase()) ||
            item["total"].toUpperCase().includes(texto.toUpperCase())
        )
        setlistaPedidosFiltrados(resultado)
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
            <PageHeader titulo="Pedidos" />
            <section id="pedidos" className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                            value={textoBuscar} onChange={(event) => buscarTexto(event)} />
                    </div>
                    {dibujarTabla()}
                    {dibujarPaginacion()}
                </div>
            </section>
        </>
    )
}

export default Pedidos