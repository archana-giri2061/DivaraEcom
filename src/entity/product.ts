import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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
}