import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  Star, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  ShieldAlert,
  Zap,
  Calendar,
  Building2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface TrustMaturityBadgeProps {
  trustScore: number;
  riskLevel: string;
  complianceScore: number;
  organizationName: string;
  assessmentDate: string;
  confidence?: number;
  executiveMessage?: string;
}

type MaturityLevel = {
  title: string;
  color: string;
  bg: string;
  border: string;
  description: string;
  icon: React.ElementType;
  stars: number;
};

const getMaturityLevel = (score: number): MaturityLevel => {
  if (score >= 95) return {
    title: 'AI Trust Champion',
    color: 'text-emerald-700',
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    description: 'Industry-leading AI governance with mature controls, strong compliance, and exceptional trustworthiness.',
    icon: Award,
    stars: 5
  };
  if (score >= 85) return {
    title: 'AI Trust Leader',
    color: 'text-green-700',
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    border: 'border-green-200',
    description: 'Strong governance practices with only minor improvement opportunities.',
    icon: ShieldCheck,
    stars: 4
  };
  if (score >= 70) return {
    title: 'Governed AI',
    color: 'text-blue-700',
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    description: 'Good governance maturity. Core controls are implemented, but several areas require improvement.',
    icon: CheckCircle2,
    stars: 3
  };
  if (score >= 55) return {
    title: 'Developing Governance',
    color: 'text-amber-700',
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    border: 'border-amber-200',
    description: 'Governance practices exist but are inconsistent and require significant strengthening.',
    icon: AlertTriangle,
    stars: 2
  };
  if (score >= 40) return {
    title: 'At Risk',
    color: 'text-orange-700',
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
    border: 'border-orange-200',
    description: 'Multiple governance weaknesses expose the organization to operational and regulatory risks.',
    icon: AlertTriangle,
    stars: 1
  };
  return {
    title: 'Critical Governance Gaps',
    color: 'text-red-700',
    bg: 'bg-gradient-to-br from-red-50 to-red-100',
    border: 'border-red-200',
    description: 'The AI system lacks fundamental governance controls and requires immediate executive attention.',
    icon: ShieldAlert,
    stars: 0
  };
};

export function TrustMaturityBadge({
  trustScore,
  riskLevel,
  complianceScore,
  organizationName,
  assessmentDate,
  confidence = 96,
  executiveMessage
}: TrustMaturityBadgeProps) {
  
  const level = getMaturityLevel(trustScore);
  const Icon = level.icon;

  const defaultMessage = trustScore >= 80 
    ? "Your organization demonstrates strong governance maturity and is positioned to deploy AI responsibly. Addressing minor gaps could further increase stakeholder trust."
    : "Significant governance gaps exist. Immediate remediation of core principles is required to reduce risk and build stakeholder trust.";

  const message = executiveMessage || defaultMessage;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8"
    >
      <Card className={`overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${level.border} ${level.bg}`}>
        <CardContent className="p-0">
          
          <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 items-start lg:items-center relative">
            
            {/* Background Seal/Watermark */}
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none overflow-hidden h-full w-1/2 flex justify-end items-center">
               <Icon className="w-64 h-64 -mr-16 rotate-12" />
            </div>

            {/* Left: Badge Icon & Main Title */}
            <div className="flex-1 z-10 w-full">
              <div className="flex items-center gap-4 mb-3">
                <motion.div 
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className={`p-4 rounded-2xl bg-white shadow-sm border ${level.border} ${level.color}`}
                >
                  <Icon className="w-10 h-10" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${level.color}`}>
                      {level.title}
                    </h2>
                    <div className="flex gap-0.5 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < level.stars ? level.color : 'text-slate-300'} ${i < level.stars ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-700/80 leading-relaxed max-w-2xl">
                    {level.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white/60 rounded-xl p-4 border border-white/50 shadow-sm backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <Zap className={`w-5 h-5 mt-0.5 shrink-0 ${level.color}`} />
                  <p className="text-sm text-slate-800 font-medium leading-relaxed italic">
                    "{message}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Key Stats */}
            <div className="w-full lg:w-72 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 z-10 shrink-0">
               
               <div className="grid grid-cols-2 gap-4 mb-5">
                 <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl">
                   <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Score</span>
                   <span className={`text-2xl font-black ${level.color}`}>{trustScore}</span>
                 </div>
                 <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl">
                   <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Risk</span>
                   <span className={`text-lg font-bold ${riskLevel === 'Low' ? 'text-green-600' : riskLevel === 'Medium' ? 'text-amber-600' : 'text-red-600'} flex items-center h-full`}>
                     {riskLevel}
                   </span>
                 </div>
               </div>

               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-xs font-bold mb-1.5">
                     <span className="text-slate-600">Compliance</span>
                     <span className="text-slate-900">{complianceScore}%</span>
                   </div>
                   <Progress value={complianceScore} className="h-1.5 bg-slate-100 [&>div]:bg-slate-800" />
                 </div>

                 <div className="cursor-help" title="Confidence is based on questionnaire completeness and consistency of responses.">
                   <div className="flex justify-between text-xs font-bold mb-1.5">
                     <span className="text-slate-600 flex items-center">
                       Confidence <Info className="w-3 h-3 ml-1 text-slate-400" />
                     </span>
                     <span className="text-slate-900">{confidence}%</span>
                   </div>
                   <Progress value={confidence} className="h-1.5 bg-slate-100 [&>div]:bg-indigo-500" />
                 </div>
               </div>

            </div>

          </div>

          {/* Footer */}
          <div className="bg-slate-900/5 border-t border-slate-900/10 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600">
             <div className="flex items-center gap-4">
               <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {organizationName}</span>
               <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {assessmentDate}</span>
             </div>
             <div className="flex items-center gap-4">
               <span>Framework: TAIG v1.0</span>
               <span className="px-2 py-0.5 rounded bg-slate-900/10 text-slate-700">Hackathon Edition</span>
             </div>
          </div>
          
        </CardContent>
      </Card>
    </motion.div>
  );
}
