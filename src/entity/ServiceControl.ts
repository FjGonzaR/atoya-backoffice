import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import { ScoreScale } from "../types/serviceControl";
import { type } from "os";
import { Form } from "./Form";

@Entity()
    export class ServiceControl {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type : 'enum',
        enum : ScoreScale,
    })
    firstCriteria: ScoreScale;

    @Column({
        type : 'enum',
        enum : ScoreScale,
    })
    secondCriteria: ScoreScale;

    @Column({
        type : 'enum',
        enum : ScoreScale,
    })
    thirdCriteria: ScoreScale;

    @Column({
        type : 'enum',
        enum : ScoreScale,
    })
    fourthCriteria: ScoreScale;

    @Column({
        nullable : true,
    })
    officer : string;

    @OneToOne(
        type => Form,
        form => form.serviceControl
    )
    form : Form

}
