import React, { useState } from 'react';
import { Lock } from 'lucide-react';

import { useSalaryLogic } from './hooks/useSalaryLogic';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { ChartsSection } from './components/ChartsSection';
import { FilterPanel } from './components/FilterPanel';
import { EmployeeTable } from './components/EmployeeTable';
import { SecondaryCharts } from './components/SecondaryCharts';
import { ReportModal } from './components/ReportModal';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);

  const {
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
  } = useSalaryLogic();

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans w-full max-w-none antialiased flex flex-col p-4 md:p-8">
      
      {/* Background Ambience */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${stats.isSustainable ? 'opacity-[0.02] bg-emerald-500' : 'opacity-[0.05] bg-red-500'}`} />

      <Header 
        tuitionIncrease={tuitionIncrease}
        setTuitionIncrease={setTuitionIncrease}
        onToggleReport={() => setIsReportOpen(true)}
        onTogglePrivacy={() => setPrivacyMode(prev => !prev)}
        privacyMode={privacyMode}
      />

      <KPICards 
        stats={stats}
        globalTotals={globalTotals}
        privacyMode={privacyMode}
      />

      <ChartsSection 
        stats={stats}
        waterfallData={waterfallData}
      />

      <FilterPanel 
        activeCatFilter={activeCatFilter}
        setActiveCatFilter={setActiveCatFilter}
        activeMaFilter={activeMaFilter}
        setActiveMaFilter={setActiveMaFilter}
        activeYearFilter={activeYearFilter}
        setActiveYearFilter={setActiveYearFilter}
      />

      <EmployeeTable 
        employees={visibleEmployees}
        totals={totals}
        privacyMode={privacyMode}
      />

      <SecondaryCharts 
        loyaltyCostData={loyaltyCostData}
        categorySummaries={stats.categorySummaries}
      />

      <ReportModal 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        stats={stats}
        tuitionIncrease={tuitionIncrease}
        globalTotals={globalTotals}
        employees={visibleEmployees}
      />

      {/* FOOTER */}
      <footer className="w-full py-12 text-center opacity-40 hover:opacity-100 transition-opacity no-print">
         <div className="flex items-center justify-center gap-2 mb-2">
            <Lock size={12} />
            <span className="text-xs font-bold uppercase tracking-widest">SECURE SYSTEM ACTIVE</span>
         </div>
         <p className="text-[10px] uppercase font-bold tracking-[0.2em]">© 2026 International Montessori House • Sarajevo</p>
      </footer>

    </div>
  );
};

export default App;