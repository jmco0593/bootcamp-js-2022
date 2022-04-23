import mongoose from "mongoose";
import tasks from "./tasks";

const mongodbUri = "mongodb+srv://mongouser:mongouser@cluster0.wjlrx.mongodb.net/todolistProject?retryWrites=true&w=majority";

mongoose.connect(mongodbUri, () => {
    console.log("Conectado a la base de datos");
});

export { tasks };