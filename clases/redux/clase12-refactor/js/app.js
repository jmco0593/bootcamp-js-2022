//CONEXIÓN DE UI Y STORE
const preloadedState = {
    producto: {},
    productos: [],
};

const store = Redux.createStore(reducer, preloadedState);
let latestState;

store.subscribe(() => {
    //console.log("subscribe ejecutado");
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
        console.log("estado: ", store.getState());
        ui.renderForm(currentState.producto);
        ui.renderTable(currentState.productos);
    } 
});

//DEFINICIÓN DE FUNCIÓN DEL OBJETIO UI DECLARADO EN UI.JS
ui.onFormSubmit = (producto) => {
    if (producto.codigo)
    {
        store.dispatch(productoModificado(producto));
    }
    else {
        store.dispatch(productoAgregado(producto));
    }

    store.dispatch(productoSeleccionado(null));
}

ui.onEliminarClick = (codigo) => store.dispatch(productoEliminado(codigo));

ui.onEditarClick = (codigo) => store.dispatch(productoSeleccionado(codigo));
