import{ Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity()
export class ProductImage{
    @PrimaryGeneratedColumn()
    imageId: number
    @ManyToOne(()=>Product, (product)=>product.productId)
    productId: Product[]
    @Column()
    url: string
}