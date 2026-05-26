// backend/src/entities/ProductVariant.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";

@Entity({ name: "product_variants" })
export class ProductVariant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sku!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  metalWeight!: number; // Weight in grams

  @Column()
  metalPurity!: string; // e.g., "22 Karat", "18 Karat"

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int" })
  stockQuantity!: number;

  @Column()
  productId!: string;

  @ManyToOne(() => Product, (product) => product.variants, { onDelete: "CASCADE" })
  @JoinColumn({ name: "productId" })
  product!: Product;
}