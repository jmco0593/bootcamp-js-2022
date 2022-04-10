import http from "http";
//const http = require("http");

const server = http.createServer((req, res) => {

	// res.writeHead(200, {"Content-Type": "text/html"});
    res.writeHead(200, {"Contente-Type": "application/json"});
	res.write(JSON.stringify([
        {
            codigo: 1,
            nombre: "Producto 1",
            precio: 10,
            cantidad: 100,
        },
        {
            codigo: 2,
            nombre: "Producto 2",
            precio: 50,
            cantidad: 200,
        }

    ]))
    //res.write("<h1>Hola mundo</h1>");
	res.end();
})

server.listen(5000, () => {
	console.log("Sevidor escuchado en puerto 5000");
})