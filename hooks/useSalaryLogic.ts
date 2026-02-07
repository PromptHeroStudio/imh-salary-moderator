import { useState, useMemo } from 'react';
import { Employee } from '../types';
import { INITIAL_EMPLOYEES, BRUTO_FACTOR } from '../constants';
import { calculateStats } from '../services/financialEngine';

export const useSalaryLogic = () => {
  const [employees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [tuitionIncrease, setTuitionIncrease] = useState<number>(6);
  
  // State za filtriranje
  const [activeCatFilter, setActiveCatFilter] = useState<'ALL' | 'CD' | 'AB'>('ALL');
  const [activeMaFilter, setActiveMaFilter] = useState<'ALL' | 'MA_ONLY' | 'NO_MA'>('ALL');
  const [activeYearFilter, setActiveYearFilter] = useState<'ALL' | 'BEFORE_2020' | 'AFTER_2020'>('ALL');

  // Glavna statistika (Semafor, Suficit/Deficit)
  const stats = useMemo(() => calculateStats(employees, tuitionIncrease), [employees, tuitionIncrease]);

  // Podaci za grafikon lojalnosti
  const loyaltyCostData = useMemo(() => {
    const groups = [
      { id: 'loyalty-10plus', label: '≤ 2016 (10+ god)', filter: (y: number) => y <= 2016, color: '#064e3b' },
      { id: 'loyalty-5-10', label: '2017-2021 (5-10 god)', filter: (y: number) => y >= 2017 && y <= 2021, color: '#059669' },
      { id: 'loyalty-2-5', label: '2022-2024 (2-5 god)', filter: (y: number) => y >= 2022 && y <= 2024, color: '#10b981' },
      { id: 'loyalty-2less', label: '2025+ (< 2 god)', filter: (y: number) => y >= 2025, color: '#34d399' },
    ];

    return groups.map(g => {
      const groupEmployees = employees.filter(e => g.filter(e.start));
      const totalBrutoRaise = groupEmployees.reduce((sum, e) => sum + (e.targetNet - e.currentNet) * BRUTO_FACTOR, 0);
      return {
        id: g.id,
        period: g.label,
        iznos: isNaN(totalBrutoRaise) ? 0 : Number(totalBrutoRaise.toFixed(2)),
        boja: g.color
      };
    });
  }, [employees]);

  // Filtrirani zaposlenici za tabelu
  const visibleEmployees = useMemo(() => {
    return employees.filter(e => {
      let passCat = true;
      if (activeCatFilter === 'CD') passCat = (e.cat === 'C' || e.cat === 'D');
      if (activeCatFilter === 'AB') passCat = (e.cat === 'A' || e.cat === 'B');
      
      const passMa = activeMaFilter === 'ALL' || 
                    (activeMaFilter === 'MA_ONLY' && e.ma) || 
                    (activeMaFilter === 'NO_MA' && !e.ma);

      let passYear = true;
      if (activeYearFilter === 'BEFORE_2020') passYear = e.start < 2020;
      if (activeYearFilter === 'AFTER_2020') passYear = e.start > 2020;
      
      return passCat && passMa && passYear;
    });
  }, [employees, activeCatFilter, activeMaFilter, activeYearFilter]);

  // Totali za tabelu (ovisni o filterima)
  const totals = useMemo(() => {
    const totalCurrentNet = visibleEmployees.reduce((sum, e) => sum + e.currentNet, 0);
    const totalTargetNet = visibleEmployees.reduce((sum, e) => sum + e.targetNet, 0);
    const totalNetIncrease = totalTargetNet - totalCurrentNet;
    // KRITIČNA KALKULACIJA: Faktor 1.63
    const totalBrutoCost = visibleEmployees.reduce((sum, e) => sum + (e.targetNet - e.currentNet) * BRUTO_FACTOR, 0);
    
    return { 
      totalCurrentNet: isNaN(totalCurrentNet) ? 0 : totalCurrentNet, 
      totalTargetNet: isNaN(totalTargetNet) ? 0 : totalTargetNet, 
      totalNetIncrease: isNaN(totalNetIncrease) ? 0 : totalNetIncrease, 
      totalBrutoCost: isNaN(totalBrutoCost) ? 0 : totalBrutoCost 
    };
  }, [visibleEmployees]);

  // Globalni totali (za KPI kartice, neovisni o filterima tabele)
  const globalTotals = useMemo(() => {
     const totalTarget = employees.reduce((sum, e) => sum + e.targetNet, 0);
     const totalBruto = employees.reduce((sum, e) => sum + (e.targetNet - e.currentNet) * BRUTO_FACTOR, 0);
     
     return {
         totalTargetNet: isNaN(totalTarget) ? 0 : totalTarget,
         totalBrutoCost: isNaN(totalBruto) ? 0 : totalBruto
     }
  }, [employees]);

  // Podaci za Waterfall grafikon
  const waterfallData = useMemo(() => {
    const prihod = stats.dodatniPrihod;
    const costA = stats.categorySummaries.find(s => s.cat === 'A')?.totalRaiseCostBruto || 0;
    const costB = stats.categorySummaries.find(s => s.cat === 'B')?.totalRaiseCostBruto || 0;
    const costCD = (stats.categorySummaries.find(s => s.cat === 'C')?.totalRaiseCostBruto || 0) + 
                   (stats.categorySummaries.find(s => s.cat === 'D')?.totalRaiseCostBruto || 0);
    const dobit = stats.cistaDobit;

    const safeVal = (v: number) => isNaN(v) ? 0 : v;

    // Added explicit IDs to fix "Unknown Key" warning in Recharts
    return [
      { id: 'wf-rev', name: 'PRIHOD', val: safeVal(prihod), fill: '#10B981' },
      { id: 'wf-mgmt', name: 'UPRAVA', val: safeVal(-costA), fill: '#0f172a' },
      { id: 'wf-teach', name: 'ODGAJATELJI', val: safeVal(-costB), fill: '#334155' },
      { id: 'wf-aux', name: 'POMOĆNO', val: safeVal(-costCD), fill: '#64748b' },
      { id: 'wf-net', name: 'SUFICIT', val: safeVal(dobit), fill: stats.isSustainable ? '#10B981' : '#EF4444' },
    ];
  }, [stats]);

  return {
    employees,
    visibleEmployees,
    tuitionIncrease,
    setTuitionIncrease,
    activeCatFilter,
    setActiveCatFilter,
    activeMaFilter,
    setActiveMaFilter,
    activeYearFilter,
    setActiveYearFilter,
    stats,
    loyaltyCostData,
    totals,
    globalTotals,
    waterfallData
  };
};