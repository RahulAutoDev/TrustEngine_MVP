import type { ExecutiveDecisionInput, ExecutiveDecisionOutput } from './decisionTypes';
import { getRuleForScore } from './decisionRules';

export const decisionEngine = {
  evaluate: async (input: ExecutiveDecisionInput): Promise<ExecutiveDecisionOutput> => {
    // In a real environment, this might call an LLM. 
    // Here we use deterministic business rules.
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const rule = getRuleForScore(input.trustScore);
        
        // Find weakest and strongest categories dynamically
        const entries = Object.entries(input.categoryScores);
        entries.sort((a, b) => a[1] - b[1]);
        const weakestCat = entries[0]?.[0] || 'Security';
        const secondWeakestCat = entries[1]?.[0] || 'Accountability';
        const strongestCat = entries[entries.length - 1]?.[0] || 'Privacy';

        // Generate Justification
        let justification = `The current governance assessment demonstrates strong maturity in ${strongestCat}. `;
        if (input.trustScore >= 90) {
           justification += `All critical controls across ${weakestCat} and ${secondWeakestCat} meet or exceed enterprise standards. The system is fully approved for production deployment.`;
        } else if (input.trustScore >= 80) {
           justification += `However, minor gaps remain in ${weakestCat}. Deployment is acceptable, but these issues should be scheduled for remediation in the next sprint.`;
        } else if (input.trustScore >= 65) {
           justification += `However, ${weakestCat} governance remains below enterprise expectations. Deployment should proceed only after these specific issues are resolved.`;
        } else {
           justification += `Critically, ${weakestCat} and ${secondWeakestCat} controls are severely lacking. Deployment must be halted immediately until a comprehensive remediation plan is executed.`;
        }

        // Mock top risks based on weakest category
        let topRisks = [];
        if (weakestCat === 'Security') {
          topRisks = ['Weak Access Control', 'Incomplete Audit Trail', 'No Vulnerability Scanning'];
        } else if (weakestCat === 'Fairness') {
          topRisks = ['No Bias Monitoring', 'Unrepresentative Training Data', 'Lack of Red Teaming'];
        } else if (weakestCat === 'Transparency') {
          topRisks = ['Missing Model Cards', 'Unclear User Disclosures', 'Black-box Architecture'];
        } else if (weakestCat === 'Privacy') {
          topRisks = ['Unencrypted PII Data', 'Missing Consent Workflows', 'No Data Deletion Mechanism'];
        } else {
          topRisks = ['Unclear Ownership', 'Missing Human-in-the-loop', 'No Incident Response Plan'];
        }

        const improvementTarget = Math.min(input.trustScore + 12, 100);

        resolve({
          decision: rule.decision,
          color: rule.color,
          reason: rule.reason,
          executiveJustification: justification,
          topRisks,
          recommendedActions: [
            {
              title: `Implement strict ${weakestCat} protocols`,
              priority: 'HIGH',
              businessImpact: 'Reduces critical operational and regulatory risk.',
              estimatedTrustImprovement: 8,
              estimatedTimeline: '2 Weeks'
            },
            {
              title: `Establish continuous monitoring for ${secondWeakestCat}`,
              priority: 'HIGH',
              businessImpact: 'Improves real-time oversight and accountability.',
              estimatedTrustImprovement: 3,
              estimatedTimeline: '1 Week'
            },
            {
              title: `Formalize ${strongestCat} documentation`,
              priority: 'MEDIUM',
              businessImpact: 'Builds stakeholder trust and audit readiness.',
              estimatedTrustImprovement: 1,
              estimatedTimeline: '3 Weeks'
            }
          ],
          expectedOutcome: {
            currentScore: input.trustScore,
            expectedScore: improvementTarget,
            improvement: improvementTarget - input.trustScore
          },
          confidenceScore: 96
        });
      }, 1000);
    });
  }
};
