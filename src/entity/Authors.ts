import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Authors {
  [x: string]: any;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  country: string;
}
