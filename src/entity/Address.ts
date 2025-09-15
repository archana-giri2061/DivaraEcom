import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";


@Entity()
export class Address {
@PrimaryGeneratedColumn()
addressId: number;
@ManyToOne(() => User, (user) => user.addresses)
user: User;
@Column()
fullName: string;
@Column({ nullable: true })
phone: string;
@Column()
street: string;
@Column()
city: string;
@Column({ nullable: true })
state: string;
@Column({ nullable: true })
country: string;
@Column({ nullable: true })
postalCode: string;
@Column({ default: false })
isDefault: boolean;
}