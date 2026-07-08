import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clipboard, 
  Building, 
  FileCheck, 
  Gauge, 
  Sparkles, 
  FileText, 
  Award, 
  ShieldCheck,
  Clock,
  CheckCircle2,
  ListChecks,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'Verified' | 'Pending' | 'Failed';
  timestamp: string;
  icon: React.ElementType;
  extra?: string;
}

export interface VerificationTimelineProps {
  assessmentId?: string;
  trustScore?: number;
}

const mockTimelineData: TimelineStep[] = [
  {
    id: 'step-1',
    title: 'Assessment Initiated',
    description: 'Assessment request successfully created.',
    status: 'Completed',
    timestamp: '07 Jul 2026\n10:00 AM',
    icon: Clipboard
  },
  {
    id: 'step-2',
    title: 'Organization Profile Validated',
    description: 'Organization information verified.',
    status: 'Completed',
    timestamp: '10:01 AM',
    icon: Building
  },
  {
    id: 'step-3',
    title: 'Governance Questionnaire Completed',
    description: 'Governance responses submitted.',
    status: 'Completed',
    timestamp: '10:04 AM',
    icon: FileCheck
  },
  {
    id: 'step-4',
    title: 'Trust Score Calculated',
    description: 'Governance maturity successfully evaluated.',
    status: 'Completed',
    timestamp: '10:05 AM',
    icon: Gauge,
    extra: 'Overall Score: 82%'
  },
  {
    id: 'step-5',
    title: 'AI Recommendations Generated',
    description: 'Improvement opportunities identified.',
    status: 'Completed',
    timestamp: '10:05 AM',
    icon: Sparkles
  },
  {
    id: 'step-6',
    title: 'Executive Report Generated',
    description: 'Assessment report successfully prepared.',
    status: 'Completed',
    timestamp: '10:06 AM',
    icon: FileText
  },
  {
    id: 'step-7',
    title: 'Certificate Issued',
    description: 'Digital AI Governance Assessment Certificate generated.',
    status: 'Completed',
    timestamp: '10:06 AM',
    icon: Award
  },
  {
    id: 'step-8',
    title: 'Assessment Verified',
    description: 'Assessment authenticity successfully verified.',
    status: 'Verified',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    icon: ShieldCheck
  }
];

const getStatusColor = (status: TimelineStep['status']) => {
  switch (status) {
    case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Verified': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Pending': return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'Failed': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const getIconColor = (status: TimelineStep['status']) => {
  switch (status) {
    case 'Completed': return 'text-emerald-500 bg-emerald-50';
    case 'Verified': return 'text-blue-500 bg-blue-50';
    case 'Pending': return 'text-slate-400 bg-slate-50';
    case 'Failed': return 'text-red-500 bg-red-50';
    default: return 'text-slate-400 bg-slate-50';
  }
};

export function VerificationTimeline({ trustScore = 82 }: VerificationTimelineProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      
      {/* Title Section */}
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Assessment Verification Timeline</h2>
        <p className="text-slate-500 font-medium">End-to-End AI Governance Assessment Lifecycle</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-indigo-500 mb-2" />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Assessment Duration</p>
              <p className="text-lg font-black text-slate-800">6 Minutes</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <ListChecks className="w-5 h-5 text-indigo-500 mb-2" />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Questionnaire</p>
              <p className="text-lg font-black text-slate-800">100%</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Target className="w-5 h-5 text-indigo-500 mb-2" />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Trust Score</p>
              <p className="text-lg font-black text-slate-800">{trustScore}%</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="shadow-sm border-slate-200 hover:shadow-md transition-shadow bg-blue-50/50 border-blue-100">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-5 h-5 text-blue-600 mb-2" />
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Verification Status</p>
              <p className="text-lg font-black text-blue-700">Verified</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Timeline Summary Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="shadow-sm border-slate-200 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
            <CardTitle className="text-sm uppercase tracking-widest text-slate-500 font-bold">Lifecycle Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
                <span className="text-sm font-semibold text-slate-800">6 Minutes</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">Verified</Badge>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Framework</span>
                <span className="text-sm font-semibold text-slate-800">TAIG v1.0</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Version</span>
                <span className="text-sm font-semibold text-slate-800 text-center leading-tight">Hackathon MVP</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center sm:col-span-2 md:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Integrity</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* The Timeline */}
      <div className="relative mt-8">
        {/* Horizontal scroll container for mobile, regular vertical on md+ */}
        <div className="flex md:block overflow-x-auto md:overflow-visible pb-8 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          
          {/* Vertical line (desktop only) */}
          <div className="hidden md:block absolute left-[39px] top-4 bottom-4 w-0.5 bg-slate-100 z-0">
             <motion.div 
               className="w-full bg-indigo-500" 
               initial={{ height: 0 }}
               animate={{ height: '100%' }}
               transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
             />
          </div>

          <div className="flex md:flex-col gap-6 md:gap-0 min-w-max md:min-w-0">
            {mockTimelineData.map((step, index) => {
              const Icon = step.icon;
              const isCurrent = step.status === 'Verified';

              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group md:mb-8 last:mb-0 w-64 md:w-auto"
                >
                  
                  {/* Timeline Node */}
                  <div className="relative z-10 flex flex-col items-center md:items-start shrink-0">
                    <div className="md:hidden absolute top-4 left-10 right-0 h-0.5 bg-slate-100 z-[-1] w-full"></div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 md:w-20 h-12 md:h-20 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-all duration-300 ${isCurrent ? 'border-blue-300 shadow-blue-100' : 'border-slate-100 hover:border-indigo-200'} ${getIconColor(step.status)} relative bg-white`}
                    >
                      {isCurrent && (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 rounded-2xl border-2 border-blue-400 bg-blue-50 z-[-1]"
                        />
                      )}
                      <Icon className="w-5 md:w-8 h-5 md:h-8" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <Card className="flex-1 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 group-hover:border-indigo-100 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm relative">
                    {/* Timestamp for desktop (absolute positioned right) */}
                    <div className="hidden md:block absolute right-6 top-6 text-right">
                       <span className="text-[11px] font-mono font-semibold text-slate-400 whitespace-pre-line text-right">
                         {step.timestamp.replace('\n', ' ')}
                       </span>
                    </div>

                    <CardContent className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                        <h4 className="text-base font-bold text-slate-800 pr-0 md:pr-24">{step.title}</h4>
                        <Badge variant="outline" className={`${getStatusColor(step.status)} text-[10px] font-bold uppercase tracking-wider self-start md:self-auto`}>
                          {step.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                      
                      {step.extra && (
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-md p-2.5 inline-block">
                          <span className="text-xs font-bold text-indigo-700">{step.extra}</span>
                        </div>
                      )}

                      {/* Timestamp for mobile */}
                      <div className="md:hidden mt-4 pt-3 border-t border-slate-100">
                         <span className="text-[10px] font-mono font-semibold text-slate-400 whitespace-pre-line text-left block">
                           {step.timestamp.replace('\n', ' at ')}
                         </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
