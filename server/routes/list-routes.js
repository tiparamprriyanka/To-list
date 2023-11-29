import express from "express";
import {
    addTask,
    upDateTask,
    deleteTask,
    getTask
} from "../controllers/list-controller.js"


const taskRoute = express.Router();

taskRoute.post("/addtask",addTask)
taskRoute.put("/updatetask/:id", upDateTask)
taskRoute.delete("/deletetask/:id",deleteTask )
taskRoute.get("/gettask/:id", getTask)



export default taskRoute









