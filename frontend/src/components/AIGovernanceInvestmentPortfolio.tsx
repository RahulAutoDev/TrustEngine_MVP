import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Target, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { investmentService, type PortfolioData } from '@/services/investmentService';
import { PortfolioExecutiveSummary } from './PortfolioExecutiveSummary';
import { PortfolioInvestmentTable } from './PortfolioInvestmentTable';
import { PortfolioInvestmentMatrix } from './PortfolioInvestmentMatrix';
import { PortfolioExpectedReturns } from './PortfolioExpectedReturns';
import { PortfolioImplementationRoadmap } from './PortfolioImplementationRoadmap';

export function AIGovernanceInvestmentPortfolio({ trustScore }: { trustScore: number }) {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    investmentService.getPortfolioData(trustScore).then(setData);
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
      <div className="mb-10 text-center max-w-4xl mx-auto">
        <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-200 bg-emerald-50 font-bold uppercase tracking-widest px-3 py-1">
          Executive Consulting Dashboard
        </Badge>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Briefcase className="w-8 h-8 text-emerald-500" />
          AI Governance Investment Portfolio
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          Prioritized Governance Investments for Maximum Trust Improvement
        </p>
      </div>

      {/* Top Level Portfolio KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 text-white rounded-xl p-5 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Current Trust Score</span>
          <span className="text-3xl font-black">{data.currentScore}</span>
        </div>
        <div className="bg-emerald-600 text-white rounded-xl p-5 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-200 mb-1 block">Projected Trust Score</span>
          <span className="text-3xl font-black">{data.projectedScore}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Expected Improvement</span>
          <span className="text-3xl font-black text-emerald-600">+{data.totalImprovement}</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Overall Governance ROI</span>
          <span className="text-3xl font-black text-indigo-600">{data.overallROI}</span>
        </div>
      </div>

      {/* Board Summary Insight */}
      <motion.div variants={itemVariants} className="mb-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
        <div className="flex items-start gap-4">
          <Target className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Board Summary</h4>
            <p className="text-slate-700 font-medium text-lg leading-relaxed italic">
              "{data.executiveInsight}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI Sub-Summary Grid */}
      <motion.div variants={itemVariants} className="mb-10">
        <PortfolioExecutiveSummary data={data.executiveSummary} />
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="mb-10">
        <PortfolioInvestmentTable investments={data.investments} />
      </motion.div>

      {/* Grids: Expected Returns, Roadmap, Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <PortfolioImplementationRoadmap roadmap={data.roadmap} />
        </motion.div>
        
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants}>
             <PortfolioExpectedReturns currentScore={data.currentScore} projectedScore={data.projectedScore} />
          </motion.div>
          <motion.div variants={itemVariants}>
             <PortfolioInvestmentMatrix investments={data.investments} />
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-center gap-4">
         <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto shadow-xl px-8 h-14">
           <Briefcase className="w-5 h-5 mr-2" /> Approve Investment Portfolio
         </Button>
         <Button size="lg" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white w-full sm:w-auto shadow-xl px-8 h-14">
           <Download className="w-5 h-5 mr-2" /> Export to Board Deck
         </Button>
         <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto border-slate-300 font-bold text-slate-600 px-8 h-14">
           <FileText className="w-5 h-5 mr-2" /> Detailed ROI Analysis
         </Button>
      </motion.div>

    </motion.div>
  );
}
