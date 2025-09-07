import express from 'express';
import "dotenv/config";
import {AppDataSource} from "./database";
import dotenv from "dotenv";
import authRouter from "./router/authRouter"
import productRouter from './router/productRouter';

const app = express();

dotenv.config();
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", productRouter)
AppDataSource.initialize().then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
}).catch((err)=>console.error("Database connection failed", err))

