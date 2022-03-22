//SE COLOCARÁ TODO LO QUE ES MANEJO DE NUESTRO ESTADO

//Esta es una variable que nos permite centralizar cada uno de nuestros actions. Es una forma común de trabajarlo.
const ActionTypes = {
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoModificado: "producto-agregado-o-modificado",
}
/*
Todo el manejo de estado deberia de ir en el reducer, pero todo lo que es lógica deberian de estar en middlewares.
*/
const reducer = (state, action) => {
    switch (action.type)
    {
        case ActionTypes.ProductoAgregado:
            return productoAgregadoReducer(state, action);

    
        case ActionTypes.ProductoModificado:
            return productoModificadoReducer(state,action);


        case ActionTypes.ProductoEliminado:
            return productoEliminadoReducer(state, action);
        
        case ActionTypes.ProductoSeleccionado:
            return productoSeleccionadoReducer(state, action);
        
        default:
            return state;
    }
}; 


//action builder: Esta es una función que devuelve el action que deseamos disparar
const productoSeleccionado = (codigo) => ({
    type: ActionTypes.ProductoSeleccionado,
        payload: {
            codigo
        }
});

const productoEliminado = (codigo) => ({
    type: ActionTypes.ProductoEliminado,
    payload: {codigo}
});

const productoModificado = (payload) => ({
    type: ActionTypes.ProductoModificado,
    payload
});

const productoAgregado = (payload) => ({
    type: ActionTypes.ProductoAgregado,
    payload
});

const agregarOModificarProducto = (payload) => ({
    type: ActionTypes.ProductoAgregadoModificado,
    payload
});


/*MIDDLEWARE
Es una función que se le envío la referencia del store y que retorna otra función
Esta es una función que provee un paso extra en el que se hace un dispatch y llega al reducer. En algun momento nos puede servir para poder agregar algun tipo
de validación, modificaicón de información u otro proceso extra que deseemoa agregar entre estos sucesos.
*/

// function loggerMiddleware(store)
// {
//     return function dispatchWrapper(next) {
//         return function actionHancler(action){
//             const stateA = store.getState();
//             console.log("dispatching", action);
//             console.log("state before", stateA);
//             next(action);
//             const stateB = store.getState();
//             console.log("state before", stateB);
//             console.log("dispatched", action);
            
//         }

//     }

// }

const loggerMiddleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
}

const agregarOModificarProductoMiddleware = store => next => action => {
    if (action.type != ActionTypes.ProductoAgregadoModificado)
    {
        return next(action);
    }
    const producto = action.payload;
    const actionToDispatch = producto.codigo ?
        productoModificado(producto) : 
        productoAgregado(producto);
    
    store.dispatch(actionToDispatch);
    return store.dispatch(productoSeleccionado(null));
}

const generadorCodigoProductoMiddleware = store => next => action => {
    if (action.type != "procuto-agregado-o-modificado")
    {
        return next(action);
    }

    action.payload = {...action.payload, codigo};
}

function productoSeleccionadoReducer(state,action) {
    const codigo = action.payload.codigo;
    return {
        ...state,
        producto: state.productos.find(x => x.codigo == codigo) || {}
    };
}

function productoEliminadoReducer(state, action) {
    const codigo = action.payload.codigo;
    const productos = state.productos.filter((item) => item.codigo != codigo);
    return {
        ...state,
        productos
    };
}

function productoModificadoReducer(state, action) {
    const producto = action.payload;
    const productos = state.productos.slice();
    const codigo = producto.codigo;
    const total = producto.cantidad * producto.precio;
    const old = productos.find((item) => item.codigo == codigo);
    const index = productos.indexOf(old);
    productos[index] = { ...producto, total };
    return {
        ...state,
        productos
    };
}

function productoAgregadoReducer(state, action) {
    const producto = action.payload;
    const total = producto.cantidad * producto.precio;
    //Esta es una versión donde hacemos un cambio en nuestro estado y no creamos uno. Esta hace que no se comporte de una forma correcta nuestra
    //aplicación
    //state.productos.push(action.payload);
    //Objetivo inmutable (creamos uno con base al anterior)
    return {
        ...state,
        productos: [
            ...state.productos,
            {
                ...producto,
                //En JS se puede escribir de la siguiente forma las propiedades cuando la variable tiene el mismo nombre de la misma. Esto es equivalente
                //a las líneas comentadas siguientes
                total
            }
        ]
    };
}


function generadorCodigoProductoBuilder(CodigoInicial)
{
    let codigo = CodigoInicial;
    return store => next => action => {
        if (action.type != ActionTypes.ProductoAgregado)
        {
            return next(action);
        }
        codigo++;
        const actionToDispatch = {
            ...action,
            payload: {
                ...action.payload,
                codigo
            }
        };
        return next(actionToDispatch);
    };
}