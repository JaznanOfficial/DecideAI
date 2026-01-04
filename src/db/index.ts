import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.DATABASE_URL || "postgres://default:default@default:5432/default";

if (!process.env.DATABASE_URL) {
  console.warn("Warning: DATABASE_URL is not defined. using dummy connection string. Database operations will fail.");
}

const sql = neon(databaseUrl);
export const db = drizzle(sql);
