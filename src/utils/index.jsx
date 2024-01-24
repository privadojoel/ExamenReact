export const ApiWebURL = "https://servicios.campus.pe/"

export const agregarCarrito = (item, cantidadProducto) => {
    item.cantidad = cantidadProducto == null ? 1 : Number(cantidadProducto)
    item.precio = item.preciorebajado === "0" ? item.precio : item.preciorebajado
    console.log(item)
    let carrito = []
    if(sessionStorage.getItem("carritocompras")){
        carrito = JSON.parse(sessionStorage.getItem("carritocompras"))
        let index = -1
        for(let i = 0; i < carrito.length; i++){
            if(item.idproducto === carrito[i].idproducto){
                index = i
                break
            }
        }
        if(index === -1){
            carrito.push(item)    
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
        }
        else{
            carrito[index].cantidad += 1
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
        }
    }
    else{
        carrito.push(item)
        sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
    }
}

export const agregarCarritoEmpleado = (item) => {
    let empleadoslista = []
    if(sessionStorage.getItem("empleadoslista")){
        empleadoslista = JSON.parse(sessionStorage.getItem("empleadoslista"))
        let index = -1
        for(let i = 0; i < empleadoslista.length; i++){
            if(item.idempleado === empleadoslista[i].idempleado){
                index = i
                break
            }
        }
        if(index === -1){
            empleadoslista.push(item)    
            sessionStorage.setItem("empleadoslista", JSON.stringify(empleadoslista))
        }
        else{
            empleadoslista[index].cantidad += 1
            sessionStorage.setItem("empleadoslista", JSON.stringify(empleadoslista))
        }
    }
    else{
        empleadoslista.push(item)
        sessionStorage.setItem("empleadoslista", JSON.stringify(empleadoslista))
    }
}