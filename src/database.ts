import "reflect-metadata"
import {DataSource} from "typeorm"
import{User} from "./entity/user"
import dotenv from "dotenv";
import { Product } from "./entity/product";
import { Order } from "./entity/order";
import { Cart } from "./entity/cart";
import { CartItem } from "./entity/cartItem";
import { Category } from "./entity/category";
import { OrderItems } from "./entity/orderItem";
import { Payment } from "./entity/payment";
import { ProductImage } from "./entity/productImage";
import { Review } from "./entity/review";
import { Wishlist } from "./entity/wishlist";

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
    entities:[User,Product,Order, Cart, CartItem, Category, OrderItems, Payment, ProductImage, Review, Wishlist]
})