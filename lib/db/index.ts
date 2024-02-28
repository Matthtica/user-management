import "dotenv/config";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

export const client = new Client({
  host: process.env.DATABASE_HOST as string,
  port: parseInt(process.env.DATABASE_PORT as string),
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
});

await client.connect();
export const db = drizzle(client);
