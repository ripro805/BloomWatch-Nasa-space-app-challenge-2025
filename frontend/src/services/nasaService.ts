import api from '../lib/api';

export interface NASAImageryData {
  date: string;
  image_url: string;
  cloud_coverage?: number;
  resolution: string;
  satellite: string;
}

export interface VegetationIndexData {
  date: string;
  ndvi: number;
  evi?: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  health_status: 'healthy' | 'moderate' | 'poor';
}

export const nasaService = {
  // Get satellite imagery
  getImagery: async (
    countryCode: string,
    regionName: string,
    params?: { date?: string; days?: number }
  ): Promise<NASAImageryData[]> => {
    const response = await api.get(`/nasa/${countryCode}/${regionName}/imagery`, { params });
    return response.data.data;
  },

  // Get vegetation index
  getVegetationIndex: async (
    countryCode: string,
    regionName: string,
    params?: { startDate?: string; endDate?: string }
  ): Promise<VegetationIndexData[]> => {
    const response = await api.get(`/nasa/${countryCode}/${regionName}/vegetation-index`, { params });
    return response.data.data;
  },
};
