export interface ROIRecommendation {
  id: string;
  title: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  businessValue: string;
  estimatedTrustGain: number;
  effort: 'High' | 'Medium' | 'Low';
  timeline: string;
  businessImpact: 'High' | 'Medium' | 'Low';
  owner: string;
  status: 'Recommended' | 'In Progress' | 'Completed';
  riskReduction: number;
  complexity: number;
  whyItMatters: string;
}

export interface RoadmapPhase {
  phase: string;
  actions: string[];
  expectedScore: number;
  outcomes: string;
}

export interface ROIExecutiveData {
  currentScore: number;
  projectedScore: number;
  improvement: number;
  timelineDays: number;
  confidence: number;
  recommendations: ROIRecommendation[];
  roadmap: RoadmapPhase[];
  executiveDecisionSupport: string;
}

export const roiService = {
  getROIData: async (trustScore: number): Promise<ROIExecutiveData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const improvement = Math.min(100 - trustScore, 12);
        const projectedScore = trustScore + improvement;

        resolve({
          currentScore: trustScore,
          projectedScore,
          improvement,
          timelineDays: 90,
          confidence: 96,
          executiveDecisionSupport: `The highest return on investment will be achieved by implementing Role-Based Access Control and centralized audit logging. These initiatives are expected to improve the Trust Score by ${improvement} points while significantly reducing governance and regulatory risk.`,
          recommendations: [
            {
              id: 'ROI-001',
              title: 'Implement RBAC',
              category: 'Security',
              priority: 'HIGH',
              businessValue: 'Reduce unauthorized access',
              estimatedTrustGain: 8,
              effort: 'Medium',
              timeline: '2 Weeks',
              businessImpact: 'High',
              owner: 'Security Team',
              status: 'Recommended',
              riskReduction: 45,
              complexity: 6,
              whyItMatters: 'Fundamental for internal security and mitigating insider threats.'
            },
            {
              id: 'ROI-002',
              title: 'Enable Audit Logging',
              category: 'Accountability',
              priority: 'HIGH',
              businessValue: 'Provides comprehensive system observability',
              estimatedTrustGain: 5,
              effort: 'Low',
              timeline: '1 Week',
              businessImpact: 'High',
              owner: 'Ops Team',
              status: 'Recommended',
              riskReduction: 30,
              complexity: 3,
              whyItMatters: 'Critical for compliance audits and incident investigations.'
            },
            {
              id: 'ROI-003',
              title: 'Bias Monitoring',
              category: 'Fairness',
              priority: 'MEDIUM',
              businessValue: 'Prevents discriminatory model outputs',
              estimatedTrustGain: 3,
              effort: 'High',
              timeline: '3 Weeks',
              businessImpact: 'High',
              owner: 'MLOps Team',
              status: 'Recommended',
              riskReduction: 25,
              complexity: 8,
              whyItMatters: 'Mitigates massive brand risk and prepares for EU AI Act.'
            },
            {
              id: 'ROI-004',
              title: 'Data Privacy Scrubbing',
              category: 'Privacy',
              priority: 'MEDIUM',
              businessValue: 'Prevents PII leakage in training',
              estimatedTrustGain: 4,
              effort: 'Medium',
              timeline: '4 Weeks',
              businessImpact: 'Medium',
              owner: 'Data Eng',
              status: 'Recommended',
              riskReduction: 35,
              complexity: 5,
              whyItMatters: 'Ensures CCPA/GDPR compliance automatically.'
            }
          ],
          roadmap: [
            {
              phase: 'Immediate (0–30 Days)',
              actions: ['Implement RBAC', 'Enable Audit Logging'],
              expectedScore: trustScore + 6,
              outcomes: 'Establishes foundational security and accountability controls.'
            },
            {
              phase: 'Short Term (30–60 Days)',
              actions: ['Bias Monitoring Integration', 'Initial PII Scrubbing'],
              expectedScore: trustScore + 9,
              outcomes: 'Addresses core fairness and privacy vulnerabilities.'
            },
            {
              phase: 'Medium Term (60–90 Days)',
              actions: ['Automate Governance Reporting', 'Conduct Third-Party Audit'],
              expectedScore: projectedScore,
              outcomes: 'Prepares the organization for external certification and enterprise deployment.'
            },
            {
              phase: 'Long Term (90+ Days)',
              actions: ['Continuous Red Teaming', 'Advanced Threat Defense'],
              expectedScore: Math.min(projectedScore + 2, 100),
              outcomes: 'Achieves AI Trust Leader status within the industry.'
            }
          ]
        });
      }, 500);
    });
  }
};
