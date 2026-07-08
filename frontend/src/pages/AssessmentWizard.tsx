import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, ChevronRight, CheckCircle2, Shield, Settings2, ShieldCheck, PlayCircle, Edit2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { assessmentService } from '@/services/assessmentService';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const wizardSchema = z.object({
  orgName: z.string().min(2, "Organization Name is required"),
  industry: z.string().min(1, "Industry is required"),
  country: z.string().min(1, "Country is required"),
  systemName: z.string().min(2, "AI System Name is required"),
  owner: z.string().min(2, "Owner name is required"),
  businessUnit: z.string().min(1, "Business Unit is required"),
  environment: z.string().min(1, "Environment is required"),
  riskCategory: z.string().min(1, "Risk Category is required"),
  categories: z.object({
    transparency: z.boolean(),
    fairness: z.boolean(),
    privacy: z.boolean(),
    security: z.boolean(),
    accountability: z.boolean(),
  }),
});

type WizardData = z.infer<typeof wizardSchema>;

const STEPS = [
  { id: 1, title: 'Organization', icon: Shield },
  { id: 2, title: 'Scope', icon: Settings2 },
  { id: 3, title: 'Categories', icon: ShieldCheck },
  { id: 4, title: 'Review', icon: CheckCircle2 },
  { id: 5, title: 'Start', icon: PlayCircle },
];

export function AssessmentWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<WizardData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      orgName: '',
      industry: '',
      country: '',
      systemName: '',
      owner: '',
      businessUnit: '',
      environment: '',
      riskCategory: '',
      categories: {
        transparency: true,
        fairness: true,
        privacy: true,
        security: true,
        accountability: true,
      }
    },
    mode: 'onTouched',
  });

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ['orgName', 'industry', 'country', 'systemName', 'owner'];
    if (currentStep === 2) fieldsToValidate = ['businessUnit', 'environment', 'riskCategory'];
    
    const isStepValid = await form.trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const onSubmit = async (data: WizardData) => {
    setIsSubmitting(true);
    try {
      const response = await assessmentService.createAssessment({
        organizationName: data.orgName,
        industry: data.industry,
        country: data.country,
        systemName: data.systemName,
        assessmentOwner: data.owner,
        scope: `${data.businessUnit} - ${data.environment} - ${data.riskCategory}`,
      });
      localStorage.setItem('currentAssessmentId', response.assessmentId);
      navigate('/assessment-questions');
    } catch (error) {
      console.error("Failed to create assessment, falling back to Demo Mode", error);
      // Fallback to Demo Mode
      localStorage.setItem('currentAssessmentId', 'DEMO-' + Math.floor(Math.random() * 10000));
      navigate('/assessment-questions');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formData = form.watch();

  return (
    <div className="min-h-[calc(100vh-14rem)] bg-slate-50/50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Stepper Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">New Assessment Setup</h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isPast = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center bg-slate-50/50 px-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isActive ? 'bg-indigo-600 border-indigo-100 text-white shadow-md shadow-indigo-200' : isPast ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                    {isPast ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`mt-2 text-xs font-semibold ${isActive || isPast ? 'text-indigo-700' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Forms */}
        <div className="relative overflow-hidden">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              
              {/* Step 1: Organization */}
              {currentStep === 1 && (
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl animate-in slide-in-from-right-8 duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Organization Information</CardTitle>
                    <CardDescription>Enter the basic details about your organization and the AI system being assessed.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="orgName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl><Input placeholder="Acme Corp" {...field} className="bg-slate-50 border-slate-200 focus-visible:ring-indigo-500" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="industry" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-slate-50"><SelectValue placeholder="Select industry" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="finance">Finance & Banking</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="tech">Technology</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country of Operation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-slate-50"><SelectValue placeholder="Select country" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="eu">European Union</SelectItem>
                              <SelectItem value="global">Global</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="systemName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>AI System Name</FormLabel>
                          <FormControl><Input placeholder="E.g. SupportBot v2" {...field} className="bg-slate-50 border-slate-200" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="owner" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assessment Owner</FormLabel>
                          <FormControl><Input placeholder="Jane Doe" {...field} className="bg-slate-50 border-slate-200" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-6 border-t border-slate-100">
                    <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 px-8 rounded-full">
                      Next Step <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 2: Scope */}
              {currentStep === 2 && (
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl animate-in slide-in-from-right-8 duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Assessment Scope</CardTitle>
                    <CardDescription>Define the deployment boundaries and risk profile of the AI system.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="businessUnit" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-slate-50"><SelectValue placeholder="Select unit" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="hr">Human Resources</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                              <SelectItem value="engineering">Engineering / Product</SelectItem>
                              <SelectItem value="customer_service">Customer Service</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="environment" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deployment Environment</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-slate-50"><SelectValue placeholder="Select environment" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="internal">Internal Only</SelectItem>
                              <SelectItem value="b2b">B2B (Enterprise)</SelectItem>
                              <SelectItem value="b2c">B2C (Public Facing)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="riskCategory" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Self-Assessed Risk Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-slate-50"><SelectValue placeholder="Select risk level" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="unacceptable">Unacceptable Risk (Prohibited)</SelectItem>
                              <SelectItem value="high">High Risk (Requires strict compliance)</SelectItem>
                              <SelectItem value="limited">Limited Risk (Transparency obligations)</SelectItem>
                              <SelectItem value="minimal">Minimal Risk</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Based on EU AI Act classifications</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t border-slate-100">
                    <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-6 border-slate-300">Back</Button>
                    <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 px-8 rounded-full">
                      Next Step <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 3: Categories */}
              {currentStep === 3 && (
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl animate-in slide-in-from-right-8 duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl">Governance Categories</CardTitle>
                    <CardDescription>Select the pillars of responsible AI to include in this assessment.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {['transparency', 'fairness', 'privacy', 'security', 'accountability'].map((cat) => (
                        <FormField key={cat} control={form.control} name={`categories.${cat as keyof WizardData['categories']}`} render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-200 p-4 bg-white shadow-sm hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-semibold capitalize">{cat}</FormLabel>
                              <FormDescription>
                                {cat === 'transparency' && 'Assess model explainability and user disclosures.'}
                                {cat === 'fairness' && 'Evaluate demographic bias and mitigation strategies.'}
                                {cat === 'privacy' && 'Check data anonymization and consent workflows.'}
                                {cat === 'security' && 'Review robustness against adversarial attacks and drift.'}
                                {cat === 'accountability' && 'Ensure human-in-the-loop and clear governance roles.'}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-indigo-600" />
                            </FormControl>
                          </FormItem>
                        )} />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t border-slate-100">
                    <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-6 border-slate-300">Back</Button>
                    <Button type="button" onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 px-8 rounded-full">
                      Review <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-2xl animate-in slide-in-from-right-8 duration-300 bg-white">
                  <CardHeader className="bg-slate-50 rounded-t-2xl border-b border-slate-100">
                    <CardTitle className="text-2xl text-slate-800">Assessment Summary</CardTitle>
                    <CardDescription>Please review the configuration before generating the questionnaire.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Organization Info</h4>
                          <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-indigo-600" onClick={() => setCurrentStep(1)}>
                            <Edit2 className="h-3 w-3 mr-1" /> Edit
                          </Button>
                        </div>
                        <dl className="space-y-3 text-sm">
                          <div className="grid grid-cols-2"><dt className="text-slate-500">Org Name:</dt><dd className="font-medium">{formData.orgName || 'N/A'}</dd></div>
                          <div className="grid grid-cols-2"><dt className="text-slate-500">System Name:</dt><dd className="font-medium">{formData.systemName || 'N/A'}</dd></div>
                          <div className="grid grid-cols-2"><dt className="text-slate-500">Owner:</dt><dd className="font-medium">{formData.owner || 'N/A'}</dd></div>
                        </dl>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Scope Details</h4>
                          <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-indigo-600" onClick={() => setCurrentStep(2)}>
                            <Edit2 className="h-3 w-3 mr-1" /> Edit
                          </Button>
                        </div>
                        <dl className="space-y-3 text-sm">
                          <div className="grid grid-cols-2"><dt className="text-slate-500">Unit:</dt><dd className="font-medium capitalize">{formData.businessUnit || 'N/A'}</dd></div>
                          <div className="grid grid-cols-2"><dt className="text-slate-500">Environment:</dt><dd className="font-medium capitalize">{formData.environment || 'N/A'}</dd></div>
                          <div className="grid grid-cols-2"><dt className="text-slate-500">Risk Level:</dt><dd className="font-medium capitalize text-amber-600">{formData.riskCategory || 'N/A'}</dd></div>
                        </dl>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Selected Categories</h4>
                        <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-indigo-600" onClick={() => setCurrentStep(3)}>
                          <Edit2 className="h-3 w-3 mr-1" /> Edit
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(formData.categories || {}).map(([key, isEnabled]) => isEnabled && (
                          <span key={key} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold capitalize border border-indigo-100">
                            {key}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
                    <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-6 border-slate-300">Back</Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 px-8 rounded-full shadow-lg shadow-indigo-200">
                      {isSubmitting ? 'Processing...' : 'Confirm Setup'}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 5: Start Assessment */}
              {currentStep === 5 && (
                <Card className="border-0 shadow-xl shadow-indigo-100 rounded-2xl animate-in zoom-in-95 duration-500 bg-gradient-to-b from-white to-indigo-50/50">
                  <CardContent className="pt-16 pb-12 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50">
                      <Check className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Setup Complete!</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                      Your assessment environment for <strong>{formData.systemName}</strong> is ready. The questionnaire has been tailored to your selected risk profile and categories.
                    </p>
                    <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 hover:-translate-y-1 transition-all">
                      <Link to="/assessment-questions">Start Questionnaire <PlayCircle className="w-5 h-5 ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

            </form>
          </Form>
        </div>

      </div>
    </div>
  );
}
