//Obetenemos referencia el objeto form
const form = document.getElementsByTagName("form")[0];
//Obtenemos el objeto tbody, el cual corresponde a los elementos de la tabla. Esto con la finalidad de irlo llenando.
const tbody = document.getElementsByTagName("tbody")[0];
const input_nombre = document.getElementById("nombre");
const cantidad_total = document.getElementById("cantidad-total");
const precio_total = document.getElementById("precio-total");
const gran_total = document.getElementById("gran-total");
let indice = 0;
let cantidadTotal = 0;
let preciosTotales = 0;
let granTotal = 0;



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
    const [frNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    const nombre = frNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    // const nombre = values[0][1];
    // const cantidad = values[1][1];
    // const precio = values[2][1];
    // const categoria = values[3][1];

    indice++;
    //Permite crear un elemento, en este caso un elemento tr
    const tr = document.createElement("tr");
    const total = cantidad * precio;
    cantidadTotal = cantidadTotal + parseFloat(cantidad);
    preciosTotales = preciosTotales + parseFloat(precio);
    granTotal = granTotal + parseFloat(total);
    
    //innerHTML me permite agregar lo que contiene dentro del elemento utilizado (En este caso tr). Para este caso estamos agregando una fila completa en la columna
    //dado a que tr contiene todos estos elementos, se agregar de forma de string cada uno de los elementos del mismo
    tr.innerHTML = `
        <td>${indice}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a></td>
    `
    //La palabra reservada event nos ayudará a enviar a la función establecida el evento de donde se llamó la función, para este caso el evento seria onclick

    //Ahora estamos indicando donde queremos ponder el elemento creado. En este caso estamos insertándolo dentro del elemento tbody
    tbody.appendChild(tr);
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
    event.preventDefault()
    console.log("on edit");
}
/**
 * 
 * @param {Event} event 
 */
function onDelete(event)
{
    event.preventDefault()
    console.log("on delete");
}