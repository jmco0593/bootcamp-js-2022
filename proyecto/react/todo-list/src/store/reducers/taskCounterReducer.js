const initialState = 0;

const taskCounterReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case 'increaseCounter':
            state = state + 1;
            return state;
        
        case 'decreaseCounter':
            state = state - 1;
            return state;
        
        case 'setCeroCounter':
            return 0;
            
        default:
            return state;
    }
};

export { taskCounterReducer };