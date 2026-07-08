import type { ReportDataPayload } from './ExecutiveReportTemplate';
import { Target, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export function ReportExecutiveSummary({ data }: { data: ReportDataPayload }) {
  return (
    <div className="w-full h-full p-12 flex flex-col">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Executive Summary</h2>
        <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">
          High-Level Analysis & Key Findings
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-white shadow-sm rounded-lg border border-slate-100">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Trust Score</p>
            <p className="text-3xl font-black text-slate-900">{data.trustScore}%</p>
            <p className="text-sm text-slate-600 mt-1">Foundation established, improvements required.</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-white shadow-sm rounded-lg border border-slate-100">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Governance Maturity</p>
            <p className="text-3xl font-black text-slate-900">{data.trustLevel}</p>
            <p className="text-sm text-slate-600 mt-1">Benchmarked against industry standards.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="border border-slate-200 p-5 rounded-lg text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Risk Rating</p>
          <div className="inline-flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span className="text-xl font-bold text-slate-900">{data.riskLevel}</span>
          </div>
        </div>
        <div className="border border-slate-200 p-5 rounded-lg text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Compliance Status</p>
          <span className="text-xl font-bold text-slate-900">{data.complianceScore}% Aligned</span>
        </div>
        <div className="border border-slate-200 p-5 rounded-lg text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Readiness</p>
          <div className="inline-flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-xl font-bold text-slate-900">Developing</span>
          </div>
        </div>
      </div>

      <div className="mt-auto mb-12">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 mb-4">
          Business Recommendation
        </h3>
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-xl">
          <p className="text-indigo-900 font-medium leading-relaxed italic text-lg">
            "Based on the Trust Assessment Engine analysis, {data.organizationName} exhibits foundational maturity in core AI governance. However, critical gaps in Bias Monitoring and Security Governance elevate enterprise risk. Immediate investment in centralized audit logging and role-based access control is highly recommended to secure the {data.systemName} deployment."
          </p>
        </div>
      </div>
    </div>
  );
}
