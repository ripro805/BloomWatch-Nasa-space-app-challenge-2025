import api from '../lib/api';

export interface Country {
  id: number;
  code: string;
  name: string;
  flag: string;
  latitude: number;
  longitude: number;
}

export interface Region {
  id: number;
  country_id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export const locationService = {
  // Get all countries
  getCountries: async (): Promise<Country[]> => {
    const response = await api.get('/countries');
    return response.data.data;
  },

  // Get regions by country code
  getRegions: async (countryCode: string): Promise<Region[]> => {
    const response = await api.get(`/countries/${countryCode}/regions`);
    return response.data.data;
  },
};
