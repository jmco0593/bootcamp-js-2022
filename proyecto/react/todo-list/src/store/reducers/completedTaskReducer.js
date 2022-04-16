const initialState = [];

const completedTaskReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case 'AddCompletedTask':
            return state.concat([action.payload]);
        
        case 'removeCompletedTask':
            return state.filter((task) => task.id !== action.payload)
            
        case 'clearCompletedTaskList':
            return [];

        default:
            return state;
    }
};

export { completedTaskReducer };