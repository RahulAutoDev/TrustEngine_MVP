
export function ReportFooter({ timestamp }: { timestamp: string }) {
  return (
    <div className="w-full py-4 border-t border-slate-200 mt-auto flex justify-between items-center text-[9px] text-slate-400 font-medium uppercase tracking-widest px-12 absolute bottom-0 bg-white">
      <span>Trust Assessment Engine • v1.0 Enterprise</span>
      <span className="text-rose-500 font-bold">Strictly Confidential</span>
      <span>Generated: {new Date(timestamp).toLocaleDateString()}</span>
    </div>
  );
}
