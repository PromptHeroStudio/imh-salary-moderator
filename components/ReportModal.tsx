import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer } from 'lucide-react';
import { formatKM } from '../utils/formatters';
import { Employee } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: any;
  tuitionIncrease: number;
  globalTotals: any;
  employees: Employee[];
}

export const ReportModal: React.FC<ReportModalProps> = ({ 
  isOpen, 
  onClose, 
  stats, 
  tuitionIncrease, 
  globalTotals,
  employees
}) => {
  
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.print();
    } catch (error) {
      alert("Printanje je onemogućeno u preview modu. Molimo koristite produkcijski link ili Ctrl+P.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/90 p-0 md:p-8 print:p-0 print:bg-white print:static print:block pointer-events-auto">
          <motion.div 
            id="report-content"
            {...{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 50 }
            } as any}
            className="print-container bg-white w-full max-w-5xl min-h-screen md:min-h-0 md:rounded-[3rem] p-12 md:p-20 shadow-2xl relative z-50 pointer-events-auto print:shadow-none print:w-full max-w-none print:max-w-none print:p-0 print:border-none"
          >
            <button 
                onClick={onClose} 
                className="absolute top-8 right-8 p-4 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors no-print z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* REPORT HEADER */}
            <div className="flex justify-between items-end border-b-8 border-black pb-8 mb-16">
               <div>
                  <img src="https://i.postimg.cc/MZ4w91zf/imh-logo.png" alt="IMH" className="h-24 mb-6" />
                  <div className="text-4xl font-black uppercase tracking-tighter">Strategija 2026</div>
                  <div className="text-sm font-bold uppercase tracking-[0.4em] text-slate-500 mt-2">Službeni Dokument Revizije</div>
               </div>
               <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold uppercase text-slate-400">DATUM GENERISANJA</div>
                  <div className="font-mono font-bold text-lg">{new Date().toLocaleDateString('bs-BA')}</div>
               </div>
            </div>

            {/* REPORT CONTENT */}
            <div className="space-y-12">
               <section>
                  <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                     <span className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full text-lg">1</span>
                     Institucionalni Mir
                  </h2>
                  
                  {/* DYNAMIC NARRATIVE LOGIC */}
                  {stats.isSustainable ? (
                      <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-800 text-justify">
                          Ovaj dokument potvrđuje punu finansijsku održivost tranzicije uz korekciju školarine od <span className="font-black bg-black text-white px-2">{tuitionIncrease}%</span>. Model 'Matematičke Pravednosti' uspješno apsorbuje bruto teret povišica, osiguravajući stabilan operativni suficit.
                      </p>
                  ) : (
                      <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-800 text-justify">
                          Ovaj dokument ukazuje na finansijsku neodrživost tranzicije uz trenutnu korekciju školarine od <span className="font-black bg-black text-white px-2">{tuitionIncrease}%</span>. Projekcija potvrđuje da mjesečni bruto teret povišica premašuje prirast prihoda, što zahtijeva hitnu reviziju modela.
                      </p>
                  )}
               </section>

               <section className="grid grid-cols-1 md:grid-cols-2 gap-12 print:grid-cols-2">
                  <div className="bg-slate-50 p-8 rounded-3xl border-2 border-black print:border">
                     <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">MJESEČNI BRUTO TERET</div>
                     <div className="text-5xl font-black text-black mb-2">{formatKM(globalTotals.totalBrutoCost)}</div>
                     <div className="text-xs font-bold text-red-500">PROJEKCIJA TROŠKA POVIŠICA</div>
                  </div>
                  <div className={`p-8 rounded-3xl border-2 border-black print:border ${stats.isSustainable ? 'bg-emerald-50' : 'bg-red-50'}`}>
                     <div className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">OPERATIVNI REZULTAT</div>
                     <div className={`text-5xl font-black mb-2 whitespace-nowrap ${stats.isSustainable ? 'text-emerald-700' : 'text-red-700'}`}>{formatKM(stats.cistaDobit)}</div>
                     <div className="text-xs font-bold uppercase">{stats.isSustainable ? 'SUFICIT (ODRŽIVO)' : 'DEFICIT (NEODRŽIVO)'}</div>
                  </div>
               </section>

               <section className="print:break-inside-avoid">
                  <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                     <span className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full text-lg">2</span>
                     Verifikacija Parametara
                  </h2>
                  <table className="w-full text-sm text-left border-t-2 border-black">
                     <thead className="bg-slate-100 font-black uppercase">
                        <tr>
                           <th className="p-4">Parametar</th>
                           <th className="p-4 text-right">Vrijednost</th>
                           <th className="p-4 text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-200 font-bold">
                        <tr>
                           <td className="p-4">Faktor Bruto Plate</td>
                           <td className="p-4 text-right font-mono">1.63</td>
                           <td className="p-4 text-right text-emerald-600">VERIFIKOVANO</td>
                        </tr>
                        <tr>
                           <td className="p-4">Prirast Školarine</td>
                           <td className="p-4 text-right font-mono">+{tuitionIncrease}%</td>
                           <td className="p-4 text-right text-emerald-600">AKTIVNO</td>
                        </tr>
                        <tr>
                           <td className="p-4">Ukupno Zaposlenika</td>
                           <td className="p-4 text-right font-mono">{employees.length}</td>
                           <td className="p-4 text-right text-emerald-600">KOMPLETNO</td>
                        </tr>
                     </tbody>
                  </table>
               </section>

               {/* TABELA RADNIKA ZA PRINT */}
               <section className="print:break-inside-avoid">
                  <h2 className="text-xl font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                      <span className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">3</span>
                      Lista Obuhvaćenih Zaposlenika
                  </h2>
                  <table className="w-full text-xs text-left border-2 border-black">
                     <thead className="bg-slate-100 font-black uppercase border-b-2 border-black">
                        <tr>
                           <th className="p-2">Ime i Prezime</th>
                           <th className="p-2">Uloga</th>
                           <th className="p-2 text-center">Kat</th>
                           <th className="p-2 text-right">Trenutni Neto</th>
                           <th className="p-2 text-right">Ciljani Neto</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-200">
                        {employees.map(e => (
                            <tr key={e.id} className="break-inside-avoid">
                                <td className="p-2 font-bold">{e.name}</td>
                                <td className="p-2 text-slate-500">{e.role}</td>
                                <td className="p-2 text-center font-bold">{e.cat}</td>
                                <td className="p-2 text-right font-mono">{formatKM(e.currentNet)}</td>
                                <td className="p-2 text-right font-mono font-bold text-black">{formatKM(e.targetNet)}</td>
                            </tr>
                        ))}
                     </tbody>
                  </table>
               </section>

            </div>

            {/* FOOTER / SIGNATURES */}
            <div className="mt-16 pt-12 border-t-4 border-black grid grid-cols-2 gap-20 print:mt-12 print:break-inside-avoid">
               <div className="text-center">
                  <div className="h-16 border-b-2 border-slate-300 mb-4"></div>
                  <div className="font-black uppercase tracking-widest">DIREKTOR USTANOVE</div>
               </div>
               <div className="text-center">
                  <div className="h-16 border-b-2 border-slate-300 mb-4"></div>
                  <div className="font-black uppercase tracking-widest">PREDSJEDNIK UPRAVNOG ODBORA</div>
               </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-12 flex gap-4 no-print relative z-[60]">
               <button 
                 type="button"
                 style={{ 
                   position: 'relative', 
                   zIndex: 9999, 
                   pointerEvents: 'auto'
                 }}
                 onClick={handlePrint}
                 className="flex-1 bg-black text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-transform"
               >
                  <Printer /> Printaj Dokument
               </button>
               <button 
                 onClick={onClose} 
                 className="flex-1 bg-slate-100 text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 relative z-[60] cursor-pointer pointer-events-auto"
               >
                  Zatvori Pregled
               </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};