import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId: number;
  @ManyToOne(() => Product, (product) => product.reviews, { eager: true })
  product: Product;
  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user: User;

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "text", nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
