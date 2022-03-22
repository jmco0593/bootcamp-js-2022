//CONEXIÓN DE UI Y STORE
const preloadedState = {
    producto: {},
    productos: [],
};

//Acá estamos definiendo que función estaremos utilizando para middleware y luego podemos ingresarla con el store.
const middlewares = Redux.applyMiddleware(
    loggerMiddleware,
    agregarOModificarProductoMiddleware,
    generadorCodigoProductoBuilder(0),
);
const store = Redux.createStore(reducer, preloadedState, middlewares);

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
ui.onFormSubmit = (producto) => store.dispatch(agregarOModificarProducto(producto));
ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));
ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));

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