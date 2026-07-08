import api from './api';

export interface TrustCalculationResponse {
  overallTrustScore: number;
  trustLevel: string;
  riskLevel: string;
  categoryScores: Record<string, number>;
  executiveSummary: string;
}

export const trustService = {
  calculateTrustScore: async (
    assessmentId: string, 
    fallbackScores?: { overall: number; categories: Record<string, number>; riskLevel: string; executiveSummary: string }
  ): Promise<TrustCalculationResponse> => {
    try {
      const response = await api.post('/trust/calculate', { assessmentId });
      return response.data;
    } catch (error) {
      console.warn("Backend not reachable, returning fallback trust results (Demo Mode)");
      
      if (fallbackScores) {
        return {
          overallTrustScore: fallbackScores.overall,
          trustLevel: fallbackScores.overall >= 80 ? "AI Trust Leader" : fallbackScores.overall >= 60 ? "Governed AI" : "At Risk",
          riskLevel: fallbackScores.riskLevel,
          categoryScores: fallbackScores.categories,
          executiveSummary: fallbackScores.executiveSummary
        };
      }

      // Default mock data if no fallback provided
      return {
        overallTrustScore: 82,
        trustLevel: "Good",
        riskLevel: "Medium",
        categoryScores: {
          Transparency: 85,
          Fairness: 72,
          Privacy: 95,
          Security: 68,
          Accountability: 88
        },
        executiveSummary: "This assessment indicates that the organization has established a strong AI governance foundation. Governance maturity is high across Privacy and Transparency, while Security controls require further enhancement."
      };
    }
  }
};
