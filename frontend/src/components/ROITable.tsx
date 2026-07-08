import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ROIRecommendation } from '@/services/roiService';

export function ROITable({ recommendations }: { recommendations: ROIRecommendation[] }) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Executive Implementation Table</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Recommendation</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4 text-center">Priority</th>
              <th className="px-4 py-4">Business Value</th>
              <th className="px-4 py-4 text-center">Trust Gain</th>
              <th className="px-4 py-4 text-center">Effort</th>
              <th className="px-4 py-4">Timeline</th>
              <th className="px-4 py-4 text-center">Business Impact</th>
              <th className="px-4 py-4">Owner</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recommendations.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{rec.title}</td>
                <td className="px-4 py-4 text-slate-600">{rec.category}</td>
                <td className="px-4 py-4 text-center">
                  <Badge variant="outline" className={`text-[10px] uppercase font-bold px-2 py-0.5 ${
                    rec.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' :
                    rec.priority === 'MEDIUM' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                    'text-blue-600 border-blue-200 bg-blue-50'
                  }`}>
                    {rec.priority}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-slate-700 font-medium">{rec.businessValue}</td>
                <td className="px-4 py-4 text-center font-black text-emerald-600">+{rec.estimatedTrustGain}</td>
                <td className="px-4 py-4 text-center text-slate-600">{rec.effort}</td>
                <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{rec.timeline}</td>
                <td className="px-4 py-4 text-center">
                  <Badge variant="secondary" className={`text-[10px] uppercase font-bold ${
                    rec.businessImpact === 'High' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {rec.businessImpact}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-slate-800 font-semibold">{rec.owner}</td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="flex items-center gap-1.5 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
