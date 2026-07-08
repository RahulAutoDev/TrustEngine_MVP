import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Download, FileText, Presentation, FileDown, ShieldCheck, Activity, LineChart as LineChartIcon, HeartHandshake, Zap, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { roadmapService, type TransformationRoadmapData } from '@/services/roadmapService';
import { TrustExecutiveSummaryCard } from './TrustExecutiveSummaryCard';
import { TrustRiskReductionTracker } from './TrustRiskReductionTracker';
import { TrustProgressChart } from './TrustProgressChart';
import { TrustRoadmapTimeline } from './TrustRoadmapTimeline';
import { TrustImplementationCalendar } from './TrustImplementationCalendar';

export function TrustTransformationRoadmap({ trustScore }: { trustScore: number }) {
  const [data, setData] = useState<TransformationRoadmapData | null>(null);

  useEffect(() => {
    roadmapService.getTransformationRoadmap(trustScore).then(setData);
  }, [trustScore]);

  if (!data) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const businessBenefits = [
    { title: 'Reduced AI Risk', icon: <ShieldCheck className="w-5 h-5 text-indigo-500" /> },
    { title: 'Improved Compliance', icon: <Scale className="w-5 h-5 text-emerald-500" /> },
    { title: 'Executive Confidence', icon: <Activity className="w-5 h-5 text-blue-500" /> },
    { title: 'Customer Trust', icon: <HeartHandshake className="w-5 h-5 text-rose-500" /> },
    { title: 'Regulatory Readiness', icon: <LineChartIcon className="w-5 h-5 text-amber-500" /> },
    { title: 'Responsible AI Adoption', icon: <Zap className="w-5 h-5 text-teal-500" /> }
  ];

  return (
    <div className="pt-16 pb-12 text-slate-900">
      
      {/* Section Header */}
      <div className="mb-12 text-center max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-indigo-600 border-indigo-200 bg-indigo-50 font-bold uppercase tracking-widest px-3 py-1">
          Executive Execution Plan
        </Badge>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 flex items-center justify-center gap-4">
          <Map className="w-10 h-10 text-indigo-600" />
          Trust Transformation Roadmap™
        </h2>
        <p className="text-xl text-slate-500 font-medium">
          Your AI Governance Improvement Journey
        </p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        
        {/* Top Summary Data */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center col-span-2 shadow-sm flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Organization</span>
            <span className="text-sm font-bold text-slate-800 truncate">{data.organization}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center col-span-2 shadow-sm flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">System</span>
            <span className="text-sm font-bold text-slate-800 truncate">{data.systemName}</span>
          </div>
          <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-3 text-center shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Score</span>
            <span className="text-xl font-black">{data.currentScore}</span>
          </div>
          <div className="bg-indigo-600 text-white border border-indigo-700 rounded-xl p-3 text-center shadow-sm">
            <span className="text-[10px] uppercase font-bold text-indigo-200 mb-0.5">Target</span>
            <span className="text-xl font-black">{data.projectedScore}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center col-span-2 shadow-sm flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Target Badge</span>
            <span className="text-sm font-bold text-indigo-600 truncate">{data.targetBadge}</span>
          </div>
        </motion.div>

        {/* Executive Summary & Risk Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <motion.div variants={itemVariants} className="lg:col-span-2">
             <TrustExecutiveSummaryCard summary={data.executiveSummary} coaching={data.aiCoaching} />
           </motion.div>
           <motion.div variants={itemVariants} className="lg:col-span-1">
             <TrustRiskReductionTracker data={data} />
           </motion.div>
        </div>

        {/* Progress Chart & Investment Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <motion.div variants={itemVariants} className="lg:col-span-2">
             <TrustProgressChart data={data} />
           </motion.div>
           
           <motion.div variants={itemVariants} className="lg:col-span-1">
             <Card className="border-indigo-100 shadow-sm bg-gradient-to-br from-indigo-50 to-white h-full">
               <CardContent className="p-6">
                 <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Investment Summary</h4>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center pb-3 border-b border-indigo-100/50">
                     <span className="text-xs font-bold text-slate-500 uppercase">Timeline</span>
                     <span className="text-sm font-black text-slate-800">{data.investmentSummary.timeline}</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-indigo-100/50">
                     <span className="text-xs font-bold text-slate-500 uppercase">Investment</span>
                     <span className="text-sm font-black text-slate-800">{data.investmentSummary.investment}</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-indigo-100/50">
                     <span className="text-xs font-bold text-slate-500 uppercase">Top Priority</span>
                     <span className="text-sm font-bold text-indigo-700">{data.investmentSummary.topPriority}</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-indigo-100/50">
                     <span className="text-xs font-bold text-slate-500 uppercase">Highest ROI</span>
                     <span className="text-sm font-bold text-indigo-700">{data.investmentSummary.topROI}</span>
                   </div>
                   <div className="flex justify-between items-center pt-2">
                     <span className="text-xs font-bold text-slate-500 uppercase">Trust Increase</span>
                     <span className="text-lg font-black text-emerald-600">{data.investmentSummary.expectedImprovement}</span>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </motion.div>
        </div>

        {/* The Timeline */}
        <motion.div variants={itemVariants} className="pt-8">
           <h3 className="text-2xl font-black text-slate-900 mb-8 text-center">Transformation Roadmap</h3>
           <TrustRoadmapTimeline phases={data.phases} />
        </motion.div>

        {/* Implementation Calendar */}
        <motion.div variants={itemVariants} className="pt-8">
           <TrustImplementationCalendar calendar={data.calendarWeeks} />
        </motion.div>

        {/* Business Benefits Grid */}
        <motion.div variants={itemVariants} className="pt-8">
           <h3 className="text-lg font-bold text-slate-800 mb-4">Expected Business Outcomes</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
             {businessBenefits.map((benefit, i) => (
               <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center flex flex-col items-center justify-center gap-2 hover:border-indigo-300 transition-colors cursor-default">
                 <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">{benefit.icon}</div>
                 <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider leading-tight">{benefit.title}</span>
               </div>
             ))}
           </div>
        </motion.div>

        {/* Download Options */}
        <motion.div variants={itemVariants} className="pt-12 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4">
           <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl px-6 h-14">
             <Download className="w-5 h-5 mr-2" /> Download Roadmap
           </Button>
           <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl px-6 h-14">
             <FileText className="w-5 h-5 mr-2" /> Download Executive Brief
           </Button>
           <Button variant="outline" size="lg" className="rounded-full border-slate-300 font-bold text-slate-700 px-6 h-14 bg-white">
             <Presentation className="w-5 h-5 mr-2" /> Board Presentation
           </Button>
           <Button variant="outline" size="lg" className="rounded-full border-slate-300 font-bold text-slate-700 px-6 h-14 bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700">
             <FileDown className="w-5 h-5 mr-2" /> Export to PDF
           </Button>
        </motion.div>

      </motion.div>
    </div>
  );
}
