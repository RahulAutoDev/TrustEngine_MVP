export interface PortfolioInvestment {
  id: string;
  title: string;
  category: string;
  currentMaturity: 'Low' | 'Medium' | 'High';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  businessValue: string;
  trustScoreGain: number;
  implementationEffort: 'Low' | 'Medium' | 'High';
  estimatedCost: string;
  timeline: string;
  riskReduction: 'Low' | 'Medium' | 'High' | 'Very High';
  executiveImpact: 'Low' | 'Medium' | 'High' | 'Very High';
  roiScore: number;
  status: 'Recommended' | 'In Progress' | 'Completed';
}

export interface PortfolioRoadmapItem {
  step: number;
  title: string;
  expectedScore: number;
}

export interface PortfolioData {
  currentScore: number;
  projectedScore: number;
  totalImprovement: number;
  overallROI: string;
  investments: PortfolioInvestment[];
  roadmap: PortfolioRoadmapItem[];
  executiveInsight: string;
  executiveSummary: {
    highestROI: string;
    fastestImprovement: string;
    biggestRiskReduction: string;
    lowestCostImprovement: string;
    largestTrustIncrease: string;
    overallScore: string;
  };
}

export const investmentService = {
  getPortfolioData: async (trustScore: number): Promise<PortfolioData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const improvement = Math.min(100 - trustScore, 24);
        const projectedScore = trustScore + improvement;

        resolve({
          currentScore: trustScore,
          projectedScore,
          totalImprovement: improvement,
          overallROI: '8.8 / 10',
          executiveInsight: `Implementing Role-Based Access Control and centralized Audit Logging represents the highest governance return on investment. Together these initiatives are expected to increase organizational trust by approximately 13 points while significantly reducing operational and regulatory risk.`,
          executiveSummary: {
            highestROI: 'Role-Based Access Control',
            fastestImprovement: 'Audit Logging',
            biggestRiskReduction: 'Bias Monitoring',
            lowestCostImprovement: 'Governance Automation',
            largestTrustIncrease: 'Model Monitoring',
            overallScore: 'A-'
          },
          roadmap: [
            { step: 1, title: 'Implement RBAC', expectedScore: trustScore + 8 },
            { step: 2, title: 'Enable Audit Logging', expectedScore: trustScore + 13 },
            { step: 3, title: 'Bias Monitoring', expectedScore: trustScore + 17 },
            { step: 4, title: 'Model Monitoring', expectedScore: trustScore + 22 },
            { step: 5, title: 'Governance Automation', expectedScore: projectedScore }
          ],
          investments: [
            {
              id: 'INV-001',
              title: 'Role-Based Access Control',
              category: 'Security',
              currentMaturity: 'Low',
              priority: 'HIGH',
              businessValue: 'Protect sensitive AI systems',
              trustScoreGain: 8,
              implementationEffort: 'Medium',
              estimatedCost: '$$',
              timeline: '2 Weeks',
              riskReduction: 'Very High',
              executiveImpact: 'Very High',
              roiScore: 9.5,
              status: 'Recommended'
            },
            {
              id: 'INV-002',
              title: 'Centralized Audit Logging',
              category: 'Accountability',
              currentMaturity: 'Low',
              priority: 'HIGH',
              businessValue: 'Ensure system traceability',
              trustScoreGain: 5,
              implementationEffort: 'Low',
              estimatedCost: '$',
              timeline: '1 Week',
              riskReduction: 'High',
              executiveImpact: 'High',
              roiScore: 9.0,
              status: 'Recommended'
            },
            {
              id: 'INV-003',
              title: 'Bias Monitoring Engine',
              category: 'Fairness',
              currentMaturity: 'Low',
              priority: 'HIGH',
              businessValue: 'Mitigate brand & compliance risk',
              trustScoreGain: 4,
              implementationEffort: 'High',
              estimatedCost: '$$$',
              timeline: '4 Weeks',
              riskReduction: 'Very High',
              executiveImpact: 'High',
              roiScore: 7.8,
              status: 'Recommended'
            },
            {
              id: 'INV-004',
              title: 'Continuous Model Monitoring',
              category: 'Reliability',
              currentMaturity: 'Medium',
              priority: 'MEDIUM',
              businessValue: 'Prevent model drift and degradation',
              trustScoreGain: 5,
              implementationEffort: 'High',
              estimatedCost: '$$$',
              timeline: '6 Weeks',
              riskReduction: 'High',
              executiveImpact: 'High',
              roiScore: 7.5,
              status: 'Recommended'
            },
            {
              id: 'INV-005',
              title: 'Governance Automation Tooling',
              category: 'Transparency',
              currentMaturity: 'Medium',
              priority: 'MEDIUM',
              businessValue: 'Reduce manual compliance overhead',
              trustScoreGain: 2,
              implementationEffort: 'Low',
              estimatedCost: '$',
              timeline: '2 Weeks',
              riskReduction: 'Medium',
              executiveImpact: 'Medium',
              roiScore: 8.5,
              status: 'Recommended'
            },
            {
              id: 'INV-006',
              title: 'Third-Party AI Audit',
              category: 'Accountability',
              currentMaturity: 'High',
              priority: 'LOW',
              businessValue: 'External validation of AI safety',
              trustScoreGain: 0,
              implementationEffort: 'High',
              estimatedCost: '$$$$',
              timeline: '8 Weeks',
              riskReduction: 'Medium',
              executiveImpact: 'High',
              roiScore: 5.5,
              status: 'Recommended'
            },
            {
              id: 'INV-007',
              title: 'Data Privacy Scrubbing Pipeline',
              category: 'Privacy',
              currentMaturity: 'Medium',
              priority: 'MEDIUM',
              businessValue: 'Prevent PII leakage in training',
              trustScoreGain: 4,
              implementationEffort: 'Medium',
              estimatedCost: '$$',
              timeline: '3 Weeks',
              riskReduction: 'High',
              executiveImpact: 'Medium',
              roiScore: 8.0,
              status: 'Recommended'
            },
            {
              id: 'INV-008',
              title: 'AI Incident Response Plan',
              category: 'Security',
              currentMaturity: 'Low',
              priority: 'HIGH',
              businessValue: 'Prepare for critical AI failures',
              trustScoreGain: 3,
              implementationEffort: 'Medium',
              estimatedCost: '$',
              timeline: '2 Weeks',
              riskReduction: 'Very High',
              executiveImpact: 'High',
              roiScore: 8.9,
              status: 'Recommended'
            }
          ]
        });
      }, 500);
    });
  }
};
