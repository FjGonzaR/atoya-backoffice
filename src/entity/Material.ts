import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Form } from "./Form";

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 30, nullable: true })
  sap_code: string;

  @Column({ length: 50, nullable: true })
  reference: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column({ default: 0, type: "int" })
  units: number;

  @ManyToOne((type) => Form, (form) => form.materials, { onDelete: "CASCADE" })
  form: Form;
}
