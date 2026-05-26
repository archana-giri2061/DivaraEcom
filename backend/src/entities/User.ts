import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Order } from "./Order";

export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin"
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  // FIX: Explicitly pass the structural type annotation
  @OneToMany(() => Order, (order: Order) => order.user)
  orders!: Order[];
}