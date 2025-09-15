import {
Entity,
PrimaryGeneratedColumn,
Column,
CreateDateColumn,
UpdateDateColumn,
OneToMany,
} from "typeorm";
import { Order } from "./order";
import { Address } from "./Address";
import { Review } from "./review";
import { Cart } from "./cart";
@Entity()
export class User {
@PrimaryGeneratedColumn()
userId: number;
@Column()
name: string;
@Column({ unique: true })
email: string;
@Column()
password: string;
@Column({ nullable: true })
phone: string;
@Column({ type: "enum", enum: ["customer", "admin"], default: "customer" })
role: "customer" | "admin";
@OneToMany(() => Address, (Address) => Address.user)
addresses: Address[];
@OneToMany(() => Order, (order) => order.user)
orders: Order[];
@OneToMany(() => Review, (review) => review.user)
reviews: Review[];
// @OneToMany(() => Cart, (cart) => cart.user)
// cart: Cart[];
@CreateDateColumn()
createdAt: Date;
@UpdateDateColumn()
updatedAt: Date;
    cart: any;
}