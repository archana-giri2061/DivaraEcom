import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Category } from "./category";

@Entity()
export class Product{
    @PrimaryGeneratedColumn("increment")
    productId: number;
    @Column()
    productName: string;
    @Column()
    Price: number;
    @Column()
    Description: string;
    @Column()
    material: string;
    @Column()
    stock: number;
    @ManyToOne(()=>Category, (category)=>category.categoryId)
    categoryId: Category[];
    @Column({nullable: true})
    createdAt: Date;
    @Column({nullable: true})
    updatedAt: Date;
}