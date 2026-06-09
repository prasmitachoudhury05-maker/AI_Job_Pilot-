import axios from 'axios';
import {
  RankingRequest,
  RankingResponse,
  BatchRankingResponse,
  RankingFilterRequest,
  RankingComparisonRequest,
  RankingComparisonResponse,
} from '../types/ranking';

const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');

class RankingService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // Add auth token if available (client side only)
    this.api.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
  }

  async rankJob(request: RankingRequest): Promise<RankingResponse> {
    const response = await this.api.post('/api/v1/ranking/rank', request);
    return response.data;
  }

  async rankJobsBatch(request: RankingRequest): Promise<BatchRankingResponse> {
    const response = await this.api.post('/api/v1/ranking/rank-batch', request);
    return response.data;
  }

  async filterRankings(request: RankingFilterRequest): Promise<RankingResponse[]> {
    const response = await this.api.post('/api/v1/ranking/filter', request);
    return response.data;
  }

  async compareRankings(request: RankingComparisonRequest): Promise<RankingComparisonResponse> {
    const response = await this.api.post('/api/v1/ranking/compare', request);
    return response.data;
  }

  async exportRankings(format: 'csv' | 'json' = 'csv'): Promise<any> {
    const response = await this.api.get(`/api/v1/ranking/export?format=${format}`);
    return response.data;
  }
}

export default new RankingService();
