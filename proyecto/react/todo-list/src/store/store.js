import { createStore } from "redux";
import reducers from "./reducers/index";

const initialState = {
    tasks: [],
    completedTasks: [],
    counterTask: 0,
    completedTaskCounter: 0
}

const store = createStore(
    reducers,
    initialState
)

export default store;