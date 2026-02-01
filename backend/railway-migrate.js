#!/usr/bin/env node

/**
 * Railway Database Migration Helper
 * Run this after deploying to Railway to initialize database tables
 */

import { createTables } from './src/database/schema.js';
import pool from './src/config/database.js';

const runMigration = async () => {
  try {
    console.log('🚀 Starting Railway database migration...');
    console.log('📊 Creating database tables...');
    
    await createTables();
    
    console.log('✅ Migration completed successfully!');
    console.log('👤 You can now register users in your app');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('💡 Troubleshooting:');
    console.error('  1. Check DATABASE_URL is set correctly in Railway');
    console.error('  2. Ensure PostgreSQL service is running');
    console.error('  3. Verify database connection from Railway logs');
    
    await pool.end();
    process.exit(1);
  }
};

runMigration();
