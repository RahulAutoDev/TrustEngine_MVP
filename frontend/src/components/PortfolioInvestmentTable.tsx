import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PortfolioInvestment } from '@/services/investmentService';

export function PortfolioInvestmentTable({ investments }: { investments: PortfolioInvestment[] }) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <CardTitle className="text-lg text-slate-800 font-bold">Executive Investment Table</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Investment</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4 text-center">Maturity</th>
              <th className="px-4 py-4 text-center">Priority</th>
              <th className="px-4 py-4">Business Value</th>
              <th className="px-4 py-4 text-center">Trust Gain</th>
              <th className="px-4 py-4 text-center">Effort</th>
              <th className="px-4 py-4 text-center">Cost</th>
              <th className="px-4 py-4">Timeline</th>
              <th className="px-4 py-4 text-center">Risk Reduction</th>
              <th className="px-4 py-4 text-center">Exec Impact</th>
              <th className="px-4 py-4 text-center">ROI Score</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {investments.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{inv.title}</td>
                <td className="px-4 py-4 text-slate-600 font-medium">{inv.category}</td>
                <td className="px-4 py-4 text-center">
                   <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                     inv.currentMaturity === 'High' ? 'bg-emerald-100 text-emerald-700' :
                     inv.currentMaturity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                     'bg-red-100 text-red-700'
                   }`}>
                     {inv.currentMaturity}
                   </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <Badge variant="outline" className={`text-[10px] uppercase font-bold px-2 py-0.5 ${
                    inv.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' :
                    inv.priority === 'MEDIUM' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                    'text-blue-600 border-blue-200 bg-blue-50'
                  }`}>
                    {inv.priority}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-slate-700 font-medium truncate max-w-[200px]">{inv.businessValue}</td>
                <td className="px-4 py-4 text-center font-black text-emerald-600">+{inv.trustScoreGain}</td>
                <td className="px-4 py-4 text-center text-slate-600 font-medium">{inv.implementationEffort}</td>
                <td className="px-4 py-4 text-center font-mono font-bold text-slate-500">{inv.estimatedCost}</td>
                <td className="px-4 py-4 text-slate-600">{inv.timeline}</td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-xs font-bold ${
                    inv.riskReduction === 'Very High' || inv.riskReduction === 'High' ? 'text-emerald-600' : 'text-slate-500'
                  }`}>
                    {inv.riskReduction}
                  </span>
                </td>
                <td className="px-4 py-4 text-center text-slate-700 font-bold">{inv.executiveImpact}</td>
                <td className="px-4 py-4 text-center font-black text-indigo-600 bg-indigo-50/50">
                  {inv.roiScore.toFixed(1)} <span className="text-[10px] text-indigo-400 font-bold">/ 10</span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="flex items-center gap-1.5 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {inv.status}
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
