import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PortfolioInvestment } from '@/services/investmentService';

export function PortfolioInvestmentMatrix({ investments }: { investments: PortfolioInvestment[] }) {
  const getQuadrant = (inv: PortfolioInvestment) => {
    const isHighImpact = inv.executiveImpact === 'High' || inv.executiveImpact === 'Very High';
    const isLowEffort = inv.implementationEffort === 'Low' || inv.implementationEffort === 'Medium';
    
    if (isHighImpact && isLowEffort) return 'quickWins';
    if (isHighImpact && !isLowEffort) return 'strategic';
    if (!isHighImpact && isLowEffort) return 'major';
    return 'future';
  };

  const matrix = {
    quickWins: investments.filter(i => getQuadrant(i) === 'quickWins'),
    strategic: investments.filter(i => getQuadrant(i) === 'strategic'),
    major: investments.filter(i => getQuadrant(i) === 'major'),
    future: investments.filter(i => getQuadrant(i) === 'future'),
  };

  const renderQuadrant = (title: string, items: PortfolioInvestment[], colorClass: string, bgClass: string) => (
    <div className={`p-4 border border-slate-200 rounded-xl ${bgClass} relative overflow-hidden h-full flex flex-col shadow-inner`}>
      <div className="mb-3">
        <h4 className={`text-sm font-bold uppercase tracking-wider ${colorClass}`}>{title}</h4>
      </div>
      <div className="space-y-2 flex-1">
        {items.map(item => (
          <div key={item.id} className="bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
             <span className="text-xs font-bold text-slate-700 truncate mr-2">{item.title}</span>
             <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colorClass} bg-white border border-current opacity-70 group-hover:opacity-100`}>
               {item.estimatedCost}
             </span>
          </div>
        ))}
        {items.length === 0 && (
           <div className="text-xs text-slate-400 italic">No investments</div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Investment Matrix</CardTitle>
      </CardHeader>
      <CardContent className="p-6 relative">
         <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-widest origin-center">
           Business Impact
         </div>
         <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           Implementation Effort
         </div>
         
         <div className="grid grid-cols-2 grid-rows-2 gap-4 pl-6 pb-6 h-[400px]">
            {/* Top Left: Quick Wins (High Impact, Low Effort) */}
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.1}}>
              {renderQuadrant('Quick Wins', matrix.quickWins, 'text-emerald-600', 'bg-gradient-to-br from-emerald-50 to-white')}
            </motion.div>
            
            {/* Top Right: Strategic Investments (High Impact, High Effort) */}
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.2}}>
              {renderQuadrant('Strategic Investments', matrix.strategic, 'text-indigo-600', 'bg-gradient-to-br from-indigo-50 to-white')}
            </motion.div>
            
            {/* Bottom Left: Major Programs (Low Impact, Low Effort) */}
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.3}}>
              {renderQuadrant('Major Programs', matrix.major, 'text-amber-600', 'bg-gradient-to-br from-amber-50 to-white')}
            </motion.div>
            
            {/* Bottom Right: Future Opportunities (Low Impact, High Effort) */}
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.4}}>
               {renderQuadrant('Future Opportunities', matrix.future, 'text-slate-500', 'bg-slate-50')}
            </motion.div>
         </div>
      </CardContent>
    </Card>
  );
}
