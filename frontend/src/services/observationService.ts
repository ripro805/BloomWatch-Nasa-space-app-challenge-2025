import api from '../lib/api';

export interface Observation {
  id: number;
  user_id?: number;
  region_id: number;
  region_name: string;
  country_name: string;
  flag: string;
  crop_name: string;
  crop_scientific_name?: string;
  pollinator_count: number;
  pollinator_types: Record<string, number>;
  zone: 'healthy' | 'at-risk' | 'critical';
  weather_condition?: string;
  temperature?: number;
  humidity?: number;
  observation_date: string;
  observer_name?: string;
  observer_email?: string;
  notes?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ObservationStats {
  total_observations: number;
  avg_pollinator_count: number;
  healthy_count: number;
  at_risk_count: number;
  critical_count: number;
  latest_observation: string;
}

export interface CreateObservationData {
  countryCode: string;
  regionName: string;
  cropName: string;
  cropScientificName?: string;
  pollinatorCount: number;
  pollinatorTypes: Record<string, number>;
  zone: 'healthy' | 'at-risk' | 'critical';
  weatherCondition?: string;
  temperature?: number;
  humidity?: number;
  observationDate: string;
  observerName?: string;
  observerEmail?: string;
  notes?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
}

export const observationService = {
  // Get all observations
  getAll: async (params?: {
    limit?: number;
    offset?: number;
    country?: string;
    region?: string;
    zone?: string;
  }): Promise<Observation[]> => {
    const response = await api.get('/observations', { params });
    return response.data.data;
  },

  // Get observation by ID
  getById: async (id: number): Promise<Observation> => {
    const response = await api.get(`/observations/${id}`);
    return response.data.data;
  },

  // Create new observation
  create: async (data: CreateObservationData): Promise<Observation> => {
    const response = await api.post('/observations', data);
    return response.data.data;
  },

  // Get observation statistics
  getStats: async (params?: {
    countryCode?: string;
    regionName?: string;
  }): Promise<ObservationStats> => {
    const response = await api.get('/observations/stats', { params });
    return response.data.data;
  },
};
