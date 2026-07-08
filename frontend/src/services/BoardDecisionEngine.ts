import type { ExecutiveDecisionInput } from './decisionTypes';
import { getBoardRuleForScore } from './boardDecisionRules';

export interface BoardRisk {
  name: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  businessImpact: string;
  owner: string;
}

export interface BoardAction {
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  owner: string;
  timeline: string;
  expectedOutcome: string;
}

export interface BoardResolutionOutput {
  decision: string;
  color: 'Green' | 'Blue' | 'Amber' | 'Orange' | 'Red';
  vote: 'Approve' | 'Approve with Conditions' | 'Reject';
  resolutionText: string;
  topRisks: BoardRisk[];
  actionItems: BoardAction[];
  expectedOutcome: {
    currentScore: number;
    expectedScore: number;
    improvement: number;
    timeline: string;
  };
  metadata: {
    framework: string;
    timestamp: string;
    confidence: number;
  };
}

export const boardDecisionEngine = {
  evaluate: async (input: ExecutiveDecisionInput): Promise<BoardResolutionOutput> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rule = getBoardRuleForScore(input.trustScore);
        
        // Find weakest and strongest categories dynamically
        const entries = Object.entries(input.categoryScores);
        entries.sort((a, b) => a[1] - b[1]);
        const weakestCat = entries[0]?.[0] || 'Security';
        const secondWeakestCat = entries[1]?.[0] || 'Accountability';
        const strongestCat = entries[entries.length - 1]?.[0] || 'Privacy';

        const improvementTarget = Math.min(input.trustScore + 12, 100);

        let resolution = `Following completion of the AI Governance Assessment under the Trust Assessment Engine using the TAIG Framework, the Executive Decision Advisor recommends ${rule.decision} for deployment of ${input.systemName}.\n\n`;
        resolution += `The assessment demonstrates strong governance maturity across ${strongestCat} while identifying ${weakestCat} and ${secondWeakestCat} as the primary improvement areas.\n\n`;
        
        if (input.trustScore >= 90) {
           resolution += `Deployment is authorized to proceed immediately as all enterprise risk thresholds have been successfully met.`;
        } else if (input.trustScore >= 65) {
           resolution += `Deployment should proceed only after implementing strict controls in ${weakestCat} and establishing continuous monitoring for ${secondWeakestCat}.\n\n`;
           resolution += `Completion of these actions is projected to increase the Trust Score from ${input.trustScore} to ${improvementTarget} and substantially reduce operational and regulatory risk.`;
        } else {
           resolution += `Due to critical deficiencies in ${weakestCat}, deployment must be halted. A comprehensive remediation plan must be executed and re-assessed prior to any production release.`;
        }

        resolve({
          decision: rule.decision,
          color: rule.color,
          vote: rule.vote,
          resolutionText: resolution,
          topRisks: [
            {
              name: `Inadequate ${weakestCat} Controls`,
              severity: input.trustScore < 65 ? 'Critical' : 'High',
              businessImpact: 'Exposure to regulatory fines and operational disruption.',
              owner: 'Chief Information Security Officer'
            },
            {
              name: `Unmonitored ${secondWeakestCat}`,
              severity: input.trustScore < 80 ? 'High' : 'Medium',
              businessImpact: 'Inability to audit AI decisions effectively.',
              owner: 'AI Governance Lead'
            },
            {
              name: 'Missing Model Drift Detection',
              severity: 'Medium',
              businessImpact: 'Silent degradation of model performance in production.',
              owner: 'Data Science Director'
            }
          ],
          actionItems: [
            {
              title: `Implement strict ${weakestCat} protocols`,
              priority: 'HIGH',
              owner: 'Security Team',
              timeline: '2 Weeks',
              expectedOutcome: 'Mitigation of highest priority vulnerabilities.'
            },
            {
              title: `Establish continuous monitoring for ${secondWeakestCat}`,
              priority: 'HIGH',
              owner: 'Governance Team',
              timeline: '1 Week',
              expectedOutcome: 'Real-time oversight and auditability.'
            },
            {
              title: `Formalize ${strongestCat} documentation`,
              priority: 'MEDIUM',
              owner: 'Compliance Team',
              timeline: '3 Weeks',
              expectedOutcome: 'Audit-ready compliance artifacts.'
            },
            {
              title: 'Deploy Automated Bias Detection',
              priority: 'MEDIUM',
              owner: 'MLOps Team',
              timeline: '4 Weeks',
              expectedOutcome: 'Prevention of discriminatory outcomes.'
            },
            {
              title: 'Formalize AI Incident Response',
              priority: 'LOW',
              owner: 'Risk Management',
              timeline: '6 Weeks',
              expectedOutcome: 'Rapid recovery from AI failures.'
            }
          ],
          expectedOutcome: {
            currentScore: input.trustScore,
            expectedScore: improvementTarget,
            improvement: improvementTarget - input.trustScore,
            timeline: '30–60 Days'
          },
          metadata: {
            framework: 'TAIG Framework v1.0',
            timestamp: new Date().toISOString(),
            confidence: 96
          }
        });
      }, 1000);
    });
  }
};
