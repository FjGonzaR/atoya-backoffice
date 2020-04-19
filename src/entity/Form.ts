import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  PrimaryColumn,
} from "typeorm";
import { Material } from "./Material";
import { Client } from "./Client";
import { PlanningOrder } from "./PlanningOrder";

@Entity()
export class Form {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  physic_unit: string;

  @Column()
  equipment: string;

  @Column()
  serial_number: string;

  @Column()
  reference: string;

  //observaciones y hallazgos
  @Column()
  observations: string;

  @Column()
  pending_observations: string;

  @Column()
  precedents : string;

  @Column()
  type: string;

  @Column({
    default: false,
  })
  vfn: number;

  @Column({
    default: false,
  })
  vft: number;

  @Column({
    default: false,
  })
  vnt: number;

  @Column({
    default: false,
  })
  ups_dosing: boolean;

  @Column({
    nullable: true,
  })
  beginning_hour: Date;

  @Column({
    nullable: true,
  })
  finishing_hour: Date;

  @Column({
    nullable: true,
  })
  officer: string;

  @OneToOne((type) => PlanningOrder, (planningOrder) => planningOrder.form, {
    nullable: true,
    cascade : true,
  })
  @JoinColumn()
  planningOrder: PlanningOrder;

  @Column({
    nullable: true,
  })
  revisions: string;

  @OneToMany('Material','form', { cascade: true })
  materials: Material[];

  @ManyToOne((type) => Client, (client) => client.forms)
  client: Client;

  @CreateDateColumn()
  created_at: Date;
  @BeforeInsert()
  defineId() {
    this.id = `${this.created_at.getFullYear()}-${this.created_at.getMonth()+1}-${this.created_at.getDate()}/${this.client.enterprise}`;
  }
}
