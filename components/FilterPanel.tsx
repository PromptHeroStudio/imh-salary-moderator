
import React from 'react';
import { Filter, GraduationCap, CalendarDays } from 'lucide-react';

interface FilterPanelProps {
  activeCatFilter: string;
  setActiveCatFilter: (val: any) => void;
  activeMaFilter: string;
  setActiveMaFilter: (val: any) => void;
  activeYearFilter: string;
  setActiveYearFilter: (val: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  activeCatFilter,
  setActiveCatFilter,
  activeMaFilter,
  setActiveMaFilter,
  activeYearFilter,
  setActiveYearFilter
}) => {
  return (
    <div className="w-full mb-8 relative z-10 no-print">
      <div className="bg-white border-4 border-black rounded-[3rem] p-8 shadow-xl">
         <div className="flex flex-col xl:flex-row gap-8 justify-between">
            
            {/* Filter: Categories */}
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-4 text-slate-400">
                  <Filter size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Kategorije</span>
               </div>
               <div className="flex gap-2">
                  {['ALL', 'AB', 'CD'].map((opt) => (
                     <button
                       key={opt}
                       onClick={() => setActiveCatFilter(opt as any)}
                       className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all border-2 ${activeCatFilter === opt ? 'bg-black text-white border-black' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                     >
                       {opt === 'ALL' ? 'Sve' : opt === 'AB' ? 'A & B' : 'C & D'}
                     </button>
                  ))}
               </div>
            </div>

            {/* Filter: MA Status */}
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-4 text-slate-400">
                  <GraduationCap size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Ekspertiza (MA)</span>
               </div>
               <div className="flex gap-2">
                  {['ALL', 'MA_ONLY', 'NO_MA'].map((opt) => (
                     <button
                       key={opt}
                       onClick={() => setActiveMaFilter(opt as any)}
                       className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all border-2 ${activeMaFilter === opt ? 'bg-black text-white border-black' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                     >
                       {opt === 'ALL' ? 'Sve' : opt === 'MA_ONLY' ? 'Sa MA' : 'Bez MA'}
                     </button>
                  ))}
               </div>
            </div>

            {/* Filter: Year */}
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-4 text-slate-400">
                  <CalendarDays size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Staž</span>
               </div>
               <div className="flex gap-2">
                  {['ALL', 'BEFORE_2020', 'AFTER_2020'].map((opt) => (
                     <button
                       key={opt}
                       onClick={() => setActiveYearFilter(opt as any)}
                       className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all border-2 ${activeYearFilter === opt ? 'bg-black text-white border-black' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                     >
                       {opt === 'ALL' ? 'Sve' : opt === 'BEFORE_2020' ? '< 2020' : '> 2020'}
                     </button>
                  ))}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};
