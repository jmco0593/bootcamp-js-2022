

const mensaje = (prefijo, formateador) => (texto) => formateador(prefijo, texto);

const bienvenida = mensaje("hola", (a, b) => `¡ ${a} ${b} !`);
const despedida = mensaje("adios", (a, b) => `${a} ${b} ... :(`);

console.log(bienvenida("mundo"));
console.log(despedida("mundo"));