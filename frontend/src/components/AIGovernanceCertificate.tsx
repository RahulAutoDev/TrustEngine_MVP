import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  Printer,
  Download,
  Share2,
  Eye,
  FileText,
  Check,
  BarChart4
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentQRCode } from '@/components/AssessmentQRCode';
// @ts-ignore
import html2pdf from 'html2pdf.js';

export interface Recommendation {
  title: string;
  priority: string;
  businessImpact: string;
  estimatedImprovement: string;
}

export interface AIGovernanceCertificateProps {
  organizationName: string;
  industry: string;
  aiSystemName: string;
  trustScore: number;
  governanceLevel: string;
  riskLevel: string;
  complianceScore: number;
  categoryScores: Record<string, number>;
  strengths: string[];
  improvements: string[];
  recommendations: Recommendation[];
  assessmentId: string;
  assessmentDate: string;
  confidence?: number;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-600 bg-emerald-100 border-emerald-200';
  if (score >= 75) return 'text-green-600 bg-green-100 border-green-200';
  if (score >= 60) return 'text-blue-600 bg-blue-100 border-blue-200';
  if (score >= 40) return 'text-amber-600 bg-amber-100 border-amber-200';
  return 'text-red-600 bg-red-100 border-red-200';
};

const getProgressColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 75) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
};

const getLevelTheme = (level: string) => {
  if (level.includes('Champion')) return 'from-emerald-50 to-teal-100 border-emerald-200 text-emerald-800';
  if (level.includes('Leader')) return 'from-green-50 to-emerald-100 border-green-200 text-green-800';
  if (level.includes('Governed')) return 'from-blue-50 to-indigo-100 border-blue-200 text-blue-800';
  if (level.includes('Developing')) return 'from-amber-50 to-orange-100 border-amber-200 text-amber-800';
  return 'from-red-50 to-rose-100 border-red-200 text-red-800';
};

export function AIGovernanceCertificate({
  organizationName = "Acme Corp Global",
  industry = "Financial Services",
  aiSystemName = "Automated Underwriting Engine",
  trustScore = 92,
  governanceLevel = "AI Trust Leader",
  riskLevel = "Low",
  complianceScore = 96,
  categoryScores = {
    Transparency: 94,
    Fairness: 88,
    Privacy: 98,
    Security: 82,
    Accountability: 96
  },
  strengths = [
    "Strong Privacy Controls",
    "Well Defined Accountability",
    "Transparent Governance",
    "Comprehensive Documentation",
    "Good Regulatory Readiness"
  ],
  improvements = [
    "Security Governance",
    "Bias Monitoring",
    "Access Control",
    "Audit Logging",
    "Model Monitoring"
  ],
  recommendations = [
    { title: "Implement Role-Based Access", priority: "HIGH", businessImpact: "Critical Data Security", estimatedImprovement: "+8 Points" },
    { title: "Establish Bias Metrics", priority: "HIGH", businessImpact: "Fairness Assurance", estimatedImprovement: "+5 Points" },
    { title: "Enable Comprehensive Audit Logs", priority: "MEDIUM", businessImpact: "Compliance Tracking", estimatedImprovement: "+3 Points" },
    { title: "Publish External Model Cards", priority: "LOW", businessImpact: "Public Trust", estimatedImprovement: "+2 Points" },
    { title: "Continuous Model Drift Monitoring", priority: "MEDIUM", businessImpact: "Operational Stability", estimatedImprovement: "+4 Points" }
  ],
  assessmentId = "ASMT-2026-99384A",
  assessmentDate = new Date().toLocaleDateString(),
  confidence = 98
}: Partial<AIGovernanceCertificateProps>) {

  const handleDownloadPDF = () => {
    const element = document.getElementById('ai-certificate-report');
    if (!element) return;
    const opt = {
      margin:       0.2,
      filename:     `${organizationName.replace(/\s+/g, '_')}_AI_Certificate.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Action Buttons (Non-printable) */}
      <div className="flex flex-wrap items-center justify-end gap-3 print:hidden">
        <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-indigo-100 hover:bg-indigo-50 text-indigo-700">
          <Eye className="w-4 h-4 mr-2" /> View Details
        </Button>
        <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-indigo-100 hover:bg-indigo-50 text-indigo-700">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </Button>
        <Button variant="outline" onClick={handlePrint} className="bg-white/50 backdrop-blur-sm border-indigo-100 hover:bg-indigo-50 text-indigo-700">
          <Printer className="w-4 h-4 mr-2" /> Print
        </Button>
        <Button onClick={handleDownloadPDF} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card 
          id="ai-certificate-report"
          className="bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200 print:shadow-none print:border-none relative"
        >
          {/* Decorative Top Border */}
          <div className="h-3 w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-400"></div>
          
          <CardContent className="p-8 md:p-12">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-8 mb-8">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                  <ShieldCheck className="w-10 h-10 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-indigo-600 font-black tracking-widest uppercase text-xs mb-1 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5" /> Trust Assessment Engine
                  </h4>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Governance Certificate</h1>
                </div>
              </div>
              <div className="text-left md:text-right text-xs text-slate-500 space-y-1">
                <p><span className="font-semibold text-slate-700">Generated by:</span> Trust Assessment Engine</p>
                <p><span className="font-semibold text-slate-700">Framework:</span> TAIG Framework v1.0</p>
                <p><span className="font-semibold text-slate-700">Edition:</span> Hackathon MVP Edition</p>
              </div>
            </div>

            {/* Org Info & Trust Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              
              {/* Organization Info */}
              <div className="col-span-1 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Organization</p>
                  <h3 className="text-xl font-bold text-slate-900">{organizationName}</h3>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">AI System Profile</p>
                  <p className="text-sm font-semibold text-slate-700">{aiSystemName}</p>
                  <p className="text-xs text-slate-500">{industry}</p>
                </div>
                <div className="pt-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Assessment Details</p>
                  <p className="text-xs font-mono text-slate-600 mb-0.5">ID: {assessmentId}</p>
                  <p className="text-xs font-mono text-slate-600">Date: {assessmentDate}</p>
                </div>
              </div>

              {/* Trust Summary Scorecard */}
              <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6 shadow-inner flex flex-col md:flex-row items-center gap-8">
                
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex items-center justify-center w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                      <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * trustScore) / 100} className={trustScore >= 80 ? 'text-emerald-500' : trustScore >= 50 ? 'text-amber-500' : 'text-red-500'} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-slate-900">{trustScore}<span className="text-lg text-slate-400">%</span></span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3">Trust Score</span>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className={`p-4 rounded-xl border bg-gradient-to-r ${getLevelTheme(governanceLevel)} flex items-center justify-between`}>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-70 mb-0.5">Maturity Level</p>
                      <h2 className="text-2xl font-black">{governanceLevel}</h2>
                    </div>
                    <Award className="w-10 h-10 opacity-20" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-slate-100 p-3 rounded-lg text-center shadow-sm">
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">Risk</p>
                      <Badge className={`${riskLevel === 'Low' ? 'bg-green-100 text-green-700' : riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'} border-none font-bold text-xs`}>{riskLevel}</Badge>
                    </div>
                    <div className="bg-white border border-slate-100 p-3 rounded-lg text-center shadow-sm">
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">Compliance</p>
                      <p className="text-sm font-bold text-slate-900">{complianceScore}%</p>
                    </div>
                    <div className="bg-white border border-slate-100 p-3 rounded-lg text-center shadow-sm">
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">Confidence</p>
                      <p className="text-sm font-bold text-slate-900">{confidence}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
              
              {/* Category Results */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4 flex items-center">
                  <BarChart4 className="w-4 h-4 mr-2 text-indigo-500" /> Category Scorecard
                </h3>
                <div className="space-y-4">
                  {Object.entries(categoryScores).map(([cat, score]) => (
                    <div key={cat} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-semibold text-slate-700">{cat}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getScoreColor(score)}`}>
                            {score >= 80 ? 'Optimal' : score >= 50 ? 'Developing' : 'Critical'}
                          </span>
                          <span className="text-sm font-black text-slate-900 w-8 text-right">{score}%</span>
                        </div>
                      </div>
                      <Progress value={score} className={`h-1.5 bg-slate-100 [&>div]:${getProgressColor(score)}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Key Strengths
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {strengths.slice(0, 5).map((s, i) => (
                      <div key={i} className="flex items-start gap-2 bg-emerald-50/50 p-2 rounded border border-emerald-100/50">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs font-medium text-emerald-900 leading-tight">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" /> Key Improvement Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {improvements.slice(0, 5).map((imp, i) => (
                      <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200/50">
                        {imp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-10 bg-slate-50 border border-slate-100 p-6 rounded-xl relative overflow-hidden">
              <FileText className="absolute -right-4 -top-4 w-24 h-24 text-slate-200/50 -rotate-12 pointer-events-none" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">Executive Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium relative z-10 max-w-3xl">
                This assessment indicates that the organization has established a {trustScore >= 80 ? 'strong' : trustScore >= 50 ? 'developing' : 'weak'} AI governance foundation. Governance maturity is particularly notable across {strengths[0]?.split(' ')[1] || 'Core'} and {strengths[1]?.split(' ')[1] || 'Ethics'}, while {improvements[0] || 'certain'} controls require further enhancement to improve overall organizational trust and regulatory alignment.
              </p>
            </div>

            {/* Recommendations */}
            <div className="mb-12">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">
                Prioritized Action Plan
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {recommendations.slice(0, 5).map((rec, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white border border-slate-100 shadow-sm rounded-lg hover:border-indigo-100 transition-colors">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${rec.priority === 'HIGH' ? 'bg-red-100 text-red-600' : rec.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                        <span className="text-xs font-bold">{i+1}</span>
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">{rec.title}</h5>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold">{rec.businessImpact}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-11 sm:ml-0">
                      <Badge variant="outline" className={`text-[10px] font-bold ${rec.priority === 'HIGH' ? 'text-red-600 border-red-200' : rec.priority === 'MEDIUM' ? 'text-amber-600 border-amber-200' : 'text-blue-600 border-blue-200'}`}>
                        {rec.priority} PRIORITY
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-700 font-bold">
                        {rec.estimatedImprovement}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seal & Signature Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t-2 border-dashed border-slate-200">
              
              {/* Digital Signature */}
              <div className="order-2 md:order-1 text-center md:text-left">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-2">Digitally Generated Assessment</p>
                <div className="font-serif italic text-2xl text-slate-800 mb-1 signature-font">
                  Trust Assessment Engine
                </div>
                <div className="text-[10px] text-slate-500 font-mono space-y-0.5">
                  <p>Assessment ID: {assessmentId}</p>
                  <p>Timestamp: {new Date().toISOString()}</p>
                  <p>Version: MVP Hackathon Edition</p>
                </div>
                <p className="text-[9px] text-slate-400 max-w-xs mt-3 leading-tight">
                  This report represents an automated governance assessment based on responses provided during the evaluation and should be used as a decision-support artifact.
                </p>
              </div>

              {/* Trust Seal */}
              <div className="order-1 md:order-2 shrink-0">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Outer Gold Border */}
                  <div className="absolute inset-0 border-[6px] border-amber-400 rounded-full border-dashed opacity-30 animate-[spin_60s_linear_infinite]"></div>
                  <div className="absolute inset-2 border-2 border-amber-500 rounded-full"></div>
                  
                  {/* Seal Background */}
                  <div className="absolute inset-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full shadow-inner flex flex-col items-center justify-center text-center p-4">
                    <ShieldCheck className="w-8 h-8 text-amber-600 mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-amber-800 mb-0.5">AI Governance</span>
                    <span className="text-xs font-black uppercase text-amber-600 border-y border-amber-300 py-0.5 my-0.5 w-full">{governanceLevel}</span>
                    <span className="text-[10px] font-bold text-amber-800 mb-1">Score: {trustScore}%</span>
                    <span className="text-[7px] uppercase font-bold text-amber-600/70">TAIG Framework</span>
                  </div>

                  {/* Ribbon */}
                  <div className="absolute -bottom-2 w-32 h-6 bg-amber-500 rounded-sm shadow-md flex items-center justify-center transform -rotate-2">
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Certified Assessment</span>
                  </div>
                </div>
              </div>

              {/* QR Code Verification */}
              <div className="order-3 shrink-0 flex items-center justify-center md:justify-end">
                <AssessmentQRCode assessmentId={assessmentId} />
              </div>

            </div>

          </CardContent>
          
          <div className="bg-slate-900 text-slate-400 text-[10px] py-3 px-8 flex justify-between items-center font-medium">
            <span>Framework: Trust Assessment Intelligence Governance (TAIG) v1.0</span>
            <span>Powered by AI Governance Assessment • Trust Assessment Engine</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

