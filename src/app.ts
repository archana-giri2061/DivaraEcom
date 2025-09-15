import express from 'express';
import "dotenv/config";
import {AppDataSource} from "./database";
import dotenv from "dotenv";
import authRouter from "./router/authRouter"
import productRouter from './router/productRouter';
import cookieParser from "cookie-parser";
import profileRouter from './router/profileRouter';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", profileRouter);
AppDataSource.initialize().then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
}).catch((err)=>console.error("Database connection failed", err))

