import pool from '../config/database.js';

// Get all observations
export const getAllObservations = async (req, res) => {
  try {
    const { limit = 50, offset = 0, country, region, zone } = req.query;
    
    let query = `
      SELECT o.*, r.name as region_name, c.name as country_name, c.flag
      FROM observations o
      JOIN regions r ON o.region_id = r.id
      JOIN countries c ON r.country_id = c.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramIndex = 1;
    
    if (country) {
      query += ` AND c.code = $${paramIndex}`;
      params.push(country.toLowerCase());
      paramIndex++;
    }
    
    if (region) {
      query += ` AND LOWER(r.name) = $${paramIndex}`;
      params.push(region.toLowerCase());
      paramIndex++;
    }
    
    if (zone) {
      query += ` AND o.zone = $${paramIndex}`;
      params.push(zone);
      paramIndex++;
    }
    
    query += ` ORDER BY o.observation_date DESC, o.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get observations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch observations'
    });
  }
};

// Get observation by ID
export const getObservationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT o.*, r.name as region_name, c.name as country_name, c.flag
      FROM observations o
      JOIN regions r ON o.region_id = r.id
      JOIN countries c ON r.country_id = c.id
      WHERE o.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Observation not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get observation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch observation'
    });
  }
};

// Create new observation
export const createObservation = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const {
      countryCode,
      regionName,
      cropName,
      cropScientificName,
      pollinatorCount,
      pollinatorTypes,
      zone,
      weatherCondition,
      temperature,
      humidity,
      observationDate,
      observerName,
      observerEmail,
      notes,
      imageUrl,
      latitude,
      longitude
    } = req.body;
    
    // Validation
    if (!countryCode || !regionName || !cropName || !pollinatorCount || !observationDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Get region ID
    const regionResult = await pool.query(`
      SELECT r.id
      FROM regions r
      JOIN countries c ON r.country_id = c.id
      WHERE c.code = $1 AND LOWER(r.name) = LOWER($2)
    `, [countryCode.toLowerCase(), regionName]);
    
    if (regionResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Region not found'
      });
    }
    
    const regionId = regionResult.rows[0].id;
    
    const result = await pool.query(`
      INSERT INTO observations (
        user_id, region_id, crop_name, crop_scientific_name, pollinator_count,
        pollinator_types, zone, weather_condition, temperature, humidity,
        observation_date, observer_name, observer_email, notes, image_url,
        latitude, longitude
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *
    `, [
      userId, regionId, cropName, cropScientificName, pollinatorCount,
      JSON.stringify(pollinatorTypes), zone, weatherCondition, temperature,
      humidity, observationDate, observerName, observerEmail, notes,
      imageUrl, latitude, longitude
    ]);
    
    // Track user contribution
    if (userId) {
      await pool.query(`
        INSERT INTO user_contributions (user_id, contribution_type, date)
        VALUES ($1, 'observation', CURRENT_DATE)
        ON CONFLICT (user_id, contribution_type, date)
        DO UPDATE SET contribution_count = user_contributions.contribution_count + 1
      `, [userId]);
    }
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Observation created successfully'
    });
  } catch (error) {
    console.error('Create observation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create observation'
    });
  }
};

// Get observations statistics
export const getObservationsStats = async (req, res) => {
  try {
    const { countryCode, regionName } = req.query;
    
    let query = `
      SELECT 
        COUNT(*) as total_observations,
        AVG(pollinator_count) as avg_pollinator_count,
        COUNT(CASE WHEN zone = 'healthy' THEN 1 END) as healthy_count,
        COUNT(CASE WHEN zone = 'at-risk' THEN 1 END) as at_risk_count,
        COUNT(CASE WHEN zone = 'critical' THEN 1 END) as critical_count,
        MAX(observation_date) as latest_observation
      FROM observations o
      JOIN regions r ON o.region_id = r.id
      JOIN countries c ON r.country_id = c.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramIndex = 1;
    
    if (countryCode) {
      query += ` AND c.code = $${paramIndex}`;
      params.push(countryCode.toLowerCase());
      paramIndex++;
    }
    
    if (regionName) {
      query += ` AND LOWER(r.name) = $${paramIndex}`;
      params.push(regionName.toLowerCase());
      paramIndex++;
    }
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};
