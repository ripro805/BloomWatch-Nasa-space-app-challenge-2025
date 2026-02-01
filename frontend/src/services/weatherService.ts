import api from '../lib/api';

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  description: string;
  wind_speed: number;
  precipitation?: number;
  feels_like: number;
  pressure: number;
  visibility: number;
  uv_index?: number;
  sunrise?: string;
  sunset?: string;
}

export interface ForecastData {
  date: string;
  temperature_max: number;
  temperature_min: number;
  condition: string;
  precipitation_chance: number;
  humidity: number;
  wind_speed: number;
}

export interface AirQualityData {
  aqi: number;
  category: string;
  pollutants: {
    pm25?: number;
    pm10?: number;
    o3?: number;
    no2?: number;
    so2?: number;
    co?: number;
  };
}

export const weatherService = {
  // Get current weather
  getCurrent: async (countryCode: string, regionName: string): Promise<WeatherData> => {
    const response = await api.get(`/weather/${countryCode}/${regionName}/current`);
    return response.data.data;
  },

  // Get weather forecast
  getForecast: async (countryCode: string, regionName: string): Promise<ForecastData[]> => {
    const response = await api.get(`/weather/${countryCode}/${regionName}/forecast`);
    return response.data.data;
  },

  // Get air quality
  getAirQuality: async (countryCode: string, regionName: string): Promise<AirQualityData> => {
    const response = await api.get(`/weather/${countryCode}/${regionName}/air-quality`);
    return response.data.data;
  },
};
