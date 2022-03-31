import {applyMiddleware, createStore} from "redux";
import * as storage from "./store";
//CONEXIÓN DE UI Y STORE
const preloadedState = {
    producto: {},
    productos: [],
};

//Acá estamos definiendo que función estaremos utilizando para middleware y luego podemos ingresarla con el store.
const middlewares = applyMiddleware(
    storage.loggerMiddleware,
    storage.agregarOModificarProductoMiddleware,
    storage.generadorCodigoProductoBuilder(0),
);
const store = createStore(storage.reducer, preloadedState, middlewares);

export default store;