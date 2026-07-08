import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert } from 'lucide-react';

export function RiskContribution() {
  const risks = [
    { name: 'Operational Risk', level: 'Low' },
    { name: 'Compliance Risk', level: 'Low' },
    { name: 'Privacy Risk', level: 'Medium' },
    { name: 'Security Risk', level: 'High' },
    { name: 'Ethical Risk', level: 'Low' },
  ];

  const getColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
         <h4 className="font-bold text-slate-800 flex items-center justify-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            Risk Analysis Mapping
         </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {risks.map((risk, idx) => (
          <motion.div
            key={risk.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="shadow-sm border-slate-100">
              <CardContent className="p-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">{risk.name}</span>
                <Badge variant="outline" className={`${getColor(risk.level)}`}>
                  {risk.level}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-indigo-50 border-indigo-100 mt-2">
           <CardContent className="p-4 flex items-center justify-between">
              <span className="font-bold text-indigo-900">Overall Risk Extracted</span>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 font-bold">Medium</Badge>
           </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
