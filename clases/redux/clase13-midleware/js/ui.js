//UI SE UTILIZARÁ PARA AGREGAR TODOS LOS ELEMENTOS QUE SE LLAMAN DE NUESTRA PÁGINA
//La variable ui es un objeto que permitirá ejectuar 
const ui = {
    onFormSubmit: (data) => {},
    onEliminarClick: (codigo) => {},
    onEditarClick: (codigo) => {},
    renderForm,
    renderTable

};

const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputCantidad = document.getElementById("cantidad");
const inputPrecio = document.getElementById("precio");
const selectCategoria = document.getElementById("categoria");
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

form.addEventListener("submit", (event) =>{
        //Función que me permite omitir toda acción que tegamos por defecto. Para este caso puntual que estamos trabajando con el form, me ayudará para omitir
    // el envío de data al sitio en la etiqueta de action del atributo de form.
    event.preventDefault();

    const data = new FormData(form);
    const values = Array.from(data.entries());

    //Dado a que data.entries es un arreglo de arreglo podemos utilizar la siguiente nomenclatura para hacer el código un poco más entendible. La forma
    //equivalente está comentada en la parte de abajo de esto
    const [frmCodigo,  frNombre, frmCantidad, frmPrecio, frmCategoria] = values;
    const codigo = parseInt(frmCodigo[1]);
    const nombre = frNombre[1];
    const cantidad = parseInt(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = parseInt(frmCategoria[1]);

    ui.onFormSubmit({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria,
    });
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
            ui.onEliminarClick(item.codigo);
        });

        editar.addEventListener("click", (event) => {
            event.preventDefault();
            ui.onEditarClick(item.codigo);
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