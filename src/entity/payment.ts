import { Column, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {Order} from "./order";
export class Payment{
    @PrimaryGeneratedColumn()
    paymentId: number
    @OneToOne(()=>Order, order=>order.orderId)
    orderId: Order;
    @Column()
    status: string
    @Column()
    transactionId: number
    @Column({nullable: true})
    createdAt: Date
}