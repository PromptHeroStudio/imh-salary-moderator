import React from 'react';
import { BarChart3 } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid
} from 'recharts';
import { formatKM } from '../utils/formatters';

interface SecondaryChartsProps {
  loyaltyCostData: any[];
  categorySummaries: any[];
}

export const SecondaryCharts: React.FC<SecondaryChartsProps> = ({ loyaltyCostData, categorySummaries }) => {
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12 relative z-10 no-print">
       
       {/* LOYALTY CHART */}
       <div className="p-10 rounded-[3rem] border-4 border-black bg-white shadow-2xl h-[500px] flex flex-col">
          <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <BarChart3 size={24} /> Teret po lojalnosti
          </h3>
          {/* PERFORMANCE FIX: Strict height and min-width to avoid resize loop */}
          <div className="h-[400px] w-full min-h-[400px] min-w-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={400} debounce={50}>
              <BarChart id="loyalty-chart-view" data={loyaltyCostData} margin={{top: 20, right: 30, left: 20, bottom: 20}}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="period" 
                  fontSize={11} 
                  fontWeight="700" 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10} 
                />
                <YAxis hide />
                <Tooltip 
                  isAnimationActive={false} // Performance: Disable animation
                  cursor={{fill: 'rgba(0,0,0,0.03)'}}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border-2 border-black p-4 rounded-xl shadow-lg">
                          <p className="font-bold text-xs uppercase text-slate-400 mb-1">{payload[0].payload.period}</p>
                          <p className="font-mono text-xl font-black">{formatKM(payload[0].value as number)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="iznos" 
                  radius={[8, 8, 8, 8]} 
                  barSize={50}
                  isAnimationActive={false} // Performance: Disable animation
                >
                  {loyaltyCostData.map((entry, index) => (
                    <Cell key={entry.id || `cell-loyalty-${index}`} fill={entry.boja} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
       </div>

       {/* GROUP COSTS */}
       <div className="grid grid-cols-2 gap-4 h-[500px]">
          {categorySummaries.map((catSum) => (
            <div key={catSum.cat} className="p-6 rounded-[2rem] border-2 border-slate-100 bg-white hover:border-black transition-colors flex flex-col justify-between shadow-lg">
               <div>
                 <div className="flex justify-between items-center mb-2">
                    <span className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-lg font-black">{catSum.cat}</span>
                    <span className="text-xs font-bold text-slate-400">{catSum.count} ZAP.</span>
                 </div>
                 <h4 className="font-bold leading-tight text-sm uppercase">{catSum.label}</h4>
               </div>
               <div>
                 {/* VISUAL EMPHASIS: text-5xl font-black */}
                 <div className="text-5xl font-black tracking-tighter text-black">{formatKM(catSum.totalRaiseCostBruto)}</div>
                 <div className="text-[10px] font-bold text-slate-300 uppercase mt-1">BRUTO TERET</div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};