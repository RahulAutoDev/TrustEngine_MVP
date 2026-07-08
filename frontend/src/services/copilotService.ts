export interface CopilotRequest {
  organizationName: string;
  industry: string;
  systemName: string;
  trustScore: number;
  riskLevel: string;
  categoryScores: Record<string, number>;
}

export interface CopilotRecommendation {
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  businessImpact: string;
  estimatedTrustImprovement: number;
  timeline: string;
  effort: 'Low' | 'Medium' | 'High';
}

export interface CopilotMilestone {
  period: string; // '30 Days', '60 Days', '90 Days'
  objective: string;
  actions: string[];
  expectedScore: number;
  businessBenefit: string;
}

export interface CopilotResponse {
  executiveSummary: {
    maturity: string;
    risks: string;
    criticalWeakness: string;
    strongestArea: string;
    regulatoryReadiness: string;
    businessImpact: string;
    projectedScore: number;
    explanation: string;
  };
  recommendations: CopilotRecommendation[];
  roadmap: CopilotMilestone[];
  confidence: number;
}

export const copilotService = {
  analyzeAssessment: async (data: CopilotRequest): Promise<CopilotResponse> => {
    // In a production environment, this would call an LLM via the backend (e.g., OpenAI/Gemini).
    // For Hackathon Demo Mode, we use intelligent mock generation based on input scores.
    
    return new Promise((resolve) => {
      setTimeout(() => {
        
        // Find weakest and strongest categories
        const entries = Object.entries(data.categoryScores);
        entries.sort((a, b) => a[1] - b[1]);
        const weakest = entries[0]?.[0] || 'Security';
        const strongest = entries[entries.length - 1]?.[0] || 'Privacy';

        resolve({
          executiveSummary: {
            maturity: `${data.organizationName} demonstrates a baseline governance maturity aligned with ${data.industry} standards, achieving an overall Trust Score of ${data.trustScore}.`,
            risks: `The current ${data.riskLevel} risk posture is primarily driven by gaps in ${weakest}.`,
            criticalWeakness: weakest,
            strongestArea: strongest,
            regulatoryReadiness: data.trustScore > 80 ? 'High Readiness' : 'Moderate Gaps Identified',
            businessImpact: `Addressing these gaps will reduce operational risks and prepare ${data.systemName} for upcoming compliance audits.`,
            projectedScore: Math.min(data.trustScore + 12, 100),
            explanation: `Implementing these recommendations will strengthen governance maturity in ${weakest}, improve regulatory readiness, reduce operational AI risks, and increase organizational trust.`
          },
          recommendations: [
            {
              title: `Implement Robust ${weakest} Controls`,
              description: `Establish automated monitoring and policy enforcement for ${weakest}.`,
              priority: 'HIGH',
              businessImpact: 'Reduces unauthorized access and compliance risks.',
              estimatedTrustImprovement: 8,
              timeline: '2 Weeks',
              effort: 'Medium'
            },
            {
              title: `Enhance Audit Logging & Monitoring`,
              description: 'Enable comprehensive audit trails for AI system decisions and data access.',
              priority: 'HIGH',
              businessImpact: 'Improves accountability and incident response.',
              estimatedTrustImprovement: 5,
              timeline: '1 Week',
              effort: 'Low'
            },
            {
              title: 'Deploy Automated Bias Detection',
              description: 'Integrate continuous fairness evaluations into the model pipeline.',
              priority: 'MEDIUM',
              businessImpact: 'Prevents reputational damage from biased outcomes.',
              estimatedTrustImprovement: 4,
              timeline: '3 Weeks',
              effort: 'High'
            },
            {
              title: 'Formalize AI Incident Response Plan',
              description: 'Document and drill a rapid response procedure for AI failures.',
              priority: 'MEDIUM',
              businessImpact: 'Minimizes downtime and regulatory penalties.',
              estimatedTrustImprovement: 3,
              timeline: '2 Weeks',
              effort: 'Medium'
            },
            {
              title: `Expand ${strongest} Capabilities`,
              description: `Leverage existing strengths in ${strongest} to establish industry best practices.`,
              priority: 'LOW',
              businessImpact: 'Builds competitive advantage and stakeholder trust.',
              estimatedTrustImprovement: 2,
              timeline: '4 Weeks',
              effort: 'Low'
            }
          ],
          roadmap: [
            {
              period: '30 Days',
              objective: 'Address Critical Vulnerabilities',
              actions: ['Implement RBAC', 'Enable Audit Logs'],
              expectedScore: Math.min(data.trustScore + 5, 100),
              businessBenefit: 'Immediate reduction of high-priority risks.'
            },
            {
              period: '60 Days',
              objective: 'Establish Continuous Monitoring',
              actions: ['Bias Monitoring', 'Model Drift Detection'],
              expectedScore: Math.min(data.trustScore + 9, 100),
              businessBenefit: 'Proactive mitigation of model degradation.'
            },
            {
              period: '90 Days',
              objective: 'Automate Governance Lifecycle',
              actions: ['Governance Automation', 'Integration with CI/CD'],
              expectedScore: Math.min(data.trustScore + 12, 100),
              businessBenefit: 'Scalable and frictionless compliance.'
            }
          ],
          confidence: 96
        });
      }, 1500); // Simulate AI thought process
    });
  }
};
