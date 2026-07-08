import { ShieldCheck } from 'lucide-react';
import type { ReportDataPayload } from './ExecutiveReportTemplate';

export function ReportCoverPage({ data }: { data: ReportDataPayload }) {
  return (
    <div className="w-full h-[11in] flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
      {/* Confidential Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-white/5 text-8xl font-black tracking-widest whitespace-nowrap pointer-events-none uppercase">
        Confidential
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-24">
          <ShieldCheck className="w-12 h-12 text-indigo-400" />
          <h2 className="text-2xl font-bold tracking-widest uppercase text-slate-300">Trust Assessment Engine</h2>
        </div>

        <div className="space-y-6 max-w-2xl">
          <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Executive Consulting Report</p>
          <h1 className="text-5xl font-black leading-tight">AI Governance & Trust Architecture Analysis</h1>
          <div className="h-2 w-32 bg-indigo-500 rounded-full mt-8"></div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-12 border-t border-slate-700 pt-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Prepared For</p>
          <p className="text-2xl font-bold">{data.organizationName}</p>
          <p className="text-slate-400">{data.systemName}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Trust Score</p>
            <p className="text-3xl font-black text-emerald-400">{data.trustScore}%</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Trust Level</p>
            <p className="text-xl font-bold text-slate-200">{data.trustLevel}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Assessment Date</p>
            <p className="text-sm font-semibold">{data.assessmentDate}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Certificate ID</p>
            <p className="text-sm font-mono text-indigo-300">{data.assessmentId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReportFooter({ timestamp }: { timestamp: string }) {
  // Using fixed positioning so html2pdf repeats this if we apply it to every page, 
  // but it's cleaner to just render it at the bottom of each page component explicitly.
  return (
    <div className="w-full py-4 border-t border-slate-200 mt-auto flex justify-between items-center text-[9px] text-slate-400 font-medium uppercase tracking-widest px-12 absolute bottom-0">
      <span>Trust Assessment Engine • v1.0 Enterprise</span>
      <span className="text-rose-500 font-bold">Strictly Confidential</span>
      <span>Generated: {new Date(timestamp).toLocaleDateString()}</span>
    </div>
  );
}
