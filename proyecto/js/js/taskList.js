
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

