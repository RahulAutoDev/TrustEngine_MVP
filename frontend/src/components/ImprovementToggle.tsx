import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import type { SimulationImprovement } from '@/services/simulationService';

interface Props {
  improvement: SimulationImprovement;
  isActive: boolean;
  onToggle: (id: string, active: boolean) => void;
}

export function ImprovementToggle({ improvement, isActive, onToggle }: Props) {
  return (
    <motion.div 
      initial={false}
      animate={{ 
        borderColor: isActive ? '#818cf8' : '#e2e8f0',
        backgroundColor: isActive ? '#fefeff' : '#ffffff'
      }}
      className={`border rounded-xl p-4 shadow-sm transition-all duration-300 flex items-center justify-between cursor-pointer group ${isActive ? 'ring-1 ring-indigo-500/50' : 'hover:border-slate-300'}`}
      onClick={() => onToggle(improvement.id, !isActive)}
    >
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${isActive ? 'bg-indigo-600 border-indigo-700 text-white shadow-sm' : 'bg-slate-100 border-slate-200 text-slate-400 group-hover:bg-slate-200'}`}>
          {isActive ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
        <div>
          <h4 className={`font-bold text-sm transition-colors ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>
            {improvement.title}
          </h4>
          <span className="text-[10px] uppercase font-bold text-slate-400">{improvement.category}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase font-bold text-slate-400">Expected Gain</span>
          <Badge variant="outline" className={`font-black text-xs px-2 py-0 border transition-colors ${isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
            +{improvement.scoreGain}
          </Badge>
        </div>
        <div onClick={e => e.stopPropagation()}>
          <Switch 
            checked={isActive} 
            onCheckedChange={(checked) => onToggle(improvement.id, checked)}
            className="data-[state=checked]:bg-indigo-600"
          />
        </div>
      </div>
    </motion.div>
  );
}
