import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Cart } from "./cart";
import { Product } from "./product";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  cartItemId: number;
  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;
  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;
  @Column({ default: 1 })
  quantity: number;
  @Column("decimal", { precision: 10, scale: 2 })
  price: number;
}
