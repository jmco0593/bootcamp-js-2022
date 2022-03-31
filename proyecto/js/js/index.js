//DEFINITIONS
const form = document.getElementById("form_tasks_list");
const tasksList = document.getElementById("tasks_list");
const button = document.getElementById("taskListButton");

button.addEventListener("click", addTask);

function addTask()  
{
    const card = document.createElement("li");
    card.setAttribute('class', 'card');
    card.appendChild(document.createTextNode('hola'));
    tasksList.appendChild(card);
}
