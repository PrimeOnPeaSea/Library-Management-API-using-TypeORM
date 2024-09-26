import "reflect-metadata";
import { DataSource } from "typeorm";
import { Authors } from "./entity/Authors";
import { Books } from "./entity/Books";
import { Rentals } from "./entity/Rentals";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "test",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Authors, Books, Rentals],
});
