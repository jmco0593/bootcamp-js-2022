//Permite obtener los elementos con el tag p
const paragraphs = document.getElementsByTagName("p");
console.log("Parrafos en el documento:", paragraphs);

// el resultante es un arreglo, por lo que puedo tratarlo como tal
if (paragraphs.length > 0)
{
    const paragraph = paragraphs[0];
    //Con innerText puedo cambiar textos de algun elemento
    paragraph.innerText = "Bienvenidos al Bootcamp";
}


