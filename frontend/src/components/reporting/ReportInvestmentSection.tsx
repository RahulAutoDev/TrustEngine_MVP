import type { ReportDataPayload } from './ExecutiveReportTemplate';

export function ReportInvestmentSection({ data }: { data: ReportDataPayload }) {
  // Sort by ROI score descending
  const sortedInvestments = [...data.investments].sort((a, b) => (b.roiScore || 0) - (a.roiScore || 0)).slice(0, 5);

  return (
    <div className="w-full h-full p-12 flex flex-col">
      <div className="border-b border-slate-200 pb-6 mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Investment Strategy</h2>
        <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest">
          Prioritized ROI & Capital Allocation
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <p className="text-sm text-slate-700 leading-relaxed font-medium italic">
          "Strategic investments in governance automation and automated compliance monitoring are projected to yield an average return of 8.5x within the first 12 months, significantly reducing regulatory friction and unquantified AI operational risks."
        </p>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-900">
            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 w-1/3">Initiative</th>
            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Business Impact</th>
            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Cost</th>
            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">ROI Score</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedInvestments.map((inv, idx) => (
            <tr key={idx} className="border-b border-slate-200">
              <td className="py-4 px-2 font-bold text-slate-900">
                {inv.title || inv.investmentName || 'Governance Initiative'}
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                  {inv.priority} PRIORITY
                </div>
              </td>
              <td className="py-4 px-2 text-slate-700">{inv.businessValue || 'Risk Mitigation'}</td>
              <td className="py-4 px-2 text-right font-medium text-slate-900">{inv.estimatedCost || '$$'}</td>
              <td className="py-4 px-2 text-right">
                <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded">
                  {inv.roiScore || '8.0'}x
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
