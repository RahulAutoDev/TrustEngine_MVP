import { motion } from 'framer-motion';
import { CalendarDays, Target, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { AdvancedRecommendationsOutput } from '@/services/advancedRecommendationService';

export function ImprovementRoadmapTimeline({ roadmap }: { roadmap: AdvancedRecommendationsOutput['roadmap'] }) {
  return (
    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-100 before:via-indigo-300 before:to-indigo-100">
      {roadmap.map((phase, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          {/* Timeline Marker */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
            <CalendarDays className="w-5 h-5" />
          </div>
          
          <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] shadow-sm hover:shadow-md transition-shadow border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 uppercase tracking-widest font-black text-[10px]">
                  {phase.phase}
                </Badge>
                <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Expected Score: {phase.expectedScore}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-slate-500" /> Objectives
                </h5>
                <ul className="space-y-1">
                  {phase.objectives.map((obj, j) => (
                    <li key={j} className="text-sm font-semibold text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 shrink-0"></span> {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" /> Deliverables
                </h5>
                <div className="flex flex-wrap gap-2">
                  {phase.deliverables.map((del, j) => (
                    <span key={j} className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                      {del}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 font-medium italic">
                  "{phase.benefits}"
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
