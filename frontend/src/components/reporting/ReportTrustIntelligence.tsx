import { Activity, ShieldCheck, Cpu, Database } from 'lucide-react';

export function ReportTrustIntelligence() {
  return (
    <div className="w-full h-full p-12 flex flex-col">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Trust Intelligence™ Methodology</h2>
        <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">
          Algorithmic Assessment Framework
        </p>
      </div>

      <div className="prose prose-sm prose-slate max-w-none mb-10">
        <p className="text-slate-700 leading-relaxed text-base">
          The Trust Assessment Engine relies on our proprietary <strong>Trust Intelligence Engine™</strong> to quantify unquantifiable risk. By synthesizing millions of data points across organizational policies, system configurations, and empirical test results, the engine produces an objective, defensible Trust Score.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Governance Analyzer</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Evaluates the presence, maturity, and enforcement of organizational AI policies, including oversight committees and accountability structures.
          </p>
        </div>
        
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900">Risk Analyzer</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Models potential failure modes including bias, model drift, and adversarial attacks, plotting them against existing technical mitigations.
          </p>
        </div>
        
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900">Compliance Analyzer</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Continuously maps system controls against emerging global regulations (e.g., EU AI Act, NIST AI RMF) to detect compliance gaps.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <Cpu className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900">Decision Engine</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Aggregates sub-scores using a weighted algorithm to prioritize remediation tasks and calculate expected Return on Investment (ROI).
          </p>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-6 rounded-xl mt-auto">
        <p className="text-sm italic text-slate-300 font-medium">
          "Trust is no longer a soft metric; it is a measurable asset. The Trust Intelligence Engine transforms abstract compliance into actionable executive strategy."
        </p>
      </div>
    </div>
  );
}
