import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Make database optional for development
// If DATABASE_URL is not set, API routes will return mock data
const DATABASE_URL = process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle> | null = null;

if (DATABASE_URL) {
  const sql = neon(DATABASE_URL);
  db = drizzle(sql, { schema });
}

export { db };
export const isDatabaseConfigured = !!DATABASE_URL;
