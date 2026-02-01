import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_BASE_URL = 'https://api.nasa.gov';

/**
 * Get Earth imagery from NASA's Earth API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} date - Date in YYYY-MM-DD format
 */
export const getEarthImagery = async (lat, lon, date) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/planetary/earth/imagery`, {
      params: {
        lat,
        lon,
        date,
        dim: 0.15,
        api_key: NASA_API_KEY
      },
      timeout: 10000
    });
    
    return {
      url: response.data.url,
      date: response.data.date,
      id: response.data.id,
      cloudScore: response.data.cloud_score
    };
  } catch (error) {
    console.error('NASA Earth Imagery API Error:', error.message);
    return null;
  }
};

/**
 * Get Earth assets (available dates for a location)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const getEarthAssets = async (lat, lon) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/planetary/earth/assets`, {
      params: {
        lat,
        lon,
        begin: '2023-01-01',
        api_key: NASA_API_KEY
      },
      timeout: 10000
    });
    
    return response.data;
  } catch (error) {
    console.error('NASA Earth Assets API Error:', error.message);
    return null;
  }
};

/**
 * Get EPIC (Earth Polychromatic Imaging Camera) images
 */
export const getEPICImages = async () => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/EPIC/api/natural`, {
      params: {
        api_key: NASA_API_KEY
      },
      timeout: 10000
    });
    
    return response.data;
  } catch (error) {
    console.error('NASA EPIC API Error:', error.message);
    return null;
  }
};

/**
 * Get MODIS vegetation index data (NDVI approximation)
 * This uses NASA's Earth data for vegetation health
 */
export const getVegetationIndex = async (lat, lon, startDate, endDate) => {
  try {
    // Note: This is a simplified version. For production, you'd use NASA's
    // MODIS or Landsat APIs through their proper endpoints
    const imagery = await getEarthImagery(lat, lon, endDate);
    
    if (imagery) {
      // Mock NDVI calculation based on cloud score
      // In production, this would be calculated from actual satellite data
      const ndvi = (100 - (imagery.cloudScore || 50)) / 100;
      
      return {
        ndvi: ndvi.toFixed(4),
        date: imagery.date,
        quality: imagery.cloudScore < 30 ? 'good' : 'moderate'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Vegetation Index Error:', error.message);
    return null;
  }
};

/**
 * Get Astronomy Picture of the Day (APOD)
 */
export const getAPOD = async (date) => {
  try {
    const response = await axios.get(`${NASA_BASE_URL}/planetary/apod`, {
      params: {
        date,
        api_key: NASA_API_KEY
      },
      timeout: 10000
    });
    
    return response.data;
  } catch (error) {
    console.error('NASA APOD API Error:', error.message);
    return null;
  }
};

export default {
  getEarthImagery,
  getEarthAssets,
  getEPICImages,
  getVegetationIndex,
  getAPOD
};
