import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

let lastId = 1;
let productos = [
    {
        nombre: "producto a",
        cantidad: 1,
        precio: 10,
        codigo: lastId
    }
]

//DECLARACIÓN DE OBJETO EXPRESS
const app = express();

app.use(cors());
//Método que me sirve para parsear objeto json
app.use(bodyParser.json({type:'application/json'}));
app.use(logs);
//MÉTODO PARA MANEJO DE GET REQUESTS
app.get("/", (req, res) => res.send("<h1>Hola mundo </h1>"));

//Forma con middleware
//app.get("/productos", isAuthenticated, (req, res) => res.json(productos));
//Forma sin middleware
//app.get("/productos", (req, res) => res.json(productos));
app.get("/productos", (req, res) => {

    const filtro = req.query.filtro;

    if (filtro)
    {
        res.json(productos.filter(p => p.nombre.indexOf(filtro) >= 0));
    }
    else
    {
        res.json(productos);
    }
    res.json(productos);
});

//use sirve para que ejecute la función en paréntesis cada vez que se ejecuta la aplicación
//app.use(isAuthenticated);

app.post("/productos", (req, res) => {
    
    console.log("body", req.body);
    lastId++;
    const producto = {...req.body, codigo:lastId};
    productos.push(producto);
    res.status(201);
    res.json(producto);
})

//MODIFICA UN ELEMENT EXISTENTE, PUT DE HTTP
app.put("/productos/:codigo", (req, res) =>{
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);

    if (!producto)
    {
        res.status(404);
        res.json({
            mensaje: "No existe ningún producto con codigo " + codigo
        })
    }
    else
    {
        const index = productos.indexOf(producto);
        const nuevoProducto = productos[index] = {...req.body, codigo};
        res.status(200);
        res.json(nuevoProducto);
    }
})
//PARA SOLICITAR INFOR PARA PRODUCTO UNICO
app.get("/productos/:codigo", (req, res) =>{
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);

    if (!producto)
    {
        res.status(404);
        res.json({
            mensaje: "No existe ningún producto con codigo " + codigo
        });
    }
    else
    {
        res.status(200);
        res.json(producto);
    }
})

//ELIMINA UN ELEMENT EXISTENTE, delete DE HTTP
app.delete("/productos/:codigo", (req, res) =>{
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p => p.codigo == codigo);

    if (!producto)
    {
        res.status(404);
        res.json({
            mensaje: "No existe ningún producto con codigo " + codigo
        });
    }
    else
    {
        productos = productos.filter(x => x != producto);
        res.status(200);
        res.json({message: "Producto eliminado"});
    }
})




app.listen(5001, () => {
    console.log("Servidor express corriendo en puerto 5001");
})

// function isAuthenticated(req, res, next) {

//     const auth = req.headers.authorization;
//     if (auth == "hola-mundo")
//     {
//         next();
//     }
//     else
//     {
//         res.status(401);
//         res.send("Not authorized");
//     }
// }

//req es una variable propia de express. Contiene información de la request
function logs(req, res, next)
{
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}