import express from "express";
import bodyParser from "body-parser";

let lastId=0;
const productos = []

//DECLARACIÓN DE OBJETO EXPRESS
const app = express();

//Método que me sirve para parsear objeto json
app.use(bodyParser.json({type:'application/json'}));
app.use(logs);
//MÉTODO PARA MANEJO DE GET REQUESTS
app.get("/", (req, res) => res.send("<h1>Hola mundo </h1>"));

//Forma con middleware
//app.get("/productos", isAuthenticated, (req, res) => res.json(productos));
//Forma sin middleware
app.get("/productos", (req, res) => res.json(productos));

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

app.listen(5000, () => {
    console.log("Servidor express corriendo en puerto 5000");
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