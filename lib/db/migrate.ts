import "dotenv/config";
import { db } from "./index";
//import { migrate } from "drizzle-orm/node-postgres/migrator";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

await migrate(db, { migrationsFolder: './drizzle' });
//await client.end();
