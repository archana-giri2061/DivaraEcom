import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {User} from "../entity/user";
import { AppDataSource } from "../database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const register = async (req: Request, res: Response) => {
  try {
    const{userName, email, password, phone, role}= req.body;
    console.log(req.body);

    if(!userName || !email || !password|| !phone|| !role){
      return res.status(400).json({message: "All fields required"})
    }
    const userRepo = AppDataSource.getRepository("User");
    const existingUser = await userRepo.findOneBy({email})

    if(existingUser){
      return res.status(400).json({message: "This email is already used"})
    }
    const hassPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.userName = userName;
    newUser.email = email;
    newUser.password = hassPassword;
    newUser.phone = phone;
    newUser.role = role;

    await userRepo.save(newUser);
    return res.status(200).json({message: "This user registered successfully."})
}catch(err){
    res.status(500).json({message: "Registration failed", err})
}
}

export const login = async (req: Request, res: Response) =>{
    try{
      const {email, password} = req.body;
      console.log(req.body);
      if(!email || !password){
        return res.status(400).json({message: "Please fill all the fields"})
      }
      const userRepo = AppDataSource.getRepository("User")
      const user = await userRepo.findOneBy({email})

      if(!user){
        return res.status(400).json({message: "This user is not found"})
      }
      const match = await bcrypt.compare(password, user.password);
      if(!match){
        return res.status(400).json({message: "Please fill correct password"})
      }  
      const access_token = jwt.sign({
        email: user.email},
        process.env.ACCESS_TOKEN,
        {expiresIn: '1m'
      });
      const refresh_token = jwt.sign({
        email: user.email,},
        process.env.REFRESH_TOKEN,
        {expiresIn: '1d'}
      );
      res.cookie('jwt', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000,
      })
      res.json({access_token})
      res.status(200).json({message: "Login successfully!"})
    }catch(error){
      res.status(500).json({message: "login failed", error})
    }
}
export const refresh = async (req:Request, res:Response)=>{
  if(req.cookies?.jwt){
    const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN,
      (err,decoded)=>{
        if(err){
          return res.status(400).json({Message: "Unathorized token"})
        }else{
          const access_token = jwt.sign({
            email: User.email},
            process.env.ACCESS_TOKEN,{
              expiresIn: '10m'
          });
          return res.json({access_token})
        }
  })
  }else{
    return res.status(500).json({message: "Refreshtoken incorrect"})
  }
}

// export const login = async (req: Request, res: Response) =>{
//     try{
//       const {email, password} = req.body;
//       console.log(req.body);
//       if(!email || !password){
//         return res.status(400).json({message: "Please fill all the fields"})
//       }
//       const userRepo = AppDataSource.getRepository("User")
//       const user = await userRepo.findOneBy({email})

//       if(!user){
//         return res.status(400).json({message: "This user is not found"})
//       }
//       const match = await bcrypt.compare(password, user.password);
//       if(!match){
//         return res.status(400).json({message: "Please fill correct password"})
//       }  
//       res.status(200).json({message: "Login successfully!"})
//     }catch(error){
//       res.status(500).json({message: "login failed", error})
//     }
// }
