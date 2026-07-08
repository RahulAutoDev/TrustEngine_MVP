export interface TransformationTask {
  id: string;
  title: string;
  businessValue: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  owner: string;
  estimatedEffort: string;
  dependencies: string;
  trustScoreIncrease: number;
  expectedCompletion: string;
}

export interface TransformationPhase {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  objectives: string[];
  quickWins: string[];
  recommendations: TransformationTask[];
  businessBenefits: string[];
  expectedScore: number;
}

export interface RoadmapMilestone {
  date: string;
  title: string;
  trustScore: number;
  businessOutcome: string;
  governanceBadge: string;
  successIndicator: string;
}

export interface TransformationRoadmapData {
  organization: string;
  industry: string;
  systemName: string;
  assessmentDate: string;
  currentScore: number;
  projectedScore: number;
  confidence: string;
  currentBadge: string;
  targetBadge: string;
  currentRiskLevel: string;
  targetRiskLevel: string;
  currentCompliance: string;
  targetCompliance: string;
  topWeakness: string;
  strongestArea: string;
  timelineDays: number;
  executiveSummary: string;
  aiCoaching: string;
  phases: TransformationPhase[];
  milestones: RoadmapMilestone[];
  calendarWeeks: { week: string; tasks: { title: string; priority: string; owner: string; outcome: string }[] }[];
  investmentSummary: {
    timeline: string;
    investment: string;
    effort: string;
    topPriority: string;
    topROI: string;
    expectedImprovement: string;
  };
}

export const roadmapService = {
  getTransformationRoadmap: async (currentScore: number): Promise<TransformationRoadmapData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          organization: 'Acme Corp',
          industry: 'Financial Services',
          systemName: 'Customer Support LLM',
          assessmentDate: new Date().toLocaleDateString(),
          currentScore,
          projectedScore: Math.min(currentScore + 13, 100),
          confidence: '96%',
          currentBadge: 'Governed AI',
          targetBadge: 'AI Trust Champion',
          currentRiskLevel: 'High',
          targetRiskLevel: 'Low',
          currentCompliance: '65%',
          targetCompliance: '100%',
          topWeakness: 'Security & Access Control',
          strongestArea: 'Privacy & Data Protection',
          timelineDays: 90,
          executiveSummary: 'Based on the completed governance assessment, Trust Copilot has generated a phased implementation roadmap designed to improve governance maturity while minimizing implementation effort.',
          aiCoaching: 'The fastest improvement can be achieved by strengthening Security Governance through RBAC and centralized audit logging.',
          phases: [
            {
              id: 'phase-1',
              title: 'Phase 1',
              subtitle: 'Immediate Actions',
              timeframe: '0–30 Days',
              objectives: ['Establish baseline security', 'Implement core logging'],
              quickWins: ['RBAC', 'Audit Logging', 'Access Reviews'],
              businessBenefits: ['Immediate reduction in insider threat risk', 'Clear audit trails'],
              expectedScore: currentScore + 6,
              recommendations: [
                {
                  id: 't-1',
                  title: 'Implement Role-Based Access Control',
                  businessValue: 'Prevents unauthorized model access',
                  priority: 'HIGH',
                  owner: 'Security Team',
                  estimatedEffort: 'Medium',
                  dependencies: 'None',
                  trustScoreIncrease: 4,
                  expectedCompletion: 'Week 2'
                },
                {
                  id: 't-2',
                  title: 'Centralized Audit Logging',
                  businessValue: 'Enables incident forensics',
                  priority: 'HIGH',
                  owner: 'Ops Team',
                  estimatedEffort: 'Low',
                  dependencies: 'RBAC',
                  trustScoreIncrease: 2,
                  expectedCompletion: 'Week 3'
                }
              ]
            },
            {
              id: 'phase-2',
              title: 'Phase 2',
              subtitle: 'Governance Optimization',
              timeframe: '30–60 Days',
              objectives: ['Deploy fairness checks', 'Implement continuous monitoring'],
              quickWins: ['Bias Monitoring', 'Model Drift Detection', 'Risk Assessments'],
              businessBenefits: ['Regulatory compliance readiness', 'Improved output quality'],
              expectedScore: currentScore + 9,
              recommendations: [
                {
                  id: 't-3',
                  title: 'Bias & Fairness Monitoring',
                  businessValue: 'Mitigates brand and legal risks',
                  priority: 'HIGH',
                  owner: 'MLOps Team',
                  estimatedEffort: 'High',
                  dependencies: 'Audit Logging',
                  trustScoreIncrease: 3,
                  expectedCompletion: 'Week 6'
                }
              ]
            },
            {
              id: 'phase-3',
              title: 'Phase 3',
              subtitle: 'Enterprise Governance',
              timeframe: '60–90 Days',
              objectives: ['Automate compliance', 'Executive visibility'],
              quickWins: ['Continuous Monitoring', 'Policy Automation', 'Executive Dashboards'],
              businessBenefits: ['Board-level confidence', 'Zero-touch compliance reporting'],
              expectedScore: Math.min(currentScore + 13, 100),
              recommendations: [
                {
                  id: 't-4',
                  title: 'Governance Automation',
                  businessValue: 'Reduces manual compliance overhead',
                  priority: 'MEDIUM',
                  owner: 'Governance Office',
                  estimatedEffort: 'Medium',
                  dependencies: 'Bias Monitoring',
                  trustScoreIncrease: 4,
                  expectedCompletion: 'Week 12'
                }
              ]
            }
          ],
          milestones: [
            { date: 'Day 30', title: 'Security Baseline Achieved', trustScore: currentScore + 6, businessOutcome: 'Core risks mitigated', governanceBadge: 'Governed AI+', successIndicator: '100% RBAC Coverage' },
            { date: 'Day 60', title: 'Fairness Monitored', trustScore: currentScore + 9, businessOutcome: 'EU AI Act Alignment', governanceBadge: 'AI Trust Leader', successIndicator: 'Zero critical bias incidents' },
            { date: 'Day 90', title: 'Enterprise Automation', trustScore: Math.min(currentScore + 13, 100), businessOutcome: 'Continuous Compliance', governanceBadge: 'AI Trust Champion', successIndicator: 'Automated reporting live' }
          ],
          calendarWeeks: [
            { week: 'Week 1', tasks: [{ title: 'Define Roles & Groups', priority: 'High', owner: 'Security', outcome: 'RBAC Schema' }] },
            { week: 'Week 2', tasks: [{ title: 'Deploy RBAC', priority: 'High', owner: 'Engineering', outcome: 'Access locked down' }] },
            { week: 'Week 3', tasks: [{ title: 'Configure Logs', priority: 'High', owner: 'Ops', outcome: 'Centralized observability' }] },
            { week: 'Week 4', tasks: [{ title: 'Access Review', priority: 'Medium', owner: 'Compliance', outcome: 'Audit baseline' }] },
            { week: 'Month 2', tasks: [{ title: 'Deploy Bias Monitors', priority: 'High', owner: 'MLOps', outcome: 'Fairness metrics live' }] },
            { week: 'Month 3', tasks: [{ title: 'Automate Dashboards', priority: 'Medium', owner: 'BI Team', outcome: 'Executive visibility' }] }
          ],
          investmentSummary: {
            timeline: '90 Days',
            investment: '$$$',
            effort: 'Medium',
            topPriority: 'RBAC',
            topROI: 'Audit Logging',
            expectedImprovement: '+13 Points'
          }
        });
      }, 500);
    });
  }
};
