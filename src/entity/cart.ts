import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"
export class Cart{
    @PrimaryGeneratedColumn()
    cartId: number
    @ManyToOne(()=>User, (user)=>user.userId)
    userId: User[]
    @Column({nullable: true})
    createdAt: Date
}
