import React from "react";
import { useDispatch} from 'react-redux';
import {reduxRemoveTask, reduxDecreaseCounter, reduxAddCompletedTask, reduxIncreaseCompletedCounter} from '../store/actions/index'

function Task (props) 
{

    
    const dispatch = useDispatch();
    const removeTask = (event) => {
        dispatch(reduxRemoveTask(props.id));
        dispatch(reduxDecreaseCounter());
    }

    const checkTask = (event) => {
        dispatch(reduxAddCompletedTask({
            id: props.id,
            task:props.task
        }))
        dispatch(reduxIncreaseCompletedCounter());
        dispatch(reduxRemoveTask(props.id));
        dispatch(reduxDecreaseCounter());
        
        

    }

    return(
        <li>
            <span className="taskId">{props.outsideNumber}</span>
            <span id="taskText" className="taskText">{props.task}</span>
            <span className="check" onClick={checkTask}>
                <i className="bi bi-check2-square"></i>
            </span>
            <span className="delete" onClick={removeTask}>
                <i className="bi bi-trash"></i>
            </span>
        </li>
    );
}

export {Task};