// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserRole } from "../entities/User";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: UserRole };
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access denied. Token missing." });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as { id: string; role: UserRole };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden. Insufficient permissions." });
      return;
    }
    next();
  };
};