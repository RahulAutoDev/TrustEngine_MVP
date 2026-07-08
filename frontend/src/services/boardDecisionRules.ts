export const BOARD_DECISION_RULES = [
  {
    minScore: 90,
    decision: 'APPROVED FOR DEPLOYMENT',
    color: 'Green' as const,
    vote: 'Approve' as const
  },
  {
    minScore: 80,
    decision: 'PROCEED WITH MINOR IMPROVEMENTS',
    color: 'Blue' as const,
    vote: 'Approve with Conditions' as const
  },
  {
    minScore: 65,
    decision: 'CONDITIONAL APPROVAL',
    color: 'Amber' as const,
    vote: 'Approve with Conditions' as const
  },
  {
    minScore: 50,
    decision: 'POSTPONE DEPLOYMENT',
    color: 'Orange' as const,
    vote: 'Reject' as const
  },
  {
    minScore: 0,
    decision: 'DO NOT DEPLOY',
    color: 'Red' as const,
    vote: 'Reject' as const
  }
];

export const getBoardRuleForScore = (score: number) => {
  return BOARD_DECISION_RULES.find(rule => score >= rule.minScore) || BOARD_DECISION_RULES[BOARD_DECISION_RULES.length - 1];
};
