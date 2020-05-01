import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Client } from "./Client";

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne((type) => Client, (client) => client.reminders, { nullable: true })
  client: Client;

  @Column({
    nullable: true,
  })
  due_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
