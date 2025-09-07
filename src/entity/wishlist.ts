import { ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Product } from "./product";

export class Wishlist{
    @PrimaryGeneratedColumn()
    wishlistId: number
    @OneToOne(()=>User, user=>user.userId)
    userId: User
    @ManyToOne(()=>Product, product=> product.productId)
    productId: Product

}