function mensaje(prefijo, formateador)
{
    return function(texto)
    {
        return formateador(prefijo, texto);
    }
}

const formatoBienvenida = function(prefijo, texto)
{
    return "¡" + prefijo + " " + texto + "!";
}

const formatoespedida = function(prefijo, texto)
{
    return  prefijo + " " + texto + "... :(";
}

const bienvenida = mensaje("hola", formatoBienvenida);
const despedida = mensaje("adios", formatoespedida);

console.log(bienvenida("mundo"));
console.log(despedida("mundo"));