import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, BadgeCheck, ChevronRight, Activity, Zap, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { advancedRecommendationService, type AdvancedRecommendationsOutput } from '@/services/advancedRecommendationService';
import { ExecutiveAnalysis } from '@/components/ExecutiveAnalysis';
import { GovernanceCategoryCard } from '@/components/GovernanceCategoryCard';
import { AdvancedRecommendationCard } from '@/components/AdvancedRecommendationCard';
import { ImprovementRoadmapTimeline } from '@/components/ImprovementRoadmapTimeline';
import { PriorityMatrix } from '@/components/PriorityMatrix';
import { BusinessValueCard } from '@/components/BusinessValueCard';
import { ProjectedTrustScore } from '@/components/ProjectedTrustScore';
import { InteractiveExecutiveQuestions } from '@/components/InteractiveExecutiveQuestions';
import { ExecutiveROIPlanner } from '@/components/ExecutiveROIPlanner';
import { AIGovernanceInvestmentPortfolio } from '@/components/AIGovernanceInvestmentPortfolio';

export function RecommendationsPage() {
  const [data, setData] = useState<AdvancedRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [contextData, setContextData] = useState({
    orgName: 'Acme Corp',
    systemName: 'Customer Support LLM',
    assessmentDate: new Date().toLocaleDateString(),
    trustScore: 82,
    riskLevel: 'Medium',
    confidence: '96%',
    categoryScores: {
      transparency: 85,
      fairness: 72,
      privacy: 92,
      security: 64,
      accountability: 78
    }
  });

  // Filters state
  const [activeFilter, setActiveFilter] = useState('All');
  
  useEffect(() => {
    const demoTrust = localStorage.getItem('demoTrustResults');
    const realTrust = localStorage.getItem('trustResults');
    
    let loadedData = null;
    let orgName = 'Acme Corp';
    let systemName = 'Customer Support LLM';

    if (demoTrust) {
      loadedData = JSON.parse(demoTrust);
      orgName = localStorage.getItem('demoOrgName') || 'Demo Org';
      systemName = localStorage.getItem('demoSystemName') || 'Demo System';
    } else if (realTrust) {
      loadedData = JSON.parse(realTrust);
      orgName = localStorage.getItem('currentOrgName') || 'Your Organization';
      systemName = localStorage.getItem('currentSystemName') || 'Your System';
    }

    let finalContext = { ...contextData };

    if (loadedData) {
      finalContext = {
        orgName,
        systemName,
        assessmentDate: new Date().toLocaleDateString(),
        trustScore: loadedData.overallTrustScore || 82,
        riskLevel: loadedData.riskLevel || 'Medium',
        confidence: '96%',
        categoryScores: loadedData.categoryScores || finalContext.categoryScores
      };
      setContextData(finalContext);
    }

    advancedRecommendationService.getInsights(finalContext.trustScore, finalContext.categoryScores).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col">
        <Activity className="w-12 h-12 text-indigo-600 animate-pulse mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Generating Executive Governance Insights...</h2>
      </div>
    );
  }

  const projectedScore = Math.min(contextData.trustScore + (data.recommendations.reduce((acc, rec) => acc + rec.estimatedTrustIncrease, 0)), 100);

  const filteredRecommendations = activeFilter === 'All' 
    ? data.recommendations 
    : data.recommendations.filter(r => r.category === activeFilter || r.priority === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      
      {/* Header */}
      <header className="bg-slate-900 text-white py-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest text-xs uppercase mb-4">
            Trust Assessment Engine <ChevronRight className="w-3 h-3" /> Dashboard
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-3">
                Trust Copilot™ 
                <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 py-1 font-bold">Executive View</Badge>
              </h1>
              <p className="text-indigo-200 text-xl mt-3 font-medium">AI-Powered Governance Improvement Center</p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-400 font-medium">Organization:</span>
                <span className="font-bold text-white">{contextData.orgName}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-400 font-medium">System:</span>
                <span className="font-bold text-white">{contextData.systemName}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-400 font-medium">Assessment Date:</span>
                <span className="font-bold text-white">{contextData.assessmentDate}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Summary KPIs */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 -mt-16 relative z-20">
           <Card className="shadow-lg border-0 bg-white">
             <CardContent className="p-4 text-center">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Trust Score</p>
               <p className="text-3xl font-black text-slate-800">{contextData.trustScore}</p>
             </CardContent>
           </Card>
           <Card className="shadow-lg border-0 bg-emerald-500 text-white">
             <CardContent className="p-4 text-center">
               <p className="text-[10px] uppercase font-bold text-emerald-100 mb-1">Projected Score</p>
               <p className="text-3xl font-black">{projectedScore}</p>
             </CardContent>
           </Card>
           <Card className="shadow-lg border-0 bg-white">
             <CardContent className="p-4 text-center">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Governance</p>
               <Badge variant="outline" className="mt-1 border-indigo-200 text-indigo-700 bg-indigo-50">Defined</Badge>
             </CardContent>
           </Card>
           <Card className="shadow-lg border-0 bg-white">
             <CardContent className="p-4 text-center">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Critical Risks</p>
               <p className="text-2xl font-black text-red-600 flex items-center justify-center gap-1"><AlertTriangle className="w-5 h-5"/> {data.categories.filter(c => c.priority === 'HIGH').length}</p>
             </CardContent>
           </Card>
           <Card className="shadow-lg border-0 bg-white">
             <CardContent className="p-4 text-center">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Recommendations</p>
               <p className="text-3xl font-black text-indigo-600">{data.recommendations.length}</p>
             </CardContent>
           </Card>
           <Card className="shadow-lg border-0 bg-white">
             <CardContent className="p-4 text-center">
               <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Confidence</p>
               <p className="text-2xl font-black text-emerald-600 flex items-center justify-center gap-1"><CheckCircle2 className="w-5 h-5"/> {contextData.confidence}</p>
             </CardContent>
           </Card>
        </motion.div>

        {/* AI Executive Analysis & Business Value */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <motion.div variants={itemVariants} className="lg:col-span-2">
             <ExecutiveAnalysis data={data.executiveAnalysis} />
           </motion.div>
           <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
             <div className="h-[200px]">
               <ProjectedTrustScore currentScore={contextData.trustScore} projectedScore={projectedScore} />
             </div>
             <div className="h-[calc(100%-200px-1.5rem)] min-h-[220px]">
               <BusinessValueCard />
             </div>
           </motion.div>
        </motion.div>

        {/* Category Deep Dive */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="w-6 h-6 text-slate-400" />
            <h2 className="text-2xl font-black text-slate-800">Category Deep Dive</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data.categories.map((cat, i) => (
              <motion.div key={i} variants={itemVariants}>
                <GovernanceCategoryCard data={cat} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations & Priority Matrix */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pt-10">
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                 <div className="flex items-center gap-3">
                   <Zap className="w-6 h-6 text-indigo-500" />
                   <h2 className="text-2xl font-black text-slate-800">Actionable Recommendations</h2>
                 </div>
                 
                 <div className="flex flex-wrap gap-2">
                   {['All', 'HIGH', 'Security', 'Fairness'].map(f => (
                     <Badge 
                       key={f}
                       onClick={() => setActiveFilter(f)}
                       className={`cursor-pointer px-3 py-1 text-xs font-bold ${activeFilter === f ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'}`}
                     >
                       {f}
                     </Badge>
                   ))}
                 </div>
               </div>

               <div className="space-y-4">
                 {filteredRecommendations.map((rec) => (
                   <motion.div key={rec.id} variants={itemVariants}>
                     <AdvancedRecommendationCard recommendation={rec} />
                   </motion.div>
                 ))}
                 {filteredRecommendations.length === 0 && (
                   <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 font-medium">
                     No recommendations match this filter.
                   </div>
                 )}
               </div>
            </div>

            <div className="lg:w-1/3 space-y-6">
               <div className="h-[450px]">
                 <PriorityMatrix recommendations={data.recommendations} />
               </div>
               <div className="h-[400px]">
                 <InteractiveExecutiveQuestions data={data} />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Implementation Roadmap (Trust Copilot view) */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pt-10 pb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-12 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Implementation Roadmap</h2>
              <p className="text-slate-500 font-medium text-lg">A structured 90-day execution plan designed to elevate your AI Governance Maturity to Enterprise standards.</p>
            </div>
            
            <ImprovementRoadmapTimeline roadmap={data.roadmap} />
          </div>
        </motion.div>

        {/* Trust Copilot Export Footer */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-center gap-4 hidden">
           <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto shadow-xl px-8 h-14">
             <Download className="w-5 h-5 mr-2" /> Download Improvement Roadmap
           </Button>
           <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto shadow-xl px-8 h-14">
             <FileText className="w-5 h-5 mr-2" /> Download Executive Report
           </Button>
           <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto border-slate-300 font-bold text-slate-600 px-8 h-14">
             <BadgeCheck className="w-5 h-5 mr-2" /> Download Certificate
           </Button>
        </motion.div>

        {/* Executive ROI Planner Section */}
        <ExecutiveROIPlanner trustScore={contextData.trustScore} />

        {/* AI Governance Investment Portfolio Section */}
        <AIGovernanceInvestmentPortfolio trustScore={contextData.trustScore} />

      </main>
    </div>
  );
}
