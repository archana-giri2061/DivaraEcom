import type {Request, Response} from 'express';
import { AppDataSource } from '../database';
import { User } from '../entity/user';
import { Address } from '../entity/Address';

const userRepo = () => AppDataSource.getRepository(User);
const addressRepo = () => AppDataSource.getRepository(Address);

export async function getProfile(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  const user = await userRepo().findOne({ where: { userId }, relations: ["addresses"] });
  if (!user) return res.status(404).json({ message: "User not found" });
  delete (user as any).password;
  res.json(user);
}

export async function updateProfile(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  const { name, phone } = req.body;
  await userRepo().update({ userId }, { name, phone });
  res.json({ message: "Profile updated" });
}

export async function addAddress(req: Request, res: Response) {
  const userId = (req as any).user.userId;
  const { fullName, phone, street, city, state, country, postalCode, isDefault } = req.body;
  const user = await userRepo().findOne({ where: { userId } });
  if (!user) return res.status(404).json({ message: "User not found" });
  const addr = addressRepo().create({ user, fullName, phone, street, city, state, country, postalCode, isDefault });
  if (isDefault) {
    // set other addresses default false
    await addressRepo().update({ user: { userId } } as any, { isDefault: false } as any);
  }
  await addressRepo().save(addr);
  res.status(201).json(addr);
}

