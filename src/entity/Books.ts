import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Authors } from "./Authors";

@Entity()
export class Books {
  [x: string]: any;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  published_date: Date;

  @Column()
  genre: string;

  @ManyToOne((type) => Authors, (author) => author.books)
  author_id: Authors;
}
