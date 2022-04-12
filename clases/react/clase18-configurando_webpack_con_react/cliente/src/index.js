import React, {useState} from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider} from "react-redux";
import axios from "axios";
import store from "./store"

const rootElement = document.getElementById("root");
//Este es el que lo renderiza 
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    rootElement);

/*
AXIOS permite hacer consultas en nuestro server
*/
test();

//async permite que todo lo que trabaje como promesas lo trabaje como código secuencial.
async function test()
{
    try 
    {
        console.log("antes de fetch");
        //await sirve para que js espere hasta que la promesa se cumpla para seguir
        const response = await axios.get('http://localhost:5001/producto');
        const productos = response.data;
        console.log("on success: ", productos);
        console.log("después de fetch: ", productos);
    }
    catch(error)
    {
        console.error("error en el request: ", error);
    }
    
}





// function test()
// {
//     console.log("antes de fetch");
//     const promesa = axios.get('http://localhost:5001/productos');

//     let productos = null;

//     promesa
//         .then(response => response.data)
//         .then((data) => {
//             productos = data;
//             console.log("on success: ", productos);
//         })
//         .catch(() => {
//             console.log("on error");
//         });
        
//     console.log("después de fetch: ", productos);
// }
  
    

/*
Utilizamos fetch para devolver una promesa, lo cual consiste un elemento que podra representar un valor que esté disponible ahora, en un futuro o que nunca
lo esté. Utilizamos then y catch para los escenarios que si esté disponible y cuando no lo esté especificamente. Este es nativo de JS, pero usualmente se
utiliza una libreria de tercero, dado a que es más intuitivo
*/
// console.log("antes de fetch");
// const promesa = fetch('http://localhost:5001/productos');

// let productos = null;

// promesa
//     .then((response) => {
//         return response.json();
//     })
//     .then((response) => {
//         productos = response;
//         console.log("on success: ", productos);
//         return 'productos obtenidos.';
//     })
//     .then((p) => {
//         console.log('tercer then: ', p)
//     })
//     .catch(() => {
//         console.log("on error");
//     });

// console.log("después de fetch: ", productos);
