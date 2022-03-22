//Obetenemos referencia el objeto form
const form = document.getElementsByTagName("form")[0];
//Obtenemos el objeto tbody, el cual corresponde a los elementos de la tabla. Esto con la finalidad de irlo llenando.
const tbody = document.getElementsByTagName("tbody")[0];
/** @type {HTMLInputElement} */
const input_codigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */
const input_nombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */
const input_cantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const input_precio = document.getElementById("precio");
/** @type {HTMLInputElement} */
const input_categoria = document.getElementById("categoria");
const cantidad_total = document.getElementById("cantidad-total");
const precio_total = document.getElementById("precio-total");
const gran_total = document.getElementById("gran-total");

let indice = 0;
let cantidadTotal = 0;
let preciosTotales = 0;
let granTotal = 0;
let current_row;


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
    let codigo = frmCodigo[1];
    const nombre = frNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    // const nombre = values[0][1];
    // const cantidad = values[1][1];
    // const precio = values[2][1];
    // const categoria = values[3][1];
    const total = cantidad * precio;
    cantidadTotal = cantidadTotal + parseFloat(cantidad);
    preciosTotales = preciosTotales + parseFloat(precio);
    granTotal = granTotal + parseFloat(total);

    //con ! permite verifica si la variable código tiene algún valor
    let tr;
    if (!codigo)
    {
        codigo = ++indice;
        //Permite crear un elemento, en este caso un elemento tr
        tr = document.createElement("tr");
        //Ahora estamos indicando donde queremos ponder el elemento creado. En este caso estamos insertándolo dentro del elemento tbody
        tbody.appendChild(tr);

    }
    else
    {
        tr = current_row;
    }
    //innerHTML me permite agregar lo que contiene dentro del elemento utilizado (En este caso tr). Para este caso estamos agregando una fila completa en la columna
    //dado a que tr contiene todos estos elementos, se agregar de forma de string cada uno de los elementos del mismo
    tr.innerHTML = `
        <td>${codigo}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td>
            <div class="btn-group">
                <a title="Editar" href="#" onclick="onEdit(event)" class="btn btn-sm btn-outline-secondary">
                    <i class="bi bi-pencil-square"></i>
                </a> 
                <a title="Eliminar" href="#" onclick="onDelete(event)" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                </a>
            </div>
        </td>
    `
    //Con esto guardamos el valor de campo de categoria. dataset permite guardar información adicional en el elemento HTML que NO será visible para el usuario
    tr.dataset.categoria = categoria;

    //La diferencia principal entre innertext e innerHTML es que el segundo permite sintáxis html y el otro solo texto.
    cantidad_total.innerText = cantidadTotal;
    precio_total.innerText = preciosTotales;
    gran_total.innerText = granTotal;
    
    
    //Método del objeto form para poder borrar la información de los campos comprendidos en un formulario
    form.reset();
    //Permite que el puntero lleve a un cierto campo u objeto, en este caso al input de nombre
    input_nombre.focus();
    console.clear();

}

/**
 * 
 * @param {Event} event 
 */
function onEdit(event)
{
    event.preventDefault();
    //Con target es para poder ubicar al elemetno, pero no es el ideneo para entornos de producción. Esto porque solo funcionará si le damos al anchor como tal
    // y de haber un elemento dentro (cono es el caso del i que alberga la imagen) no activa el evento. Por ello se utiliza mejor el current target.
    //Current target hará referencia al elemento que se le puso el evento onclick="onDelete(event), en este caso al a y abarcará todo lo que contenga dicho elemento
    //const anchor = event.target;
    const anchor = event.currentTarget;
    const tr = anchor.parentElement.parentElement.parentElement;
    //Démonos cuenta que en esta situación estamos obtenido los td que se encuentren dentro de tr. No es una búsqueda en todo el documento, sino que ahora
    // es una búsqueda dentro de td.
    const celdas = tr.getElementsByTagName("td");
    const [tdCodigo, tdNombre, tdCantidad, tdPrecio, tdCategoria] = celdas;
    input_codigo.value = tdCodigo.innerText;
    input_nombre.value = tdNombre.innerText;
    input_cantidad.value = tdCantidad.innerText;
    input_precio.value = tdPrecio.innerText;
    input_categoria.value = tdCategoria.innerText;
    input_categoria.value = tr.dataset.categoria;

    current_row = tr;

}
   
/**
 * 
 * @param {Event} event 
 */
function onDelete(event)
{
    console.log("on delete");
    //La propiedad target nos sirve para poder acceder a la referencia del elemento que activo el evento. Esto para no tener que hacer una búsqueda (como con
    // getElementsByTagName) del elemento como tal.
    //Un anchor es un enlace, son los <a>. En la parte de abajo solo se está especificando que la variable anchor es de tipo anchor o enlace para poder ayudar
    //al intelegence del IDE. Sin esa linea también el código funcionaría sin problemas.
    /**
     * @type {HTMLAnchorElement}
     */
    //const anchor = event.target;
    const anchor = event.currentTarget;
    //parentElement sirve para poder acceder al elemento padre del elemento anchor. En este caso seria a los td que alberga al ancor. Ahora haciendo parentElement
    //nuevamente, podemos acceder al tr que alberga todos los td.
    const tr = anchor.parentElement.parentElement.parentElement;
    //Ayuda a eliminar el elemento hijo (en este caso hijo de tbody) referenciado.
    tbody.removeChild(tr);

}