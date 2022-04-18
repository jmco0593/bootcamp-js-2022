import React from "react";
import {Task} from './task'
import {useSelector} from 'react-redux';
import uuid from 'react-uuid';



function TaskList()
{
    let outsideNumber = 0;
    const listOfTasks = useSelector(state => state.tasks);
    const outsideNumberSet = () => {
        outsideNumber = outsideNumber + 1;
        return outsideNumber;
    }

    return(
        <ul className="list" id="taskList">
            {listOfTasks.map((task) => (
                <Task key={uuid()} id={task.id} task={task.task} outsideNumber={outsideNumberSet()}/>
            ))
                
            }
        </ul>
    )
}

export {TaskList};