import pool from '../config/database.js';

const seedData = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Seed countries
    const countries = [
      { code: 'bd', name: 'Bangladesh', flag: '🇧🇩', lat: 23.6850, lon: 90.3563 },
      { code: 'in', name: 'India', flag: '🇮🇳', lat: 20.5937, lon: 78.9629 },
      { code: 'pk', name: 'Pakistan', flag: '🇵🇰', lat: 30.3753, lon: 69.3451 },
      { code: 'us', name: 'United States', flag: '🇺🇸', lat: 37.0902, lon: -95.7129 },
      { code: 'br', name: 'Brazil', flag: '🇧🇷', lat: -14.2350, lon: -51.9253 },
      { code: 'ke', name: 'Kenya', flag: '🇰🇪', lat: -0.0236, lon: 37.9062 },
      { code: 'cn', name: 'China', flag: '🇨🇳', lat: 35.8617, lon: 104.1954 }
    ];

    for (const country of countries) {
      await pool.query(`
        INSERT INTO countries (code, name, flag, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (code) DO NOTHING
      `, [country.code, country.name, country.flag, country.lat, country.lon]);
    }

    console.log('✅ Countries seeded');

    // Seed regions for Bangladesh
    const bdRegions = [
      { name: 'Dhaka', lat: 23.8103, lon: 90.4125 },
      { name: 'Chittagong', lat: 22.3569, lon: 91.7832 },
      { name: 'Rajshahi', lat: 24.3745, lon: 88.6042 },
      { name: 'Khulna', lat: 22.8456, lon: 89.5403 },
      { name: 'Sylhet', lat: 24.8949, lon: 91.8687 }
    ];

    const bdCountryResult = await pool.query('SELECT id FROM countries WHERE code = $1', ['bd']);
    const bdCountryId = bdCountryResult.rows[0].id;

    for (const region of bdRegions) {
      await pool.query(`
        INSERT INTO regions (country_id, name, latitude, longitude)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (country_id, name) DO NOTHING
      `, [bdCountryId, region.name, region.lat, region.lon]);
    }

    console.log('✅ Bangladesh regions seeded');

    // Seed regions for India
    const inRegions = [
      { name: 'Maharashtra', lat: 19.7515, lon: 75.7139 },
      { name: 'Karnataka', lat: 15.3173, lon: 75.7139 },
      { name: 'Tamil Nadu', lat: 11.1271, lon: 78.6569 },
      { name: 'West Bengal', lat: 22.9868, lon: 87.8550 },
      { name: 'Gujarat', lat: 22.2587, lon: 71.1924 }
    ];

    const inCountryResult = await pool.query('SELECT id FROM countries WHERE code = $1', ['in']);
    const inCountryId = inCountryResult.rows[0].id;

    for (const region of inRegions) {
      await pool.query(`
        INSERT INTO regions (country_id, name, latitude, longitude)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (country_id, name) DO NOTHING
      `, [inCountryId, region.name, region.lat, region.lon]);
    }

    console.log('✅ India regions seeded');

    // Seed sample observations
    const dhakaRegion = await pool.query(`
      SELECT r.id FROM regions r
      JOIN countries c ON r.country_id = c.id
      WHERE c.code = 'bd' AND r.name = 'Dhaka'
    `);

    if (dhakaRegion.rows.length > 0) {
      const regionId = dhakaRegion.rows[0].id;
      
      await pool.query(`
        INSERT INTO observations (
          region_id, crop_name, crop_scientific_name, pollinator_count,
          pollinator_types, zone, weather_condition, temperature, humidity,
          observation_date, observer_name, observer_email, notes
        )
        VALUES 
          ($1, 'Rice', 'Oryza sativa', 85, $2, 'healthy', 'Sunny', 28.5, 75, CURRENT_DATE - INTERVAL '1 day', 'Dr. Rahman', 'rahman@example.com', 'Good pollinator activity'),
          ($1, 'Mango', 'Mangifera indica', 45, $3, 'at-risk', 'Cloudy', 30.2, 80, CURRENT_DATE - INTERVAL '2 days', 'Fatima Ahmed', 'fatima@example.com', 'Decreased bee activity'),
          ($1, 'Jute', 'Corchorus capsularis', 92, $4, 'healthy', 'Partly Cloudy', 27.8, 70, CURRENT_DATE - INTERVAL '3 days', 'Karim Hassan', 'karim@example.com', 'Excellent pollinator diversity')
        ON CONFLICT DO NOTHING
      `, [
        regionId,
        JSON.stringify({ bees: 60, butterflies: 15, moths: 10 }),
        JSON.stringify({ bees: 30, butterflies: 10, flies: 5 }),
        JSON.stringify({ bees: 50, butterflies: 25, moths: 12, beetles: 5 })
      ]);

      console.log('✅ Sample observations seeded');

      // Seed pollinator statistics
      await pool.query(`
        INSERT INTO pollinator_stats (
          region_id, date, total_count, bee_count, butterfly_count,
          moth_count, beetle_count, fly_count, wasp_count, other_count,
          diversity_index, health_score
        )
        VALUES 
          ($1, CURRENT_DATE - INTERVAL '1 day', 150, 90, 30, 15, 8, 4, 2, 1, 0.75, 85),
          ($1, CURRENT_DATE - INTERVAL '2 days', 145, 88, 28, 14, 7, 5, 2, 1, 0.73, 83),
          ($1, CURRENT_DATE - INTERVAL '3 days', 155, 95, 32, 16, 6, 3, 2, 1, 0.76, 87)
        ON CONFLICT (region_id, date) DO NOTHING
      `, [regionId]);

      console.log('✅ Pollinator statistics seeded');
    }

    console.log('✅ Database seeding completed successfully!');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await pool.end();
    process.exit(1);
  }
};

seedData();
