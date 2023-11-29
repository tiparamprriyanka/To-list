import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-route.js";
import list from "./routes/list-routes.js"

import cors from "cors";

const app = express()
app.use(cors());

app.use(express.json());

app.use("/api/user", router)
app.use("/api/list", list)


mongoose.connect("mongodb+srv://TO-DO:TODOLIST@cluster0.2ifisiv.mongodb.net/?retryWrites=true&w=majority")

.then(()=>{
    app.listen(7001,()=>{
        console.log("server startred")
        console.log("mongoDB cloud is connected")
    })
    
}).catch((err)=>{
    console.log("error conecting mongodb",err)

})





