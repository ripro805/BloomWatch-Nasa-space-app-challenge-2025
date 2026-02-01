import pg from 'pg';
const { Client } = pg;

async function createDatabase() {
  // First connect to default postgres database
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'ripro805',
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL server');

    // Check if database exists
    const checkDb = await client.query(
      "SELECT 1 FROM pg_database WHERE datname='bloomwatch'"
    );

    if (checkDb.rows.length > 0) {
      console.log('✅ Database "bloomwatch" already exists');
    } else {
      // Create database
      await client.query('CREATE DATABASE bloomwatch');
      console.log('✅ Database "bloomwatch" created successfully!');
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await client.end();
    process.exit(1);
  }
}

createDatabase();
