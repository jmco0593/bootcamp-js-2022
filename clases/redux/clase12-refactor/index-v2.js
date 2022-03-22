//Obetenemos referencia el objeto form
const form = document.getElementsByTagName("form")[0];
//Obtenemos el objeto tbody, el cual corresponde a los elementos de la tabla. Esto con la finalidad de irlo llenando.
const tbody = document.getElementsByTagName("tbody")[0];
/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/** @type {HTMLInputElement} */
const selectCategoria = document.getElementById("categoria");
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

const preloadedState = {
    producto: {},
    productos: [],
};

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

/*
El elemento store es un objeto que obtiene el estado (state tree) de la aplicación de redux. Esto quiere decir que contendrá un estado actualizado de todos
los elementos que engloban la aplicación. 
*/
const store = Redux.createStore(reducer, preloadedState);

let latestState;
//console.log(store);
/*
El método subscribe() es un método que se estará activando cuando ocurra algún cambio en store. Los dispatch hacen cambios en el store.
El método getState() devolverá el estao actual el objeto actual de Redux.

Aca podemos colocar los cambios en la UI para que se vuelvan a pintar

En este subscribe podemos agregar las validaciones pertinentes para que solo haga lo que necesitemos en ciertos escenarios

El método suscribe devuelve también lo que es un método de unsuscribe que estará haciendo la tarea de ya no seguir ejecuandose. Sabemos que suscribe
se ejecuta cuando el store cambia, por lo que ejecutar en unsuscribe() (llamado asi porque asi le llame al valor que devuelve el suscribe) hará la acción
de ya no ejecutarse cuando sienta un dispatch

 const unsuscribe = store.subscribe(() => {
    //console.log("subscribe ejecutado");
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
        console.log("estado: ", store.getState());
        renderTable(currentState.productos);
    } 
});
*/

store.subscribe(() => {
    //console.log("subscribe ejecutado");
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
        console.log("estado: ", store.getState());
        renderForm(currentState.producto);
        renderTable(currentState.productos);
    } 
});


function renderForm(producto)
{
    // el || "" nos indica que será el valor de la izquierda y si es un undefined, mostrará el de la derecha, esto con respecto a ||.
    inputCodigo.value = producto.codigo || "";
    inputNombre.value = producto.nombre || "";
    inputPrecio.value = producto.precio || "";
    inputCantidad.value = producto.precio || "";
    selectCategoria.value = producto.categoria || 1;
}


/*
Función que permitirá agregar elementos a nuestra tabla de productos
*/
function renderTable(productos)
{
    
    // Map sirve para ejecutar y devolver un arreglo con las modificaciones de la función (enviada como parámetro). Para este caso estará devolviendo
    // un arreglo con la función 
    const filas = productos.map((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.total}</td>
            <td>
                <div class="btn-group">
                    <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-pencil-square"></i>
                    </a> 
                    <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                    </a>
                </div>
            </td>
        `;
        const [editar, eliminar] = tr.getElementsByTagName("a");
        eliminar.addEventListener("click", (event) => {
            event.preventDefault();
            store.dispatch({
                type: "producto-eliminado",
                payload: {
                    codigo: item.codigo
                }
            })
        });

        editar.addEventListener("click", (event) => {
            event.preventDefault();
            store.dispatch({
                type: "producto-seleccionado",
                payload: {
                    codigo: item.codigo
                }
            })
        })
        return tr;
    })
    tbody.innerHTML = "";
    filas.forEach((tr)=> {
        tbody.appendChild(tr);
    });

    cantidadTotalElement.innerText = sum(productos, x => x.cantidad);
    precioTotalElement.innerText = sum(productos, x => x.precio);
    granTotalElement.innerText = sum(productos, x => x.total);

    function sum(elementos, selector){
        return elementos
            .map(selector)
            .reduce((a,b) => a + b,0);
    }
}

//Este método me permite buscar un evento del elemento y ejecutar una función cuando ocurra dicho evento
form.addEventListener("submit", onSubmit);


//Lo que se está agregando en la parte de arriba en la función sirve para decirle al editor que tipo de valor es un parámetro.
//Con esto podrá el intelisence sugerirnos más cosas para este tipo de valor. En este ejemplo estamos diciendo que el parámetro event es de tipo Event
/**
 * 
 *  @param {Event} event
 */
function onSubmit(event)
{
    //Función que me permite omitir toda acción que tegamos por defecto. Para este caso puntual que estamos trabajando con el form, me ayudará para omitir
    // el envío de data al sitio en la etiqueta de action del atributo de form.
    event.preventDefault();
    //La clase formData es una clase que me ayuda para el envío de información de algun formulario.
    const data = new FormData(form);
    // entries() permite mostrarnos la informacion de formulario que tiene albergada el objeto data y from permite agregarlo a un array. data entries es un
    //array dentro de un array.
    const values = Array.from(data.entries());

    //Dado a que data.entries es un arreglo de arreglo podemos utilizar la siguiente nomenclatura para hacer el código un poco más entendible. La forma
    //equivalente está comentada en la parte de abajo de esto
    const [frmCodigo,  frNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    const codigo = parseInt(frmCodigo[1]);
    const nombre = frNombre[1];
    const cantidad = parseInt(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = parseInt(frmCategoria[1]);

    if (codigo)
    {
        store.dispatch({
            type: "producto-modificado",
            payload: {
                codigo,
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }
    else {
        store.dispatch({
            type: "producto-agregado",
            payload: {
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }

    store.dispatch({
        type: "producto-seleccionado",
        payload: {
            codigo: null
        }
    })
    
}

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
        nombre: "prueba a",
        cantidad: 3,
        precio: 10,
        categoria: 2,
    }
}) 

store.dispatch({
    type: "producto-modificado",
    payload: {
        codigo: 1,
        nombre: "prueba a v2",
        cantidad: 4,
        precio: 11,
        categoria: 1
    }
}) 

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba b",
        cantidad: 3,
        precio: 10,
        categoria: 2,
    }
})

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba c",
        cantidad: 2,
        precio: 4,
        categoria: 4,
    }
})

store.dispatch({
    type: "producto-eliminado",
    payload: {
        codigo: 2
    }
})