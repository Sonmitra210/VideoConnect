import express from "express";
import {createServer} from "node:http"
import dotenv from "dotenv";
dotenv.config();

import {Server} from "socket.io";
import mongoose from "mongoose";

import cors from "cors";

import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server=createServer(app);
const io = connectToSocket(server)

app.set("port" , (process.env.PORT || 8000));
app.use(cors({
    origin: "https://videoconnectfrontend-l1r1.onrender.com", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true} ));

app.use("/api/v1/users" , userRoutes);

const start=async()=>{
    const connectionDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongo connected db host: ${connectionDB.connection.host}`)
    console.log(`mongo connected db host: ${connectionDB.connection.name}`)
    server.listen(app.get("port") , ()=>{
        console.log("listening");
    })
}
start();