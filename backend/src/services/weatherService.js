import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;

/**
 * Get current weather from OpenWeatherMap
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const getCurrentWeather = async (lat, lon) => {
  try {
    if (!OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key not configured');
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      },
      timeout: 10000
    });

    const data = response.data;
    
    return {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      cloudiness: data.clouds.all,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      visibility: data.visibility,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      location: data.name,
      country: data.sys.country
    };
  } catch (error) {
    console.error('OpenWeather API Error:', error.message);
    return null;
  }
};

/**
 * Get weather forecast for next 5 days
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const getWeatherForecast = async (lat, lon) => {
  try {
    if (!OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key not configured');
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      },
      timeout: 10000
    });

    const forecasts = response.data.list.map(item => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      humidity: item.main.humidity,
      condition: item.weather[0].main,
      description: item.weather[0].description,
      windSpeed: item.wind.speed,
      precipitation: item.pop * 100 // Probability of precipitation
    }));

    return {
      location: response.data.city.name,
      country: response.data.city.country,
      forecasts: forecasts.slice(0, 40) // 5 days * 8 (3-hour intervals)
    };
  } catch (error) {
    console.error('Weather Forecast API Error:', error.message);
    return null;
  }
};

/**
 * Get air quality data
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export const getAirQuality = async (lat, lon) => {
  try {
    if (!OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key not configured');
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY
      },
      timeout: 10000
    });

    const data = response.data.list[0];
    
    return {
      aqi: data.main.aqi,
      components: {
        co: data.components.co,
        no: data.components.no,
        no2: data.components.no2,
        o3: data.components.o3,
        so2: data.components.so2,
        pm2_5: data.components.pm2_5,
        pm10: data.components.pm10,
        nh3: data.components.nh3
      },
      quality: getAQIDescription(data.main.aqi)
    };
  } catch (error) {
    console.error('Air Quality API Error:', error.message);
    return null;
  }
};

/**
 * Get historical weather data using WeatherAPI
 * @param {string} location - Location name or coordinates
 * @param {string} date - Date in YYYY-MM-DD format
 */
export const getHistoricalWeather = async (location, date) => {
  try {
    if (!WEATHERAPI_KEY) {
      throw new Error('WeatherAPI key not configured');
    }

    const response = await axios.get('https://api.weatherapi.com/v1/history.json', {
      params: {
        key: WEATHERAPI_KEY,
        q: location,
        dt: date
      },
      timeout: 10000
    });

    const data = response.data.forecast.forecastday[0].day;
    
    return {
      date: date,
      maxTemp: data.maxtemp_c,
      minTemp: data.mintemp_c,
      avgTemp: data.avgtemp_c,
      maxWind: data.maxwind_kph,
      totalPrecip: data.totalprecip_mm,
      avgHumidity: data.avghumidity,
      condition: data.condition.text,
      uvIndex: data.uv
    };
  } catch (error) {
    console.error('Historical Weather API Error:', error.message);
    return null;
  }
};

/**
 * Get AQI description
 */
const getAQIDescription = (aqi) => {
  const descriptions = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor'
  };
  return descriptions[aqi] || 'Unknown';
};

export default {
  getCurrentWeather,
  getWeatherForecast,
  getAirQuality,
  getHistoricalWeather
};
