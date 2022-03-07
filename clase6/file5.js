//Arreglos inmutables

const numeros = [1, 2, 3];

const numeros2 = numeros;
numeros2.push(4);
console.log("numeros: ", numeros);
console.log("numeros 2: ", numeros2);

//Podemos precensiar el mismo error del caso anterior.

const numeros3 = [0, ...numeros, 5];

const index = numeros.indexOf(2);
const numeros4 = [
    ...numeros.slice(0, index),
    1.5,
    ...numeros.slice(index)
];

console.log("numeros: ", numeros);
console.log("numeros 4: ", numeros4);

//Devulve un array que complan con la condición extablecida. En este caso utilizamos un arrow function que devolverá los elemetnos que no sean igual a 2.
const numeros5 = numeros.filter(x => x != 2);
console.log("numeros 5:", numeros5);

//Map permite devolver un arreglo por medio del criterio de una función que se le brinde de parámetro. Para este caso se le está pasando un arrow function
//Que ayuda a reemplazar los 2 por 100
const numeros6 = numeros.map(x => x == 2 ? 100 : x);
console.log("numeros 6:", numeros6);
