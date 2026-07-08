import QRCode from 'react-qr-code';

export interface AssessmentQRCodeProps {
  assessmentId: string;
}

export function AssessmentQRCode({ assessmentId }: AssessmentQRCodeProps) {
  // Use the current window origin so it works correctly on any deployed environment or localhost
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://trustengine.demo';
  const verificationUrl = `${origin}/verify/${assessmentId}`;

  return (
    <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
      <div className="bg-white p-2 rounded-lg border border-slate-100 mb-2 shadow-inner">
        <QRCode 
          value={verificationUrl}
          size={120}
          level="M"
          bgColor="#ffffff"
          fgColor="#0f172a" // slate-900
        />
      </div>
      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider text-center">
        Scan to Verify<br/>Assessment
      </span>
    </div>
  );
}
