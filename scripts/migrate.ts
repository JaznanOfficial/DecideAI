import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import 'dotenv/config';

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('Make sure you have .env.local file with DATABASE_URL set');
    process.exit(1);
  }

  console.log('🔄 Connecting to database...');
  
  try {
    const sql = neon(connectionString);
    const db = drizzle(sql);

    console.log('🔄 Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    
    console.log('✅ Migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
