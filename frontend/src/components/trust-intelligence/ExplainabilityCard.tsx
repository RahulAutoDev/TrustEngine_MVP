import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function ExplainabilityCard({ overallScore = 84 }: { overallScore?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Card className="rounded-2xl border-indigo-100 bg-gradient-to-r from-indigo-600 to-blue-700 shadow-md text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-32 h-32" />
        </div>
        <CardContent className="p-8 relative z-10">
          <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-200 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Explainability Rationale
          </h4>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-indigo-50">
            "The Trust Score of <span className="font-black text-white">{overallScore}</span> reflects strong governance maturity in Privacy and Transparency. However, Security governance reduced the overall Trust Index because critical controls such as Role-Based Access Control and centralized audit logging are not fully implemented. With a Medium risk profile, the system is conditionally approved pending these security enhancements."
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
