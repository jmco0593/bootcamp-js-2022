import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Encabezado, Productos} from "./productos.component";
const rootElement = document.getElementById("root");
const date = new Date();
const titulo = "Hola React 2021";
const productosIniciales = [
    {codigo: 1, nombre: "producto 1", cantidad: 2},
    {codigo: 2, nombre: "producto 2", cantidad: 5},
];

function cuadrado(valor)
{
    return valor * valor;
}

//Elemento principal, normalmente se le llama por este nombre
const App = () => {
    //hook que permite interactura con el framework de react. este notifica a react para decirle cual es el nuevo estado que dese pintar.
    const [productos, setProductos] = useState(productosIniciales);

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
            <Productos productos={productos} onProductClick={update}/>
        </div>
    );
};
    


//Este es el que lo renderiza 
ReactDOM.render(
    <App/>,
    rootElement
);