import React from 'react';
import {apiGetTasks} from '../store/api'
import {reduxBackendTasksList} from '../store/actions/index'
import { useDispatch} from 'react-redux';

function ApiButtons()
{
    const dispatch = useDispatch();
    const saveTasks = async (event) =>{

    }

    const getTasks = async (event) =>{
        const promesa = apiGetTasks();
        promesa.then((response) => {
            dispatch(reduxBackendTasksList(response));
        })
        promesa.catch((e)=> {
            console.log("Error", e)
        })
    }

    return(
        <div className="card">
            <button onClick={saveTasks} >Save Tasks</button>
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    )
}

export default ApiButtons;