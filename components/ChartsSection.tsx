import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { formatKM } from '../utils/formatters';

interface ChartsSectionProps {
  stats: any;
  waterfallData: any[];
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ stats, waterfallData }) => {
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12 relative z-10 no-print">
      
      {/* CHART 1: SIGURNOST BUDŽETA (50%) */}
      <div className="xl:col-span-6">
        <div className="p-10 rounded-[3rem] border-4 border-black bg-white shadow-2xl flex flex-col items-center justify-center text-center h-[500px]">
          <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-black mb-8 flex items-center gap-3">
            <ShieldCheck size={32} /> Sigurnost Budžeta
          </h2>
          <div className="relative flex items-center justify-center w-full h-full pb-8">
            <svg className="w-full h-full max-h-[300px] transform -rotate-90" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="160" stroke="#f1f5f9" strokeWidth="30" fill="transparent" />
              <motion.circle
                cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="30" fill="transparent"
                strokeDasharray="1005"
                {...{
                  initial: { strokeDashoffset: 1005 },
                  animate: { strokeDashoffset: 1005 - (Math.max(0, Math.min(stats.cistaDobit / 40000, 1)) * 1005) },
                  transition: { duration: 0 } // Instant render for performance
                } as any}
                className={stats.isSustainable ? "text-emerald-500" : "text-red-600"}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-8">
              <div className={`text-4xl font-black ${stats.isSustainable ? 'text-emerald-600' : 'text-red-600'}`}>
                {stats.isSustainable ? '100%' : 'KRITIČNO'}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">STATUS</div>
            </div>
          </div>
        </div>
      </div>

      {/* CHART 2: TOK KAPITALA (Waterfall) (50%) */}
      <div className="xl:col-span-6">
        <div className="p-10 rounded-[3rem] border-4 border-black bg-white shadow-2xl flex flex-col h-[500px]">
           <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-black mb-8 flex items-center gap-3">
             <TrendingUp size={32} /> Tok Kapitala
           </h2>
           {/* PERFORMANCE FIX: Strict height and min-width to avoid resize loop */}
           <div className="h-[400px] w-full min-h-[400px] min-w-0">
              <ResponsiveContainer width="100%" height="100%" minHeight={400} debounce={50}>
                <BarChart id="waterfall-chart-view" data={waterfallData} margin={{top: 20, right: 10, left: 0, bottom: 20}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={10} 
                    fontWeight="800" 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10} 
                    stroke="#64748b" 
                    interval={0}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    isAnimationActive={false} // Performance: Disable animation
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-black text-white p-4 rounded-xl shadow-xl">
                            <p className="font-bold text-sm mb-1">{payload[0].payload.name}</p>
                            <p className="font-mono text-emerald-400 text-lg">{formatKM(payload[0].value as number)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine y={0} stroke="#000" strokeWidth={2} />
                  <Bar 
                    dataKey="val" 
                    radius={[6, 6, 6, 6]} 
                    barSize={60}
                    isAnimationActive={false} // Performance: Disable animation
                  >
                    {waterfallData.map((entry, index) => <Cell key={entry.id || `cell-${index}`} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};