import React from "react";
import {TaskCard} from "./TaskCard";
import {CompletedTaskCard} from './CompletedTaskCard'
import ApiButtons from './ApiButtons';

function CardContainer()
{
    return (
        <div>
            <TaskCard/>
            <CompletedTaskCard/>
            <ApiButtons/>
        </div>
    );
}

export {CardContainer};