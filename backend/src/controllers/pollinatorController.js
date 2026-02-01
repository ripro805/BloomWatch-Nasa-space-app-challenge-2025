import pool from '../config/database.js';
import { getAggregatedPollinatorData } from '../services/thirdPartyPollinatorService.js';

// Get pollinator statistics for a region
export const getPollinatorStats = async (req, res) => {
  try {
    const { countryCode, regionName } = req.params;
    const { startDate, endDate } = req.query;
    
    const regionResult = await pool.query(`
      SELECT r.id, r.name, c.name as country_name
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
    
    let query = `
      SELECT *
      FROM pollinator_stats
      WHERE region_id = $1
    `;
    
    const params = [regionId];
    let paramIndex = 2;
    
    if (startDate) {
      query += ` AND date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }
    
    if (endDate) {
      query += ` AND date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }
    
    query += ' ORDER BY date DESC';
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get pollinator stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pollinator statistics'
    });
  }
};

// Add pollinator statistics
export const addPollinatorStats = async (req, res) => {
  try {
    const {
      countryCode,
      regionName,
      date,
      totalCount,
      beeCount,
      butterflyCount,
      mothCount,
      beetleCount,
      flyCount,
      waspCount,
      otherCount,
      diversityIndex,
      healthScore
    } = req.body;
    
    // Validation
    if (!countryCode || !regionName || !date) {
      return res.status(400).json({
        success: false,
        message: 'Country code, region name, and date are required'
      });
    }
    
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
      INSERT INTO pollinator_stats (
        region_id, date, total_count, bee_count, butterfly_count,
        moth_count, beetle_count, fly_count, wasp_count, other_count,
        diversity_index, health_score
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (region_id, date) DO UPDATE SET
        total_count = $3,
        bee_count = $4,
        butterfly_count = $5,
        moth_count = $6,
        beetle_count = $7,
        fly_count = $8,
        wasp_count = $9,
        other_count = $10,
        diversity_index = $11,
        health_score = $12
      RETURNING *
    `, [
      regionId, date, totalCount, beeCount, butterflyCount, mothCount,
      beetleCount, flyCount, waspCount, otherCount, diversityIndex, healthScore
    ]);
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Pollinator statistics saved successfully'
    });
  } catch (error) {
    console.error('Add pollinator stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save pollinator statistics'
    });
  }
};

// Get overall pollinator health summary
export const getPollinatorHealthSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.name as country,
        c.code,
        c.flag,
        AVG(ps.health_score) as avg_health_score,
        AVG(ps.total_count) as avg_pollinator_count,
        AVG(ps.diversity_index) as avg_diversity,
        COUNT(DISTINCT r.id) as regions_monitored,
        MAX(ps.date) as latest_update
      FROM pollinator_stats ps
      JOIN regions r ON ps.region_id = r.id
      JOIN countries c ON r.country_id = c.id
      WHERE ps.date >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY c.id, c.name, c.code, c.flag
      ORDER BY avg_health_score DESC
    `);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get health summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch health summary'
    });
  }
};

// Get third-party pollinator data (iNaturalist + GBIF)
export const getThirdPartyPollinatorData = async (req, res) => {
  try {
    const { countryCode, regionName } = req.params;
    const { radius = 10 } = req.query; // km
    
    // Get region coordinates
    const regionResult = await pool.query(`
      SELECT r.id, r.name, r.latitude, r.longitude, c.name as country_name
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
    
    const region = regionResult.rows[0];
    
    // Fetch data from third-party APIs
    const thirdPartyData = await getAggregatedPollinatorData(
      region.latitude,
      region.longitude,
      parseInt(radius)
    );
    
    res.json({
      success: true,
      region: {
        name: region.name,
        country: region.country_name,
        coordinates: {
          latitude: region.latitude,
          longitude: region.longitude
        }
      },
      ...thirdPartyData
    });
  } catch (error) {
    console.error('Get third-party pollinator data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch third-party pollinator data'
    });
  }
};
