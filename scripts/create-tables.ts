import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function createTables() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found');
    process.exit(1);
  }

  console.log('🔄 Connecting to database...');
  
  try {
    const sql = neon(connectionString);

    console.log('📝 Creating conversations table...');
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    console.log('📝 Creating indexes for conversations...');
    await sql`CREATE INDEX IF NOT EXISTS conversations_user_id_idx ON conversations(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS conversations_created_at_idx ON conversations(created_at)`;

    console.log('📝 Creating messages table...');
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        model_responses JSONB,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    console.log('📝 Creating indexes for messages...');
    await sql`CREATE INDEX IF NOT EXISTS messages_conversation_id_idx ON messages(conversation_id)`;
    await sql`CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at)`;
    
    console.log('✅ Tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Creation failed:', error);
    process.exit(1);
  }
}

createTables();
