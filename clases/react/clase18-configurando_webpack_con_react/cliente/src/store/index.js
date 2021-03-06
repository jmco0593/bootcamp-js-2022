import {applyMiddleware, combineReducers, createStore} from "redux";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";
import apiMiddleware from "./api.redux";
import * as storage from "./store";
//CONEXIÓN DE UI Y STORE

const history = createBrowserHistory();
// const savedState = sessionStorage.getItem("state");
// const deserialized = savedState && JSON.parse(savedState);
const preloadedState = {
    producto: {},
    productos: [],
};

//Acá estamos definiendo que función estaremos utilizando para middleware y luego podemos ingresarla con el store.
const middlewares = applyMiddleware(
    storage.loggerMiddleware,
    routerMiddleware(history),
    apiMiddleware,
    storage.agregarOModificarProductoMiddleware,
    //storage.generadorCodigoProductoBuilder(0),
    //storage.storageMiddleware,
);

const reducer = combineReducers({
    router: connectRouter(history),
    producto: storage.producto,
    productos: storage.productos
});

const store = createStore(reducer, preloadedState, middlewares);

export {history};
export default store;