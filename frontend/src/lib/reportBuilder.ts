import { generateExecutiveReportPDF } from './exportUtils';
import type { ReportDataPayload } from '../components/reporting/ExecutiveReportTemplate';
import { investmentService } from '../services/investmentService';

export async function exportMasterReport(filename = 'Trust_Assessment_Executive_Report.pdf') {
  // 1. Gather Context
  const orgName = localStorage.getItem('currentOrgName') || localStorage.getItem('demoOrgName') || 'Acme Corp';
  const sysName = localStorage.getItem('currentSystemName') || localStorage.getItem('demoSystemName') || 'Customer Support LLM';
  const assessmentId = localStorage.getItem('currentAssessmentId') || 'ASMT-2026-99384A';
  
  // 2. Gather Trust Data
  const storedTrustStr = localStorage.getItem('trustResults');
  const demoTrustStr = localStorage.getItem('demoTrustResults');
  let trustData: any = {};
  if (storedTrustStr) {
    trustData = JSON.parse(storedTrustStr);
  } else if (demoTrustStr) {
    trustData = JSON.parse(demoTrustStr);
  }
  
  const trustScore = trustData.trustScore || 62;

  // 3. Gather Investments & Roadmap
  // Using the service to ensure we have data, even if not cached in UI state
  const portfolioData = await investmentService.getPortfolioData(trustScore);

  // 4. Construct Payload
  const payload: ReportDataPayload = {
    organizationName: orgName,
    systemName: sysName,
    assessmentId,
    assessmentDate: new Date().toLocaleDateString(),
    trustScore,
    trustLevel: trustData.trustLevel || (trustScore >= 80 ? 'Optimized' : trustScore >= 60 ? 'Developing' : 'Critical'),
    riskLevel: trustData.riskLevel || 'Medium Risk',
    complianceScore: trustData.complianceScore || 65,
    confidenceScore: trustData.confidenceScore || 82,
    categoryScores: trustData.categoryScores || {
      Security: 85,
      Accountability: 60,
      Fairness: 45,
      Transparency: 70,
      Reliability: 80
    },
    recommendations: portfolioData.investments.map(i => ({ title: i.title, priority: i.priority })),
    investments: portfolioData.investments,
    roadmap: portfolioData.roadmap,
    strengths: trustData.strengths || ['Foundational security controls', 'Initial AI inventory'],
    weaknesses: trustData.weaknesses || ['Lack of continuous bias monitoring', 'No formal AI incident response plan']
  };

  // 5. Generate
  await generateExecutiveReportPDF(filename, payload);
}
