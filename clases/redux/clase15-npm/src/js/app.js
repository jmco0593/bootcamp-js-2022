import {applyMiddleware, createStore} from "redux";
import { ui } from "./ui";
import * as $store from "./store";
//CONEXIÓN DE UI Y STORE
const preloadedState = {
    producto: {},
    productos: [],
};

//Acá estamos definiendo que función estaremos utilizando para middleware y luego podemos ingresarla con el store.
const middlewares = applyMiddleware(
    $store.loggerMiddleware,
    $store.agregarOModificarProductoMiddleware,
    $store.generadorCodigoProductoBuilder(0),
);
const store = createStore($store.reducer, preloadedState, middlewares);

// let latestState;

// store.subscribe(() => {
//     //console.log("subscribe ejecutado");
//     let currentState = store.getState();
//     if (currentState != latestState)
//     {
//         latestState = currentState;
//         console.log("estado: ", store.getState());
//         ui.renderForm(currentState.producto);
//         ui.renderTable(currentState.productos);
//     } 
// });

store.subscribe(dispatchOnChange(store, (state) => {
    ui.renderForm(state.producto);
    ui.renderTable(state.productos);
}))

//DEFINICIÓN DE FUNCIÓN DEL OBJETIO UI DECLARADO EN UI.JS
ui.onFormSubmit = (producto) => store.dispatch($store.agregarOModificarProducto(producto));
ui.onEliminarClick = (codigo) => store.dispatch($store.productoEliminado(codigo));
ui.onEditarClick = (codigo) => store.dispatch($store.productoSeleccionado(codigo));

function dispatchOnChange(store, dispatch)
{
    let latestState;
    return function (){
        //console.log("subscribe ejecutado");
        let currentState = store.getState();
        if (currentState != latestState)
        {
            latestState = currentState;
            dispatch(currentState);
        } 

    }
}