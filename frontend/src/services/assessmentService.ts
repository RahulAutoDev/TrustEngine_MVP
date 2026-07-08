import api from './api';

export interface CreateAssessmentRequest {
  organizationName: string;
  industry: string;
  country: string;
  systemName: string;
  assessmentOwner: string;
  scope: string;
}

export interface CreateAssessmentResponse {
  assessmentId: string;
}

export interface SubmitAnswerRequest {
  questionId: number;
  answer: string; // 'Yes', 'Partial', 'No'
}

export const assessmentService = {
  createAssessment: async (data: CreateAssessmentRequest): Promise<CreateAssessmentResponse> => {
    const response = await api.post('/assessment', data);
    return response.data;
  },
  
  submitAnswer: async (assessmentId: string, data: SubmitAnswerRequest): Promise<void> => {
    try {
      await api.post(`/assessment/${assessmentId}/answers`, data);
    } catch (error) {
      console.warn("Backend not reachable, mocked answer submission (Demo Mode)");
      // Ignore error for Hackathon Demo Mode
    }
  }
};
