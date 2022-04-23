import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


//Estructura de nuestros campos en base de datos
const tasksSchema = new mongoose.Schema({
    task: {type: String, required: true}
});

//Esto es la creación de un modelo, el cual el primer parámetro es el nombre
//de la tabla de nuestra DB.
const Tasks = mongoose.model("tasks", tasksSchema);
const completedTasks = mongoose.model("completedtasks", tasksSchema);

//Tasks
const addTasks = (tasks) => {
    for (let task of tasks)
    {
        let newTask = new Tasks(task);
        let x = newTask.save();
    }
}

const loadTasks = async () => {
    let tasks = await Tasks.find({});
    return tasks.map( (task) => ({...task.toJSON(), id:task._id}));
}

//CompleteTasks
const addCompletedTasks = (tasks) => {
    for (let task of tasks)
    {
        let newTask = new completedTasks(task);
        let x = newTask.save();
    }
}

const loadCompletedTasks = async () => {
    let tasks = await completedTasks.find({});
    return tasks.map( (task) => ({...task.toJSON(), id:task._id}));
}


export default{
    addTasks,
    loadTasks,
    addCompletedTasks,
    loadCompletedTasks
}