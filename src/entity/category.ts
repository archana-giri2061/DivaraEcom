import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product";


@Entity()
export class Category {
@PrimaryGeneratedColumn()
categoryId: number;
@Column()
name: string;
@Column({ nullable: true })
description: string;
@OneToMany(() => Product, (product) => product.category)
products: Product[];
}