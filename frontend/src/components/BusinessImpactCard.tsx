import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Activity, LineChart, FileText, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function BusinessImpactCard() {
  const impacts = [
    { title: 'Reduced Regulatory Risk', icon: <FileText className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
    { title: 'Improved Transparency', icon: <Activity className="w-5 h-5 text-amber-600" />, bg: 'bg-amber-50' },
    { title: 'Higher Stakeholder Trust', icon: <ShieldCheck className="w-5 h-5 text-green-600" />, bg: 'bg-green-50' },
    { title: 'Reduced AI Risk', icon: <LineChart className="w-5 h-5 text-red-600" />, bg: 'bg-red-50' },
    { title: 'Executive Visibility', icon: <Zap className="w-5 h-5 text-indigo-600" />, bg: 'bg-indigo-50' }
  ];

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
        <CardTitle className="text-sm uppercase tracking-widest text-slate-500 font-bold">Projected Business Impact</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {impacts.map((impact, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow"
            >
              <div className={`p-2 rounded-lg ${impact.bg}`}>
                {impact.icon}
              </div>
              <span className="text-xs font-bold text-slate-700">{impact.title}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
