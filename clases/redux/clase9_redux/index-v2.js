const preloadedState = {
    producto: {},
    productos: [],
};

/*
Esta es la función que estará siendo ejecutando cuand un dispatch ocurra. Como vemos en su interior, devolverá el store con el cambio con base al action
del dispatch. Veamos que funona en conjunto al type declarado en el dispatch
*/
const reducer = (state, action) => {
    if (action.type == "producto-agregado")
    {
        //Esta es una versión donde hacemos un cambio en nuestro estado y no creamos uno. Esta hace que no se comporte de una forma correcta nuestra
        //aplicación
        //state.productos.push(action.payload);
        //Objetivo inmutable (creamos uno con base al anterior)
        return {
            ...state, 
            productos:[
                ...state.productos, 
                action.payload
            ]
        };
    }
    return state;
};

/*
El elemento store es un objeto que obtiene el estado (state tree) de la aplicación de redux. Esto quiere decir que contendrá un estado actualizado de todos
los elementos que engloban la aplicación. 
*/
const store = Redux.createStore(reducer, preloadedState);

let latestState;
//console.log(store);
/*
El método subscribe() es un método que se estará activando cuando ocurra algún cambio en store.
El método getState() devolverá el estao actual el objeto actual de Redux.

Aca podemos colocar los cambios en la UI para que se vuelvan a pintar

En este subscribe podemos agregar las validaciones pertinentes para que solo haga lo que necesitemos en ciertos escenarios
*/
 store.subscribe(() => {
    //console.log("subscribe ejecutado");
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
        console.log("estado: ", store.getState());
    } 
});

/*
Este es un método que permite hacer un cambio en el estado. Para este caso se está agregando un elemento a productos. Esto ocurre porque el type de este dispatch
entra en el if de de "producto-agregado" y agrega el nuevo producto en el payload.

Cada vez que queremos hacer algo con el estado ejecutamos un dispatch.

Podemos agregar la cantidad de dispatch que necesitamos

Estos podemos agregarlos en los botones por ejemplo o lugares donde se ejecute alguna acción del usuario.
*/
store.dispatch({
    type: "producto-agregado",
    payload: {
        id: 1,
        nombre: "prueba a",
    }
}) 

store.dispatch({
    type: "producto-modificado",
    payload: {
        id: 1,
        nombre: "prueba a v2",
    }
}) 

store.dispatch({
    type: "producto-agregado",
    payload: {
        id: 2,
        nombre: "prueba b",
    }
}) 