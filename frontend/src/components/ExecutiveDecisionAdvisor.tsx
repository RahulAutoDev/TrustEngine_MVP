import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, BadgeCheck, AlertTriangle, XCircle, TrendingUp, ChevronRight, Activity, ShieldAlert, CheckCircle2, FileText, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

import { decisionEngine } from '@/services/DecisionEngine';
import type { ExecutiveDecisionInput, ExecutiveDecisionOutput } from '@/services/decisionTypes';

export interface ExecutiveDecisionAdvisorProps {
  requestData: ExecutiveDecisionInput;
}

export function ExecutiveDecisionAdvisor({ requestData }: ExecutiveDecisionAdvisorProps) {
  const [data, setData] = useState<ExecutiveDecisionOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    decisionEngine.evaluate(requestData).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [requestData]);

  if (loading) {
    return (
      <Card className="border-indigo-100 bg-white overflow-hidden w-full shadow-sm animate-pulse">
        <CardContent className="p-12 flex flex-col items-center justify-center min-h-[300px]">
          <Shield className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-400">Synthesizing Executive Decision...</h3>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const getDecisionStyles = (color: string) => {
    switch (color) {
      case 'Green': return { bg: 'bg-emerald-600', text: 'text-emerald-700', lightBg: 'bg-emerald-50', border: 'border-emerald-200', icon: <BadgeCheck className="w-8 h-8 text-white" /> };
      case 'Blue': return { bg: 'bg-blue-600', text: 'text-blue-700', lightBg: 'bg-blue-50', border: 'border-blue-200', icon: <CheckCircle2 className="w-8 h-8 text-white" /> };
      case 'Amber': return { bg: 'bg-amber-500', text: 'text-amber-700', lightBg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="w-8 h-8 text-white" /> };
      case 'Orange': return { bg: 'bg-orange-500', text: 'text-orange-700', lightBg: 'bg-orange-50', border: 'border-orange-200', icon: <ShieldAlert className="w-8 h-8 text-white" /> };
      case 'Red': return { bg: 'bg-red-600', text: 'text-red-700', lightBg: 'bg-red-50', border: 'border-red-200', icon: <XCircle className="w-8 h-8 text-white" /> };
      default: return { bg: 'bg-slate-600', text: 'text-slate-700', lightBg: 'bg-slate-50', border: 'border-slate-200', icon: <Shield className="w-8 h-8 text-white" /> };
    }
  };

  const styles = getDecisionStyles(data.color);

  return (
    <Card className="border-slate-200 shadow-xl overflow-hidden bg-white w-full">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-indigo-400" />
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Executive Decision Advisor</h2>
            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">AI-Powered Governance Recommendation</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-bold text-slate-300">Confidence: {data.confidenceScore}%</span>
        </div>
      </div>

      <CardContent className="p-0 flex flex-col">
        
        {/* Decision Banner */}
        <div className={`${styles.bg} p-6 md:p-8 flex items-center gap-6 shadow-inner`}>
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shrink-0">
            {styles.icon}
          </div>
          <div>
            <p className="text-white/80 text-xs uppercase tracking-widest font-bold mb-1">Final Recommendation</p>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{data.decision}</h1>
            <p className="text-white/90 font-medium mt-1 text-sm md:text-base">{data.reason}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Justification & Risks */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            
            <div className={`p-5 rounded-2xl border ${styles.border} ${styles.lightBg}`}>
              <h3 className={`text-sm font-bold ${styles.text} uppercase tracking-wider mb-2 flex items-center`}>
                <FileText className="w-4 h-4 mr-2" /> Executive Justification
              </h3>
              <p className="text-slate-700 font-medium leading-relaxed">
                {data.executiveJustification}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                <ShieldAlert className="w-4 h-4 mr-2 text-red-500" /> Top 3 Governance Risks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.topRisks.map((risk, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-red-200 transition-colors">
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mb-2">
                      {i + 1}
                    </div>
                    <p className="text-sm font-bold text-slate-800">{risk}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                <Activity className="w-4 h-4 mr-2 text-indigo-500" /> Recommended Next Actions
              </h3>
              <div className="space-y-3">
                {data.recommendedActions.map((action, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="mb-3 sm:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`text-[9px] uppercase tracking-wider font-bold ${action.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' : action.priority === 'MEDIUM' ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-blue-600 border-blue-200 bg-blue-50'} px-2 py-0`}>
                          {action.priority}
                        </Badge>
                        <h4 className="font-bold text-slate-800 text-sm">{action.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{action.businessImpact}</p>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Timeline</p>
                        <p className="text-xs font-bold text-slate-700">{action.estimatedTimeline}</p>
                      </div>
                      <div className="bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        <p className="text-[10px] uppercase font-bold text-green-600/70">Trust Impact</p>
                        <p className="text-sm font-black text-green-700">+{action.estimatedTrustImprovement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Outcomes & Benefits */}
          <div className="col-span-1 space-y-6">
            
            {/* Expected Outcome */}
            <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-indigo-500" /> Expected Outcome
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current</p>
                    <span className="text-3xl font-bold text-slate-400 line-through">{data.expectedOutcome.currentScore}</span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-indigo-300" />
                  <div className="text-center">
                     <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Target</p>
                     <span className="text-5xl font-black text-emerald-500">{data.expectedOutcome.expectedScore}</span>
                  </div>
                </div>
                
                <Progress value={(data.expectedOutcome.expectedScore / 100) * 100} className="h-2 mb-2 bg-slate-200 [&>div]:bg-emerald-500" />
                <div className="text-center">
                   <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold">
                     Expected Improvement: +{data.expectedOutcome.improvement}
                   </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Business Benefits */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 pl-1">Business Benefits</h3>
              <div className="space-y-2">
                {[
                  { text: 'Reduced Regulatory Risk', icon: <FileText className="w-4 h-4 text-blue-500" /> },
                  { text: 'Improved Executive Confidence', icon: <BadgeCheck className="w-4 h-4 text-indigo-500" /> },
                  { text: 'Higher Stakeholder Trust', icon: <Shield className="w-4 h-4 text-green-500" /> },
                  { text: 'Better Compliance Readiness', icon: <Activity className="w-4 h-4 text-amber-500" /> },
                  { text: 'Safer AI Deployment', icon: <Lock className="w-4 h-4 text-slate-500" /> }
                ].map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-xl shadow-sm"
                  >
                    <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 shrink-0">
                      {benefit.icon}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}
