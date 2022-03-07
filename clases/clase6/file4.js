/*OBJETOS INUMTABLE:
Esto hace referencia a que en JS tenemos objetos que no pueden ser modificados, comno es el caso de la const juan. Si quisieramos que este objeto fuera modificable
pudimos haberlo declarado con let. Sin embargo no siempre es una buena opción, dado a que modificar elementos que ya estén previamente declarados, puede llegar a
cambiar el comportamiento del programa.

Trabajar con objetos inmutables puede a llegar a ser menos eficiente en tema de recursos, pero no es considerable cuando los objetos con los que se está trabajando
no son grandes.
*/
const juan = {
    nombre: "Juan",
    apellido: "Rodriguez",
    edad: 30,
    direccion: {
        departamento: "Guatemala",
        municipio: "Guatemala",
    }
}

//Estamos haciendo referencia al mismo elemento, no estamos creando uno nuevo, sino que solo hacemos referencia al mismo. Esto se puede probar haciendo
//Una modificación al elememnto juan2 en alguna de sus variables y al imprimir tanto juan como juan 2, ambos valores se modifican.
const juan2 = juan;

juan2.apellido = "Perez";

console.log("Juan", juan);
console.log("Juan 2", juan2);

// para resolver el problema anterior podremos utilizar lo siguiente
const juan3 = Object.assign({}, juan);

juan3.apellido = "Cardona";

console.log("Juan", juan);
console.log("Juan 2", juan2);
console.log("Juan 2", juan3);


// En la función podemos hacer cambios de valores de una vez, para no tener que utilizar otra línea de código para hacerlo.
const juan4 = Object.assign({}, juan, {apellido: "Perez"});
//Para hacer esto con otra sintaxis más compata podemos utilizar el spread operator
const juan5 = {...juan, apellido: "Hernandez", telefono:12345678};

console.log("Juan 5", juan5);

const juan6 = {
    ...juan, 
    apellido: "Hernandez", 
    telefono:12345678,
    direccion: {
        // Aca hacemos una copia del objeto direccion de juan
        ...juan.direccion,
        municipio: "Santa Catarina Pinula",
        aldea: "Aldea 1",
    }
};

console.log("Juan", juan);
console.log("Juan 6", juan6);