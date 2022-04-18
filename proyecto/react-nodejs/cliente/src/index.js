import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider} from 'react-redux';
import store from './store/store'
import {apiGetTasks} from './store/api'
import {reduxBackendTasksList} from './store/actions/index'

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
    
);

//CALLING INITIAL VALUES FROM SERVER
const promesa = apiGetTasks();
        promesa.then((response) => {
            store.dispatch(reduxBackendTasksList(response));
        })
        promesa.catch((e)=> {
            console.log("Error", e)
        })