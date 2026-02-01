import api from '../lib/api';

export interface PollinatorData {
  date: string;
  total_count: number;
  bee_count: number;
  butterfly_count: number;
  moth_count: number;
  beetle_count: number;
  fly_count: number;
  wasp_count: number;
  other_count: number;
  diversity_index: number;
  health_score: number;
}

export interface PollinatorHealthSummary {
  region_name: string;
  country_name: string;
  overall_health: number;
  trend: 'improving' | 'stable' | 'declining';
  critical_areas: number;
  at_risk_areas: number;
  healthy_areas: number;
  total_observations: number;
}

export const pollinatorService = {
  // Get pollinator data for region
  getByRegion: async (countryCode: string, regionName: string): Promise<PollinatorData[]> => {
    const response = await api.get(`/pollinators/${countryCode}/${regionName}`);
    return response.data.data;
  },

  // Get health summary
  getHealthSummary: async (): Promise<PollinatorHealthSummary[]> => {
    const response = await api.get('/pollinators/health-summary');
    return response.data.data;
  },
};
