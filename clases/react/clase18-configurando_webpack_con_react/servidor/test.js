//Al haber sido una variable global, está disponible en el objeto window
var miVariable = "hola mundo";

//Estos objetos no están presentes del lado del server, pero si del lado de un navegador

//console.log("window: ", window);
//console.log("document: ", document);
//console.log("miVariable: ", windw.miVariable)

//Estas si existen
//console.log("dirname: ", __dirname);
//console.log("filename: ", __filename);
//console.log("process: ", process);
console.log("arguments: ", process.argv);

//Variables de process
//env: Variable de entorno del sistema
//argv --> variable que me permite recibir parámetros en consola. se pueden nombrar 