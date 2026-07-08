import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare, ChevronRight, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AdvancedRecommendationsOutput } from '@/services/advancedRecommendationService';

export function InteractiveExecutiveQuestions({ data }: { data: AdvancedRecommendationsOutput }) {
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const questions = [
    {
      q: `Why is ${data.executiveAnalysis.mostCriticalWeakness} my weakest area?`,
      a: `Based on the assessment data, your ${data.executiveAnalysis.mostCriticalWeakness} controls lack automated monitoring and centralized enforcement. This creates a significant compliance gap under current enterprise standards.`
    },
    {
      q: `Which recommendation provides the biggest improvement?`,
      a: `Implementing "${data.recommendations[0]?.title || 'Baseline Controls'}" will yield the highest ROI, projected to increase your Trust Score by +${data.recommendations[0]?.estimatedTrustIncrease || 5} points immediately.`
    },
    {
      q: `How do I become an AI Trust Champion?`,
      a: `You need to achieve a Trust Score of 90+. To get there, you must complete the 90-Day Roadmap, specifically deploying continuous bias monitoring and formalizing your AI incident response plans.`
    },
    {
      q: `What should I implement first?`,
      a: `Focus on the 'Quick Wins' in the Priority Matrix: specifically, those categorized as High Priority with Low/Medium effort. "${data.recommendations[0]?.title}" is the optimal starting point.`
    }
  ];

  return (
    <Card className="border-indigo-200 shadow-sm bg-gradient-to-br from-indigo-50 to-white h-full flex flex-col">
      <CardHeader className="border-b border-indigo-100 bg-white/50 pb-4">
        <CardTitle className="text-lg text-indigo-900 font-bold flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-indigo-500" /> Ask Trust Copilot
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {activeQ === null ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Executive Insights</p>
              {questions.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQ(i)}
                  className="w-full text-left p-3 bg-white border border-indigo-100 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700">{item.q}</span>
                  <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:text-indigo-600 transition-colors" />
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col h-full bg-white border border-indigo-100 rounded-xl overflow-hidden"
            >
              <div className="bg-indigo-600 p-4 flex items-start justify-between">
                <div className="flex items-start gap-3 text-white">
                  <MessageSquare className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold leading-tight">{questions[activeQ].q}</span>
                </div>
                <button onClick={() => setActiveQ(null)} className="text-indigo-200 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 flex-1 relative">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {questions[activeQ].a}
                </p>
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
                  <Sparkles className="w-3 h-3 text-indigo-400" /> AI Generated
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </CardContent>
    </Card>
  );
}
