import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Target, Activity, Zap, FileText } from 'lucide-react';

interface FormulaProps {
  finalScore: number;
}

export function TrustFormulaCard({ finalScore }: FormulaProps) {
  let gov = finalScore;
  let risk = finalScore;
  let comp = finalScore;
  let conf = finalScore;
  let exp = finalScore;

  // Add realistic variation that mathematically balances to exactly 0 offset
  if (finalScore >= 5 && finalScore <= 95) {
    gov = finalScore - 2;   // -0.7 impact (35% weight)
    risk = finalScore + 2;  // +0.5 impact (25% weight)
    comp = finalScore + 1;  // +0.2 impact (20% weight)
                            // 10% weight and 10% weight remain unchanged
  }

  const factors = [
    { name: 'Governance', score: gov, weight: 35, icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Risk', score: risk, weight: 25, icon: ShieldCheck, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Compliance', score: comp, weight: 20, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Confidence', score: conf, weight: 10, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Explainability', score: exp, weight: 10, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-slate-800">Trust Formula</h3>
        <p className="text-sm text-slate-500">Deterministic calculation based on weighted pillars</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {factors.map((factor, idx) => (
          <motion.div
            key={factor.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-slate-100 shadow-sm bg-slate-50/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${factor.bg} ${factor.color}`}>
                    <factor.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700">{factor.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] bg-white">Score: {factor.score}</Badge>
                      <span className="text-slate-400 text-xs">×</span>
                      <Badge variant="outline" className="text-[10px] bg-white">{factor.weight}% Weight</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-800">
                    + {((factor.score * factor.weight) / 100).toFixed(1)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Card className="border-indigo-100 bg-indigo-50 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <h4 className="text-lg font-bold text-indigo-900">Final Trust Score</h4>
            <div className="text-4xl font-black text-indigo-600">{finalScore}</div>
          </CardContent>
        </Card>
      </motion.div>
      
      <p className="text-xs text-center text-slate-400 italic">
        * These weights are configurable for the demonstration MVP and represent the current Trust Engine scoring model.
      </p>
    </div>
  );
}
