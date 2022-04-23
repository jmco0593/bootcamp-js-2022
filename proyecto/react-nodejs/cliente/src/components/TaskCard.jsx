import React from "react";
import {TaskInput} from './TaskInput';
import {TaskList} from './TaskList';
import { useSelector, useDispatch } from 'react-redux';
import {reduxClearTaskList, reduxSetCeroCunter, reduxBackendTasksList} from '../store/actions/index'
import { confirm } from "react-confirm-box";
import {apiGetTasks, apiSaveTasks} from '../store/api'


function TaskCard()
{
    const dispatch = useDispatch();
    const taskCounter = useSelector(state => state.tasks.length);
    const tasks = useSelector(state => state.tasks);
    const clearTasks = async (event) =>{
        if (taskCounter > 0)
        {
            if(await confirm("Do you like to delete all your tasks?"))
            {
                dispatch(reduxClearTaskList());
                dispatch(reduxSetCeroCunter());
            }
        }
    }
    const saveTasks = async (event) =>{
        if (taskCounter > 0)
        {
            if(await confirm("Do you like to save all your tasks in database?"))
            {
                apiSaveTasks(tasks);
            }
        }
    }
    const loadTasks = async (event) =>{
        if(await confirm("Do you like to load your tasks from database? This action will override your actual tasks"))
        {
            const promesa = apiGetTasks();
            promesa.then((response) => {
                dispatch(reduxBackendTasksList(response));
            })
            promesa.catch((e)=> {
                console.log("Error", e)
            })

        }
    }
    return(
        <div className="card">
            <header className="title">Todo List</header>
            <TaskInput/>
            <TaskList/>
            <div className="footer">
            <span>Number of tasks:</span><span id="counterSpan">{taskCounter}</span>
                <div className="buttonsfooter">
                    <button id="clearTasksButton" style={{background:"var(--MyRed)"}} onClick={clearTasks}>Clear</button>
                    <button id="saveTasksButton" onClick={saveTasks}>Save</button>
                    <button id="loadTasksButton" style={{background:"var(--myGreen)"}} onClick={loadTasks}>Load</button>
                </div>
            </div>
        </div>
    );
}

export {TaskCard};