import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Shield, CheckCircle, Zap, Building2, HeartPulse, ShoppingCart } from 'lucide-react';
import { assessmentService } from '@/services/assessmentService';

const DEMO_ORGS = [
  {
    name: 'ABC Bank',
    systemName: 'Loan Approval AI',
    industry: 'Banking',
    trustScore: 82,
    risk: 'Medium',
    icon: Building2,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    data: {
      overallTrustScore: 82,
      trustLevel: 'Good',
      riskLevel: 'Medium',
      executiveSummary: 'This organization demonstrates strong governance maturity across privacy and transparency. The primary weakness is security governance due to limited access control and auditability. Addressing these issues could significantly improve organizational trust.',
      categoryScores: {
        Transparency: 85,
        Fairness: 74,
        Privacy: 92,
        Security: 68,
        Accountability: 81
      }
    }
  },
  {
    name: 'CityCare Hospital',
    systemName: 'Clinical Decision Support AI',
    industry: 'Healthcare',
    trustScore: 74,
    risk: 'High',
    icon: HeartPulse,
    color: 'text-red-600',
    bg: 'bg-red-100',
    data: {
      overallTrustScore: 74,
      trustLevel: 'Moderate',
      riskLevel: 'High',
      executiveSummary: 'Healthcare data requires the highest level of governance. While privacy controls are adequate, bias monitoring in clinical decision support is lacking, presenting a high risk to patient outcomes.',
      categoryScores: {
        Transparency: 70,
        Fairness: 60,
        Privacy: 85,
        Security: 75,
        Accountability: 80
      }
    }
  },
  {
    name: 'SmartRetail Ltd.',
    systemName: 'Demand Forecasting AI',
    industry: 'Retail',
    trustScore: 91,
    risk: 'Low',
    icon: ShoppingCart,
    color: 'text-green-600',
    bg: 'bg-green-100',
    data: {
      overallTrustScore: 91,
      trustLevel: 'Excellent',
      riskLevel: 'Low',
      executiveSummary: 'SmartRetail demonstrates exceptional maturity in AI governance. Models are highly explainable and well-documented. Continue continuous monitoring to maintain low risk.',
      categoryScores: {
        Transparency: 95,
        Fairness: 88,
        Privacy: 90,
        Security: 92,
        Accountability: 90
      }
    }
  }
];

export function LandingPage() {
  const navigate = useNavigate();

  const handleDemoSelect = async (org: typeof DEMO_ORGS[0]) => {
    // Save the target trust results in local storage to bypass real calculation
    localStorage.setItem('demoTrustResults', JSON.stringify(org.data));
    localStorage.setItem('demoOrgName', org.name);
    localStorage.setItem('demoSystemName', org.systemName);
    
    // Create a real assessment so we have a valid ID in the DB
    try {
      const response = await assessmentService.createAssessment({
        organizationName: org.name,
        industry: org.industry,
        country: 'USA',
        systemName: org.systemName,
        assessmentOwner: 'Demo User',
        scope: 'Demo Unit'
      });
      localStorage.setItem('currentAssessmentId', response.assessmentId);
      // Navigate to questions to trigger the loading animation
      navigate('/questions?demo=true');
    } catch (e) {
      console.error('Failed to create demo assessment', e);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background via-muted/30 to-background border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container mx-auto px-4 text-center max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-8 cursor-default">
            ✨ New: AI Governance Framework 2.0
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
            Measure your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">AI Trust Score</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Evaluate your organization's AI governance, privacy, and compliance maturity in minutes. Get actionable recommendations to build responsible AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="rounded-full px-8 text-base h-14 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
              <Link to="/assessment">Start Free Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Mode Section */}
      <section className="w-full py-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              <Zap className="text-indigo-500 h-8 w-8" /> Load Demo Assessment
            </h2>
            <p className="text-muted-foreground mt-2">Experience the platform instantly with pre-populated industry scenarios.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DEMO_ORGS.map((org, idx) => {
              const Icon = org.icon;
              return (
                <Card key={idx} className="hover:border-indigo-300 transition-all hover:shadow-md cursor-pointer group" onClick={() => handleDemoSelect(org)}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${org.bg} ${org.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Score</div>
                        <div className="text-2xl font-bold text-slate-900">{org.trustScore}</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-4 group-hover:text-indigo-600 transition-colors">{org.name}</CardTitle>
                    <div className="text-sm text-muted-foreground font-medium">{org.systemName}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-full text-slate-600">{org.industry}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        org.risk === 'Low' ? 'bg-green-100 text-green-700' :
                        org.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>{org.risk} Risk</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Assessment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive framework evaluates your AI systems across three critical pillars of responsible AI development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg bg-card/50 backdrop-blur duration-300">
              <CardContent className="pt-10 pb-8 px-6 text-center flex flex-col items-center">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary ring-1 ring-primary/20">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Governance & Ethics</h3>
                <p className="text-muted-foreground leading-relaxed">Establish clear accountability, fairness, and transparency protocols for all models.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg bg-card/50 backdrop-blur duration-300">
              <CardContent className="pt-10 pb-8 px-6 text-center flex flex-col items-center">
                <div className="h-16 w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-600 ring-1 ring-blue-500/20">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Privacy & Compliance</h3>
                <p className="text-muted-foreground leading-relaxed">Ensure data minimization, anonymization, and adherence to global AI regulations.</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg bg-card/50 backdrop-blur duration-300">
              <CardContent className="pt-10 pb-8 px-6 text-center flex flex-col items-center">
                <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-600 ring-1 ring-green-500/20">
                  <Activity className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Robustness & Security</h3>
                <p className="text-muted-foreground leading-relaxed">Monitor models in production for drift, bias, and adversarial vulnerabilities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
