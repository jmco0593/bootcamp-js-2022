import React, {useState} from "react";
import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const rootElement = document.getElementById("root");
const date = new Date();
const titulo = "Hola React 2021";
const productosIniciales = [
    {codigo: 1, nombre: "producto 1", cantidad: 2},
    {codigo: 2, nombre: "producto 2", cantidad: 5},
];

// function cuadrado(valor)
// {
//     return valor * valor;
// }

function Encabezado()
{
    return (<h1>{Titulo} - {cuadrado(4)}</h1>)
}
//CON ARROW FUNCTION
const Encabezado = (prop) => (
    <h1>
        {prop.titulo} - {prop.valor}
    </h1>
);

// function onProductoClick(event, prop){
//     console.log(event.target);
//     console.log(prop)
// }

const Producto = (prop) => (
    //Se hizo esta arrow functions para poder enviarle a la función onProductoClick el elemento prop y así obtener ciertos valores. del elemento
    //target, en este caso li.
    <li className="producto" onClick={(e) => prop.onProductClick(prop, e)}>
        Nombre: {prop.nombre}, 
        Cantidad: {prop.cantidad}
    </li>

);

const Productos = (prop) => (
    <ul>
        {prop.productos.map((item) => (
        <Producto 
        key={item.codigo}
        codigo={item.codigo}
        nombre = {item.nombre}
        cantidad = {item.cantidad}
        onProductoClick={prop.onProductClick}
        />
        ))}
    </ul>
);

//Elemento principal, normalmente se le llama por este nombre
const App = () => {
    //hook que permite interactura con el framework de react. este notifica a react para decirle cual es el nuevo estado que dese pintar.
    const [productos, setProductos] = userState(productosIniciales);

    const update = (prop) => {
        const newProductos = productos.slice();
        const producto = newProductos.find((x) => x.codigo == prop.codigo);
        const index = productos.indexOf(producto);
        newProductos[index] = {...producto, cantidad: producto.cantidad + 1};
        setProductos(newProductos);
        // setProductos([
        //     ...productos, 
        //     {codigo: 3, nombre: "producto 3", cantidad: 10}]);
    };
    return (
        <div>
            <Encabezado titulo="Hola parámetro" valor={cuadrado(2 * 4)}/> 
            <Productos productos={productos} onProductClick={onProductoClick}/>
        </div>
    );
};
    


//Este es el que lo renderiza 
ReactDOM.render(
    <App/>,
    rootElement
);