import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const tasks = [
    {id: 1, task:"test 1"},
    {id: 2, task:"test 2"},
    {id: 3, task:"test 3"}
];
let completedTasks = [];

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
app.get("/", (req, res) => res.send("<h1>Hola mundo </h1>"));
//TASKS
app.get("/gettasks", (req, res) => res.json(tasks));
//COMPLETED TASKS
app.get("/getcompletedtasks", (req, res) => res.json(completedTasks));

