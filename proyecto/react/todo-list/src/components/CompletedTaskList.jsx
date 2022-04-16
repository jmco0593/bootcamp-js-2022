import React from "react";
import {CompletedTask} from './CompletedTask'
import {useSelector} from 'react-redux';
import uuid from 'react-uuid';



function CompletedTaskList()
{
    let outsideNumber = 0;
    const listOfCompletedTasks = useSelector(state => state.completedTasks);
    const outsideNumberSet = () => {
        outsideNumber = outsideNumber + 1;
        return outsideNumber;
    }

    return(
        <ul className="list" id="taskList">
            {listOfCompletedTasks.map((task) => (
                <CompletedTask key={uuid()} id={task.id} task={task.task} outsideNumber={outsideNumberSet()}/>
            )) 
            }
        </ul>
    )
}

export {CompletedTaskList};