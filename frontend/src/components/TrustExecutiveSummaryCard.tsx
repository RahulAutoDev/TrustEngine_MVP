import { Target, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function TrustExecutiveSummaryCard({ summary, coaching }: { summary: string, coaching: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <Card className="border-indigo-100 bg-white shadow-sm overflow-hidden h-full">
        <div className="bg-indigo-600 px-5 py-3 flex items-center gap-3">
          <Target className="w-5 h-5 text-indigo-200" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Executive Summary</h3>
        </div>
        <CardContent className="p-6">
          <p className="text-slate-700 font-serif text-lg leading-relaxed italic">
            "{summary}"
          </p>
        </CardContent>
      </Card>

      <Card className="border-emerald-100 bg-white shadow-sm overflow-hidden h-full">
        <div className="bg-emerald-600 px-5 py-3 flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-emerald-200" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Coaching Insights</h3>
        </div>
        <CardContent className="p-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l-xl"></div>
             <p className="text-emerald-900 font-medium leading-relaxed">
               {coaching}
             </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
