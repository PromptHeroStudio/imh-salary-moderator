
import { Employee, FinancialStats, CategorySummary } from '../types';
import { BRUTO_FACTOR, BASELINE_REVENUE_2025, LOYALTY_RULES } from '../constants';

export const calculateLoyaltyBonus = (startYear: number): number => {
  const years = 2026 - startYear;
  const rule = LOYALTY_RULES.find(r => years >= r.years);
  return rule ? rule.bonus : 0;
};

export const calculateStats = (employees: Employee[], tuitionIncrease: number): FinancialStats => {
  const dodatniPrihod = BASELINE_REVENUE_2025 * (tuitionIncrease / 100);

  const ukupniTrosakPovisicaBruto = employees.reduce((sum, emp) => {
    const raise = emp.targetNet - emp.currentNet;
    return sum + (raise * BRUTO_FACTOR);
  }, 0);

  const cistaDobit = dodatniPrihod - ukupniTrosakPovisicaBruto;

  const categoryLabels: Record<string, string> = {
    'A': 'Uprava i Pedagogija',
    'B': 'Odgajatelji',
    'C': 'Asistenti i Stručni saradnici',
    'D': 'Tehničko osoblje'
  };

  const cats: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const categorySummaries: CategorySummary[] = cats.map(cat => {
    const filtered = employees.filter(e => e.cat === cat);
    const cost = filtered.reduce((sum, e) => sum + ((e.targetNet - e.currentNet) * BRUTO_FACTOR), 0);
    return {
      cat,
      label: categoryLabels[cat],
      count: filtered.length,
      totalRaiseCostBruto: cost
    };
  });

  return {
    dodatniPrihod: Number(dodatniPrihod.toFixed(2)),
    ukupniTrosakPovisicaBruto: Number(ukupniTrosakPovisicaBruto.toFixed(2)),
    cistaDobit: Number(cistaDobit.toFixed(2)),
    isSustainable: cistaDobit >= 0,
    categorySummaries
  };
};
