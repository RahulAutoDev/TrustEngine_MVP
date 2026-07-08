import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function PipelineDiagram() {
  const pipelineSteps = [
    { name: 'Governance Assessment', type: 'input' },
    { name: 'Governance Maturity Engine', type: 'process' },
    { name: 'Governance Analyzer', type: 'process' },
    { name: 'Risk Analyzer', type: 'process' },
    { name: 'Compliance Analyzer', type: 'process' },
    { name: 'Confidence Analyzer', type: 'process' },
    { name: 'Trust Calculator', type: 'core' },
    { name: 'Explainability Engine', type: 'process' },
    { name: 'Decision Engine', type: 'process' },
    { name: 'Trust Copilot', type: 'process' },
    { name: 'Executive Recommendation', type: 'output' },
  ];

  return (
    <div className="flex flex-col items-center py-8">
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-xl font-bold text-slate-800">Trust Engine Processing Pipeline</h3>
        <p className="text-sm text-slate-500">The deterministic flow of data through the engine</p>
      </div>

      <div className="space-y-2 relative">
        {pipelineSteps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className={`w-64 py-3 px-4 text-center rounded-xl font-semibold shadow-sm border ${
                step.type === 'input' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                step.type === 'core' ? 'bg-indigo-600 text-white border-indigo-700 shadow-md transform scale-105 my-2' :
                step.type === 'output' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                'bg-white text-indigo-700 border-indigo-100'
              }`}
            >
              {step.name}
            </motion.div>
            
            {idx < pipelineSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (idx * 0.15) + 0.1 }}
                className="py-1"
              >
                <ArrowDown className="w-5 h-5 text-slate-300" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
