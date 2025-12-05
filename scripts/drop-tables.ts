import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function dropTables() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found');
    process.exit(1);
  }

  console.log('🔄 Connecting to database...');
  
  try {
    const sql = neon(connectionString);

    console.log('🗑️  Dropping existing tables...');
    
    // Drop tables in correct order (messages first due to foreign key)
    await sql`DROP TABLE IF EXISTS messages CASCADE`;
    await sql`DROP TABLE IF EXISTS conversations CASCADE`;
    
    console.log('✅ Tables dropped successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Drop failed:', error);
    process.exit(1);
  }
}

dropTables();
