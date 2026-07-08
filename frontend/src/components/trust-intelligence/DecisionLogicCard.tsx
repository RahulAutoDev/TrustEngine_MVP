import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { getBoardRuleForScore } from '@/services/boardDecisionRules';

export function DecisionLogicCard({ overallScore = 84 }: { overallScore?: number }) {
  const rule = getBoardRuleForScore(overallScore);
  
  let decisionColor = 'text-emerald-600';
  let bgClass = 'bg-emerald-50 border-emerald-100';
  let Icon = CheckCircle2;
  let explanation = 'System meets baseline governance and trust standards. Approved for deployment with minor conditions attached to the next release cycle to address Medium Security Risks.';
  
  if (rule.vote === 'Approve') {
    decisionColor = 'text-emerald-600';
    bgClass = 'bg-emerald-50 border-emerald-100';
    Icon = CheckCircle2;
    explanation = 'System exceeds all baseline governance and trust standards. Approved for immediate deployment with no conditions.';
  } else if (rule.vote === 'Reject') {
    decisionColor = 'text-red-600';
    bgClass = 'bg-red-50 border-red-100';
    Icon = XCircle;
    explanation = 'System fails to meet baseline governance standards. Deployment is rejected until critical risks are remediated.';
  } else if (overallScore < 80) {
    decisionColor = 'text-amber-600';
    bgClass = 'bg-amber-50 border-amber-100';
    Icon = AlertTriangle;
    explanation = 'System meets minimum standards but carries elevated risks. Conditional approval granted pending mandatory remediations in the next cycle.';
  }

  const steps = [
    { label: 'Trust Index', value: overallScore.toString(), color: 'text-indigo-600', active: true },
    { label: 'Governance Level', value: 'Governed AI', color: 'text-blue-600', active: true },
    { label: 'Risk Profile', value: 'Medium', color: 'text-amber-600', active: true },
    { label: 'Executive Decision', value: rule.vote, color: decisionColor, active: true, isFinal: true },
  ];

  return (
    <Card className="rounded-2xl border-slate-100 shadow-sm bg-white overflow-hidden">
      <CardContent className="p-6">
        <h4 className="font-bold text-slate-800 text-center mb-6">Decision Engine Logic</h4>
        <div className="flex flex-col items-center">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                className={`w-64 p-4 text-center rounded-xl border shadow-sm ${
                  step.isFinal ? bgClass : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{step.label}</div>
                <div className={`text-lg font-black ${step.color}`}>{step.value}</div>
              </motion.div>
              
              {idx < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (idx * 0.2) + 0.1 }}
                  className="py-2"
                >
                  <ArrowDown className="w-5 h-5 text-slate-300" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: steps.length * 0.2 }}
           className={`mt-8 p-4 rounded-xl border flex items-start gap-3 ${bgClass}`}
        >
          <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${decisionColor}`} />
          <p className={`text-sm font-medium ${decisionColor.replace('text-', 'text-').replace('600', '800')}`}>
            {explanation}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
