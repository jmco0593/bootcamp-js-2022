import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {productos} from "./database";

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
app.get("/productos", async (req, res) => {

    const filtro = req.query.filtro;
    let result;

    if (filtro)
    {
        result = await productos.filter(filtro);
    }
    else
    {
        result = await productos.all();
    }
    res.json(result);
});

//use sirve para que ejecute la función en paréntesis cada vez que se ejecuta la aplicación
//app.use(isAuthenticated);

app.post("/productos", async (req, res) => {
    const producto = await productos.add(req.body);
    res.status(201);
    res.json(producto);
})

//PARA SOLICITAR INFOR PARA PRODUCTO UNICO
app.get("/productos/:codigo", async (req, res) =>{
    const codigo = req.params.codigo;
    const producto = await productos.single(codigo);

    if (!producto)
    {
        res.status(404);
        res.json({mensaje: "No existe ningún producto con codigo " + codigo});
    }
    else
    {
        res.status(200);
        res.json(producto);
    }
})


//MODIFICA UN ELEMENT EXISTENTE, PUT DE HTTP
app.put("/productos/:codigo", async (req, res) =>{
    const codigo = req.params.codigo;
    try {
        const newProducto = await productos.update(codigo, req.body);
        console.log(newProducto)
        res.status(200);
        res.json({newProducto})
    }
    catch (mensage){
        res.status(404);
        res.json({mensage})
    }
})

//ELIMINA UN ELEMENT EXISTENTE, delete DE HTTP
app.delete("/productos/:codigo", async (req, res) =>{
    const codigo = req.params.codigo;
    try {
        await productos.remove(codigo);
        res.status(200);
        res.json({message: "Producto eliminado"});
    } 
    catch (mensaje) {
        res.status(404);
        res.json({mensaje});
    }

})




app.listen(5001, () => {
    console.log("Servidor express corriendo en puerto 5001")
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