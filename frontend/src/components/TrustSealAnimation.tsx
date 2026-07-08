import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export function TrustSealAnimation() {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.2, 1],
          opacity: 1
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <motion.div 
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(79, 70, 229, 0.4)",
              "0 0 0 30px rgba(79, 70, 229, 0)",
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-indigo-500 shadow-xl"
        >
          <ShieldCheck className="w-12 h-12 text-indigo-600" />
        </motion.div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-6 font-bold text-slate-800 text-lg tracking-wide uppercase"
      >
        Assessment Integrity Confirmed
      </motion.p>
    </div>
  );
}
