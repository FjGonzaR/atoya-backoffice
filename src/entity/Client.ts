import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Form } from "./Form";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({length : 50, nullable : true})
    name: string;

    @Column({length : 50, unique : true})
    enterprise: string;

    @Column({length : 50, nullable : true})
    city: string;

    @Column({length : 50, nullable : true})
    email: string;

    @OneToMany(
        type => Form,
        form => form.client,
    )
    forms : Form[];
}
