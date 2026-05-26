// backend/src/entities/Order.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount!: number;

  @Column({ default: "Pending" })
  status!: string; // Pending, Processing, Shipped, Delivered

  @Column({ type: "json" })
  items!: Array<{
    productId: string;
    variantId: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
  }>;

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;
}