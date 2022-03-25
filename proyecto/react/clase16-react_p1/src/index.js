import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
const rootElement = document.getElementById("root");
const date = new Date();
const titulo = "Hola React 2021";
const productos = [
    {codigo: 1, nombre: "producto 1", cantidad: 2},
    {codigo: 2, nombre: "producto 2", cantidad: 5},
];

function cuadrado(valor)
{
    return valor * valor;
}
ReactDOM.render(
    <div>
        <h1>{Titulo} - {cuadrado(4)}</h1>
        <ul>
            {productos.map((item) => (<li key={item.codigo} className="producto">Nombre: {item.nombre}, Cantidad: {item.cantidad}</li>))}
        </ul>
    </div>,
    rootElement
);