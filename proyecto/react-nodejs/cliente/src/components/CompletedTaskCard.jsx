import React from "react";
import {CompletedTaskList} from './CompletedTaskList';
import { useSelector, useDispatch } from 'react-redux';
import {reduxClearCompletedTaskList, reduxSetCeroCompletedCounter} from '../store/actions/index'
import { confirm } from "react-confirm-box";


function CompletedTaskCard()
{
    const dispatch = useDispatch();
    const CompletedTaskCounter = useSelector(state => state.completedTasks.length)
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

    return(
        <div className="card">
            <header className="title">Completed tasks List</header>
            <CompletedTaskList/>
            <div className="footer">
                <span>Number of tasks:</span><span id="counterSpan">{CompletedTaskCounter}</span>
                <button id="clearTasksButton" onClick={clearTasks}>Clear</button>
            </div>
        </div>
    );
}

export {CompletedTaskCard};