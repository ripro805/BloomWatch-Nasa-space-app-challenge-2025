import { createTables, dropTables } from './schema.js';
import pool from '../config/database.js';

const migrate = async () => {
  try {
    console.log('🚀 Starting database migration...');
    
    // Drop existing tables if --fresh flag is provided
    if (process.argv.includes('--fresh')) {
      await dropTables();
    }
    
    // Create all tables
    await createTables();
    
    console.log('✅ Migration completed successfully!');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('Error details:', error.message);
    await pool.end();
    process.exit(1);
  }
};

migrate();
