import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Admin{
    @PrimaryGeneratedColumn()
    AdminId: number
    @Column()
    FullName: string
    @Column()
    email: string
    @Column()
    Phone: number
    @Column()
    Password: string
    @Column()
    Role: "admin"
}