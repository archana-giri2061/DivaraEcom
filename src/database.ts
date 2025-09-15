import "reflect-metadata"
import {DataSource} from "typeorm"
import dotenv from "dotenv";
import { User } from "./entity/user";
import { Wishlist } from "./entity/wishlist";
import { Review } from "./entity/review";
import { ProductImage } from "./entity/productImage";
import { Product } from "./entity/product";
import { Payment } from "./entity/payment";
import { OrderItems } from "./entity/orderItem";
import { Order } from "./entity/order";
import { Category } from "./entity/category";
import { CartItem } from "./entity/cartItem";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities:[User,Wishlist, Review, ProductImage, Product, Payment, OrderItems, Order, Category, CartItem ]
})