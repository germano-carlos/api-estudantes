import { Joi } from "celebrate";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  birth: Date;

  @Column()
  email: string;

  @Column()
  city: string;

  constructor(data?: Record<string, any>) {
    this.id = data?.id;
    this.name = data?.name;
    this.birth = data?.birth;
    this.email = data?.email;
    this.city = data?.city;
  }
}

export const StudentSchema = {
  id: Joi.number(),
  name: Joi.string().required(),
  birth: Joi.date(),
  email: Joi.string().required().email(),
  city: Joi.string(),
};
