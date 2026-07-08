import { useState, useEffect } from 'react';
import { 
  Building2, ShieldCheck, BadgeCheck, AlertTriangle, XCircle, ChevronRight, 
  ShieldAlert, CheckCircle2, Users, Clock, Target, CalendarDays,
  FileSignature, TrendingUp
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExecutiveCompletionExperience } from './ExecutiveCompletionExperience';

import { boardDecisionEngine, type BoardResolutionOutput } from '@/services/BoardDecisionEngine';
import type { ExecutiveDecisionInput } from '@/services/decisionTypes';

export interface ExecutiveBoardResolutionProps {
  requestData: ExecutiveDecisionInput;
}

export function ExecutiveBoardResolution({ requestData }: ExecutiveBoardResolutionProps) {
  const [data, setData] = useState<BoardResolutionOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    boardDecisionEngine.evaluate(requestData).then(res => {
      setData(res);
      setLoading(false);
    });
  }, [requestData]);

  if (loading) {
    return (
      <Card className="border-indigo-100 bg-white overflow-hidden w-full shadow-sm animate-pulse">
        <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
          <Building2 className="w-16 h-16 text-slate-200 mb-6" />
          <h3 className="text-2xl font-bold text-slate-300">Drafting Board Resolution...</h3>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const getDecisionStyles = (color: string) => {
    switch (color) {
      case 'Green': return { bg: 'bg-emerald-600', text: 'text-emerald-700', lightBg: 'bg-emerald-50', border: 'border-emerald-200', icon: <BadgeCheck className="w-12 h-12 text-emerald-600" /> };
      case 'Blue': return { bg: 'bg-blue-600', text: 'text-blue-700', lightBg: 'bg-blue-50', border: 'border-blue-200', icon: <CheckCircle2 className="w-12 h-12 text-blue-600" /> };
      case 'Amber': return { bg: 'bg-amber-500', text: 'text-amber-700', lightBg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="w-12 h-12 text-amber-500" /> };
      case 'Orange': return { bg: 'bg-orange-500', text: 'text-orange-700', lightBg: 'bg-orange-50', border: 'border-orange-200', icon: <ShieldAlert className="w-12 h-12 text-orange-500" /> };
      case 'Red': return { bg: 'bg-red-600', text: 'text-red-700', lightBg: 'bg-red-50', border: 'border-red-200', icon: <XCircle className="w-12 h-12 text-red-600" /> };
      default: return { bg: 'bg-slate-600', text: 'text-slate-700', lightBg: 'bg-slate-50', border: 'border-slate-200', icon: <ShieldCheck className="w-12 h-12 text-slate-600" /> };
    }
  };

  const styles = getDecisionStyles(data.color);

  const getVoteStyles = (voteType: string) => {
     if (voteType === data.vote) {
       return `bg-indigo-600 text-white border-indigo-600 shadow-md ring-4 ring-indigo-100 ring-offset-1`;
     }
     return `bg-slate-50 text-slate-400 border-slate-200 opacity-60`;
  };

  return (
    <Card className="border-slate-200 shadow-2xl overflow-hidden bg-white w-full relative">
      {/* Premium Glassmorphism Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-8 py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-6 shadow-2xl">
            <Building2 className="w-8 h-8 text-indigo-200" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Executive Board Resolution</h2>
          <p className="text-indigo-200 font-medium tracking-wide uppercase text-sm mb-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Strategic AI Governance Decision
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 items-center w-full max-w-4xl mx-auto">
            {/* Board Decision Badge */}
            <div className="bg-white rounded-3xl p-6 shadow-xl flex items-center gap-6 w-full md:w-1/2 border border-slate-100 transform hover:scale-[1.02] transition-transform">
               <div className={`p-4 rounded-full ${styles.lightBg} shrink-0`}>
                 {styles.icon}
               </div>
               <div className="text-left">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Board Decision</p>
                 <h3 className={`text-xl font-black ${styles.text} leading-tight`}>{data.decision}</h3>
               </div>
            </div>

            {/* Projected Improvement */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl w-full md:w-1/2 border border-white/20 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Current</p>
                    <span className="text-3xl font-bold text-slate-300 line-through">{data.expectedOutcome.currentScore}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ChevronRight className="w-6 h-6 text-emerald-400 mb-1" />
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] whitespace-nowrap">+{data.expectedOutcome.improvement} Pts</Badge>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">Target</p>
                     <span className="text-4xl font-black text-white">{data.expectedOutcome.expectedScore}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-indigo-200 text-xs font-semibold">
                  <CalendarDays className="w-3.5 h-3.5" /> Expected Timeline: {data.expectedOutcome.timeline}
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10 max-w-6xl mx-auto space-y-12">
        
        {/* Formal Resolution Text */}
        <div className="bg-slate-50 border-l-4 border-indigo-600 p-6 md:p-8 rounded-r-2xl shadow-sm">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-serif italic text-justify">
            "{data.resolutionText}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* Board Action Items */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center border-b border-slate-100 pb-3">
                <Target className="w-5 h-5 mr-3 text-indigo-600" /> Board Action Items
              </h3>
              <div className="space-y-4">
                {data.actionItems.map((action, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4 mb-4 md:mb-0 w-full md:w-2/3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                        {i + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                           <Badge variant="outline" className={`text-[9px] uppercase tracking-wider font-bold ${action.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' : action.priority === 'MEDIUM' ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-blue-600 border-blue-200 bg-blue-50'} px-2 py-0`}>
                             {action.priority} Priority
                           </Badge>
                           <h4 className="font-bold text-slate-900 text-sm">{action.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500">{action.expectedOutcome}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                       <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-50 px-2 py-1 rounded">
                         <Users className="w-3.5 h-3.5 text-indigo-500" /> {action.owner}
                       </div>
                       <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-slate-50 px-2 py-1 rounded">
                         <Clock className="w-3.5 h-3.5 text-emerald-500" /> {action.timeline}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Executive Risks */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center border-b border-slate-100 pb-3">
                <ShieldAlert className="w-5 h-5 mr-3 text-red-500" /> Top Executive Risks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {data.topRisks.map((risk, i) => (
                   <Card key={i} className="border-red-100 shadow-sm bg-red-50/30">
                     <CardContent className="p-4">
                       <Badge variant="outline" className="mb-3 bg-white text-red-600 border-red-200 text-[10px] uppercase font-bold">{risk.severity}</Badge>
                       <h4 className="font-bold text-slate-800 text-sm mb-2">{risk.name}</h4>
                       <p className="text-xs text-slate-600 mb-4">{risk.businessImpact}</p>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                         <Users className="w-3 h-3" /> Owner: {risk.owner}
                       </div>
                     </CardContent>
                   </Card>
                 ))}
              </div>
            </div>
            
            {/* Expected Business Outcomes */}
            <div>
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center border-b border-slate-100 pb-3">
                <TrendingUp className="w-5 h-5 mr-3 text-emerald-600" /> Expected Business Outcomes
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Reduced Regulatory Risk', 'Improved Executive Confidence', 'Higher Customer Trust', 'Enhanced AI Transparency', 'Production Readiness'].map((outcome, i) => (
                   <div key={i} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg">
                     <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                     <span className="text-xs font-bold text-emerald-800">{outcome}</span>
                   </div>
                ))}
              </div>
            </div>

          </div>

          <div className="space-y-8">
            
            {/* Executive Scorecard */}
            <Card className="border-slate-200 shadow-md">
              <div className="bg-slate-50 p-4 border-b border-slate-100 text-center">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Executive Scorecard</h3>
              </div>
              <CardContent className="p-0 divide-y divide-slate-100">
                 {[
                   { label: 'Current Trust Score', value: requestData.trustScore, highlight: true },
                   { label: 'Governance Maturity', value: requestData.governanceMaturity },
                   { label: 'Risk Level', value: requestData.riskLevel },
                   { label: 'Compliance Score', value: `${requestData.complianceScore}%` },
                   { label: 'Recommendation Confidence', value: `${data.metadata.confidence}%` },
                   { label: 'Assessment Status', value: 'Completed' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4">
                     <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                     <span className={`text-sm font-bold ${item.highlight ? 'text-indigo-600 text-lg' : 'text-slate-800'}`}>{item.value}</span>
                   </div>
                 ))}
              </CardContent>
            </Card>

            {/* Board Vote Panel */}
            <Card className="border-slate-200 shadow-md">
               <div className="bg-slate-900 p-4 border-b border-slate-800 text-center rounded-t-xl">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Board Vote Recommendation</h3>
              </div>
              <CardContent className="p-5 flex flex-col gap-3 bg-slate-50">
                {['Approve', 'Approve with Conditions', 'Reject'].map((vote, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${getVoteStyles(vote)}`}>
                    <span className="text-sm font-bold">{vote}</span>
                    {vote === data.vote && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Digital Approval */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-xs text-slate-500 font-mono space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                <span className="font-bold flex items-center gap-1.5"><FileSignature className="w-3.5 h-3.5" /> Digital Approval</span>
              </div>
              <div className="flex justify-between"><span>Generated By:</span> <span className="font-semibold text-slate-700">Trust Assessment Engine</span></div>
              <div className="flex justify-between"><span>Framework:</span> <span className="font-semibold text-slate-700">{data.metadata.framework}</span></div>
              <div className="flex justify-between"><span>Timestamp:</span> <span className="font-semibold text-slate-700">{new Date(data.metadata.timestamp).toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Assessment ID:</span> <span className="font-semibold text-slate-700">TAE-8932-XYZ</span></div>
            </div>

          </div>
        </div>

        {/* Executive Quote */}
        <div className="relative text-center max-w-4xl mx-auto py-8">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-indigo-200 rounded-full"></div>
           <p className="text-slate-500 font-medium italic text-lg leading-relaxed mt-6">
             "This assessment provides a structured, evidence-based view of AI governance maturity. Addressing the identified gaps will improve organizational trust, strengthen regulatory readiness, and support responsible AI deployment."
           </p>
        </div>

        {/* Final CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-slate-100">
           <Button 
             size="lg" 
             onClick={() => setShowCompletion(true)}
             className="rounded-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] px-10 h-14 text-lg border-2 border-indigo-400/30 transition-all duration-300 w-full sm:w-auto"
           >
             <ShieldCheck className="w-5 h-5 mr-2" /> Generate Executive Decision Package
           </Button>
        </div>
      </div>

      <ExecutiveCompletionExperience 
        isOpen={showCompletion}
        onClose={() => setShowCompletion(false)}
        organizationName={requestData.organizationName}
        systemName={requestData.systemName}
        trustScore={requestData.trustScore}
        riskLevel={requestData.riskLevel}
        complianceScore={requestData.complianceScore}
        trustLevel={requestData.governanceMaturity}
        boardDecision={data.decision}
      />
    </Card>
  );
}
