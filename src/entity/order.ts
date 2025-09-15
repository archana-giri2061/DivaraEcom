import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";
import { OrderItems } from "./orderItem";
import { Address } from "./Address";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;
  @ManyToOne(() => Address,(Address)=>Address.addressId, { eager: true })
  address: Address;
  @OneToMany(() => OrderItems, (item) => item.order, { cascade: true, eager: true })
  items: OrderItems[];
  @Column({ type: "enum", enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" })
  status: string;
  @Column("decimal", { precision: 10, scale: 2 })
  totalAmount: number;
  @Column({ type: "enum", enum: ["pending", "paid", "failed", "refunded"], default: "pending" })
  paymentStatus: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

