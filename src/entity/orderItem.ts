import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;
}
