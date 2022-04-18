import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import {reduxAddTask, reduxIncreaseCounter} from '../store/actions/index';

let contId = 0;

function TaskInput()
{
    const searchInput = useRef(null)
    const [value, setValue] = useState('');
    

    const dispatch = useDispatch();
    const addTask= (event) => {
        if (value)
        {
            contId = contId + 1
            dispatch(reduxAddTask({
                id: contId,
                task:value
            }))
            dispatch(reduxIncreaseCounter())
            setValue("");
            searchInput.current.focus()
        }
    }

    return(
        <div className="inputField">
            <input autoFocus type="text" placeholder="Add your task" id="taskInput" value={value} onChange={(event) => setValue(event.target.value)} ref={searchInput}/>
            <button id="addTaskButton" onClick={addTask}><i className="bi bi-plus"></i></button>
        </div>
    );
}

export {TaskInput};