import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Admin{
    @PrimaryGeneratedColumn("increment")
    AdminId: number
    @Column()
    FullName: string
    @Column()
    Email: string
    @Column()
    Phone: number
    @Column()
    Password: string
    @Column()
    Role: "admin"
}