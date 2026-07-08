import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  PlusCircle, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  BarChart4
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';

// --- MOCK DATA ---
const trustScore = 78;
const assessmentDate = "2026-07-07";
const organizationName = "Acme Corp Global";

const radarData = [
  { subject: 'Transparency', A: 85, fullMark: 100 },
  { subject: 'Fairness', A: 65, fullMark: 100 },
  { subject: 'Privacy', A: 90, fullMark: 100 },
  { subject: 'Security', A: 80, fullMark: 100 },
  { subject: 'Accountability', A: 70, fullMark: 100 },
];

const barData = [
  { name: 'Transparency', score: 85 },
  { name: 'Fairness', score: 65 },
  { name: 'Privacy', score: 90 },
  { name: 'Security', score: 80 },
  { name: 'Accountability', score: 70 },
];

const pieData = [
  { name: 'Low', value: 45 },
  { name: 'Medium', value: 30 },
  { name: 'High', value: 20 },
  { name: 'Critical', value: 5 },
];
const PIE_COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#7f1d1d'];

const recentAssessments = [
  { id: '1', org: 'ABC Bank', industry: 'Banking', date: '2026-07-06', score: 82, risk: 'Medium', status: 'Completed' },
  { id: '2', org: 'CityCare Hospital', industry: 'Healthcare', date: '2026-06-15', score: 74, risk: 'High', status: 'Completed' },
  { id: '3', org: 'SmartRetail Ltd.', industry: 'Retail', date: '2026-05-20', score: 91, risk: 'Low', status: 'Needs Review' },
];

const getGaugeColor = (score: number) => {
  if (score >= 80) return '#22c55e'; // Green
  if (score >= 60) return '#eab308'; // Yellow
  if (score >= 40) return '#f97316'; // Orange
  return '#ef4444'; // Red
};

export function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Top Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Trust Assessment Engine</h1>
              <div className="flex items-center text-sm text-slate-500 gap-2">
                <span className="font-medium text-slate-700">{organizationName}</span>
                <span>•</span>
                <span>Last updated: {assessmentDate}</span>
              </div>
            </div>
          </div>
          <div>
            <Button asChild className="rounded-full shadow-md hover:shadow-lg transition-all bg-indigo-600 hover:bg-indigo-700">
              <Link to="/assessment">
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate New Assessment
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-8 space-y-8">
        
        {/* Main KPI Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          
          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-sm border-slate-200 h-full">
              <CardContent className="p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Overall Trust Score</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">{trustScore}</h3>
                  <span className="text-xs font-medium text-green-600 mb-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1"/> +4%
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-sm border-slate-200 h-full">
              <CardContent className="p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Compliance Score</p>
                <h3 className="text-2xl font-bold text-slate-900">92%</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-sm border-slate-200 h-full">
              <CardContent className="p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Governance Maturity</p>
                <h3 className="text-xl font-bold text-indigo-600">Level 3 (Defined)</h3>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-sm border-slate-200 h-full">
              <CardContent className="p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Critical Risks</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-red-600">0</h3>
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-sm border-slate-200 h-full">
              <CardContent className="p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">High Risks</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-amber-500">2</h3>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-sm border-slate-200 h-full">
              <CardContent className="p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Medium Risks</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-blue-500">5</h3>
                  <BarChart4 className="h-4 w-4 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="rounded-xl shadow-sm border-slate-200 h-full bg-slate-50">
              <CardContent className="p-4 flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Assessment Completion</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 text-xs rounded-full hover:bg-green-100">
                    100% Complete
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Trust Score Circular Gauge */}
          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="rounded-2xl shadow-sm border-slate-200 flex flex-col items-center justify-center p-6 bg-white h-full">
              <CardHeader className="text-center pb-0">
                <CardTitle className="text-lg text-slate-700 font-semibold">Trust Score Gauge</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-6 w-full relative h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ value: trustScore }, { value: 100 - trustScore }]}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius="70%"
                      outerRadius="90%"
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={true}
                    >
                      <Cell fill={getGaugeColor(trustScore)} />
                      <Cell fill="#f1f5f9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-6 flex flex-col items-center">
                  <span className="text-5xl font-extrabold text-slate-900" style={{ color: getGaugeColor(trustScore) }}>
                    {trustScore}
                  </span>
                  <span className="text-sm font-medium text-slate-500 mt-1">Out of 100</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust Categories Radar */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
            <Card className="rounded-2xl shadow-sm border-slate-200 bg-white h-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-700 font-semibold">Trust Categories Analysis</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Score" dataKey="A" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.4} isAnimationActive={true} />
                    <RechartsTooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Governance Category Scores Bar Chart */}
          <motion.div variants={itemVariants}>
            <Card className="rounded-2xl shadow-sm border-slate-200 bg-white h-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-700 font-semibold">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                    <YAxis dataKey="name" type="category" stroke="#64748b" tick={{fontSize: 13}} width={100} />
                    <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="score" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={24} isAnimationActive={true}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getGaugeColor(entry.score)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Distribution Pie Chart */}
          <motion.div variants={itemVariants}>
            <Card className="rounded-2xl shadow-sm border-slate-200 bg-white h-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-700 font-semibold">Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-72 flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      isAnimationActive={true}
                    >
                      {pieData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col justify-center pr-8 space-y-4 w-1/2">
                  {pieData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: PIE_COLORS[index]}}></div>
                        <span className="text-sm font-medium text-slate-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Assessments Table */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="rounded-2xl shadow-sm border-slate-200 bg-white mb-12">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700 font-semibold">Recent Assessments</CardTitle>
              <CardDescription>View and manage previously generated trust reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold text-slate-600">Organization</TableHead>
                    <TableHead className="font-semibold text-slate-600">Industry</TableHead>
                    <TableHead className="font-semibold text-slate-600">Assessment Date</TableHead>
                    <TableHead className="font-semibold text-slate-600">Trust Score</TableHead>
                    <TableHead className="font-semibold text-slate-600">Risk Level</TableHead>
                    <TableHead className="font-semibold text-slate-600">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-600">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAssessments.map((assessment) => (
                    <TableRow key={assessment.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-medium text-slate-900">{assessment.org}</TableCell>
                      <TableCell className="text-slate-500">{assessment.industry}</TableCell>
                      <TableCell className="text-slate-500">{assessment.date}</TableCell>
                      <TableCell>
                        <span className="font-bold" style={{color: getGaugeColor(assessment.score)}}>
                          {assessment.score}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border-none font-medium ${
                          assessment.risk === 'Low' ? 'bg-green-100 text-green-800' :
                          assessment.risk === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {assessment.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {assessment.status === 'Completed' ? (
                          <Badge variant="outline" className="text-slate-500 border-slate-200 bg-slate-50 font-medium"><CheckCircle className="w-3 h-3 mr-1"/> Completed</Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 font-medium"><AlertTriangle className="w-3 h-3 mr-1"/> Needs Review</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-medium">
                          View Results <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

      </main>
    </div>
  );
}
