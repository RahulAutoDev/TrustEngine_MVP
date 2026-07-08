import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import type { PortfolioRoadmapItem } from '@/services/investmentService';

export function PortfolioImplementationRoadmap({ roadmap }: { roadmap: PortfolioRoadmapItem[] }) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Recommended Implementation Order</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          {roadmap.map((item, i) => (
            <div key={item.step} className="w-full max-w-sm flex flex-col items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between group hover:border-indigo-300 hover:shadow-md transition-all"
              >
                 <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm shrink-0 border border-indigo-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                     {item.step}
                   </div>
                   <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                     {item.title}
                   </span>
                 </div>
                 <div className="flex flex-col items-end">
                   <span className="text-[10px] uppercase font-bold text-slate-400">Score</span>
                   <span className="text-sm font-black text-emerald-600">{item.expectedScore}</span>
                 </div>
              </motion.div>
              
              {i < roadmap.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (i * 0.15) + 0.1 }}
                  className="py-2"
                >
                  <ArrowDown className="w-5 h-5 text-slate-300" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
