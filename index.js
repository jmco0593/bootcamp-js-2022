//Permite obtener los elementos con el tag p
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs);

// el resultante es un arreglo, por lo que puedo tratarlo como tal
if (paragraphs.length > 0)
{
    let paragraph = paragraphs[0];
    //Con innerText puedo cambiar textos de algun elemento
    paragraph.innerText = "Bienvenidos al Bootcamp";
}


