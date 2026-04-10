import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const SOURCE_DB_URL = process.env.OLD_DATABASE_URL;
const TARGET_DB_URL = process.env.DATABASE_URL;

const tableOrder = [
  'users',
  'countries',
  'regions',
  'observations',
  'pollinator_stats',
  'weather_cache',
  'nasa_data_cache',
  'user_contributions'
];

const quotedColumns = (columns) => columns.map((column) => `"${column}"`).join(', ');

const buildInsertQuery = (table, columns, rows) => {
  const colList = quotedColumns(columns);
  const values = [];
  const placeholders = [];
  let paramIndex = 1;

  for (const row of rows) {
    const rowPlaceholders = [];
    for (const column of columns) {
      values.push(row[column]);
      rowPlaceholders.push(`$${paramIndex++}`);
    }
    placeholders.push(`(${rowPlaceholders.join(', ')})`);
  }

  return {
    text: `INSERT INTO ${table} (${colList}) VALUES ${placeholders.join(', ')}`,
    values
  };
};

const getTableColumns = async (pool, table) => {
  const query = `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = $1
    ORDER BY ordinal_position
  `;

  const result = await pool.query(query, [table]);
  return result.rows.map((row) => row.column_name);
};

const resetSequenceIfNeeded = async (pool, table, idColumn = 'id') => {
  const sql = `
    SELECT setval(
      pg_get_serial_sequence($1, $2),
      COALESCE((SELECT MAX(${idColumn}) FROM ${table}), 1),
      (SELECT MAX(${idColumn}) IS NOT NULL FROM ${table})
    )
  `;

  try {
    await pool.query(sql, [table, idColumn]);
  } catch {
    // Ignore tables without serial sequence
  }
};

const transferTable = async (sourcePool, targetPool, table) => {
  const columns = await getTableColumns(sourcePool, table);
  if (columns.length === 0) {
    console.log(`⚠️ Skipping ${table}: no columns found.`);
    return;
  }

  const sourceResult = await sourcePool.query(`SELECT * FROM ${table}`);
  const rows = sourceResult.rows;

  if (rows.length === 0) {
    console.log(`ℹ️ ${table}: no rows to copy.`);
    return;
  }

  await targetPool.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);

  const batchSize = 250;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const insertQuery = buildInsertQuery(table, columns, batch);
    await targetPool.query(insertQuery.text, insertQuery.values);
  }

  if (columns.includes('id')) {
    await resetSequenceIfNeeded(targetPool, table, 'id');
  }

  console.log(`✅ ${table}: copied ${rows.length} rows.`);
};

const transferAllData = async () => {
  if (!SOURCE_DB_URL) {
    console.error('❌ OLD_DATABASE_URL is missing in .env');
    process.exit(1);
  }

  if (!TARGET_DB_URL) {
    console.error('❌ DATABASE_URL is missing in .env');
    process.exit(1);
  }

  const sourcePool = new Pool({
    connectionString: SOURCE_DB_URL,
    ssl: SOURCE_DB_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false
  });

  const targetPool = new Pool({
    connectionString: TARGET_DB_URL,
    ssl: TARGET_DB_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('🚀 Starting data transfer from OLD_DATABASE_URL to DATABASE_URL...');

    // Ensure target schema exists first
    const { createTables } = await import('./schema.js');
    await createTables();

    for (const table of tableOrder) {
      await transferTable(sourcePool, targetPool, table);
    }

    console.log('🎉 Data transfer completed successfully!');
  } catch (error) {
    console.error('❌ Data transfer failed:', error.message);
    process.exitCode = 1;
  } finally {
    await sourcePool.end();
    await targetPool.end();
  }
};

transferAllData();
