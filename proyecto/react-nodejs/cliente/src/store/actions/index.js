//TASKS
export const reduxAddTask = (taskObject) => {
    return {
        type: 'AddTask',
        payload: taskObject
    }
}

export const reduxRemoveTask = (taskObject) => {
    return {
        type: 'removeTask',
        payload: taskObject
    }
}

export const reduxClearTaskList = () => {
    return {
        type: 'clearTaskList'
    }
}

//TASK COUNTER
export const reduxIncreaseCounter = () => {
    return {
        type: 'increaseCounter'
    }
}

export const reduxDecreaseCounter = () => {
    return {
        type: 'decreaseCounter'
    }
}

export const reduxSetCeroCunter = () => {
    return {
        type: 'setCeroCounter'
    }
}

//COMPLETED TASKS
export const reduxAddCompletedTask = (taskObject) => {
    return {
        type: 'AddCompletedTask',
        payload: taskObject
    }
}

export const reduxRemoveCompletedTask = (taskObject) => {
    return {
        type: 'removeCompletedTask',
        payload: taskObject
    }
}

export const reduxClearCompletedTaskList = () => {
    return {
        type: 'clearCompletedTaskList'
    }
}

//COMPLETED TASK COUNTER
export const reduxIncreaseCompletedCounter = () => {
    return {
        type: 'increaseCompletedCounter'
    }
}

export const reduxDecreaseCompletedCounter = () => {
    return {
        type: 'decreaseCompletedCounter'
    }
}

export const reduxSetCeroCompletedCounter = () => {
    return {
        type: 'setCeroCompletedCounter'
    }
}

//NODEJS
export const reduxBackendTasksList = (tasks) => {
    return {
        type: 'backendTasksList',
        payload: tasks
    }
}