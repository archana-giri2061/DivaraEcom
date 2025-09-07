import { Col } from "sequelize/types/utils";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn("increment")
    userId: number
    @Column()
    userName: string
    @Column({unique: true})
    email: string
    @Column()
    password: string
    @Column()
    phone: number
    @Column()
    role: "customer"
    @CreateDateColumn()
    createdAT: Date;
    @CreateDateColumn()
    updatedAT: Date;
  static email: any;
}