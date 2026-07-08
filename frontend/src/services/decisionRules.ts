export const DECISION_RULES = [
  {
    minScore: 90,
    decision: 'APPROVED FOR DEPLOYMENT',
    color: 'Green' as const,
    reason: 'AI governance maturity is excellent.\nCurrent controls are sufficient for production deployment.'
  },
  {
    minScore: 80,
    decision: 'PROCEED WITH MINOR IMPROVEMENTS',
    color: 'Blue' as const,
    reason: 'Deployment is acceptable after resolving a small number of governance gaps.'
  },
  {
    minScore: 65,
    decision: 'CONDITIONAL APPROVAL',
    color: 'Amber' as const,
    reason: 'Deployment should proceed only after completing high-priority governance improvements.'
  },
  {
    minScore: 50,
    decision: 'POSTPONE DEPLOYMENT',
    color: 'Orange' as const,
    reason: 'Significant governance weaknesses remain.'
  },
  {
    minScore: 0,
    decision: 'DO NOT DEPLOY',
    color: 'Red' as const,
    reason: 'Critical governance failures require immediate remediation.'
  }
];

export const getRuleForScore = (score: number) => {
  return DECISION_RULES.find(rule => score >= rule.minScore) || DECISION_RULES[DECISION_RULES.length - 1];
};
