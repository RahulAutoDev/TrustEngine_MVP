import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink, RefreshCw, FileText, BadgeCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface AssessmentSuccessDialogProps {
  organizationName: string;
  systemName: string;
  trustScore: number;
  riskLevel: string;
  complianceScore: number;
  trustLevel: string;
  boardDecision: string;
  onClose: () => void;
}

export function AssessmentSuccessDialog({ 
  organizationName, systemName, trustScore, riskLevel, complianceScore, trustLevel, boardDecision, onClose 
}: AssessmentSuccessDialogProps) {
  
  // Create small floating particles for premium "confetti"
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/95 backdrop-blur-md">
      
      {/* Premium Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
           <motion.div
             key={p.id}
             initial={{ opacity: 0, y: "100vh", x: `${p.x}vw` }}
             animate={{ 
               opacity: [0, 1, 0],
               y: "-20vh",
               x: `${p.x + (Math.random() * 10 - 5)}vw`
             }}
             transition={{ 
               duration: 8 + Math.random() * 5, 
               repeat: Infinity, 
               delay: p.delay,
               ease: "linear"
             }}
             className="absolute w-2 h-2 bg-indigo-500 rounded-full blur-[2px] opacity-30"
           />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden relative z-10 my-8"
      >
        {/* Header */}
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-6">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Assessment Successfully Completed
            </h2>
            <p className="text-indigo-200 text-lg font-medium tracking-wide">
              AI Governance Assessment Package Ready
            </p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left: Summary Data */}
            <div className="lg:col-span-1 space-y-6">
               <Card className="border-slate-100 bg-slate-50 shadow-sm">
                 <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Organization</p>
                      <p className="font-bold text-slate-800">{organizationName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI System</p>
                      <p className="font-bold text-slate-800">{systemName}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-600">Trust Score</span>
                        <span className="text-xl font-black text-indigo-600">{trustScore}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-600">Governance</span>
                        <Badge variant="outline" className="text-xs bg-white">{trustLevel}</Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-600">Risk Level</span>
                        <Badge variant="outline" className="text-xs bg-white text-slate-700">{riskLevel}</Badge>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-600">Compliance</span>
                        <span className="text-sm font-bold text-slate-800">{complianceScore}%</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-600">Confidence</span>
                        <span className="text-sm font-bold text-emerald-600">96%</span>
                      </div>
                    </div>
                 </CardContent>
               </Card>
               
               <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm">
                 <CardContent className="p-5 text-center">
                   <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Executive Decision</p>
                   <h3 className="text-lg font-black text-indigo-900 leading-tight mb-3">{boardDecision}</h3>
                   <div className="flex items-center justify-center gap-3 text-sm">
                     <span className="font-semibold text-slate-500 line-through">{trustScore}</span>
                     <span className="text-emerald-500 font-bold">→</span>
                     <span className="font-black text-emerald-600 text-lg">{Math.min(trustScore + 12, 100)}</span>
                   </div>
                   <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Projected Score</p>
                 </CardContent>
               </Card>
            </div>

            {/* Right: Statement & Actions */}
            <div className="lg:col-span-2 space-y-8">
               
               <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
                 <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium">
                   "The Trust Assessment Engine has successfully completed the AI Governance Assessment using the TAIG Framework. 
                   The assessment provides evidence-based insights into governance maturity, identifies key improvement opportunities, 
                   and delivers executive recommendations to support responsible AI deployment. 
                   The generated Trust Score, Governance Badge, Executive Decision Package, and Assessment Certificate are now ready for executive review."
                 </p>
               </div>

               <div>
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Package Contents</h4>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                   {[
                     'Assessment Complete', 'Certificate Ready', 'Verification Complete', 'Executive Report Ready', 'Copilot Analysis Ready'
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-2.5 rounded-xl">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                       <span className="text-xs font-bold text-emerald-800 leading-tight">{item}</span>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="pt-6 border-t border-slate-100">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <Button size="lg" className="w-full h-14 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md">
                     <FileText className="w-5 h-5 mr-2" /> Download Executive Report
                   </Button>
                   <Button size="lg" className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                     <BadgeCheck className="w-5 h-5 mr-2" /> Download Certificate
                   </Button>
                   <Button variant="outline" size="lg" className="w-full h-14 rounded-xl border-slate-300 font-semibold text-slate-700" onClick={onClose}>
                     <ExternalLink className="w-5 h-5 mr-2" /> View Verification Page
                   </Button>
                   <Button variant="outline" size="lg" className="w-full h-14 rounded-xl border-slate-300 font-semibold text-slate-700 hover:bg-slate-50" onClick={() => window.location.href = '/'}>
                     <RefreshCw className="w-5 h-5 mr-2" /> Start New Assessment
                   </Button>
                 </div>
               </div>
            </div>

          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-bold text-slate-700 flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-indigo-500"/> Trust Assessment Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Using <span className="font-bold text-slate-700">TAIG Framework v1.0</span></span>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">Hackathon MVP</Badge>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
