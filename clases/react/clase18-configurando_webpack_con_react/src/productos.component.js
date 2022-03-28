import React from "react";

export const Encabezado = (prop) => (
    <h1>
        {prop.titulo} - {prop.valor}
    </h1>
);


const Producto = (prop) => (
    //Se hizo esta arrow functions para poder enviarle a la función onProductoClick el elemento prop y así obtener ciertos valores. del elemento
    //target, en este caso li.
    <li className="producto" onClick={(e) => prop.onProductClick(prop, e)}>
        Nombre: {prop.nombre}, 
        Cantidad: {prop.cantidad}
    </li>

);

export const Productos = (prop) => (
    <ul>
        {prop.productos.map((item) => (
        <Producto 
        key={item.codigo}
        codigo={item.codigo}
        nombre = {item.nombre}
        cantidad = {item.cantidad}
        onProductClick={prop.onProductClick}
        />
        ))}
    </ul>
);