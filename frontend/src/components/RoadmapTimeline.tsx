import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flag, ArrowRight, Zap } from 'lucide-react';
import type { CopilotMilestone } from '@/services/copilotService';

export function RoadmapTimeline({ milestones }: { milestones: CopilotMilestone[] }) {
  return (
    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-indigo-200 before:to-slate-100">
      {milestones.map((milestone, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          
          {/* Timeline Node */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
            <Flag className="w-4 h-4" />
          </div>
          
          {/* Content Card */}
          <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] shadow-sm border-slate-200 hover:shadow-md transition-shadow group-hover:border-indigo-200 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
             <CardContent className="p-5">
               <div className="flex justify-between items-center mb-2">
                 <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] uppercase font-bold tracking-wider">{milestone.period}</Badge>
                 <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                   <Zap className="w-3 h-3 mr-1" />
                   Target Score: {milestone.expectedScore}
                 </div>
               </div>
               <h4 className="font-bold text-slate-800 text-base mb-2">{milestone.objective}</h4>
               
               <div className="space-y-1.5 mb-4">
                 {milestone.actions.map((action, i) => (
                   <div key={i} className="flex items-center text-sm text-slate-600">
                     <ArrowRight className="w-3.5 h-3.5 mr-2 text-indigo-400" />
                     {action}
                   </div>
                 ))}
               </div>
               
               <div className="bg-slate-50 p-2 rounded border border-slate-100 text-xs font-medium text-slate-500">
                 <span className="font-bold text-slate-700">Value:</span> {milestone.businessBenefit}
               </div>
             </CardContent>
          </Card>
          
        </div>
      ))}
    </div>
  );
}
