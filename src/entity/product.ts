import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category";
import { ProductImage } from "./productImage";
import { OrderItems } from "./orderItem";
import { CartItem } from "./cartItem";
import { Review } from "./review";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;
  @Column()
  name: string;
  @Column("text")
  description: string;
  @Column("decimal")
  price: number;
  @Column({ type: "enum", enum: ["Stainless Steel", "Silver", "Artificial", "Diamond", "Other"], default: "Other" })
  material: string;
  @Column({ default: 0 })
  stock: number;
  @Column("decimal", { nullable: true })
  weight: number;
  @ManyToOne(() => Category, (category) => category.categoryId, { eager: true })
  category: Category;
  @OneToMany(() => ProductImage, (productImage) => productImage.imageId, { cascade: true })
  images: ProductImage[];
  @OneToMany(() => OrderItems, (orderItem) => orderItem.orderItemId)
  orderItems: OrderItems[];
  @OneToMany(() => CartItem, (cartItem) => cartItem.cartItemId)
  cartItems: CartItem[];
  @OneToMany(() => Review, (review) => review.reviewId)
  reviews: Review[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
