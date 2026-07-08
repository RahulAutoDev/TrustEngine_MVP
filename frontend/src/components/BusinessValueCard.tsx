import { motion } from 'framer-motion';
import { ShieldCheck, LineChart, Briefcase, Eye, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BusinessValueCard() {
  const values = [
    { icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, title: 'Reduced AI Risk', desc: 'Mitigates critical security vulnerabilities' },
    { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, title: 'Regulatory Readiness', desc: 'Prepares for EU AI Act and NIST compliance' },
    { icon: <Briefcase className="w-5 h-5 text-blue-500" />, title: 'Executive Confidence', desc: 'Provides board-level visibility' },
    { icon: <Eye className="w-5 h-5 text-amber-500" />, title: 'Operational Transparency', desc: 'Clear oversight of all AI deployments' },
    { icon: <HeartHandshake className="w-5 h-5 text-rose-500" />, title: 'Customer Trust', desc: 'Demonstrates commitment to responsible AI' },
    { icon: <LineChart className="w-5 h-5 text-teal-500" />, title: 'Responsible AI ROI', desc: 'Accelerates safe enterprise adoption' }
  ];

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Business Value Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
        {values.map((v, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all bg-slate-50 hover:bg-white"
          >
            <div className="bg-white w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center mb-2 shadow-sm">
              {v.icon}
            </div>
            <h5 className="text-xs font-bold text-slate-800 mb-1">{v.title}</h5>
            <p className="text-[10px] text-slate-500 leading-tight">{v.desc}</p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
