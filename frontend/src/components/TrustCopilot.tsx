import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, RefreshCcw, ChevronRight, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { copilotService, type CopilotResponse, type CopilotRequest } from '@/services/copilotService';
import { RecommendationCard } from './RecommendationCard';
import { RoadmapTimeline } from './RoadmapTimeline';
import { ExecutiveSummary } from './ExecutiveSummary';
import { BusinessImpactCard } from './BusinessImpactCard';

export interface TrustCopilotProps {
  requestData: CopilotRequest;
}

const EXECUTIVE_QUESTIONS = [
  "Why is our Trust Score at this level?",
  "How do we reach AI Trust Champion?",
  "What is our biggest governance risk?",
  "Which recommendation should we implement first?",
  "What will improve our Trust Score fastest?"
];

export function TrustCopilot({ requestData }: TrustCopilotProps) {
  const [data, setData] = useState<CopilotResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'analysis' | 'recommendations' | 'roadmap'>('analysis');
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    copilotService.analyzeAssessment(requestData).then(res => {
      setData(res);
      setLoading(false);
      setConversation([
        {
          role: 'assistant',
          text: `Hello! I'm Trust Copilot™. I've analyzed ${requestData.organizationName}'s AI Governance Assessment. I've generated an executive summary, a prioritized recommendation list, and a 90-day roadmap. How can I help you understand your results?`
        }
      ]);
    });
  }, [requestData]);

  const handleQuestionClick = (question: string) => {
    setConversation(prev => [...prev, { role: 'user', text: question }]);
    setIsTyping(true);
    
    // Simulate AI response based on the question
    setTimeout(() => {
      let responseText = "";
      if (question.includes("Why is our Trust Score")) {
         responseText = `Your score of ${requestData.trustScore} is primarily limited by gaps in ${data?.executiveSummary.criticalWeakness}. Addressing this area is critical for improving your overall maturity.`;
      } else if (question.includes("Champion")) {
         responseText = `To reach Champion status, you must implement the 90-day roadmap, specifically focusing on ${data?.roadmap[2]?.actions.join(' and ')}. This will push your projected score to ${data?.executiveSummary.projectedScore}.`;
      } else if (question.includes("biggest governance risk")) {
         responseText = `Your biggest risk is ${data?.executiveSummary.criticalWeakness}. ${data?.executiveSummary.risks}`;
      } else if (question.includes("first")) {
         responseText = `You should start with: "${data?.recommendations[0]?.title}". It requires ${data?.recommendations[0]?.effort} effort but provides a significant +${data?.recommendations[0]?.estimatedTrustImprovement} point boost to your Trust Score.`;
      } else if (question.includes("fastest")) {
         responseText = `The fastest way to improve your score is to focus on High Priority items with Low Effort. Specifically: "${data?.recommendations.find(r => r.effort === 'Low')?.title || data?.recommendations[0]?.title}".`;
      } else {
         responseText = "That is a great question. Based on your assessment, improving transparency and security will have the most significant impact on your regulatory readiness.";
      }

      setConversation(prev => [...prev, { role: 'assistant', text: responseText }]);
      setIsTyping(false);
    }, 1000);
  };

  if (loading) {
    return (
      <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden w-full">
        <CardContent className="p-12 flex flex-col items-center justify-center min-h-[400px]">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
             <RefreshCcw className="w-12 h-12 text-indigo-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2 flex items-center">
            <Bot className="w-6 h-6 mr-2 text-indigo-600" /> Trust Copilot is analyzing your results...
          </h3>
          <p className="text-slate-500 text-sm">Generating executive recommendations and roadmap</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="border-indigo-200 shadow-xl overflow-hidden bg-white w-full">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* LEFT PANEL: Assessment Context */}
        <div className="w-full lg:w-1/3 bg-slate-900 text-white p-6 md:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-500 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-white" /></div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Trust Copilot™</h2>
              <p className="text-indigo-200 text-xs uppercase tracking-wider font-semibold">Executive AI Advisor</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-5 mb-6 border border-slate-700">
            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current Posture</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black text-white">{requestData.trustScore}</span>
              <span className="text-xl font-bold text-slate-500 mb-1">/100</span>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-slate-700 hover:bg-slate-700 text-white border-none">{requestData.riskLevel} Risk</Badge>
              <Badge className="bg-indigo-600 hover:bg-indigo-600 text-white border-none text-[10px] uppercase">Confidence: {data.confidence}%</Badge>
            </div>
          </div>

          {/* Score Projection Animation */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800/50 rounded-xl p-5 mb-8 border border-indigo-500/30">
             <div className="flex items-center justify-between mb-3">
               <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Projected Score</p>
               <TrendingUp className="w-4 h-4 text-emerald-400" />
             </div>
             <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-slate-400 line-through">{requestData.trustScore}</span>
                <ChevronRight className="w-5 h-5 text-slate-600" />
                <span className="text-4xl font-black text-emerald-400">{data.executiveSummary.projectedScore}</span>
             </div>
             <Progress value={(data.executiveSummary.projectedScore / 100) * 100} className="h-1.5 mt-4 bg-slate-700 [&>div]:bg-emerald-400" />
             <p className="text-[10px] text-emerald-400/80 mt-2 font-medium">Expected Improvement: +{data.executiveSummary.projectedScore - requestData.trustScore} Points</p>
          </div>

          <div className="mt-auto">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Category Scores</h4>
             <div className="space-y-3">
               {Object.entries(requestData.categoryScores).map(([cat, score]) => (
                 <div key={cat}>
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-slate-300">{cat}</span>
                     <span className="font-bold text-white">{score}</span>
                   </div>
                   <Progress value={score} className="h-1 bg-slate-800 [&>div]:bg-indigo-500" />
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* RIGHT PANEL: Copilot UI */}
        <div className="w-full lg:w-2/3 flex flex-col bg-slate-50/50">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-white px-4 pt-4 gap-6 overflow-x-auto hide-scrollbar">
             {[
               { id: 'analysis', label: 'AI Analysis' },
               { id: 'recommendations', label: `Recommendations (${data.recommendations.length})` },
               { id: 'roadmap', label: 'Executive Roadmap' }
             ].map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`pb-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
               >
                 {tab.label}
               </button>
             ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'analysis' && (
                <motion.div key="analysis" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                  <ExecutiveSummary summary={data.executiveSummary} />
                  <BusinessImpactCard />
                  
                  {/* Chat Interface for Executive Questions */}
                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                      <Bot className="w-4 h-4 mr-2 text-indigo-600" /> Ask Copilot
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      {conversation.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-sm'}`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm p-4 shadow-sm flex gap-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {EXECUTIVE_QUESTIONS.map((q, i) => (
                        <Button 
                          key={i} 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleQuestionClick(q)}
                          disabled={isTyping}
                          className="rounded-full text-xs bg-white hover:bg-indigo-50 hover:text-indigo-700 border-slate-200"
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'recommendations' && (
                <motion.div key="recs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Prioritized Action Plan</h3>
                    <p className="text-sm text-slate-500">AI-generated recommendations to improve your governance posture.</p>
                  </div>
                  {data.recommendations.map((rec, i) => (
                    <RecommendationCard key={i} recommendation={rec} />
                  ))}
                </motion.div>
              )}

              {activeTab === 'roadmap' && (
                <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900">Executive Roadmap</h3>
                    <p className="text-sm text-slate-500">A phased approach to achieving AI Trust Champion status.</p>
                  </div>
                  <RoadmapTimeline milestones={data.roadmap} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </Card>
  );
}
