export interface ExecutiveDecisionInput {
  organizationName: string;
  industry: string;
  systemName: string;
  trustScore: number;
  riskLevel: string;
  complianceScore: number;
  governanceMaturity: string;
  categoryScores: Record<string, number>;
}

export interface DecisionAction {
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  businessImpact: string;
  estimatedTrustImprovement: number;
  estimatedTimeline: string;
}

export interface ExecutiveDecisionOutput {
  decision: string;
  color: 'Green' | 'Blue' | 'Amber' | 'Orange' | 'Red';
  reason: string;
  executiveJustification: string;
  topRisks: string[];
  recommendedActions: DecisionAction[];
  expectedOutcome: {
    currentScore: number;
    expectedScore: number;
    improvement: number;
  };
  confidenceScore: number;
}
