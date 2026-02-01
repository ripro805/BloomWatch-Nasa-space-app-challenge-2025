import pool from '../config/database.js';
import { getCurrentWeather, getWeatherForecast, getAirQuality } from '../services/weatherService.js';

// Get weather for a region
export const getRegionWeather = async (req, res) => {
  try {
    const { countryCode, regionName } = req.params;
    
    // Get region details
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
    
    // Check cache first
    const cacheResult = await pool.query(`
      SELECT * FROM weather_cache
      WHERE region_id = $1 AND date = CURRENT_DATE
    `, [region.id]);
    
    if (cacheResult.rows.length > 0) {
      return res.json({
        success: true,
        data: cacheResult.rows[0],
        cached: true
      });
    }
    
    // Fetch fresh data
    const weather = await getCurrentWeather(region.latitude, region.longitude);
    
    if (!weather) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch weather data'
      });
    }
    
    // Cache the data
    await pool.query(`
      INSERT INTO weather_cache (region_id, date, temperature, humidity, precipitation, wind_speed, condition, forecast_data)
      VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (region_id, date) DO UPDATE SET
        temperature = $2,
        humidity = $3,
        wind_speed = $5,
        condition = $6,
        forecast_data = $7
    `, [region.id, weather.temperature, weather.humidity, 0, weather.windSpeed, weather.condition, JSON.stringify(weather)]);
    
    res.json({
      success: true,
      data: {
        region: region.name,
        country: region.country_name,
        ...weather
      },
      cached: false
    });
  } catch (error) {
    console.error('Get weather error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data'
    });
  }
};

// Get weather forecast
export const getRegionForecast = async (req, res) => {
  try {
    const { countryCode, regionName } = req.params;
    
    const regionResult = await pool.query(`
      SELECT r.latitude, r.longitude, r.name, c.name as country_name
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
    const forecast = await getWeatherForecast(region.latitude, region.longitude);
    
    if (!forecast) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch forecast data'
      });
    }
    
    res.json({
      success: true,
      data: {
        region: region.name,
        country: region.country_name,
        ...forecast
      }
    });
  } catch (error) {
    console.error('Get forecast error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch forecast data'
    });
  }
};

// Get air quality
export const getRegionAirQuality = async (req, res) => {
  try {
    const { countryCode, regionName } = req.params;
    
    const regionResult = await pool.query(`
      SELECT r.latitude, r.longitude, r.name, c.name as country_name
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
    const airQuality = await getAirQuality(region.latitude, region.longitude);
    
    if (!airQuality) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch air quality data'
      });
    }
    
    res.json({
      success: true,
      data: {
        region: region.name,
        country: region.country_name,
        ...airQuality
      }
    });
  } catch (error) {
    console.error('Get air quality error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch air quality data'
    });
  }
};
