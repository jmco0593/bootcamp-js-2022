import React from "react";
import {TaskCard} from "./TaskCard";
import {CompletedTaskCard} from './CompletedTaskCard'

function CardContainer()
{
    return (
        <div>
            <TaskCard/>
            <CompletedTaskCard/>
        </div>
    );
}

export {CardContainer};