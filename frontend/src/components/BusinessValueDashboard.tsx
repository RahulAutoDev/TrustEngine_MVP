import { motion } from 'framer-motion';
import { ShieldCheck, LineChart, Briefcase, Eye, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BusinessValueDashboard() {
  const values = [
    { icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />, title: 'Estimated Governance Improvement', desc: 'Quantitative increase across all core TAIG domains' },
    { icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />, title: 'Reduced AI Risk', desc: 'Significant mitigation of regulatory and operational vulnerabilities' },
    { icon: <Briefcase className="w-6 h-6 text-blue-500" />, title: 'Higher Executive Confidence', desc: 'Board-level visibility into AI deployments' },
    { icon: <Eye className="w-6 h-6 text-amber-500" />, title: 'Improved Audit Readiness', desc: 'Proactive documentation for external compliance checks' },
    { icon: <HeartHandshake className="w-6 h-6 text-rose-500" />, title: 'Responsible AI Readiness', desc: 'Preparation for upcoming global AI regulations' },
    { icon: <LineChart className="w-6 h-6 text-teal-500" />, title: 'Customer Trust Improvement', desc: 'Demonstrable commitment to fair and transparent AI' }
  ];

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Business Value Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {values.map((v, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all bg-slate-50 group cursor-default"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-800 leading-tight mb-1">{v.title}</h5>
                <p className="text-[11px] text-slate-500 font-medium leading-snug">{v.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
