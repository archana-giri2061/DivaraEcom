import { Request, Response, NextFunction } from "express";
import {cookieParser} from 'cookie-parser';
import jwt from "jsonwebtoken";
export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(400).json({message: "Incorrect token"})
    }
    try{
        const data = jwt.verify(token, "YOUR_SECRET_KEY");
    }catch{
        return res.status(400).json({message: ""})
    }
}