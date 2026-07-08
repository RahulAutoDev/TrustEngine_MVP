import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AdvancedRecommendation } from '@/services/advancedRecommendationService';

export function PriorityMatrix({ recommendations }: { recommendations: AdvancedRecommendation[] }) {
  // Map recommendations to matrix quadrants
  // High Impact, Low Effort -> Quick Wins
  // High Impact, High Effort -> Strategic
  // Low Impact, Low Effort -> Fill-ins
  // Low Impact, High Effort -> Low Priority

  const getQuadrant = (rec: AdvancedRecommendation) => {
    const isHighImpact = rec.estimatedTrustIncrease >= 4;
    const isLowEffort = rec.effort === 'Low' || rec.effort === 'Medium';
    
    if (isHighImpact && isLowEffort) return 'quickWins';
    if (isHighImpact && !isLowEffort) return 'strategic';
    if (!isHighImpact && isLowEffort) return 'fillIns';
    return 'lowPriority';
  };

  const matrix = {
    quickWins: recommendations.filter(r => getQuadrant(r) === 'quickWins'),
    strategic: recommendations.filter(r => getQuadrant(r) === 'strategic'),
    fillIns: recommendations.filter(r => getQuadrant(r) === 'fillIns'),
    lowPriority: recommendations.filter(r => getQuadrant(r) === 'lowPriority'),
  };

  const renderQuadrant = (title: string, desc: string, items: AdvancedRecommendation[], colorClass: string, bgClass: string) => (
    <div className={`p-4 border border-slate-200 rounded-xl ${bgClass} relative overflow-hidden h-full flex flex-col`}>
      <div className="mb-3">
        <h4 className={`text-sm font-bold uppercase tracking-wider ${colorClass}`}>{title}</h4>
        <p className="text-[10px] text-slate-500 font-medium">{desc}</p>
      </div>
      <div className="space-y-2 flex-1">
        {items.map(item => (
          <div key={item.id} className="bg-white p-2 rounded border border-slate-100 shadow-sm text-xs font-bold text-slate-700">
            {item.title}
          </div>
        ))}
        {items.length === 0 && (
           <div className="text-xs text-slate-400 italic">No items</div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Priority Matrix</CardTitle>
      </CardHeader>
      <CardContent className="p-6 relative">
         <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-widest origin-center">
           Business Impact
         </div>
         <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           Implementation Effort
         </div>
         
         <div className="grid grid-cols-2 grid-rows-2 gap-4 pl-6 pb-6 h-80">
            {/* Top Left: Quick Wins (High Impact, Low Effort) */}
            <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.1}}>
              {renderQuadrant('Quick Wins', 'High Impact / Low Effort', matrix.quickWins, 'text-emerald-600', 'bg-emerald-50/50')}
            </motion.div>
            
            {/* Top Right: Strategic (High Impact, High Effort) */}
            <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.2}}>
              {renderQuadrant('Strategic', 'High Impact / High Effort', matrix.strategic, 'text-indigo-600', 'bg-indigo-50/50')}
            </motion.div>
            
            {/* Bottom Left: Fill-ins (Low Impact, Low Effort) */}
            <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.3}}>
              {renderQuadrant('Fill-ins', 'Low Impact / Low Effort', matrix.fillIns, 'text-blue-600', 'bg-blue-50/50')}
            </motion.div>
            
            {/* Bottom Right: Low Priority (Low Impact, High Effort) */}
            <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.4}}>
               {renderQuadrant('Low Priority', 'Low Impact / High Effort', matrix.lowPriority, 'text-slate-500', 'bg-slate-50')}
            </motion.div>
         </div>
      </CardContent>
    </Card>
  );
}
