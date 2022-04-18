import {applyMiddleware, createStore} from "redux";
import apiMiddleware from "./api.redux";
import * as storage from "./store";
//CONEXIÓN DE UI Y STORE

const savedState = sessionStorage.getItem("state");
const deserialized = savedState && JSON.parse(savedState);
const preloadedState = deserialized || {
    producto: {},
    productos: [],
};

//Acá estamos definiendo que función estaremos utilizando para middleware y luego podemos ingresarla con el store.
const middlewares = applyMiddleware(
    storage.loggerMiddleware,
    apiMiddleware,
    storage.agregarOModificarProductoMiddleware,
    storage.generadorCodigoProductoBuilder(0),
    storage.storageMiddleware,
);
const store = createStore(storage.reducer, preloadedState, middlewares);

export default store;