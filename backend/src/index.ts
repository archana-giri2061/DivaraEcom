// backend/src/index.ts
import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import { login, register } from "./controllers/auth.controller";
import { getAllProducts, createProduct } from "./controllers/product.controller";
import { placeOrder } from "./controllers/order.controller";
import { authenticateJWT, authorizeRoles } from "./middleware/auth.middleware";
import { UserRole } from "./entities/User";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// Product Catalog Routes
app.get("/api/products", getAllProducts);
app.post("/api/products", authenticateJWT, authorizeRoles(UserRole.ADMIN), createProduct);

// Orders Processing Route
app.post("/api/orders", authenticateJWT, placeOrder);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected securely to Divara MySQL Server instance via TypeORM.");
    app.listen(PORT, () => console.log(`Server executing gracefully on port ${PORT}`));
  })
  .catch((error) => console.error("Database connection failure:", error));