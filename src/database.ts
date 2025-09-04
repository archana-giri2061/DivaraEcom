import "reflect-metadata"
import {DataSource} from "typeorm"
import{User} from "./entity/user"
import {Admin} from "./entity/admin"
import dotenv from "dotenv";
import { Product } from "./entity/product";

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
    entities:[User, Admin, Product]
})