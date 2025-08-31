import express from 'express';
import "dotenv/config";
import {AppDataSource} from "./database";
import dotenv from "dotenv";
const app = express();

dotenv.config();
app.use(express.json());

AppDataSource.initialize().then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
}).catch((err)=>console.error("Database connection failed", err))

