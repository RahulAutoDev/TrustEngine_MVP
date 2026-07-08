export interface SimulationImprovement {
  id: string;
  title: string;
  category: string;
  scoreGain: number;
  riskReduction: number; // Quantitative measure for internal calculation
  complianceGain: number;
}

export interface SimulationBaseline {
  score: number;
  badge: string;
  risk: 'High' | 'Medium' | 'Low';
  compliance: number;
}

export const simulatorImprovements: SimulationImprovement[] = [
  { id: 'sim-1', title: 'Implement Role-Based Access Control', category: 'Security', scoreGain: 8, riskReduction: 30, complianceGain: 15 },
  { id: 'sim-2', title: 'Enable Audit Logging', category: 'Accountability', scoreGain: 5, riskReduction: 20, complianceGain: 10 },
  { id: 'sim-3', title: 'Enable Multi-Factor Authentication', category: 'Security', scoreGain: 4, riskReduction: 15, complianceGain: 5 },
  { id: 'sim-4', title: 'Deploy Bias Monitoring', category: 'Fairness', scoreGain: 3, riskReduction: 10, complianceGain: 10 },
  { id: 'sim-5', title: 'Continuous Model Monitoring', category: 'Reliability', scoreGain: 3, riskReduction: 10, complianceGain: 5 },
  { id: 'sim-6', title: 'Governance Policy Automation', category: 'Transparency', scoreGain: 2, riskReduction: 5, complianceGain: 15 },
  { id: 'sim-7', title: 'Explainability Dashboard', category: 'Transparency', scoreGain: 2, riskReduction: 5, complianceGain: 5 },
  { id: 'sim-8', title: 'AI Risk Register', category: 'Accountability', scoreGain: 1, riskReduction: 5, complianceGain: 5 }
];

export const simulationService = {
  calculateProjection: (
    baseline: SimulationBaseline, 
    activeIds: string[]
  ) => {
    let projectedScore = baseline.score;
    let totalRiskReduction = 0;
    let projectedCompliance = baseline.compliance;

    activeIds.forEach(id => {
      const imp = simulatorImprovements.find(i => i.id === id);
      if (imp) {
        projectedScore += imp.scoreGain;
        totalRiskReduction += imp.riskReduction;
        projectedCompliance += imp.complianceGain;
      }
    });

    // Cap values
    projectedScore = Math.min(100, projectedScore);
    projectedCompliance = Math.min(100, projectedCompliance);

    // Calculate Badge
    let projectedBadge = 'Governed AI';
    if (projectedScore >= 95) projectedBadge = 'AI Trust Champion';
    else if (projectedScore >= 90) projectedBadge = 'AI Trust Leader';
    else if (projectedScore >= 85) projectedBadge = 'Governed AI+';

    // Calculate Risk
    let projectedRisk = baseline.risk;
    if (baseline.risk === 'High') {
      if (totalRiskReduction >= 50) projectedRisk = 'Low';
      else if (totalRiskReduction >= 20) projectedRisk = 'Medium';
    } else if (baseline.risk === 'Medium') {
      if (totalRiskReduction >= 30) projectedRisk = 'Low';
    }

    return {
      projectedScore,
      projectedBadge,
      projectedRisk,
      projectedCompliance,
      totalRiskReduction,
    };
  }
};
