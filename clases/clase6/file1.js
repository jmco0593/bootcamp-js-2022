//FUNCIÓN PURA: función que no recibe nada externo para su funcionamiento
function saludar(text)
{
    return "hola " + texto;
}

const prefix = "hola "
//FUNCIÓN NO PURA: función que necesita varlores externos para funcionar
function saludar2(texto)
{
    return prefix + texto;
}
 

function mensaje(prefijo)
{
    return function(texto)
    {
        return prefijo + " " + texto;
    }
}

/*
Al momento de llamar a estas funciones lo que está pasando es que bienvenida está albergando el return de mensaje, el cual es la función anónima dentro de mensaje, 
pero con el parámetro prefijo ya establecido. Ahora solo es necesario agregar el parámetro texto de la función anónima para funcionar.
*/ 
const bienvenida = mensaje("hola");
const despedida = mensaje("adios");

console.log(bienvenida("mundo"));
console.log(despedida("mundo"));