import React from 'react';
import { FileText, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  tuitionIncrease: number;
  setTuitionIncrease: (val: number) => void;
  onToggleReport: () => void;
  onTogglePrivacy: () => void;
  privacyMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  tuitionIncrease, 
  setTuitionIncrease, 
  onToggleReport, 
  onTogglePrivacy, 
  privacyMode 
}) => {
  return (
    <header className="w-full mb-12 flex flex-col 2xl:flex-row items-center justify-between gap-8 relative z-10 border-b-8 border-black pb-10 no-print">
      <div className="flex items-center gap-8">
        <img src="https://i.postimg.cc/MZ4w91zf/imh-logo.png" alt="IMH Logo" className="h-[80px] object-contain" />
        <div className="h-16 w-2 bg-black hidden md:block"></div>
        <div>
          <h1 className="text-4xl xl:text-5xl font-serif font-black tracking-tighter text-black uppercase flex items-center gap-4">
            Modulator plata 2026
            {privacyMode && <EyeOff className="text-slate-300 hidden md:block" size={32} />}
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mt-1">International Montessori House</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-6 w-full 2xl:w-auto">
        {/* Slider Control */}
        <div className="flex items-center gap-6 bg-slate-50 px-8 py-4 rounded-3xl border-4 border-black w-full xl:w-auto shadow-xl">
          <div className="flex flex-col">
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest">KOREKCIJA ŠKOLARINE</span>
            <span className="text-black font-black text-4xl">+{tuitionIncrease}%</span>
          </div>
          <input 
            type="range" min="0" max="10" step="0.5"
            value={tuitionIncrease}
            onChange={(e) => setTuitionIncrease(parseFloat(e.target.value))}
            className="w-48 h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
          />
        </div>
        
        <div className="flex gap-4 w-full xl:w-auto">
          <button 
            onClick={onToggleReport} 
            className="flex-1 xl:flex-none px-8 py-4 bg-black text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <FileText size={24} /> GENERIŠI IZVJEŠTAJ
          </button>
          
          <button 
            onClick={onTogglePrivacy}
            className="p-4 rounded-2xl border-4 border-black bg-white text-black shadow-xl hover:bg-slate-50 transition-all active:scale-95"
            title={privacyMode ? "Prikaži podatke" : "Sakrij podatke"}
          >
            {privacyMode ? <EyeOff size={28} /> : <Eye size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
};