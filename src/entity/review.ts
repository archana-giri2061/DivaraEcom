import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";
import { User } from "./user";

export class Review{
    @PrimaryGeneratedColumn()
    reviewId: number
    @ManyToMany(()=>Product, product=>product.productId)
    productId:Product
    @ManyToMany(()=>User, user=>user.userId)
    userId: User
    @Column()
    rating: String
    @Column()
    comment: string
    @Column({nullable: true})
    createdAt: Date
}   