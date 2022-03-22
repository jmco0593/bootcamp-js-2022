//SE COLOCARÁ TODO LO QUE ES MANEJO DE NUESTRO ESTADO

let indice = 0;
/*
Esta es la función que estará siendo ejecutando cuand un dispatch ocurra. Como vemos en su interior, devolverá el store con el cambio con base al action
del dispatch. Veamos que funona en conjunto al type declarado en el dispatch
*/
const reducer = (state, action) => {
    if (action.type == "producto-agregado")
    {
        indice++;
        const producto = action.payload;
        const codigo = indice;
        const total = action.payload.cantidad * action.payload.precio;
        //Esta es una versión donde hacemos un cambio en nuestro estado y no creamos uno. Esta hace que no se comporte de una forma correcta nuestra
        //aplicación
        //state.productos.push(action.payload);
        //Objetivo inmutable (creamos uno con base al anterior)
        return {
            ...state, 
            productos:[
                ...state.productos, 
                {
                    ...action.payload,
                    //En JS se puede escribir de la siguiente forma las propiedades cuando la variable tiene el mismo nombre de la misma. Esto es equivalente
                    //a las líneas comentadas siguientes
                    codigo,
                    total
                    //codigo: codigo,
                    //total: total
                }
            ]
        };
    }

    if (action.type == "producto-modificado")
    {
        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = {...producto, total};
        return {
            ...state,
            productos
        }
    }

    if (action.type == "producto-eliminado")
    {
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return {
            ...state,
            productos
        }
    }

    if (action.type == "producto-seleccionado")
    {
        const codigo = action.payload.codigo;
        return {
            ...state,
            producto: state.productos.find(x => x.codigo == codigo) || {}
        }
    }

    
    return state;
};

//action builder: Esta es una función que devuelve el action que deseamos disparar
const productoSeleccionado = (codigo) => ({
    type: "producto-seleccionado",
        payload: {
            codigo: null
        }
});

const productoEliminado = (codigo) => ({
    type: "producto-elimninado",
    payload: {codigo}
});

const productoModificado = (payload) => ({
    type: "producto-modificado",
    payload
});

const productoAgregado = (payload) => ({
    type: "producto-agregado",
    payload
});


