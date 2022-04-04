//DEFINITIONS
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskButton");
const clearTasksButton = document.getElementById("clearTasksButton");
const counterSpan = document.getElementById("counterSpan");
const body = document.getElementsByTagName("body")[0];
var taskCounter = 0;

body.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("addTaskButton").click();
    }
  });

taskInput.focus();

function addTask()  
{
    taskInput.focus();
    if (taskInput.value)
    {
        const taskText = taskInput.value; 
        const task = document.createElement("li");
        var text = document.createTextNode(taskText);
        task.setAttribute('class', 'task');
        task.setAttribute('onClick', 'editTask()');
        task.setAttribute('contenteditable', 'true');
        task.innerHTML = `
            <span onclick="removeTask(event)"><i class="bi bi-trash"></i></span>
        `
        tasksList.appendChild(task);
        task.appendChild(text);
        taskInput.value = "";
        updateCounter("up")
    }
    else
    {
        alert("Please enter some text in task input");
    }
}

function clearList()
{
    if (taskCounter > 0)
    {
        if(confirm("Do you like to delete all your tasks?"))
        {
            removeChilds(tasksList);
            taskInput.focus();
            updateCounter("clear");
        }
    }
    else
    {
        alert("Please add some task first");
    }
    
    
}

function removeChilds(parent)
{
    while (parent.lastChild) 
    {
        parent.removeChild(parent.lastChild);
    }
    
}


function removeTask(event)
{
    console.log("remover");
    const anchor = event.currentTarget;
    const li = anchor.parentElement;
    tasksList.removeChild(li);
    taskInput.focus();
    updateCounter("down");   
}

function updateCounter(val)
{
    if (val == "up")
    {
        taskCounter = taskCounter + 1;
    }
    else if (val == 'down')
    {
        taskCounter = taskCounter - 1;
    }
    else if("clear")
    {
        taskCounter = 0;
    }
    console.log(taskCounter);

    counterSpan.textContent = taskCounter;
}

function editTask()
{
    console.log('edit');
}