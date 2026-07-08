import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart2 } from 'lucide-react';
import type { SimulationBaseline } from '@/services/simulationService';

interface Props {
  baseline: SimulationBaseline;
  projectedScore: number;
}

export function SimulationCharts({ baseline, projectedScore }: Props) {
  const chartData = [
    { name: 'Current', score: baseline.score },
    { name: 'Projected', score: projectedScore }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-white">
          <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{payload[0].payload.name}</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black text-indigo-400">{payload[0].value}</span>
            <span className="text-xs font-bold text-slate-300 mb-1">Score</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-slate-200 shadow-sm bg-white h-full">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-sm text-slate-800 font-bold flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-500" /> Before vs After
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={60}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
