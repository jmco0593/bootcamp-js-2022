
//DEFINITIONS
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");
const addTaskButton = document.getElementById("addTaskButton");
const clearTasksButton = document.getElementById("clearTasksButton");
const counterSpan = document.getElementById("counterSpan");
const body = document.getElementsByTagName("body")[0];
var taskCounter = 0;
var completedTaskCounter = 0;

body.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("addTaskButton").click();
    }
  });

taskInput.focus();


function createTask(txt)
{
    const task = document.createElement("li");
    var text = document.createTextNode(txt);
    task.setAttribute('class', 'task');
    task.setAttribute('onClick', 'editTask()');
    task.appendChild(text);
    return task;
}

function addTask()  
{
    taskInput.focus();
    if (taskInput.value)
    {
        const task = createTask(taskInput.value);
        task.innerHTML = task.innerHTML + `
            <span class="check" onclick="checkTask(event)"><i class="bi bi-check2-square"></i></span><span class="delete" onclick="removeTask(event)"><i class="bi bi-trash"></i></span>
        `
        tasksList.appendChild(task);
        taskInput.value = "";
        updateTaskCounter("up")
    }
    else
    {
        alert("Please enter some text in task input");
    }
}

function checkTask(event)
{
    taskInput.focus();
    const anchor = event.currentTarget;
    const li = anchor.parentElement;
    const txt = li.textContent;
    task = createTask(txt);

    completedTaskList.appendChild(task);
    removeTask(event);
    updateTaskCounter("down");
}

function removeTask(event)
{
    console.log("remover");
    const anchor = event.currentTarget;
    const li = anchor.parentElement;
    tasksList.removeChild(li);
    taskInput.focus();  
    updateTaskCounter("down");   
}

function clearList()
{
    if (taskCounter > 0)
    {
        if(confirm("Do you like to delete all your tasks?"))
        {
            removeChilds(tasksList);
            taskInput.focus();
            updateTaskCounter("clear");
        }
    }
    else
    {
        alert("Please add some task first");
    }
}

function updateTaskCounter(val)
{
    if (val == "up"){taskCounter = taskCounter + 1;}
    else if (val == 'down'){taskCounter = taskCounter - 1;}
    else if("clear"){taskCounter = 0;}
    counterSpan.textContent = taskCounter;
}



function removeChilds(parent)
{
    while (parent.lastChild) 
    {
        parent.removeChild(parent.lastChild);
    }
    
}


function updateCompletedTaskCounter(val)
{
    if (val == "up"){taskCounter = taskCounter + 1;}
    else if (val == 'down'){taskCounter = taskCounter - 1;}
    else if("clear"){taskCounter = 0;}
    counterSpan.textContent = taskCounter;
}

