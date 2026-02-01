import pool from '../config/database.js';

export const createTables = async () => {
  try {
    console.log('🔧 Creating database tables...');

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        country VARCHAR(100),
        organization VARCHAR(200),
        role VARCHAR(20) DEFAULT 'contributor' CHECK (role IN ('admin', 'moderator', 'contributor', 'viewer')),
        avatar_url VARCHAR(500),
        bio TEXT,
        is_active BOOLEAN DEFAULT true,
        last_login_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Countries table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS countries (
        id SERIAL PRIMARY KEY,
        code VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        flag VARCHAR(10),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Regions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS regions (
        id SERIAL PRIMARY KEY,
        country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(country_id, name)
      );
    `);

    // Observations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS observations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
        crop_name VARCHAR(200) NOT NULL,
        crop_scientific_name VARCHAR(200),
        pollinator_count INTEGER NOT NULL,
        pollinator_types JSONB,
        zone VARCHAR(20) CHECK (zone IN ('healthy', 'at-risk', 'critical')),
        weather_condition VARCHAR(50),
        temperature DECIMAL(5, 2),
        humidity INTEGER,
        observation_date DATE NOT NULL,
        observer_name VARCHAR(100),
        observer_email VARCHAR(100),
        notes TEXT,
        image_url VARCHAR(500),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        is_verified BOOLEAN DEFAULT false,
        verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
        verified_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Pollinator statistics table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pollinator_stats (
        id SERIAL PRIMARY KEY,
        region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        total_count INTEGER,
        bee_count INTEGER,
        butterfly_count INTEGER,
        moth_count INTEGER,
        beetle_count INTEGER,
        fly_count INTEGER,
        wasp_count INTEGER,
        other_count INTEGER,
        diversity_index DECIMAL(5, 2),
        health_score INTEGER CHECK (health_score BETWEEN 0 AND 100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(region_id, date)
      );
    `);

    // Weather data cache table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS weather_cache (
        id SERIAL PRIMARY KEY,
        region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        temperature DECIMAL(5, 2),
        humidity INTEGER,
        precipitation DECIMAL(6, 2),
        wind_speed DECIMAL(5, 2),
        condition VARCHAR(50),
        forecast_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(region_id, date)
      );
    `);

    // NASA satellite data cache
    await pool.query(`
      CREATE TABLE IF NOT EXISTS nasa_data_cache (
        id SERIAL PRIMARY KEY,
        region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        ndvi DECIMAL(5, 4),
        imagery_url VARCHAR(500),
        cloud_coverage INTEGER,
        data_quality VARCHAR(20),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(region_id, date)
      );
    `);

    // User activity/contributions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_contributions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        contribution_type VARCHAR(50) NOT NULL,
        contribution_count INTEGER DEFAULT 1,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, contribution_type, date)
      );
    `);

    // Create indexes for better query performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_observations_user ON observations(user_id);
      CREATE INDEX IF NOT EXISTS idx_observations_region ON observations(region_id);
      CREATE INDEX IF NOT EXISTS idx_observations_date ON observations(observation_date);
      CREATE INDEX IF NOT EXISTS idx_pollinator_stats_region ON pollinator_stats(region_id);
      CREATE INDEX IF NOT EXISTS idx_weather_cache_region ON weather_cache(region_id);
      CREATE INDEX IF NOT EXISTS idx_nasa_cache_region ON nasa_data_cache(region_id);
      CREATE INDEX IF NOT EXISTS idx_user_contributions ON user_contributions(user_id, date);
    `);

    console.log('✅ All tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  }
};

export const dropTables = async () => {
  try {
    console.log('🗑️  Dropping all tables...');
    
    await pool.query(`
      DROP TABLE IF EXISTS user_contributions CASCADE;
      DROP TABLE IF EXISTS nasa_data_cache CASCADE;
      DROP TABLE IF EXISTS weather_cache CASCADE;
      DROP TABLE IF EXISTS pollinator_stats CASCADE;
      DROP TABLE IF EXISTS observations CASCADE;
      DROP TABLE IF EXISTS regions CASCADE;
      DROP TABLE IF EXISTS countries CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    
    console.log('✅ All tables dropped successfully!');
  } catch (error) {
    console.error('❌ Error dropping tables:', error);
    throw error;
  }
};
