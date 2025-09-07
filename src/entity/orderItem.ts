import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Order} from "./order";
import { Product } from "./product";
import { Col } from "sequelize/types/utils";
export class OrderItems{
    @PrimaryGeneratedColumn()
    orderItemId: number
    @ManyToOne(()=>Order, order=>order.orderId)
    orderId: Order
    @ManyToOne(()=>Product, product=>product.productId)
    productId: Product
    @Column()
    quantity: number
    @Column()
    price: number
}