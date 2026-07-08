import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, User, Crosshair } from 'lucide-react';
import type { TransformationRoadmapData } from '@/services/roadmapService';
import { Badge } from '@/components/ui/badge';

export function TrustImplementationCalendar({ calendar }: { calendar: TransformationRoadmapData['calendarWeeks'] }) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-indigo-500" /> Executive Implementation Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <div className="min-w-[800px]">
           <div className="grid grid-cols-6 border-b border-slate-200 bg-slate-100 divide-x divide-slate-200">
             {calendar.map((col, i) => (
               <div key={i} className="p-3 text-center">
                 <h5 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{col.week}</h5>
               </div>
             ))}
           </div>
           
           <div className="grid grid-cols-6 divide-x divide-slate-100 min-h-[200px]">
             {calendar.map((col, i) => (
               <div key={i} className="p-3 space-y-3 bg-white">
                 {col.tasks.map((task, j) => (
                   <motion.div 
                     key={j}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: (i * 0.1) + (j * 0.05) }}
                     className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 shadow-sm hover:shadow-md transition-shadow cursor-default group hover:border-indigo-300"
                   >
                     <div className="flex items-center justify-between mb-2">
                       <Badge variant="outline" className={`text-[9px] uppercase px-1.5 py-0 border ${
                         task.priority === 'High' ? 'text-red-600 border-red-200 bg-red-50' :
                         task.priority === 'Medium' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                         'text-blue-600 border-blue-200 bg-blue-50'
                       }`}>
                         {task.priority}
                       </Badge>
                     </div>
                     <h6 className="text-xs font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-700">{task.title}</h6>
                     
                     <div className="space-y-1.5 pt-2 border-t border-slate-200">
                       <div className="flex items-start gap-1.5 text-[10px] text-slate-500 font-medium">
                         <User className="w-3 h-3 shrink-0" />
                         <span className="truncate">{task.owner}</span>
                       </div>
                       <div className="flex items-start gap-1.5 text-[10px] text-slate-600 font-bold">
                         <Crosshair className="w-3 h-3 text-emerald-500 shrink-0" />
                         <span className="leading-tight">{task.outcome}</span>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             ))}
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
