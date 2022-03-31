import React, {useState} from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider} from "react-redux";
import store from "./store"

const rootElement = document.getElementById("root");
//Este es el que lo renderiza 
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    rootElement);