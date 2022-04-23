import React from "react";
import {TaskInput} from './TaskInput';
import {TaskList} from './TaskList';
import { useSelector, useDispatch } from 'react-redux';
import {reduxClearTaskList, reduxSetCeroCunter} from '../store/actions/index'
import { confirm } from "react-confirm-box";


function TaskCard()
{
    const dispatch = useDispatch();
    const taskCounter = useSelector(state => state.tasks.length)
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

    return(
        <div className="card">
            <header className="title">Todo List x</header>
            <TaskInput/>
            <TaskList/>
            <div className="footer">
                <span>Number of tasks:</span><span id="counterSpan">{taskCounter}</span>
                <button id="clearTasksButton" onClick={clearTasks}>Clear</button>
                <button id="saveTasksButton" onClick={clearTasks}>Save</button>
                <button id="getTasksButton" onClick={clearTasks}>Get</button>
            </div>
        </div>
    );
}

export {TaskCard};