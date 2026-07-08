
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { LineChart as LineChartIcon, ShieldCheck } from 'lucide-react';
import type { TransformationRoadmapData } from '@/services/roadmapService';

export function TrustProgressChart({ data }: { data: TransformationRoadmapData }) {
  const chartData = [
    { name: 'Current', score: data.currentScore, badge: data.currentBadge },
    ...data.milestones.map(m => ({
      name: m.date,
      score: m.trustScore,
      badge: m.governanceBadge
    }))
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-white">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{label}</p>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-black text-emerald-400">{dataPoint.score}</span>
            <span className="text-xs font-bold text-slate-300 mb-1">Score</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded border border-slate-700">
             <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
             <span className="text-xs font-bold text-indigo-200">{dataPoint.badge}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-indigo-500" />
          Trust Score Progression
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <ReferenceLine y={90} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'top', value: 'Trust Champion Threshold', fill: '#10b981', fontSize: 10, fontWeight: 700 }} />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#6366f1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
                activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
           <div className="flex flex-col">
             <span className="text-[10px] uppercase font-bold text-slate-400">Current</span>
             <span className="text-sm font-bold text-slate-700">{data.currentBadge}</span>
           </div>
           <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-4"></div>
           <div className="flex flex-col items-end">
             <span className="text-[10px] uppercase font-bold text-indigo-500">Target</span>
             <span className="text-sm font-bold text-indigo-700">{data.targetBadge}</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
