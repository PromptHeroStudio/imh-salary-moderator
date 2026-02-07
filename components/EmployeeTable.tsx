import React from 'react';
import { Users, Award } from 'lucide-react';
import { Employee } from '../types';
import { BRUTO_FACTOR } from '../constants';
import { calculateLoyaltyBonus } from '../services/financialEngine';
import { formatKM, CurrencyDisplay } from '../utils/formatters';

interface EmployeeTableProps {
  employees: Employee[];
  totals: any;
  privacyMode: boolean;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, totals, privacyMode }) => {
  return (
    <div className="w-full relative z-10 mb-12 no-print">
      <div className="bg-white border-4 border-black rounded-[3rem] shadow-2xl overflow-hidden flex flex-col w-full h-[800px]"> {/* Fixed height for sticky behavior */}
        
        <div className="p-8 border-b-4 border-black flex justify-between items-center bg-slate-50 shrink-0">
           <h3 className="text-2xl font-black uppercase tracking-[0.2em] flex items-center gap-4">
             <Users size={32} /> Matrica Zaposlenika 
             <span className="px-4 py-1 bg-black text-white text-xs rounded-full">{employees.length}</span>
           </h3>
        </div>
        
        <div className="overflow-auto flex-1 relative">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-20 shadow-sm ring-1 ring-black/5">
              <tr className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 border-b-2 border-slate-100">
                <th className="px-8 py-6 whitespace-nowrap bg-white">Zaposlenik</th>
                <th className="px-4 py-6 text-center whitespace-nowrap bg-white">Kat.</th>
                <th className="px-4 py-6 text-center whitespace-nowrap bg-white">Početak</th>
                <th className="px-4 py-6 text-center whitespace-nowrap bg-white">Lojalnost</th>
                <th className="px-4 py-6 text-center whitespace-nowrap bg-white">MA</th>
                <th className="px-6 py-6 text-right whitespace-nowrap bg-white">Bazni Neto</th>
                <th className="px-6 py-6 text-right text-emerald-700 whitespace-nowrap bg-white">Novi Neto</th>
                <th className="px-8 py-6 text-right text-red-600 whitespace-nowrap bg-white">Bruto Teret</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((emp) => {
                const loyalty = calculateLoyaltyBonus(emp.start);
                const raiseNet = emp.targetNet - emp.currentNet;
                const raiseBruto = raiseNet * BRUTO_FACTOR;
                return (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="font-bold text-lg text-black">{privacyMode ? `ZAPOSLENIK #${emp.id}` : emp.name}</div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{emp.role}</div>
                    </td>
                    <td className="px-4 py-4 text-center font-black text-slate-300">{emp.cat}</td>
                    <td className="px-4 py-4 text-center font-mono text-slate-500">{emp.start}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${loyalty > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                        +{loyalty}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {emp.ma ? <div className="flex justify-center"><Award size={20} className="text-amber-500" /></div> : <span className="text-slate-200">-</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className={privacyMode ? "blur-sm select-none" : ""}>
                          <CurrencyDisplay value={emp.currentNet} className="text-slate-400" />
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className={privacyMode ? "blur-sm select-none" : ""}>
                          <CurrencyDisplay value={emp.targetNet} className="text-xl font-black text-black" />
                       </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className={`flex flex-col items-end ${privacyMode ? "blur-sm select-none" : ""}`}>
                         <CurrencyDisplay value={raiseBruto} className="text-red-600 font-bold" />
                         <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider">+{formatKM(raiseNet)} NETO</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            
            {/* STICKY FOOTER */}
            <tfoot className="sticky bottom-0 bg-black text-white z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
               <tr>
                 <td colSpan={5} className="px-8 py-6 text-right font-black uppercase tracking-[0.2em] text-slate-400 text-sm">
                   UKUPNO (PRIKAZANO):
                 </td>
                 <td className="px-6 py-6 text-right font-mono font-bold text-slate-300">
                   <div className={privacyMode ? "blur-sm select-none" : ""}>
                     {formatKM(totals.totalCurrentNet)}
                   </div>
                 </td>
                 <td className="px-6 py-6 text-right font-mono font-bold text-emerald-400 text-lg">
                   <div className={privacyMode ? "blur-sm select-none" : ""}>
                     {formatKM(totals.totalTargetNet)}
                   </div>
                 </td>
                 <td className="px-8 py-6 text-right font-mono font-black text-white text-xl">
                   <div className={privacyMode ? "blur-sm select-none" : ""}>
                     {formatKM(totals.totalBrutoCost)}
                   </div>
                 </td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};