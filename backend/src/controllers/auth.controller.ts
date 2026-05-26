// backend/src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../entities/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, adminSecret } = req.body;
    
    const existing = await userRepository.findOneBy({ email });
    if (existing) { res.status(400).json({ message: "Email already registered" }); return; }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Determine role base on a safe server secret key configuration
    let role = UserRole.CUSTOMER;
    if (adminSecret && adminSecret === process.env.ADMIN_SECRET_KEY) {
      role = UserRole.ADMIN;
    }

    const user = userRepository.create({ name, email, password: hashedPassword, role });
    await userRepository.save(user);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });
    if (!user) { res.status(401).json({ message: "Invalid credentials" }); return; }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) { res.status(401).json({ message: "Invalid credentials" }); return; }

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET || "default_secret", 
      { expiresIn: "24h" }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};