import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Zap, ShieldCheck, Banknote, TrendingUp, Award } from 'lucide-react';

interface SummaryData {
  highestROI: string;
  fastestImprovement: string;
  biggestRiskReduction: string;
  lowestCostImprovement: string;
  largestTrustIncrease: string;
  overallScore: string;
}

export function PortfolioExecutiveSummary({ data }: { data: SummaryData }) {
  const kpis = [
    { title: 'Highest ROI Investment', value: data.highestROI, icon: <Target className="w-5 h-5 text-indigo-500" />, bg: 'bg-indigo-50/50', border: 'border-indigo-100' },
    { title: 'Fastest Improvement', value: data.fastestImprovement, icon: <Zap className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50/50', border: 'border-amber-100' },
    { title: 'Biggest Risk Reduction', value: data.biggestRiskReduction, icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50/50', border: 'border-emerald-100' },
    { title: 'Lowest Cost Improvement', value: data.lowestCostImprovement, icon: <Banknote className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50/50', border: 'border-blue-100' },
    { title: 'Largest Trust Increase', value: data.largestTrustIncrease, icon: <TrendingUp className="w-5 h-5 text-teal-500" />, bg: 'bg-teal-50/50', border: 'border-teal-100' },
    { title: 'Overall Investment Score', value: data.overallScore, icon: <Award className="w-5 h-5 text-rose-500" />, bg: 'bg-rose-50/50', border: 'border-rose-100', highlight: true }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className={`border ${kpi.border} ${kpi.bg} shadow-sm overflow-hidden h-full`}>
            <CardContent className="p-5 flex items-start gap-4">
              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 shrink-0">
                {kpi.icon}
              </div>
              <div>
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{kpi.title}</h5>
                <p className={`font-bold ${kpi.highlight ? 'text-2xl text-rose-600 font-black' : 'text-sm text-slate-800'}`}>
                  {kpi.value}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
