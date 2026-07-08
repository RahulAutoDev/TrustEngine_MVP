import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, BadgeCheck, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { roiService, type ROIExecutiveData } from '@/services/roiService';
import { ROITable } from './ROITable';
import { ROIPriorityMatrix } from './ROIPriorityMatrix';
import { ImplementationRoadmap } from './ImplementationRoadmap';
import { ProjectedFutureState } from './ProjectedFutureState';
import { BusinessValueDashboard } from './BusinessValueDashboard';

export function ExecutiveROIPlanner({ trustScore }: { trustScore: number }) {
  const [data, setData] = useState<ROIExecutiveData | null>(null);

  useEffect(() => {
    roiService.getROIData(trustScore).then(setData);
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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="pt-16 pb-12">
      
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <Badge variant="outline" className="mb-4 text-indigo-600 border-indigo-200 bg-indigo-50 font-bold uppercase tracking-widest px-3 py-1">
          Executive Decision Support
        </Badge>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          Executive ROI & Implementation Planner
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          Prioritized Governance Investments with Expected Business Outcomes
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="border-0 shadow-sm bg-slate-900 text-white">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current Score</span>
            <span className="text-3xl font-black">{data.currentScore}</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-indigo-600 text-white">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <span className="text-[10px] uppercase font-bold text-indigo-200 mb-1">Projected Score</span>
            <span className="text-3xl font-black">{data.projectedScore}</span>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-emerald-500 text-white">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <span className="text-[10px] uppercase font-bold text-emerald-100 mb-1">Improvement</span>
            <span className="text-3xl font-black">+{data.improvement}</span>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Timeline</span>
            <span className="text-2xl font-black text-slate-800">{data.timelineDays} Days</span>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Confidence</span>
            <span className="text-2xl font-black text-emerald-600">{data.confidence}%</span>
          </CardContent>
        </Card>
      </div>

      {/* Executive Decision Statement */}
      <motion.div variants={itemVariants} className="mb-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-indigo-700"></div>
        <div className="flex items-start gap-4">
          <Target className="w-8 h-8 text-indigo-600 shrink-0 mt-1" />
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Executive Recommendation</h4>
            <p className="text-slate-700 font-medium text-lg leading-relaxed italic">
              "{data.executiveDecisionSupport}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid: Future State & Priority Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <motion.div variants={itemVariants} className="h-full">
           <ProjectedFutureState currentScore={data.currentScore} projectedScore={data.projectedScore} />
        </motion.div>
        <motion.div variants={itemVariants} className="h-full">
           <ROIPriorityMatrix recommendations={data.recommendations} />
        </motion.div>
      </div>

      {/* ROI Table */}
      <motion.div variants={itemVariants} className="mb-10">
        <ROITable recommendations={data.recommendations} />
      </motion.div>

      {/* Roadmap & Business Value */}
      <div className="space-y-10 mb-12">
        <motion.div variants={itemVariants}>
          <ImplementationRoadmap roadmap={data.roadmap} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <BusinessValueDashboard />
        </motion.div>
      </div>

      {/* Executive Export Actions */}
      <motion.div variants={itemVariants} className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-center gap-4">
         <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto shadow-xl px-8 h-14">
           <Download className="w-5 h-5 mr-2" /> Download ROI Report
         </Button>
         <Button size="lg" className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto shadow-xl px-8 h-14">
           <FileText className="w-5 h-5 mr-2" /> Download Executive Brief
         </Button>
         <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto border-slate-300 font-bold text-slate-600 px-8 h-14">
           <BadgeCheck className="w-5 h-5 mr-2" /> Download Roadmap
         </Button>
      </motion.div>

    </motion.div>
  );
}
