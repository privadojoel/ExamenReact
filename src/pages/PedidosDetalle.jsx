import { useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import { ApiWebURL } from "../utils";
import PageHeader from "../components/PageHeader"

function PedidosDetalle() {

    const [listaDetallePedidos, setlistaDetallePedidos] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    let params = useParams()
    console.log(params);

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidosdetalle.php?idpedido="+ params.idpedido;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setlistaDetallePedidos(data)
            })
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
            {listaDetallePedidos.map(item =>
                <div className="col" key={item.idproducto}>
                    <div className="card h-100">
                        <img src={ApiWebURL + item.imagenchica} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.nombre}</h5>
                                <p className="card-text">Precio : {item.precio}</p>
                                <p className="card-text">Cantidad: {item.cantidad}</p>
                                <p className="card-text">Detalle : {item.detalle}</p>
                            </div>
                    </div>
                </div>
            )}
            </div>
        )
    }

  return (
    <>
        <PageHeader titulo="Detalle de Pedidos" />
        <section id="detallePedidos" className='padded'>
            <div className="container">
                {dibujarCuadricula()}
            </div>
        </section>        
        
    </>
  )
}

export default PedidosDetalle