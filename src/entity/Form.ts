import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { FormType } from "../types/form";
import { ServiceControl } from "./ServiceControl";
import { Material } from "./Material";
import { Client } from "./Client";
import { PlanningOrder } from "./PlanningOrder";

@Entity()
export class Form {
  @PrimaryGeneratedColumn('uuid')
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

  @Column()
  observations: string;

  @Column()
  pending_observations: string;

  @Column({
    type: "enum",
    enum: FormType,
  })
  type: FormType;

  @Column({
    default: false,
  })
  vfn: boolean;

  @Column({
    default: false,
  })
  vft: boolean;

  @Column({
    default: false,
  })
  vnt: boolean;

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

  @OneToOne((type) => ServiceControl, (serviceControl) => serviceControl.form, {
    nullable: true,
  })
  @JoinColumn()
  serviceControl: ServiceControl;

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
}
