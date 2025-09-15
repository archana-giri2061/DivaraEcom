import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Order } from "./order";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @ManyToOne(() => Order)
  order: Order;

  @Column({ type: "enum", enum: ["COD", "Stripe", "PayPal", "Khalti", "eSewa"] })
  method: string;

  @Column({ type: "enum", enum: ["pending", "success", "failed"], default: "pending" })
  status: string;

  @Column({ nullable: true })
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;
}
