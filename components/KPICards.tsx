import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Scale, Users, Wallet, ShieldCheck, ShieldAlert } from 'lucide-react';
import { CurrencyDisplay } from '../utils/formatters';

interface KPICardsProps {
  stats: any;
  globalTotals: any;
  privacyMode: boolean;
}

export const KPICards: React.FC<KPICardsProps> = ({ stats, globalTotals, privacyMode }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12 relative z-10 no-print">
      <motion.div className="p-8 rounded-[2.5rem] border-4 border-black bg-white shadow-xl flex flex-col justify-between h-56 group hover:scale-[1.01] transition-transform">
        <div className="flex justify-between items-start">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Prirast Prihoda</span>
          <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700"><TrendingUp size={28} /></div>
        </div>
        <div className={privacyMode ? "blur-md select-none transition-all duration-300" : "transition-all duration-300"}>
           <CurrencyDisplay value={stats.dodatniPrihod} className="text-4xl 2xl:text-5xl font-black text-black" />
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full" style={{width: '100%'}}></div>
        </div>
      </motion.div>

      <motion.div className="p-8 rounded-[2.5rem] border-4 border-black bg-white shadow-xl flex flex-col justify-between h-56 group hover:scale-[1.01] transition-transform">
        <div className="flex justify-between items-start">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Bruto Trošak</span>
          <div className="p-3 bg-red-100 rounded-2xl text-red-700"><Scale size={28} /></div>
        </div>
        <div className="text-4xl 2xl:text-5xl font-mono font-black text-black tracking-tight">
          <div className={privacyMode ? "blur-md select-none transition-all duration-300" : "transition-all duration-300"}>
            -<CurrencyDisplay value={globalTotals.totalBrutoCost} />
          </div>
        </div>
        <div className="text-xs font-bold text-red-500 uppercase tracking-widest mt-2">Faktor 1.63 (Canton SA)</div>
      </motion.div>

      <motion.div className="p-8 rounded-[2.5rem] border-4 border-black bg-white shadow-xl flex flex-col justify-between h-56 group hover:scale-[1.01] transition-transform">
        <div className="flex justify-between items-start">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Neto Isplatni Fond</span>
          <div className="p-3 bg-blue-100 rounded-2xl text-blue-700"><Users size={28} /></div>
        </div>
        <div className={privacyMode ? "blur-md select-none transition-all duration-300" : "transition-all duration-300"}>
          <CurrencyDisplay value={globalTotals.totalTargetNet} className="text-4xl 2xl:text-5xl font-black text-black" />
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Ciljana vrijednost 2026</div>
      </motion.div>

      <motion.div className={`p-8 rounded-[2.5rem] border-4 ${stats.isSustainable ? 'border-emerald-600 bg-emerald-50' : 'border-red-600 bg-red-50'} shadow-xl flex flex-col justify-between h-56 transition-colors duration-500`}>
        <div className="flex justify-between items-start">
          <span className={`text-xs font-black uppercase tracking-[0.2em] ${stats.isSustainable ? 'text-emerald-700' : 'text-red-700'}`}>Operativni Suficit</span>
          <div className={`p-3 rounded-2xl ${stats.isSustainable ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'}`}>
            <Wallet size={28} />
          </div>
        </div>
        <div className={privacyMode ? "blur-md select-none transition-all duration-300" : "transition-all duration-300"}>
          <CurrencyDisplay 
            value={stats.cistaDobit} 
            className={`text-4xl 2xl:text-5xl font-black ${stats.isSustainable ? 'text-emerald-700' : 'text-red-700'}`} 
          />
        </div>
        <div className={`text-xs font-black uppercase tracking-widest mt-2 flex items-center gap-2 ${stats.isSustainable ? 'text-emerald-700' : 'text-red-700'}`}>
          {stats.isSustainable ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
          {stats.isSustainable ? 'ODRŽIVO' : 'RIZIČNO'}
        </div>
      </motion.div>
    </div>
  );
};