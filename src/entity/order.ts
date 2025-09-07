import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./user"
import { Col } from 'sequelize/types/utils';
@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    orderId: number;
    @OneToOne(()=>User, user=>user.userId)
    userId: User[]
    @Column()
    status: string;
    @Column()
    totalAmount: number;
    @Column()
    paymentStatus: string;
    @Column({nullable: true})
    createdAt: Date
    @Column({nullable: true})
    updatedAt: Date
}
