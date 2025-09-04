import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn("increment")
    userId: number
    @Column()
    fullName: string
    @Column()
    PhoneNumber: number
    @Column()
    Email: number
    @Column()
    Address: string
    @Column()
    Password: string
}