import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class PlaningOrder {

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
}
