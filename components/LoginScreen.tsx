import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'imh2026') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        {...{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 }
        } as any}
        className="w-full max-w-md bg-white border-4 border-black p-12 rounded-[3rem] shadow-2xl text-center"
      >
        <img src="https://i.postimg.cc/MZ4w91zf/imh-logo.png" alt="IMH Logo" className="h-24 mx-auto mb-8" />
        <h1 className="text-2xl font-black uppercase tracking-widest mb-2">IMH Salary Moderator</h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em] mb-10">Protected Financial Environment</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="UNESITE PRISTUPNU ŠIFRU"
              className={`w-full bg-slate-50 border-4 ${error ? 'border-red-500' : 'border-slate-200'} p-4 pl-12 rounded-xl font-bold text-center outline-none focus:border-black transition-colors uppercase placeholder:text-slate-300`}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-black text-white p-5 rounded-xl font-black uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            Pristupi <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
      <div className="mt-8 text-xs font-black uppercase tracking-[0.5em] text-slate-300">
        © 2026 International Montessori House
      </div>
    </div>
  );
};