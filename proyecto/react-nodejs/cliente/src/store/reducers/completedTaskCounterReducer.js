const initialState = 0;

const completedTaskCounterReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case 'increaseCompletedCounter':
            state = state + 1;
            return state;
        
        case 'decreaseCompletedCounter':
            state = state - 1;
            return state;
        
        case 'setCeroCompletedCounter':
            return 0;
            
        default:
            return state;
    }
};

export { completedTaskCounterReducer };