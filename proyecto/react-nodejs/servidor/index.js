import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import {tasks} from "./database";

const app = express();
// const tasks = [
//     {id: 1, task:"test X"},
//     {id: 2, task:"test 2"},
//     {id: 3, task:"test 3"}
// ];
// let completedTasks = [];

//LOG OF APLICATION START
app.listen(5001, () => {
    console.log("servidor express escuchando en puerto 5001");
})

//GENERAL MIDDELWARES
//este sirve para la lectura de
app.use(bodyParser.json({type: 'application/json'}));
app.use(logs);
app.use(cors());
//LOGS
function logs(req, res, next)
{
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}



/*
URLS:
///////SAVE DATA
/savetasks
/savecompletedtasks
/savealltasks

////////OBTAIN DATA
/gettasks
/getcompletedtasks
/getalltasks

/obtain

*/
//TASKS
app.get("/gettasks", async (req, res) => {
    const dbtasks = await tasks.loadTasks();
    console.log(dbtasks);
    res.json(dbtasks);
}); 

app.post("/savetasks", async (req, res) => {
    tasks.addTasks(req.body);
}); 

//COMPLETED TASKS
app.get("/getcompletedtasks", async (req, res) => {
    const dbtasks = await tasks.loadCompletedTasks();
    console.log(dbtasks);
    res.json(dbtasks);
}); 

app.post("/savecompletedtasks", async (req, res) => {
    tasks.addCompletedTasks(req.body);
}); 

