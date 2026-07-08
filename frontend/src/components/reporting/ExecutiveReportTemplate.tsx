import { ReportCoverPage } from './ReportCoverPage';
import { ReportFooter } from './ReportFooter';
import { ReportExecutiveSummary } from './ReportExecutiveSummary';
import { ReportVisualDashboard } from './ReportVisualDashboard';
import { ReportAssessmentResults } from './ReportAssessmentResults';
import { ReportInvestmentSection } from './ReportInvestmentSection';
import { ReportRoadmap } from './ReportRoadmap';
import { ReportTrustIntelligence } from './ReportTrustIntelligence';
import { ReportCertificatePage } from './ReportCertificatePage';

export interface ReportDataPayload {
  organizationName: string;
  systemName: string;
  assessmentId: string;
  assessmentDate: string;
  trustScore: number;
  trustLevel: string;
  riskLevel: string;
  complianceScore: number;
  confidenceScore: number;
  categoryScores: Record<string, number>;
  recommendations: any[];
  investments: any[];
  roadmap: any[];
  strengths: string[];
  weaknesses: string[];
}

export function PageContainer({ children, noFooter = false, timestamp }: { children: React.ReactNode, noFooter?: boolean, timestamp?: string }) {
  return (
    <div className="w-[8.5in] h-[11in] relative bg-white overflow-hidden" style={{ pageBreakAfter: 'always' }}>
      {children}
      {!noFooter && timestamp && <ReportFooter timestamp={timestamp} />}
    </div>
  );
}

export function ExecutiveReportTemplate({ data }: { data: ReportDataPayload }) {
  const ts = new Date().toISOString();
  return (
    <div className="text-slate-900 mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      <PageContainer noFooter timestamp={ts}>
        <ReportCoverPage data={data} />
      </PageContainer>
      
      <PageContainer timestamp={ts}>
        <ReportExecutiveSummary data={data} />
      </PageContainer>
      
      <PageContainer timestamp={ts}>
        <ReportVisualDashboard data={data} />
      </PageContainer>
      
      <PageContainer timestamp={ts}>
        <ReportAssessmentResults data={data} />
      </PageContainer>
      
      <PageContainer timestamp={ts}>
        <ReportInvestmentSection data={data} />
      </PageContainer>
      
      <PageContainer timestamp={ts}>
        <ReportRoadmap data={data} />
      </PageContainer>
      
      <PageContainer timestamp={ts}>
        <ReportTrustIntelligence />
      </PageContainer>
      
      <PageContainer timestamp={ts}>
        <ReportCertificatePage data={data} />
      </PageContainer>
    </div>
  );
}
