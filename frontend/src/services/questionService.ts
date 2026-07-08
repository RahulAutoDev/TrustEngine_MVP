import api from './api';

export interface Question {
  id: number;
  text: string;
  category: string;
  weight: number;
}

const MOCK_QUESTIONS: Question[] = [
  { id: 1, category: 'Transparency', text: 'Does your AI system maintain audit logs?', weight: 1 },
  { id: 2, category: 'Transparency', text: 'Are users informed when they interact with the AI?', weight: 1 },
  { id: 3, category: 'Transparency', text: 'Is the model architecture documented?', weight: 1 },
  { id: 4, category: 'Fairness', text: 'Have you tested the model for demographic bias?', weight: 1 },
  { id: 5, category: 'Fairness', text: 'Is there a mechanism to report biased outcomes?', weight: 1 },
  { id: 6, category: 'Fairness', text: 'Are fairness metrics regularly monitored?', weight: 1 },
  { id: 7, category: 'Privacy', text: 'Is PII automatically redacted from training data?', weight: 1 },
  { id: 8, category: 'Privacy', text: 'Can users request deletion of their data?', weight: 1 },
  { id: 9, category: 'Privacy', text: 'Is data encrypted at rest and in transit?', weight: 1 },
  { id: 10, category: 'Security', text: 'Have adversarial robustness tests been performed?', weight: 1 },
  { id: 11, category: 'Security', text: 'Are access controls implemented for the model API?', weight: 1 },
  { id: 12, category: 'Security', text: 'Is model drift actively monitored?', weight: 1 },
  { id: 13, category: 'Accountability', text: 'Is there a designated AI ethics officer?', weight: 1 },
  { id: 14, category: 'Accountability', text: 'Is there a human-in-the-loop for high-risk decisions?', weight: 1 },
  { id: 15, category: 'Accountability', text: 'Are incident response plans documented?', weight: 1 }
];

export const questionService = {
  getQuestions: async (): Promise<Question[]> => {
    try {
      const response = await api.get('/questions');
      return response.data;
    } catch (error) {
      console.warn("Backend not reachable, falling back to mock questions (Demo Mode)");
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_QUESTIONS;
    }
  }
};
