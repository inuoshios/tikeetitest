import "dotenv/config";
import path from "node:path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Payment from "../entities/payment.entity";
import Ticket from "../entities/ticket.entity";

export default new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
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
  // logging: process.env.NODE_ENV === "development",
  poolSize: 15,
  // synchronize: process.env.NODE_ENV === "development",
});