import {
  Entity,
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

  @Column({
    nullable: true,
  })
  precedents: string;

  @Column()
  type: string;

  @Column()
  vfn: number;

  @Column()
  vft: number;

  @Column()
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
    cascade: true,
  })
  @JoinColumn()
  planningOrder: PlanningOrder;

  @Column({
    nullable: true,
  })
  revisions: string;

  @OneToMany("Material", "form", { cascade: true })
  materials: Material[];

  @ManyToOne((type) => Client, (client) => client.forms)
  client: Client;

  @CreateDateColumn()
  created_at: Date;
}
