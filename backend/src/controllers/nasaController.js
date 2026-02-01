import pool from '../config/database.js';
import { getEarthImagery, getVegetationIndex } from '../services/nasaService.js';

// Get NASA imagery for a region
export const getRegionImagery = async (req, res) => {
  try {
    const { countryCode, regionName } = req.params;
    const { date } = req.query;
    
    const regionResult = await pool.query(`
      SELECT r.id, r.latitude, r.longitude, r.name, c.name as country_name
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
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    // Check cache
    const cacheResult = await pool.query(`
      SELECT * FROM nasa_data_cache
      WHERE region_id = $1 AND date = $2
    `, [region.id, targetDate]);
    
    if (cacheResult.rows.length > 0) {
      return res.json({
        success: true,
        data: cacheResult.rows[0],
        cached: true
      });
    }
    
    // Fetch fresh data
    const imagery = await getEarthImagery(region.latitude, region.longitude, targetDate);
    
    if (!imagery) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch NASA imagery'
      });
    }
    
    // Cache the data
    await pool.query(`
      INSERT INTO nasa_data_cache (region_id, date, imagery_url, cloud_coverage, data_quality, metadata)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (region_id, date) DO UPDATE SET
        imagery_url = $3,
        cloud_coverage = $4,
        data_quality = $5,
        metadata = $6
    `, [region.id, targetDate, imagery.url, imagery.cloudScore, 'good', JSON.stringify(imagery)]);
    
    res.json({
      success: true,
      data: {
        region: region.name,
        country: region.country_name,
        ...imagery
      },
      cached: false
    });
  } catch (error) {
    console.error('Get NASA imagery error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch NASA imagery'
    });
  }
};

// Get vegetation index (NDVI)
export const getRegionVegetationIndex = async (req, res) => {
  try {
    const { countryCode, regionName } = req.params;
    const { startDate, endDate } = req.query;
    
    const regionResult = await pool.query(`
      SELECT r.id, r.latitude, r.longitude, r.name, c.name as country_name
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
    const end = endDate || new Date().toISOString().split('T')[0];
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const ndviData = await getVegetationIndex(region.latitude, region.longitude, start, end);
    
    if (!ndviData) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch vegetation index'
      });
    }
    
    // Update cache with NDVI
    await pool.query(`
      UPDATE nasa_data_cache
      SET ndvi = $1
      WHERE region_id = $2 AND date = $3
    `, [ndviData.ndvi, region.id, end]);
    
    res.json({
      success: true,
      data: {
        region: region.name,
        country: region.country_name,
        ...ndviData
      }
    });
  } catch (error) {
    console.error('Get vegetation index error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vegetation index'
    });
  }
};
