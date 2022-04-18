import axios from 'axios';

async function apiGetTasks()
{
    const response  = await axios.get('http://localhost:5001/gettasks');
    return response.data;
}

export {apiGetTasks};