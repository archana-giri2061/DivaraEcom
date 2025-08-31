import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {User} from "../entity/user";
import {Admin} from "../entity/admin";
import { AppDataSource } from "../database";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password,phone, address, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "admin") {
      const adminRepo = AppDataSource.getRepository(Admin);
      const newAdmin = adminRepo.create({
        FullName: name,
        email: email,
        Password: hashedPassword,
        Role: "admin",
        Phone: phone
      });
      await adminRepo.save(newAdmin);
      return res.status(201).json({ msg: "Admin registered successfully" });
    } 
    
    else {
      const userRepo = AppDataSource.getRepository(User);
      const newUser = userRepo.create({
        fullName: name,
        Email: email,
        Password: hashedPassword,
        Address: address,
        PhoneNumber: phone
      });
      await userRepo.save(newUser);
      return res.status(201).json({ msg: "User registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};