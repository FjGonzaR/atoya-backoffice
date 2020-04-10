import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Form } from "./Form";

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ length: 50, nullable: true })
  reference: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ default: 0, type: "int" })
  units: number;

  @ManyToOne('Form', 'materials')
  form : Form
}
