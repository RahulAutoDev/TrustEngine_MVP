import { motion } from 'framer-motion';

export interface DigitalStampProps {
  status: 'VERIFIED' | 'APPROVED' | 'REJECTED';
}

export function DigitalStamp({ status }: DigitalStampProps) {
  const color = status === 'REJECTED' ? 'border-red-600 text-red-600' : 'border-amber-500 text-amber-500';
  
  return (
    <motion.div
      initial={{ scale: 3, opacity: 0, rotate: -20 }}
      animate={{ scale: 1, opacity: 1, rotate: -5 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        mass: 1
      }}
      className={`inline-block border-4 ${color} rounded-lg px-6 py-2 shadow-sm bg-white/10 backdrop-blur-sm relative overflow-hidden`}
    >
      <div className={`absolute inset-0 border-2 border-dashed ${color} opacity-40 m-1 rounded-sm pointer-events-none`}></div>
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest relative z-10" style={{
        fontFamily: '"Courier New", Courier, monospace',
        textShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        {status}
      </h2>
    </motion.div>
  );
}
