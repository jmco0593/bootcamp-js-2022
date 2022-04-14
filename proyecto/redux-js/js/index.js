
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


//REACT ELEMENTS
//STATE
const appState = {
    allTasks: [],
    allCompletedTasks: []
}

//ACTIONS
//FOR TASKS
const reduxAddTask = (taskObject) => {
    return {
        type: 'AddTask',
        payload: taskObject
    }
}

const reduxRemoveTask = (taskObject) => {
    return {
        type: 'removeTask',
        payload: taskObject
    }
}

const reduxClearTaskList = () => {
    return {
        type: 'clearTaskList'
    }
}

//FOR COMPLETED TASKS
const reduxAddCompletedTask = (taskObject) => {
    return {
        type: 'AddCompletedTask',
        payload: taskObject
    }
}

const reduxRemoveCompletedTask = (taskObject) => {
    return {
        type: 'removeCompletedTask',
        payload: taskObject
    }
}

const reduxClearCompletedTaskList = () => {
    return {
        type: 'clearCompletedTaskList'
    }
}

//REDUCER
const reducer = (state=appState, action) => {
    switch(action.type)
    {
        case 'AddTask':
            return {
                ...state,
                    allTasks:[
                        ...state.allTasks,
                        action.payload
                    ]
            }
        
        case 'removeTask':
            return {
                ...state,
                    allTasks:[
                        ...state.allTasks.filter((allTasks, index) => index != action.payload)
                    ]
            }
        case 'clearTaskList':
            return {
                ...state,
                    allTasks:[]
            }
        
        case 'AddCompletedTask':
            return {
                ...state,
                allCompletedTasks:[
                    ...state.allCompletedTasks,
                    action.payload
                ]
            }
        case 'removeCompletedTask':
            return {
                ...state,
                allCompletedTasks:[
                    ...state.allCompletedTasks.filter((allCompletedTasks, index) => index != action.payload)
                ]
            }
        case 'clearCompletedTaskList':
            return {
                ...state,
                allCompletedTasks:[]
            }
    }
};


//STORE
let store = Redux.createStore(reducer, appState);
store.subscribe(() => console.log(store.getState()));

//DISPATCHS EN BOTONES





















//EVENT LISTENERS
body.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("addTaskButton").click();
    }
  });

window.addEventListener('load', (event) => {
    //paintTasksUI(allTasks, tasksList);
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
    if (store.getState().allCompletedTasks.length == 0)
    {
        completedTaskCard.style.visibility = "hidden";
    }
    else
    {
        completedTaskCard.style.visibility = "inherit";
    }
}

///////////////////////////////////////TASK CARD
function paintTasksUI(parent)
{
    let outsideNumber = 1;
    for (element of store.getState().allTasks)
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
function paintCompletedTasksUI(parent)
{
    let outsideNumber = 1;
    for (element of store.getState().allCompletedTasks)
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
        store.dispatch(reduxAddTask(taskObject));
        //allTasks.push(taskObject);
        removeChilds(tasksList);
        paintTasksUI(tasksList);
        updateCounter(tasksCounterSpan, store.getState().allTasks);

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
    const reduxTaskList = store.getState().allTasks
    const index = selectTask(event, reduxTaskList);
    //allTasks.splice(index,1);
    store.dispatch(reduxRemoveTask(index));
    removeChilds(tasksList);
    paintTasksUI(tasksList);
    updateCounter(tasksCounterSpan, store.getState().allTasks);
    taskInput.focus(); 
}

function clearTaskList()
{

    const reduxTaskList = store.getState().allTasks
    if (reduxTaskList.length > 0)
    {
        if(confirm("Do you like to delete all your tasks?"))
        {
            store.dispatch(reduxClearTaskList());
            //allTasks = [];
            removeChilds(tasksList);
            paintTasksUI(tasksList);
            updateCounter(tasksCounterSpan, store.getState().allTasks);
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
    const reduxTaskList = store.getState().allTasks
    const reduxCompletedTaskList = store.getState().allCompletedTasks;
    const index = selectTask(event, reduxTaskList);
    store.dispatch(reduxAddCompletedTask(reduxTaskList[index]));
    //allCompletedTasks.push(allTasks[index]);
    updateCounter(tasksCounterSpan, reduxTaskList);
    updateCounter(counterCompletedSpan, store.getState().allCompletedTasks);
    removeChilds(completedTaskList);
    paintCompletedTasksUI(completedTaskList);
    removeTask(event);
}

function removeCompletedTask(event)
{
    const reduxCompletedTaskList = store.getState().allCompletedTasks;
    const index = selectTask(event, reduxCompletedTaskList);
    //allCompletedTasks.splice(index,1);
    store.dispatch(reduxRemoveCompletedTask(index));
    updateCounter(counterCompletedSpan, store.getState().allCompletedTasks);
    removeChilds(completedTaskList);
    paintCompletedTasksUI(completedTaskList);   
    taskInput.focus(); 
}

function clearCompletedTaskList()
{
    const reduxCompletedTaskList = store.getState().allCompletedTasks;
    if (reduxCompletedTaskList.length > 0)
    {
        if(confirm("Do you like to delete all your completed tasks?"))
        {
            store.dispatch(reduxClearCompletedTaskList());
            //allCompletedTasks = [];
            removeChilds(completedTaskList);
            paintCompletedTasksUI(completedTaskList);
            updateCounter(counterCompletedSpan, store.getState().allCompletedTasks);
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