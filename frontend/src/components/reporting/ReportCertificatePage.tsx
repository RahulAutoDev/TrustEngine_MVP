import type { ReportDataPayload } from './ExecutiveReportTemplate';
import { ShieldCheck } from 'lucide-react';

export function ReportCertificatePage({ data }: { data: ReportDataPayload }) {
  return (
    <div className="w-full h-full p-12 flex flex-col justify-center items-center bg-slate-50 relative overflow-hidden">
      {/* Decorative Borders */}
      <div className="absolute inset-8 border-4 border-double border-slate-300 pointer-events-none"></div>
      <div className="absolute inset-10 border border-slate-200 pointer-events-none"></div>

      <div className="text-center relative z-10 max-w-2xl">
        <ShieldCheck className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
        
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-widest mb-2">
          Certificate of AI Governance
        </h1>
        <p className="text-slate-500 font-medium uppercase tracking-widest text-sm mb-12">
          Trust Assessment Engine
        </p>

        <p className="text-lg text-slate-700 italic mb-4">This certifies that</p>
        <h2 className="text-3xl font-bold text-slate-900 mb-2 border-b border-slate-300 pb-2 inline-block px-12">
          {data.systemName}
        </h2>
        <p className="text-lg text-slate-600 font-medium mb-12">developed by {data.organizationName}</p>

        <p className="text-slate-700 leading-relaxed mb-12">
          has undergone a comprehensive evaluation of its artificial intelligence governance, 
          risk management, and compliance controls, achieving a verified Trust Score of:
        </p>

        <div className="mb-16">
          <span className="text-7xl font-black text-emerald-600 tracking-tighter block mb-2">{data.trustScore}%</span>
          <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
            {data.trustLevel}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-12 text-left border-t border-slate-300 pt-8 w-full">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Date of Issuance</p>
            <p className="font-medium text-slate-900">{data.assessmentDate}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Certificate ID</p>
            <p className="font-mono text-sm text-slate-900">{data.assessmentId}</p>
          </div>
        </div>

        {/* Digital Signature Block */}
        <div className="mt-16 w-full flex justify-between items-end">
          <div className="text-left">
            <div className="w-48 border-b-2 border-slate-900 mb-2"></div>
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Authorized Assessor</p>
          </div>
          <div className="text-right">
            <div className="w-48 border-b-2 border-slate-900 mb-2"></div>
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Executive Sponsor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
