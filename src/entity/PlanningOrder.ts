import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import { Form } from "./Form";

@Entity()
export class PlanningOrder {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({default : false})
    activities: boolean;

    @Column({default : false})
    responsabilities: boolean;

    @Column({default : false})
    considerations: boolean;

    @Column({nullable : true})
    observations: string;

    @Column({
        nullable : true,
    })
    officer : string;

    @OneToOne(
        type => Form,
        form => form.planningOrder
    )
    form : Form
}
