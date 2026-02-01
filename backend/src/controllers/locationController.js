import pool from '../config/database.js';

// Get all countries
export const getAllCountries = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, code, name, flag, latitude, longitude FROM countries ORDER BY name'
    );
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch countries'
    });
  }
};

// Get country by code
export const getCountryByCode = async (req, res) => {
  try {
    const { code } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM countries WHERE code = $1',
      [code.toLowerCase()]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get country error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch country'
    });
  }
};

// Get regions for a country
export const getRegionsByCountry = async (req, res) => {
  try {
    const { code } = req.params;
    
    const result = await pool.query(`
      SELECT r.id, r.name, r.latitude, r.longitude, r.created_at
      FROM regions r
      JOIN countries c ON r.country_id = c.id
      WHERE c.code = $1
      ORDER BY r.name
    `, [code.toLowerCase()]);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get regions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch regions'
    });
  }
};

// Add new country
export const addCountry = async (req, res) => {
  try {
    const { code, name, flag, latitude, longitude } = req.body;
    
    const result = await pool.query(`
      INSERT INTO countries (code, name, flag, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [code.toLowerCase(), name, flag, latitude, longitude]);
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Add country error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add country'
    });
  }
};

// Add new region
export const addRegion = async (req, res) => {
  try {
    const { countryCode, name, latitude, longitude } = req.body;
    
    // Get country ID
    const countryResult = await pool.query(
      'SELECT id FROM countries WHERE code = $1',
      [countryCode.toLowerCase()]
    );
    
    if (countryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }
    
    const countryId = countryResult.rows[0].id;
    
    const result = await pool.query(`
      INSERT INTO regions (country_id, name, latitude, longitude)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [countryId, name, latitude, longitude]);
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Add region error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add region'
    });
  }
};
