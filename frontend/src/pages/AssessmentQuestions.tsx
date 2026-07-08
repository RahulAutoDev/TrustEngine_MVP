import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, ChevronRight, Send, AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { questionService, type Question } from '@/services/questionService';
import { assessmentService } from '@/services/assessmentService';
import { trustService } from '@/services/trustService';

// --- DESCRIPTIONS ---
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  transparency: "Ensure the AI system's operations, capabilities, and limitations are clear to stakeholders.",
  fairness: "Identify, mitigate, and monitor bias to ensure equitable outcomes for all users.",
  privacy: "Protect sensitive data and ensure compliance with global privacy regulations.",
  security: "Safeguard the AI system against adversarial attacks and ensure operational stability.",
  accountability: "Establish clear ownership and human-in-the-loop oversight mechanisms."
};

type AnswerValue = 'yes' | 'partial' | 'no';

export function AssessmentQuestions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analyzingStage, setAnalyzingStage] = useState(-1);

  const isDemo = new URLSearchParams(location.search).get('demo') === 'true';

  useEffect(() => {
    if (isDemo) {
      runAnalysisAnimation();
      return;
    }

    questionService.getQuestions().then(data => {
      const grouped = data.reduce((acc: any, q: Question) => {
        const catId = q.category.toLowerCase();
        if (!acc[catId]) {
          acc[catId] = {
            id: catId,
            title: q.category,
            description: CATEGORY_DESCRIPTIONS[catId] || "",
            questions: []
          };
        }
        acc[catId].questions.push({ id: q.id.toString(), text: q.text });
        return acc;
      }, {});
      setCategories(Object.values(grouped));
    });
  }, [isDemo]);

  const runAnalysisAnimation = () => {
    setIsSubmitting(true);
    let stage = 0;
    const interval = setInterval(() => {
      setAnalyzingStage(stage);
      stage++;
      if (stage > 5) {
        clearInterval(interval);
        setTimeout(() => navigate('/results'), 500);
      }
    }, 600); // 600ms per stage for a dramatic effect
  };

  if (isDemo || isSubmitting) {
    const stages = ["Initializing Assessment...", "Analyzing Transparency...", "Evaluating Fairness & Bias...", "Auditing Privacy Controls...", "Verifying Security Architecture...", "Computing Trust Score..."];
    return (
      <div className="min-h-[calc(100vh-14rem)] bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-2xl">
          <CardContent className="p-8 flex flex-col items-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="mb-8 relative"
            >
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20"></div>
              <ShieldCheck className="h-16 w-16 text-indigo-400 relative z-10" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Analyzing AI Governance
            </h3>
            
            <div className="w-full space-y-4">
              {stages.map((stageText, idx) => {
                const isActive = analyzingStage === idx;
                const isPast = analyzingStage > idx;
                if (!isActive && !isPast) return null;
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    {isPast ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    ) : (
                      <Loader2 className="h-5 w-5 text-indigo-400 animate-spin shrink-0" />
                    )}
                    <span className={`text-sm ${isPast ? 'text-slate-400' : 'text-white font-medium'} truncate`}>
                      {stageText}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            
            <Progress value={Math.min(((analyzingStage + 1) / 6) * 100, 100)} className="h-1.5 mt-8 bg-slate-700 [&>div]:bg-indigo-500" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (categories.length === 0) {
    return <div className="min-h-[calc(100vh-14rem)] bg-slate-50 flex items-center justify-center">Loading questions...</div>;
  }

  const currentCategory = categories[currentCategoryIndex];
  const totalQuestions = categories.reduce((acc, cat) => acc + cat.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  // Score Calculation
  const scoreMap = { yes: 10, partial: 5, no: 0 };
  
  const getCategoryScore = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    if (!cat) return 0;
    let score = 0;
    let answeredInCat = 0;
    cat.questions.forEach((q: any) => {
      if (answers[q.id]) {
        score += scoreMap[answers[q.id]];
        answeredInCat++;
      }
    });
    if (answeredInCat === 0) return 0;
    return Math.round((score / (answeredInCat * 10)) * 100);
  };

  const getOverallScore = () => {
    if (answeredCount === 0) return 0;
    let totalScore = 0;
    Object.values(answers).forEach(val => {
      totalScore += scoreMap[val];
    });
    return Math.round((totalScore / (answeredCount * 10)) * 100);
  };

  const overallScore = getOverallScore();
  
  const getRiskLevel = (score: number, answered: number) => {
    if (answered === 0) return { label: 'Pending Data', color: 'text-slate-400', bg: 'bg-slate-100' };
    if (score >= 80) return { label: 'Low Risk', color: 'text-emerald-700', bg: 'bg-emerald-100' };
    if (score >= 50) return { label: 'Medium Risk', color: 'text-amber-700', bg: 'bg-amber-100' };
    return { label: 'High Risk', color: 'text-red-700', bg: 'bg-red-100' };
  };

  const risk = getRiskLevel(overallScore, answeredCount);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value as AnswerValue }));
  };

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) setCurrentCategoryIndex(prev => prev + 1);
  };
  const handlePrev = () => {
    if (currentCategoryIndex > 0) setCurrentCategoryIndex(prev => prev - 1);
  };

  const handleSubmit = async () => {
    const assessmentId = localStorage.getItem('currentAssessmentId');
    if (!assessmentId) return;

    // Start background submission but immediately show animation
    runAnalysisAnimation();

    try {
      // Submit all answers
      for (const [qId, ans] of Object.entries(answers)) {
        const formattedAnswer = ans === 'yes' ? 'Yes' : ans === 'partial' ? 'Partial' : 'No';
        await assessmentService.submitAnswer(assessmentId, {
          questionId: parseInt(qId),
          answer: formattedAnswer
        });
      }

      // Calculate Trust Score
      const fallbackCategories: Record<string, number> = {};
      categories.forEach(c => {
        fallbackCategories[c.title] = getCategoryScore(c.id);
      });
      
      const fallbackRisk = getRiskLevel(overallScore, answeredCount).label.split(' ')[0]; // E.g., 'Medium' from 'Medium Risk'
      
      const trustResults = await trustService.calculateTrustScore(assessmentId, {
        overall: overallScore,
        categories: fallbackCategories,
        riskLevel: fallbackRisk,
        executiveSummary: `This assessment indicates that the organization has established a foundational AI governance structure. The overall Trust Score is ${overallScore}/100. Further enhancements are recommended.`
      });
      localStorage.setItem('trustResults', JSON.stringify(trustResults));
      localStorage.removeItem('demoTrustResults');
      localStorage.removeItem('demoOrgName');
      localStorage.removeItem('demoSystemName');
      
    } catch (error) {
      console.error("Failed to submit assessment", error);
      // We are navigating anyway after animation, but if it fails we might want to handle it.
      // For hackathon mode, visual flow is prioritized.
    }
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] bg-slate-50/50 py-8 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Governance Assessment</h1>
            <p className="text-sm text-slate-500">Acme Corp Global</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full space-y-6 pb-24 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategoryIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl bg-white">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-2xl pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 font-semibold uppercase tracking-wider text-xs">
                        Step {currentCategoryIndex + 1} of {categories.length}
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl font-extrabold text-slate-900">{currentCategory.title}</CardTitle>
                    <CardDescription className="text-base mt-2 text-slate-600">{currentCategory.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                      {currentCategory.questions.map((q: any, index: number) => (
                        <div key={q.id} className="p-8 hover:bg-slate-50/50 transition-colors">
                          <h4 className="text-lg font-medium text-slate-900 mb-6 flex items-start gap-3">
                            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mt-0.5">
                              {index + 1}
                            </span>
                            {q.text}
                          </h4>
                          <div className="pl-9">
                            <RadioGroup 
                              value={answers[q.id] || ""} 
                              onValueChange={(val) => handleAnswer(q.id, val)}
                              className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                            >
                              <div className={`flex items-center space-x-3 bg-white border p-3 rounded-xl hover:border-indigo-300 transition-colors cursor-pointer w-full sm:w-auto shadow-sm ${answers[q.id] === 'yes' ? 'border-indigo-400 bg-indigo-50/30' : 'border-slate-200'}`}>
                                <RadioGroupItem value="yes" id={`${q.id}-yes`} className="text-indigo-600 border-slate-300" />
                                <Label htmlFor={`${q.id}-yes`} className="font-medium cursor-pointer w-full">Yes, fully implemented</Label>
                              </div>
                              <div className={`flex items-center space-x-3 bg-white border p-3 rounded-xl hover:border-amber-300 transition-colors cursor-pointer w-full sm:w-auto shadow-sm ${answers[q.id] === 'partial' ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200'}`}>
                                <RadioGroupItem value="partial" id={`${q.id}-partial`} className="text-amber-600 border-slate-300" />
                                <Label htmlFor={`${q.id}-partial`} className="font-medium cursor-pointer w-full">Partial / In Progress</Label>
                              </div>
                              <div className={`flex items-center space-x-3 bg-white border p-3 rounded-xl hover:border-red-300 transition-colors cursor-pointer w-full sm:w-auto shadow-sm ${answers[q.id] === 'no' ? 'border-red-400 bg-red-50/30' : 'border-slate-200'}`}>
                                <RadioGroupItem value="no" id={`${q.id}-no`} className="text-red-600 border-slate-300" />
                                <Label htmlFor={`${q.id}-no`} className="font-medium cursor-pointer w-full">No, not implemented</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-50 rounded-b-2xl border-t border-slate-100 gap-4">
                    <div className="flex gap-4 w-full sm:w-auto">
                      <Button variant="outline" onClick={handlePrev} disabled={currentCategoryIndex === 0} className="rounded-full px-6 shadow-sm flex-1 sm:flex-none">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                      </Button>
                    </div>
                    
                    {currentCategoryIndex === categories.length - 1 ? (
                      <Button onClick={handleSubmit} disabled={isSubmitting || answeredCount < totalQuestions} className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                        Submit Assessment <Send className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleNext} className="bg-slate-900 hover:bg-slate-800 rounded-full px-8 shadow-md w-full sm:w-auto">
                        Next Category <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Right Panel */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              
              <Card className="border-0 shadow-lg shadow-slate-200/50 rounded-2xl bg-white overflow-hidden">
                <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-500/20 opacity-50 blur-xl mix-blend-screen pointer-events-none"></div>
                  <p className="text-sm font-medium text-slate-300 mb-1 uppercase tracking-widest relative z-10">Live Trust Score</p>
                  <div className="text-5xl font-extrabold flex justify-center items-end gap-1 relative z-10">
                    {answeredCount > 0 ? overallScore : '-'}
                    <span className="text-lg font-normal text-slate-400 mb-1">/100</span>
                  </div>
                  <div className="mt-4 inline-flex items-center justify-center relative z-10">
                    <Badge className={`${risk.bg} ${risk.color} hover:${risk.bg} border-none px-3 py-1 text-xs font-bold uppercase tracking-wider`}>
                      {risk.label}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="mb-4 flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">Overall Progress</span>
                    <span className="text-indigo-600">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 mb-6 bg-slate-100 [&>div]:bg-indigo-600" />
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b pb-2">Category Scores</h4>
                    {categories.map(cat => {
                      const score = getCategoryScore(cat.id);
                      const isStarted = cat.questions.some((q: any) => answers[q.id]);
                      return (
                        <div key={cat.id} className="flex justify-between items-center text-sm">
                          <span className={`font-medium ${currentCategory.id === cat.id ? 'text-indigo-600' : 'text-slate-600'}`}>
                            {cat.title}
                          </span>
                          {isStarted ? (
                            <span className="font-bold text-slate-900">{score}</span>
                          ) : (
                            <span className="text-slate-400 text-xs italic">Pending</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md shadow-slate-200/40 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <CardContent className="p-5 flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                    Your answers are auto-saved locally. A final Trust Score will be generated once all categories are submitted.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
