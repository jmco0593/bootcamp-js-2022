import axios from 'axios';

//TASKS

async function apiGetTasks()
{
    const response  = await axios.get('http://localhost:5001/gettasks');
    return response.data;
}

async function apiSaveTasks(tasks)
{
    await axios.post('http://localhost:5001/savetasks', tasks);
}


//COMPLETED TASKS

async function apiGetCompletedTasks()
{
    const response  = await axios.get('http://localhost:5001/getcompletedtasks');
    return response.data;
}

async function apiSaveCompletedTasks(tasks)
{
    await axios.post('http://localhost:5001/savecompletedtasks', tasks);
}

export {apiGetTasks, apiSaveTasks, apiGetCompletedTasks, apiSaveCompletedTasks};