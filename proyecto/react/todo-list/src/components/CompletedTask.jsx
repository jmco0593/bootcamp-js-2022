import React from "react";
import { useDispatch} from 'react-redux';
import {reduxRemoveCompletedTask, reduxDecreaseCompletedCounter} from '../store/actions/index'

function CompletedTask (props) 
{
    const dispatch = useDispatch();
    const removeTask = (event) => {
        dispatch(reduxRemoveCompletedTask(props.id));
        dispatch(reduxDecreaseCompletedCounter());
    }


    return(
        <li>
            <span className="taskId">{props.outsideNumber}</span>
            <span id="taskText" className="taskText">{props.task}</span>
            <span className="delete" onClick={removeTask}>
                <i className="bi bi-trash"></i>
            </span>
        </li>
    );
}

export {CompletedTask};