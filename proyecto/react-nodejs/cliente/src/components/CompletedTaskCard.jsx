import React from "react";
import {CompletedTaskList} from './CompletedTaskList';
import { useSelector, useDispatch } from 'react-redux';
import {reduxClearCompletedTaskList, reduxSetCeroCompletedCounter, reduxBackendCompletedTasksList} from '../store/actions/index'
import { confirm } from "react-confirm-box";
import {apiGetCompletedTasks, apiSaveCompletedTasks} from '../store/api'

function CompletedTaskCard()
{
    const dispatch = useDispatch();
    const CompletedTaskCounter = useSelector(state => state.completedTasks.length)
    const completedTasks = useSelector(state => state.completedTasks);
    const clearTasks = async (event) =>{
        if (CompletedTaskCounter > 0)
        {
            if(await confirm("Do you like to delete all your completed tasks?"))
            {
                dispatch(reduxClearCompletedTaskList());
                dispatch(reduxSetCeroCompletedCounter());
            }
        }
    }
    const saveCompletedTasks = async (event) =>{
        if (CompletedTaskCounter > 0)
        {
            if(await confirm("Do you like to save all your completed tasks in database?"))
            {
                apiSaveCompletedTasks(completedTasks);
            }
        }
    }
    const loadCompletedTasks = async (event) =>{
        if(await confirm("Do you like to load your completed tasks from database? This action will override your actual tasks"))
        {
            const promesa = apiGetCompletedTasks();
            promesa.then((response) => {
                dispatch(reduxBackendCompletedTasksList(response));
            })
            promesa.catch((e)=> {
                console.log("Error", e)
            })

        }
    }

    return(
        <div className="card">
            <header className="title">Completed tasks List</header>
            <CompletedTaskList/>
            <div className="footer">
                <span>Number of tasks:</span><span id="counterSpan">{CompletedTaskCounter}</span>
                <div className="buttonsfooter">
                    <button id="clearTasksButton" style={{background:"var(--MyRed)"}} onClick={clearTasks}>Clear</button>
                    <button id="saveTasksButton" onClick={saveCompletedTasks}>Save</button>
                    <button id="loadTasksButton" style={{background:"var(--myGreen)"}} onClick={loadCompletedTasks}>Load</button>
                </div>
            </div>
        </div>
    );
}

export {CompletedTaskCard};