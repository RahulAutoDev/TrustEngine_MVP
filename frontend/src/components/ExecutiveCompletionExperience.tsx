import { useState } from 'react';
import { CompletionAnimation } from './CompletionAnimation';
import { AssessmentSuccessDialog } from './AssessmentSuccessDialog';

export interface ExecutiveCompletionExperienceProps {
  organizationName: string;
  systemName: string;
  trustScore: number;
  riskLevel: string;
  complianceScore: number;
  trustLevel: string;
  boardDecision: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ExecutiveCompletionExperience({
  organizationName,
  systemName,
  trustScore,
  riskLevel,
  complianceScore,
  trustLevel,
  boardDecision,
  isOpen,
  onClose
}: ExecutiveCompletionExperienceProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {!animationComplete && (
        <CompletionAnimation 
          trustScore={trustScore} 
          onComplete={() => setAnimationComplete(true)} 
        />
      )}
      
      {animationComplete && (
        <AssessmentSuccessDialog 
          organizationName={organizationName}
          systemName={systemName}
          trustScore={trustScore}
          riskLevel={riskLevel}
          complianceScore={complianceScore}
          trustLevel={trustLevel}
          boardDecision={boardDecision}
          onClose={() => {
            setAnimationComplete(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
