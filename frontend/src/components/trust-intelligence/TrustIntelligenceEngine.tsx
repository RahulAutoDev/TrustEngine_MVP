import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Brain } from 'lucide-react';
import { TrustCalculationModal } from './TrustCalculationModal';

export function TrustIntelligenceEngine({ overallScore = 84 }: { overallScore?: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="mt-4 rounded-full border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 transition-all font-semibold shadow-sm flex items-center gap-2 px-4"
      >
        <div className="relative flex items-center justify-center">
          <Shield className="w-4 h-4" />
          <Brain className="w-2.5 h-2.5 absolute mt-0.5" />
        </div>
        How was Trust Calculated?
      </Button>

      <TrustCalculationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        overallScore={overallScore}
      />
    </>
  );
}
