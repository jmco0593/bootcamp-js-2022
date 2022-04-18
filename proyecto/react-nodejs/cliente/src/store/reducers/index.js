import { combineReducers } from "redux";
import { taskReducer } from "./taskReducer";
import { completedTaskReducer } from "./completedTaskReducer";
import {taskCounterReducer} from './taskCounterReducer';
import { completedTaskCounterReducer} from './completedTaskCounterReducer';

const reducers = combineReducers({
    tasks: taskReducer,
    completedTasks: completedTaskReducer,
    counterTask: taskCounterReducer,
    completedTaskCounter: completedTaskCounterReducer
});

export default reducers;