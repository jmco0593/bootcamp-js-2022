
//ELEMENT DEFINITIONS
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");
const addTaskButton = document.getElementById("addTaskButton");
const clearTasksButton = document.getElementById("clearTasksButton");
const tasksCounterSpan = document.getElementById("counterSpan");
const counterCompletedSpan = document.getElementById("counterCompletedSpan");
const body = document.getElementsByTagName("body")[0];
const completedTaskCard = document.getElementById("completedTaskCard");

//GLOBAL VARS
var taskId = 1;
let allTasks = [];
let allCompletedTasks = [];

//EVENT LISTENERS
body.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("addTaskButton").click();
    }
  });

window.addEventListener('load', (event) => {
    paintTasksUI(allTasks, tasksList);
    taskInput.focus();
  });


////////////////////////////////////////////////////UI
function createli()
{
    const li = document.createElement("li");
    li.setAttribute('class', 'task');
    // li.appendChild(text);
    return li;
}

function removeChilds(parent)
{
    while (parent.lastChild) 
    {
        parent.removeChild(parent.lastChild);
    }
    
}

function completedTaskCardVisibility()
{
    if (allCompletedTasks.length == 0)
    {
        completedTaskCard.style.visibility = "hidden";
    }
    else
    {
        completedTaskCard.style.visibility = "inherit";
    }
}

///////////////////////////////////////TASK CARD
function paintTasksUI(list, parent)
{
    let outsideNumber = 1;
    for (element of list)
    {
        
        const task = createli();
        
        task.innerHTML = task.innerHTML + `
            <span class="taskId">${outsideNumber}</span>
            <span id="taskId" class="taskId" style="visibility:hidden;">${element.id}</span>
            <span id="taskText" class="taskText" onClick="editTask(event)">${element.task}</span>
            <span class="check" onclick="addCompletedTask(event)">
                <i class="bi bi-check2-square"></i>
            </span>
            <span class="delete" onclick="removeTask(event)">
                <i class="bi bi-trash"></i>
            </span>
        `
        parent.appendChild(task);
        outsideNumber++;
    }
    //console.log(allTasks);
}

///////////////////////////////////////COMPLETED CARD
function paintCompletedTasksUI(list, parent)
{
    console.log(allCompletedTasks);
    let outsideNumber = 1;
    for (element of list)
    {
        
        const task = createli();
        task.innerHTML = task.innerHTML + `
            <span class="taskId">${outsideNumber}</span>
            <span id="taskId" class="taskId" style="visibility:hidden;">${element.id}</span>
            <span id="taskText" class="taskText">${element.task}</span>
            <span class="delete" onclick="removeCompletedTask(event)">
                <i class="bi bi-trash"></i>
            </span>
        `
        parent.appendChild(task);
        outsideNumber++;
        
    }
    completedTaskCardVisibility();
    
}

///////////////////////////////////////////////////////////////FUNCTIONALITY
function updateCounter(counter, array)
{
    counter.textContent = array.length;
}

function selectTask(event, list)
{
    const anchor = event.currentTarget;
    const li = anchor.parentElement;
    const x = li.children;
    const txtSpan = li.children[1].innerHTML;
    let index = 0;
    for (obj of list)
    {
        if (obj.id == txtSpan)
        {
            return index;
        }
        index++;
    } 
}

/////////////////////////////////////TASK CARD
function addTask()  
{
    if (taskInput.value)
    {
        const taskObject = {
            id: taskId,
            task: taskInput.value,
        };
        allTasks.push(taskObject);
        removeChilds(tasksList);
        paintTasksUI(allTasks, tasksList);
        updateCounter(tasksCounterSpan, allTasks);

        taskInput.value = "";
        taskId = taskId + 1;
    }
    else
    {
        alert("Please enter some text in task input");
    }
    taskInput.focus();
}

function removeTask(event)
{
    const index = selectTask(event, allTasks);
    allTasks.splice(index,1);
    updateCounter(tasksCounterSpan, allTasks);
    removeChilds(tasksList);
    paintTasksUI(allTasks, tasksList);   
    taskInput.focus(); 
}

function clearTaskList()
{
    if (allTasks.length > 0)
    {
        if(confirm("Do you like to delete all your tasks?"))
        {
            allTasks = [];
            removeChilds(tasksList);
            updateCounter(tasksCounterSpan, allTasks)
            paintTasksUI(allTasks, tasksList);
        }
    }
    else
    {
        alert("Please add some task first");
    }
}

/////////////////////////////////////////////////COMPLETED CARD
function addCompletedTask(event)  
{
    //ADDING TO COMPLETED TASKS
    const index = selectTask(event, allTasks);
    allCompletedTasks.push(allTasks[index]);
    updateCounter(tasksCounterSpan, allTasks);
    updateCounter(counterCompletedSpan, allCompletedTasks);
    removeChilds(completedTaskList);
    paintCompletedTasksUI(allCompletedTasks, completedTaskList);
    removeTask(event);
}

function removeCompletedTask(event)
{
    const index = selectTask(event, allCompletedTasks);
    allCompletedTasks.splice(index,1);
    updateCounter(counterCompletedSpan, allCompletedTasks);
    removeChilds(completedTaskList);
    paintCompletedTasksUI(allCompletedTasks, completedTaskList);   
    taskInput.focus(); 
}

function clearCompletedTaskList()
{
    if (allCompletedTasks.length > 0)
    {
        if(confirm("Do you like to delete all your completed tasks?"))
        {
            allCompletedTasks = [];
            removeChilds(completedTaskList);
            updateCounter(counterCompletedSpan, allCompletedTasks);
            paintCompletedTasksUI(allCompletedTasks, completedTaskList);
        }
    }
    else
    {
        alert("Please add some completed task first");
    }
}

function editTask(event)
{
    const index = selectTask(event, allTasks);
    const actualText = allTasks[index].task;
    const newText = prompt("Enter the text that will replace the task that you selected", actualText);
    if (!(newText == null || newText == ""))
    {
        allTasks[index].task = newText; 
    }
    removeChilds(tasksList);
    paintTasksUI(allTasks, tasksList);
}