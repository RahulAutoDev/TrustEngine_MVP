import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, QrCode } from 'lucide-react';
import { DigitalStamp } from './DigitalStamp';
import { TrustSealAnimation } from './TrustSealAnimation';

export interface CompletionAnimationProps {
  trustScore: number;
  onComplete: () => void;
}

export function CompletionAnimation({ trustScore, onComplete }: CompletionAnimationProps) {
  const [step, setStep] = useState(1);
  const [loadingMessages, setLoadingMessages] = useState<string[]>([]);
  const [displayScore, setDisplayScore] = useState(0);

  const ALL_MESSAGES = [
    'Validating Governance Assessment',
    'Verifying Trust Score',
    'Reviewing AI Recommendations',
    'Preparing Executive Summary',
    'Generating Executive Decision',
    'Preparing Assessment Certificate',
    'Creating Verification Package'
  ];

  useEffect(() => {
    // Step 1: Loading sequence
    if (step === 1) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < ALL_MESSAGES.length) {
          setLoadingMessages(prev => [...prev, ALL_MESSAGES[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStep(2), 500);
        }
      }, 400); // approx 3 seconds total
      return () => clearInterval(interval);
    }

    // Step 2: Score Lock
    if (step === 2) {
      let currentScore = 0;
      const scoreInterval = setInterval(() => {
        if (currentScore < trustScore) {
          currentScore += Math.max(1, Math.floor((trustScore - currentScore) / 4));
          setDisplayScore(currentScore);
        } else {
          setDisplayScore(trustScore);
          clearInterval(scoreInterval);
          setTimeout(() => setStep(3), 1500);
        }
      }, 50);
      return () => clearInterval(scoreInterval);
    }

    // Progression of static steps
    if (step === 3) setTimeout(() => setStep(4), 2000); // Board Res -> Cert
    if (step === 4) setTimeout(() => setStep(5), 2500); // Cert -> Seal
    if (step === 5) setTimeout(() => setStep(6), 2000); // Seal -> QR
    if (step === 6) setTimeout(() => onComplete(), 2500); // QR -> Done (Step 7 triggers success dialog via onComplete)

  }, [step, trustScore, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden bg-slate-900/90 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        
        {/* Step 1: Loading */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <h3 className="text-xl font-bold text-slate-900">Analyzing Evidence...</h3>
            </div>
            <div className="space-y-3">
              {loadingMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {msg}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Score Lock */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-indigo-200 uppercase tracking-widest mb-8">Trust Score Locked</h3>
            <div className="relative">
              <div className="w-64 h-64 rounded-full border-8 border-slate-700 flex flex-col items-center justify-center bg-slate-800 shadow-[0_0_50px_rgba(79,70,229,0.3)]">
                <span className="text-8xl font-black text-white">{displayScore}</span>
              </div>
              {displayScore === trustScore && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full font-bold uppercase tracking-wider shadow-lg border-2 border-emerald-400"
                >
                  Verified
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Board Resolution */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-3xl p-10 max-w-2xl w-full text-center shadow-2xl relative overflow-hidden"
          >
             <h3 className="text-3xl font-bold text-slate-900 mb-8">Executive Board Resolution</h3>
             <div className="mb-10 text-slate-600 font-serif italic text-lg px-8">
               Digital signature applied. Governance maturity mapped to enterprise risk thresholds.
             </div>
             <DigitalStamp status={trustScore >= 65 ? 'APPROVED' : 'REJECTED'} />
          </motion.div>
        )}

        {/* Step 4: Certificate Stamp */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-[#fdfbf7] rounded-xl p-12 max-w-3xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-double border-slate-200 relative"
          >
             <div className="text-center mb-12">
               <h1 className="text-4xl font-serif text-slate-800 mb-4">AI Governance Certificate</h1>
               <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
             </div>
             <div className="flex justify-center mt-16">
               <DigitalStamp status="VERIFIED" />
             </div>
          </motion.div>
        )}

        {/* Step 5: Trust Seal */}
        {step === 5 && (
          <motion.div key="step5" exit={{ opacity: 0 }}>
             <TrustSealAnimation />
          </motion.div>
        )}

        {/* Step 6: QR Code */}
        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-12 rounded-3xl flex flex-col items-center justify-center shadow-2xl"
          >
            <div className="p-4 border-4 border-slate-900 rounded-2xl mb-6">
              <QrCode className="w-48 h-48 text-slate-900" />
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-sm">
              <CheckCircle2 className="w-5 h-5" /> Verified
            </div>
            <h3 className="mt-4 text-2xl font-black text-slate-900">Digital Verification Ready</h3>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
