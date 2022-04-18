const initialState = [];

const taskReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case 'AddTask':
            return state.concat([action.payload]);
        
        case 'removeTask':
            return state.filter((task) => task.id !== action.payload)
            
        case 'clearTaskList':
            return [];
        
        case 'backendTasksList':
            return action.payload;

        default:
            return state;
    }
};

export { taskReducer };