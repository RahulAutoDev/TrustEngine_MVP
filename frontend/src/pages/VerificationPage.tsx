import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Home, 
  FileText,
  Clock,
  Building2,
  Award,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { verificationService, type VerificationData } from '@/services/verificationService';

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-600 bg-emerald-100 border-emerald-200';
  if (score >= 75) return 'text-green-600 bg-green-100 border-green-200';
  if (score >= 60) return 'text-blue-600 bg-blue-100 border-blue-200';
  if (score >= 40) return 'text-amber-600 bg-amber-100 border-amber-200';
  return 'text-red-600 bg-red-100 border-red-200';
};

const getProgressColor = (score: number) => {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 75) return 'bg-green-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
};

export function VerificationPage() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (assessmentId) {
      verificationService.verifyAssessment(assessmentId).then((res) => {
        setData(res);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [assessmentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Verifying Assessment...</h2>
        <p className="text-slate-500 mt-2">Checking digital signatures and integrity</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8 shadow-xl border-red-100 bg-red-50/30">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Failed</h2>
          <p className="text-slate-600 mb-6">The assessment ID provided is invalid or could not be found.</p>
          <Button asChild className="w-full bg-slate-900 hover:bg-slate-800">
            <Link to="/"><Home className="w-4 h-4 mr-2" /> Return to Home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-full mb-2 border-4 border-white shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verified Assessment</h1>
          <p className="text-slate-500 font-medium">Trust Assessment Engine • Powered by the TAIG Framework v1.0</p>
        </motion.div>

        {/* Security Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="bg-emerald-50 p-2 rounded-full"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
            <span className="text-sm font-semibold text-slate-800">Assessment Verified</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="bg-emerald-50 p-2 rounded-full"><ShieldCheck className="w-5 h-5 text-emerald-600" /></div>
            <span className="text-sm font-semibold text-slate-800">Digital Integrity Confirmed</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="bg-emerald-50 p-2 rounded-full"><FileText className="w-5 h-5 text-emerald-600" /></div>
            <span className="text-sm font-semibold text-slate-800">Trust Assessment Completed</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Assessment Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl pb-4">
                <CardTitle className="text-lg flex items-center text-slate-800">
                  <Building2 className="w-5 h-5 mr-2 text-indigo-500" /> Assessment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-3 py-2 border-b border-slate-100">
                  <span className="col-span-1 text-xs uppercase font-bold text-slate-400">Status</span>
                  <span className="col-span-2 text-sm font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {data.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 py-2 border-b border-slate-100">
                  <span className="col-span-1 text-xs uppercase font-bold text-slate-400">Assessment ID</span>
                  <span className="col-span-2 text-sm font-mono text-slate-800">{data.assessmentId}</span>
                </div>
                <div className="grid grid-cols-3 py-2 border-b border-slate-100">
                  <span className="col-span-1 text-xs uppercase font-bold text-slate-400">Organization</span>
                  <span className="col-span-2 text-sm font-semibold text-slate-800">{data.organizationName}</span>
                </div>
                <div className="grid grid-cols-3 py-2 border-b border-slate-100">
                  <span className="col-span-1 text-xs uppercase font-bold text-slate-400">Industry</span>
                  <span className="col-span-2 text-sm text-slate-600">{data.industry}</span>
                </div>
                <div className="grid grid-cols-3 py-2 border-b border-slate-100">
                  <span className="col-span-1 text-xs uppercase font-bold text-slate-400">AI System</span>
                  <span className="col-span-2 text-sm font-semibold text-slate-800">{data.aiSystemName}</span>
                </div>
                <div className="grid grid-cols-3 py-2 border-b border-slate-100">
                  <span className="col-span-1 text-xs uppercase font-bold text-slate-400">Date</span>
                  <span className="col-span-2 text-sm text-slate-600">{data.assessmentDate}</span>
                </div>
                <div className="grid grid-cols-3 py-2">
                  <span className="col-span-1 text-xs uppercase font-bold text-slate-400">Version</span>
                  <span className="col-span-2 text-sm text-slate-600">{data.assessmentVersion}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust Results & Digital Verification */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <Card className="border-indigo-100 shadow-sm bg-gradient-to-br from-indigo-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-slate-800">
                  <Award className="w-5 h-5 mr-2 text-indigo-500" /> Trust Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Overall Trust Score</p>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black text-slate-900">{data.overallTrustScore}</span>
                      <span className="text-xl font-bold text-slate-400 mb-1">/100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Maturity</p>
                    <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1 text-sm border-none shadow-sm">
                      {data.governanceMaturityBadge}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                   <div className="bg-white rounded-lg p-3 border border-indigo-100 shadow-sm text-center">
                     <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">Risk Level</p>
                     <span className={`text-sm font-bold ${data.riskLevel === 'Low' ? 'text-green-600' : data.riskLevel === 'Medium' ? 'text-amber-600' : 'text-red-600'}`}>
                       {data.riskLevel}
                     </span>
                   </div>
                   <div className="bg-white rounded-lg p-3 border border-indigo-100 shadow-sm text-center">
                     <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">Compliance</p>
                     <span className="text-sm font-bold text-slate-800">{data.complianceScore}%</span>
                   </div>
                   <div className="bg-white rounded-lg p-3 border border-indigo-100 shadow-sm text-center">
                     <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">Confidence</p>
                     <span className="text-sm font-bold text-slate-800">{data.assessmentConfidence}%</span>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl pb-4">
                <CardTitle className="text-lg flex items-center text-slate-800">
                  <ShieldCheck className="w-5 h-5 mr-2 text-indigo-500" /> Digital Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs uppercase font-bold text-slate-400">Generated By</span>
                  <span className="text-sm font-semibold text-slate-800">Trust Assessment Engine</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-xs uppercase font-bold text-slate-400">Framework</span>
                  <span className="text-sm text-slate-600">TAIG Framework v1.0</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Timestamp (UTC)
                  </span>
                  <span className="text-xs font-mono text-slate-500">{data.generatedTimestamp}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Category Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
              <CardTitle className="text-lg text-slate-800">Category Scorecard</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(data.categoryScores).map(([cat, score]) => (
                  <div key={cat} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-slate-800 uppercase tracking-wide">{cat}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${getScoreColor(score)}`}>
                          {score >= 80 ? 'Optimal' : score >= 50 ? 'Developing' : 'Critical'}
                        </span>
                        <span className="text-base font-black text-slate-900 w-8 text-right">{score}%</span>
                      </div>
                    </div>
                    <Progress value={score} className={`h-2 bg-slate-100 [&>div]:${getProgressColor(score)}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimer & Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <div className="bg-slate-100 rounded-xl p-6 text-center border border-slate-200">
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto">
              This verification confirms that this assessment was generated by the Trust Assessment Engine using the TAIG Framework. It represents a governance assessment based on assessment responses and should be used as a decision-support artifact. This is for demonstration purposes and does not represent an official regulatory certification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 shadow-sm w-full sm:w-auto">
              <Link to="/"><Home className="w-4 h-4 mr-2" /> Return to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 shadow-sm w-full sm:w-auto">
              <Link to={`/results`}><FileText className="w-4 h-4 mr-2" /> View Assessment</Link>
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" /> Download Certificate
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
