import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./product";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  imageId: number;
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
  @Column()
  url: string;
  @Column({ default: false })
  isPrimary: boolean;
}

