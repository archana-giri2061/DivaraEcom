import { Column, ManyToOne, NumericType, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import{Cart} from './cart';
import { Product } from "./product";
export class CartItem{
    @PrimaryGeneratedColumn()
    cartItemId: Number
    @ManyToOne(()=> Cart, (cart)=> cart.cartId)
    cartId: Cart[]
    @OneToOne(()=>Product, product=>product.productId)
    productId: Product[]
    @Column()
    quantity: number;
}