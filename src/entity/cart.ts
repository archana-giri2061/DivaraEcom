import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { User } from "./user";
import { CartItem } from "./cartItem";

@Entity({ name: "carts" })
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;
  @ManyToOne(() => User, (user) => user.cart)
  user: User;
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[];
  @CreateDateColumn()
  createdAt: Date;
}

