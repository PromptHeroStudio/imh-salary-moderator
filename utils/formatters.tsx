import React from 'react';

// Globalni formatter za bosansku valutu (1.234,56 KM)
// Koristimo 'de-DE' jer on koristi tačku za hiljade i zarez za decimale.
// Ovo je produkcijski standard za IMH aplikaciju.
export const formatKM = (val: number | undefined | null) => {
  // Sigurnosna provjera
  if (val === undefined || val === null || isNaN(val)) return "0,00 KM";
  
  // Eksplicitna konverzija u Number da se izbjegnu runtime greške
  const safeNum = Number(val);

  return new Intl.NumberFormat('de-DE', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(safeNum) + " KM";
};

// React komponenta za prikaz valute
export const CurrencyDisplay: React.FC<{ value: number | undefined | null; className?: string }> = ({ value, className }) => {
  const safeValue = (value === undefined || value === null || isNaN(value)) ? 0 : Number(value);
  
  const formatted = new Intl.NumberFormat('de-DE', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(safeValue);

  return <span className={`font-mono whitespace-nowrap ${className}`}>{formatted} KM</span>;
};