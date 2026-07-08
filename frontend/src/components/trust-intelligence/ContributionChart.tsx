import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ContributionProps {
  type: 'positive' | 'negative';
  items: string[];
}

export function ContributionChart({ type, items }: ContributionProps) {
  const isPositive = type === 'positive';
  const Icon = isPositive ? CheckCircle2 : AlertTriangle;
  const colorClass = isPositive ? 'text-emerald-600' : 'text-amber-600';
  const bgClass = isPositive ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100';

  return (
    <Card className={`rounded-xl shadow-sm border ${bgClass}`}>
      <CardContent className="p-5">
        <h4 className={`font-bold flex items-center gap-2 mb-4 ${colorClass}`}>
          <Icon className="w-5 h-5" />
          {isPositive ? 'Positive Contributors' : 'Trust Reduction Factors'}
        </h4>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isPositive ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="flex items-start gap-2"
            >
              <div className={`mt-0.5 ${colorClass}`}>
                {isPositive ? '✔' : '⚠'}
              </div>
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
