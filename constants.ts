
import { Employee } from './types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {"id": 1, "name": "MULALIĆ DAVOR", "role": "Direktor", "cat": "A", "start": 2020, "ma": true, "currentNet": 1293.71, "targetNet": 1600.00},
  {"id": 2, "name": "HABUL AMINA", "role": "Pedagog", "cat": "A", "start": 2017, "ma": true, "currentNet": 2497.92, "targetNet": 2600.00},
  {"id": 3, "name": "HUREMOVIĆ ARMINA", "role": "Pedagog", "cat": "A", "start": 2024, "ma": true, "currentNet": 1511.13, "targetNet": 1650.00},
  {"id": 4, "name": "MORIĆ AZRA", "role": "Office Manager", "cat": "A", "start": 2015, "ma": false, "currentNet": 1779.55, "targetNet": 1900.00},
  {"id": 5, "name": "ŽUTIĆ MAJDA", "role": "Odgajatelj", "cat": "B", "start": 2012, "ma": true, "currentNet": 1601.38, "targetNet": 1800.00},
  {"id": 6, "name": "AGIĆ HASANDIĆ AMELA", "role": "Odgajatelj", "cat": "B", "start": 2021, "ma": true, "currentNet": 1151.46, "targetNet": 1500.00},
  {"id": 7, "name": "LJUCA ALMA", "role": "Odgajatelj", "cat": "B", "start": 2020, "ma": true, "currentNet": 1382.67, "targetNet": 1550.00},
  {"id": 8, "name": "FAZLOVIĆ AMELA", "role": "Odgajatelj", "cat": "B", "start": 2024, "ma": false, "currentNet": 1639.86, "targetNet": 1700.00},
  {"id": 9, "name": "KARAGA MEDINA", "role": "Odgajatelj", "cat": "B", "start": 2025, "ma": false, "currentNet": 1411.12, "targetNet": 1480.00},
  {"id": 10, "name": "ADEMOVIĆ MUBERA", "role": "Asistent odgaj.", "cat": "C", "start": 2017, "ma": false, "currentNet": 1673.64, "targetNet": 1750.00},
  {"id": 11, "name": "RAHMANOVIĆ AZRA", "role": "Fin. adm. sarad.", "cat": "C", "start": 2023, "ma": false, "currentNet": 1561.78, "targetNet": 1650.00},
  {"id": 12, "name": "BEŠLIĆ MAIDA", "role": "Pedijatrijska sr.", "cat": "C", "start": 2022, "ma": false, "currentNet": 1349.34, "targetNet": 1450.00},
  {"id": 13, "name": "SOLAK NEJRA", "role": "Pedijatrijska sr.", "cat": "C", "start": 2021, "ma": false, "currentNet": 1151.46, "targetNet": 1300.00},
  {"id": 14, "name": "HUSEINOVIĆ-KATKIĆ E.", "role": "Asistent odgaj.", "cat": "C", "start": 2021, "ma": false, "currentNet": 1250.85, "targetNet": 1350.00},
  {"id": 15, "name": "MUJEZINOVIC H. AMELA", "role": "Asistent odgaj.", "cat": "C", "start": 2024, "ma": false, "currentNet": 1305.20, "targetNet": 1380.00},
  {"id": 16, "name": "BEGOVIĆ EMINA", "role": "Glavna kuharica", "cat": "D", "start": 2012, "ma": false, "currentNet": 1490.33, "targetNet": 1650.00},
  {"id": 17, "name": "HALILOVIĆ SENIDA", "role": "Pomoćna kuhar.", "cat": "D", "start": 2023, "ma": false, "currentNet": 1086.41, "targetNet": 1150.00},
  {"id": 18, "name": "BEGANOVIĆ ENISA", "role": "Spremačica", "cat": "D", "start": 2023, "ma": false, "currentNet": 1086.41, "targetNet": 1150.00},
  {"id": 19, "name": "DŽIDIĆ NIZAMA", "role": "Spremačica", "cat": "D", "start": 2025, "ma": false, "currentNet": 1077.78, "targetNet": 1150.00}
];

export const BASELINE_REVENUE_2025 = 876563.23;
export const BRUTO_FACTOR = 1.63;
export const LOYALTY_RULES = [
  { years: 10, bonus: 15 },
  { years: 5, bonus: 10 },
  { years: 2, bonus: 4 },
  { years: 0, bonus: 0 }
];
