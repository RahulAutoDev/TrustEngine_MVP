import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle2 } from 'lucide-react';
import type { RoadmapPhase } from '@/services/roiService';

export function ImplementationRoadmap({ roadmap }: { roadmap: RoadmapPhase[] }) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Implementation Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmap.map((phase, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line for large screens */}
              {i < roadmap.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%-1rem)] w-[calc(100%+2rem)] h-0.5 bg-slate-100 -z-10"></div>
              )}
              
              <div className="bg-white border border-indigo-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <Badge variant="outline" className="w-fit mb-4 bg-indigo-50 text-indigo-700 border-indigo-200 uppercase tracking-widest font-black text-[10px]">
                  {phase.phase}
                </Badge>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" /> Actions
                    </h5>
                    <ul className="space-y-1.5">
                      {phase.actions.map((action, j) => (
                        <li key={j} className="text-sm font-semibold text-slate-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0"></span>
                          <span className="leading-tight">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Business Outcomes
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {phase.outcomes}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Expected Score</span>
                    <span className="text-lg font-black text-emerald-600">{phase.expectedScore}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
