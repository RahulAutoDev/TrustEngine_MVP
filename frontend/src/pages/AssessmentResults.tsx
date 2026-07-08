import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Download, ListChecks, PlusCircle, AlertTriangle, 
  TrendingDown, Target, CheckCircle2,
  ShieldAlert, Activity, ArrowRight, Zap, TrendingUp, BarChart4, FileText
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  PieChart, Pie, Cell,
  LineChart, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { motion } from 'framer-motion';
import { exportMasterReport } from '@/lib/reportBuilder';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrustMaturityBadge } from '@/components/TrustMaturityBadge';
import type { TrustCalculationResponse } from '@/services/trustService';
import { recommendationService, type RecommendationResponse } from '@/services/recommendationService';
import { TrustCopilot } from '@/components/TrustCopilot';
import { ExecutiveDecisionAdvisor } from '@/components/ExecutiveDecisionAdvisor';
import { ExecutiveBoardResolution } from '@/components/ExecutiveBoardResolution';
import { TrustIntelligenceEngine } from '@/components/trust-intelligence/TrustIntelligenceEngine';

// --- MOCK DATA FOR CHARTS NOT IN API ---
const trendData = [
  { month: 'Jan', score: 62 },
  { month: 'Mar', score: 65 },
  { month: 'May', score: 68 },
  { month: 'Jul', score: 72 },
];

const riskMatrixData = [
  { name: 'Model Drift', impact: 8, likelihood: 4, z: 100, fill: '#eab308' },
  { name: 'Data Privacy Breach', impact: 9, likelihood: 2, z: 100, fill: '#22c55e' },
  { name: 'Unclear Oversight', impact: 7, likelihood: 8, z: 100, fill: '#ef4444' },
  { name: 'Algorithm Bias', impact: 6, likelihood: 5, z: 100, fill: '#eab308' },
];

const getGaugeColor = (score: number) => {
  if (score >= 90) return { color: '#16a34a', label: 'Excellent' };
  if (score >= 75) return { color: '#22c55e', label: 'Good' };
  if (score >= 60) return { color: '#eab308', label: 'Moderate' };
  if (score >= 40) return { color: '#f97316', label: 'Low' };
  return { color: '#ef4444', label: 'Critical' };
};

const getCategoryExplanation = (category: string, score: number) => {
  if (score >= 80) return `Strong ${category.toLowerCase()} documentation and controls`;
  if (score >= 50) return `Partial ${category.toLowerCase()} monitoring implemented`;
  return `Weak ${category.toLowerCase()} controls requiring immediate action`;
};

export function AssessmentResults() {
  const [trustData, setTrustData] = useState<TrustCalculationResponse | null>(null);
  const [recData, setRecData] = useState<RecommendationResponse | null>(null);
  const [context, setContext] = useState({ orgName: 'Latest Assessment', systemName: 'AI System' });

  useEffect(() => {
    const isDemo = localStorage.getItem('demoTrustResults');
    if (isDemo) {
      const parsed = JSON.parse(isDemo) as TrustCalculationResponse;
      setTrustData(parsed);
      setContext({
        orgName: localStorage.getItem('demoOrgName') || 'Demo Org',
        systemName: localStorage.getItem('demoSystemName') || 'Demo System'
      });
      // Mock Recommendations for Demo
      setRecData({
        strengths: ['Robust PII anonymization', 'Clear transparency docs'],
        weaknesses: ['Irregular bias audits', 'Unclear human-in-the-loop'],
        recommendations: [
          { title: 'Implement Role Based Access Control', priority: 'HIGH', businessImpact: '+8 Trust Points' },
          { title: 'Establish Bias Monitoring', priority: 'HIGH', businessImpact: '+12 Trust Points' },
          { title: 'Publish Model Cards', priority: 'MEDIUM', businessImpact: '+5 Trust Points' }
        ]
      });
      return;
    }

    const id = localStorage.getItem('currentAssessmentId');
    const storedTrust = localStorage.getItem('trustResults');
    
    if (storedTrust) {
      const parsed = JSON.parse(storedTrust) as TrustCalculationResponse;
      setTrustData(parsed);

      if (id) {
        recommendationService.getRecommendations({
          assessmentId: id,
          trustScores: parsed.categoryScores,
          riskLevel: parsed.riskLevel
        }).then(res => setRecData(res)).catch(console.error);
      }
    }
  }, []);

  if (!trustData) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading Results...</div>;
  }

  const overallScore = trustData.overallTrustScore;
  const gaugeStatus = getGaugeColor(overallScore);
  const projectedScore = Math.min(overallScore + 9, 100);

  const categoryData = Object.entries(trustData.categoryScores).map(([key, score]) => {
    let status = 'Good';
    let color = '#22c55e';
    let bg = 'bg-green-100';
    let text = 'text-green-700';
    let icon = <CheckCircle2 className="w-4 h-4 text-green-600" />;

    if (score < 50) {
      status = 'Critical'; color = '#ef4444'; bg = 'bg-red-100'; text = 'text-red-700';
      icon = <ShieldAlert className="w-4 h-4 text-red-600" />;
    } else if (score < 80) {
      status = 'Needs Improvement'; color = '#eab308'; bg = 'bg-yellow-100'; text = 'text-yellow-700';
      icon = <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    } else if (score >= 90) {
      status = 'Excellent'; color = '#16a34a'; bg = 'bg-emerald-100'; text = 'text-emerald-700';
    }

    return { 
      id: key, 
      title: key.charAt(0).toUpperCase() + key.slice(1), 
      score, status, color, bg, text, icon,
      explanation: getCategoryExplanation(key, score)
    };
  });

  const radarData = categoryData.map(cat => ({
    subject: cat.title,
    A: cat.score,
    fullMark: 100
  }));

  const barData = categoryData.map(cat => ({
    name: cat.title,
    score: cat.score,
    fill: cat.color
  }));

  const handleExportPDF = () => {
    exportMasterReport('Trust_Assessment_Results.pdf');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Top Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Assessment Results</h1>
              <div className="flex items-center text-sm text-slate-500 gap-2">
                <span className="font-medium text-slate-700">{context.orgName}</span>
                <span>•</span>
                <span>{context.systemName}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full shadow-sm hover:shadow-md transition-all hidden sm:flex border-slate-300" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" /> Generate Executive Report
            </Button>
            <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all bg-indigo-600 hover:bg-indigo-700">
              <Link to="/recommendations">
                <ListChecks className="mr-2 h-4 w-4" /> View Detailed Plan
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main id="report-content" className="container mx-auto px-6 mt-8 space-y-8 print:bg-white print:p-0 print:m-0">
        
        <TrustMaturityBadge 
           trustScore={overallScore}
           riskLevel={trustData.riskLevel}
           complianceScore={92}
           organizationName={context.orgName}
           assessmentDate={new Date().toLocaleDateString()}
           confidence={96}
        />

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Overall Trust Score Gauge & Explanation */}
          <motion.div variants={itemVariants} className="col-span-1 space-y-6">
            <Card className="rounded-2xl shadow-sm border-slate-200 bg-white flex flex-col">
              <CardHeader className="text-center pb-0 pt-6 flex flex-col items-center">
                <CardTitle className="text-xl text-slate-700 font-bold">Overall Trust Score</CardTitle>
                <TrustIntelligenceEngine overallScore={overallScore} />
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-0 flex-1 relative min-h-[250px]">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={[{ value: overallScore }, { value: 100 - overallScore }]}
                      cx="50%" cy="100%" startAngle={180} endAngle={0}
                      innerRadius="75%" outerRadius="95%" paddingAngle={0}
                      dataKey="value" stroke="none"
                      isAnimationActive={true}
                    >
                      <Cell fill={gaugeStatus.color} />
                      <Cell fill="#f1f5f9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-6 flex flex-col items-center">
                  <span className="text-6xl font-extrabold text-slate-900" style={{ color: gaugeStatus.color }}>
                    {overallScore}
                  </span>
                  <Badge className={`mt-2 ${getGaugeColor(overallScore).color === '#eab308' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'} hover:bg-transparent border-none text-sm px-4 py-1 uppercase tracking-widest font-bold`}>
                    {trustData.trustLevel} Trust Level
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Projected Score Card */}
            <Card className="rounded-2xl shadow-sm border-indigo-100 bg-gradient-to-br from-indigo-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-700 text-sm">Projected Trust Score</h4>
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-slate-400 line-through text-2xl font-bold">{overallScore}</div>
                  <ArrowRight className="h-5 w-5 text-slate-300" />
                  <div className="text-indigo-600 text-4xl font-black">{projectedScore}</div>
                </div>
                <div className="mt-4 flex gap-3 text-xs font-semibold">
                  <Badge variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50">Expected: +{projectedScore - overallScore} Points</Badge>
                  <Badge variant="outline" className="border-slate-200 text-slate-600 bg-white">Timeline: 4-6 Weeks</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Executive Summary & Why this score */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2 space-y-6">
            <Card className="rounded-2xl shadow-sm border-slate-200 bg-white flex flex-col h-full">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-2xl pb-4">
                <CardTitle className="text-lg text-slate-800 font-bold flex items-center justify-between">
                  <div className="flex items-center">
                    Executive AI Summary
                    <Badge className="ml-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-2 py-0.5 text-xs">AI Generated</Badge>
                  </div>
                  <Badge variant="outline" className={`border-${trustData.riskLevel === 'High' ? 'red' : trustData.riskLevel === 'Low' ? 'green' : 'amber'}-200 text-${trustData.riskLevel === 'High' ? 'red' : trustData.riskLevel === 'Low' ? 'green' : 'amber'}-700 bg-${trustData.riskLevel === 'High' ? 'red' : trustData.riskLevel === 'Low' ? 'green' : 'amber'}-50 px-3 py-1 text-sm`}>
                    Overall Risk: {trustData.riskLevel}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Governance Maturity</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {trustData.executiveSummary}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center text-sm uppercase tracking-wider">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" /> Top Strengths
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {recData?.strengths.map((s, i) => (
                        <li key={i} className="flex items-start"><span className="text-green-500 mr-2 font-bold">•</span> {s}</li>
                      ))}
                      {!recData?.strengths.length && <li className="text-slate-400 italic">No significant strengths identified.</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center text-sm uppercase tracking-wider">
                      <ShieldAlert className="h-4 w-4 text-red-500 mr-2" /> Top Weaknesses
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {recData?.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start"><span className="text-red-500 mr-2 font-bold">•</span> {w}</li>
                      ))}
                      {!recData?.weaknesses.length && <li className="text-slate-400 italic">No significant weaknesses identified.</li>}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto">
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Why this score?</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categoryData.map(cat => (
                        <div key={cat.id} className="flex items-center gap-3 bg-white border border-slate-100 p-2.5 rounded-lg shadow-sm">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${cat.bg}`}>
                            {cat.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-800">{cat.title}</span>
                              <span className={`text-xs font-black`} style={{color: cat.color}}>{cat.score}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate w-40 md:w-48">{cat.explanation}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:grid-cols-2">
          
          {/* Radar & Bar Charts */}
          <motion.div variants={itemVariants}>
            <Card className="rounded-2xl shadow-sm border-slate-200 bg-white flex flex-col h-full">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
                <CardTitle className="text-lg text-slate-800 font-bold">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-center">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Score" dataKey="A" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} isAnimationActive={true} />
                      <RechartsTooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" stroke="#64748b" tick={{fontSize: 11}} width={80} axisLine={false} tickLine={false} />
                      <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16} isAnimationActive={true}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trend & Risk Matrix */}
          <motion.div variants={itemVariants}>
            <Card className="rounded-2xl shadow-sm border-slate-200 bg-white flex flex-col h-full">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-2xl py-4">
                <CardTitle className="text-lg text-slate-800 font-bold">Historical & Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-center">
                
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Score Trend</h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                        <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} isAnimationActive={true} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Risk Matrix</h4>
                  <div className="h-56 relative bg-slate-50 border border-slate-100 rounded-lg overflow-hidden p-2">
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-10 pointer-events-none">
                      <div className="bg-yellow-400 border-r border-b border-white"></div>
                      <div className="bg-red-500 border-b border-white"></div>
                      <div className="bg-green-400 border-r border-white"></div>
                      <div className="bg-yellow-400"></div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" dataKey="likelihood" name="Likelihood" domain={[0, 10]} stroke="#94a3b8" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 10]} stroke="#94a3b8" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <ZAxis type="number" dataKey="z" range={[100, 100]} />
                        <RechartsTooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Scatter name="Risks" data={riskMatrixData} isAnimationActive={true}>
                          {riskMatrixData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-1 right-1 text-[9px] text-slate-400 rotate-0">X: Likelihood, Y: Impact</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="rounded-2xl shadow-sm border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex flex-row items-center justify-between py-5">
              <div>
                <CardTitle className="text-lg text-slate-800 font-bold">Recommended Next Steps</CardTitle>
                <CardDescription>Prioritized actions to improve your Trust Score</CardDescription>
              </div>
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold" asChild>
                <Link to="/recommendations">View All Actions</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 divide-y divide-slate-100 lg:divide-y-0 lg:divide-x lg:grid-cols-3">
                {recData?.recommendations.slice(0, 3).map((rec, i) => (
                  <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                       <div className={`${rec.priority === 'HIGH' ? 'bg-red-100 text-red-600' : rec.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'} p-2.5 rounded-xl`}>
                        {rec.priority === 'HIGH' ? <Target className="w-5 h-5" /> : rec.priority === 'MEDIUM' ? <AlertTriangle className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                       </div>
                       <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-bold ${rec.priority === 'HIGH' ? 'text-red-600 border-red-200 bg-red-50' : rec.priority === 'MEDIUM' ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-blue-600 border-blue-200 bg-blue-50'} px-2 py-0`}>
                          {rec.priority} Priority
                        </Badge>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{rec.title}</h4>
                    <p className="text-sm text-slate-600 mb-6 flex-1">Addressing this area will improve your overall compliance posture and address specific governance weaknesses.</p>
                    <div className="flex flex-col gap-2 mt-auto">
                      <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2 rounded-md">
                        <span className="text-xs font-semibold text-slate-500">Business Impact</span>
                        <span className="text-xs font-bold text-green-600">{rec.businessImpact}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2 rounded-md">
                        <span className="text-xs font-semibold text-slate-500">Estimated Effort</span>
                        <span className="text-xs font-bold text-slate-700">{rec.priority === 'HIGH' ? 'Medium' : 'Low'}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2 rounded-md">
                        <span className="text-xs font-semibold text-slate-500">Status</span>
                        <Badge variant="secondary" className="text-[10px]">Not Started</Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {!recData?.recommendations.length && (
                  <div className="p-6 text-slate-500 col-span-3 text-center">No specific recommendations at this time.</div>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 rounded-b-2xl flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 shadow-md">
                <Link to="/assessment"><PlusCircle className="w-4 h-4 mr-2" /> Start New Assessment</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Business Value Section */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Business Benefits</h3>
            <p className="text-slate-500 mt-2">The value of achieving a high AI Trust Score</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {[
               { icon: FileText, title: 'Regulatory Compliance', color: 'text-blue-600', bg: 'bg-blue-100' },
               { icon: ShieldCheck, title: 'Reduced AI Risk', color: 'text-red-600', bg: 'bg-red-100' },
               { icon: Activity, title: 'Improved Transparency', color: 'text-amber-600', bg: 'bg-amber-100' },
               { icon: BarChart4, title: 'Executive Visibility', color: 'text-indigo-600', bg: 'bg-indigo-100' },
               { icon: Zap, title: 'Stakeholder Trust', color: 'text-green-600', bg: 'bg-green-100' }
             ].map((val, i) => (
               <Card key={i} className="rounded-xl shadow-sm border-slate-200 bg-white hover:-translate-y-1 transition-transform duration-300">
                 <CardContent className="p-4 flex flex-col items-center text-center">
                   <div className={`p-3 rounded-full ${val.bg} ${val.color} mb-3`}>
                     <val.icon className="w-6 h-6" />
                   </div>
                   <h5 className="font-semibold text-slate-800 text-sm">{val.title}</h5>
                 </CardContent>
               </Card>
             ))}
          </div>
        </motion.div>

        {/* Flagship Trust Copilot Module */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-12">
           <TrustCopilot requestData={{
             organizationName: context.orgName,
             industry: 'Enterprise', // Generic fallback
             systemName: context.systemName,
             trustScore: overallScore,
             riskLevel: trustData.riskLevel,
             categoryScores: trustData.categoryScores
           }} />
        </motion.div>

        {/* Executive Decision Advisor Module */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-8 pb-8">
           <ExecutiveDecisionAdvisor requestData={{
             organizationName: context.orgName,
             industry: 'Enterprise', 
             systemName: context.systemName,
             trustScore: overallScore,
             riskLevel: trustData.riskLevel,
             complianceScore: 92, // Mock fallback
             governanceMaturity: trustData.trustLevel,
             categoryScores: trustData.categoryScores
           }} />
        </motion.div>

        {/* Executive Board Resolution Module */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-8 pb-8">
           <ExecutiveBoardResolution requestData={{
             organizationName: context.orgName,
             industry: 'Enterprise', 
             systemName: context.systemName,
             trustScore: overallScore,
             riskLevel: trustData.riskLevel,
             complianceScore: 92, // Mock fallback
             governanceMaturity: trustData.trustLevel,
             categoryScores: trustData.categoryScores
           }} />
        </motion.div>

      </main>
    </div>
  );
}
