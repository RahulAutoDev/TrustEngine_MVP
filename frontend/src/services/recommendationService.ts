import api from './api';

export interface RecommendationRequest {
  assessmentId: string;
  trustScores: Record<string, number>;
  riskLevel: string;
}

export interface RecommendationDto {
  title: string;
  priority: string; // HIGH, MEDIUM, LOW
  businessImpact: string;
}

export interface RecommendationResponse {
  strengths: string[];
  weaknesses: string[];
  recommendations: RecommendationDto[];
}

export const recommendationService = {
  getRecommendations: async (data: RecommendationRequest): Promise<RecommendationResponse> => {
    const response = await api.post('/recommendations', data);
    return response.data;
  }
};
