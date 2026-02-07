
export interface Employee {
  id: number;
  name: string;
  role: string;
  cat: 'A' | 'B' | 'C' | 'D';
  start: number;
  ma: boolean;
  currentNet: number;
  targetNet: number;
}

export interface CategorySummary {
  cat: 'A' | 'B' | 'C' | 'D';
  label: string;
  count: number;
  totalRaiseCostBruto: number;
}

export interface FinancialStats {
  dodatniPrihod: number;
  ukupniTrosakPovisicaBruto: number;
  cistaDobit: number;
  isSustainable: boolean;
  categorySummaries: CategorySummary[];
}
