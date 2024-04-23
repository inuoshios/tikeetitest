import "dotenv/config";
import path from "node:path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Payment from "../entities/payment.entity";
import Ticket from "../entities/ticket.entity";

// new database datasource
export default new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Ticket,
    Payment
  ],
  migrations: [path.resolve(__dirname, "../migrations/**/*.ts")],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: "tikeeti_migrations",
  poolSize: 15,
});