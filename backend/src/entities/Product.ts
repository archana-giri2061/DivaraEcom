import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { ProductVariant } from "./ProductVariant";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column()
  category!: string;

  @Column()
  imageUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;

  // FIX: Explicitly reference the type target inside the parameter mapping array
  @OneToMany(() => ProductVariant, (variant: ProductVariant) => variant.product, { cascade: true, eager: true })
  variants!: ProductVariant[];
}