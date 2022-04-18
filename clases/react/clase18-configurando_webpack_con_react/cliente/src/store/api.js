import axios from "axios";
const url = 'http://localhost:5001/productos/';
/*
AXIOS permite hacer consultas en nuestro server
*/
async function request(httpCall)
{
    //await sirve para que js espere hasta que la promesa se cumpla para seguir
    const response = await httpCall();
    return response.data;
}

//async permite que todo lo que trabaje como promesas lo trabaje como código secuencial.
const all = () => request(() => axios.get(url));
const single = (codigo) => request(() => axios.get(url + codigo));
const add = (producto) => request(() => axios.post(url, producto));
//Para este caso particular lo que se hace es que se espera un objeto de producto y en la nomenclatura se establece que codigo será una variable llamada código
//que albergará el parámetro códugo que se recibe y ...producto todo el resto del objeto recibido.
const update = ({ codigo, ...producto}) => request(() => axios.put(url + codigo, producto));
const remove = (codigo) => request(() => axios.delete(url + codigo));

export default{
    all,
    single,
    add,
    update,
    remove
    
}