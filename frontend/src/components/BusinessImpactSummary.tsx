import { motion } from 'framer-motion';
import { ShieldCheck, Activity, LineChart, HeartHandshake, Scale } from 'lucide-react';

interface Props {
  totalRiskReduction: number;
}

export function BusinessImpactSummary({ totalRiskReduction }: Props) {
  // Deterministic calculation based on the risk reduction value
  const impactLevel = totalRiskReduction > 40 ? 'High' : totalRiskReduction > 15 ? 'Medium' : 'Low';
  
  const kpis = [
    { title: 'Reduced Regulatory Risk', icon: <Scale className="w-5 h-5 text-indigo-500" />, level: impactLevel },
    { title: 'Executive Confidence', icon: <Activity className="w-5 h-5 text-emerald-500" />, level: totalRiskReduction > 20 ? 'High' : 'Medium' },
    { title: 'Operational Transparency', icon: <LineChart className="w-5 h-5 text-blue-500" />, level: totalRiskReduction > 25 ? 'High' : 'Medium' },
    { title: 'Customer Trust', icon: <HeartHandshake className="w-5 h-5 text-rose-500" />, level: totalRiskReduction > 30 ? 'High' : 'Medium' },
    { title: 'Compliance Readiness', icon: <ShieldCheck className="w-5 h-5 text-teal-500" />, level: impactLevel }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {kpis.map((kpi, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full"
        >
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 self-start mb-3">
            {kpi.icon}
          </div>
          <div>
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight mb-2">{kpi.title}</h5>
            <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-sm ${
              kpi.level === 'High' ? 'bg-emerald-100 text-emerald-700' :
              kpi.level === 'Medium' ? 'bg-amber-100 text-amber-700' :
              'bg-slate-100 text-slate-500'
            }`}>
              {kpi.level} Impact
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
