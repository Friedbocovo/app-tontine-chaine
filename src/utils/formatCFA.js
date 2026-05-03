// ================================
// formatCFA.js
// Formatage des montants en FCFA
// ================================

/**
 * Formate un nombre en FCFA
 * Ex: 450000 → "450 000 FCFA"
 */
export const formatCFA = (montant) => {
  if (montant === null || montant === undefined || isNaN(montant)) return "0 FCFA";
  return (
    Number(montant)
      .toLocaleString("fr-FR", { maximumFractionDigits: 0 })
      .replace(/\u202f/g, " ") +
    " FCFA"
  );
};

/**
 * Formate un nombre en FCFA sans le suffixe
 * Ex: 450000 → "450 000"
 */
export const formatCFASansUnite = (montant) => {
  if (montant === null || montant === undefined || isNaN(montant)) return "0";
  return Number(montant)
    .toLocaleString("fr-FR", { maximumFractionDigits: 0 })
    .replace(/\u202f/g, " ");
};

/**
 * Formate en version courte
 * Ex: 450000 → "450K FCFA" | 1500000 → "1,5M FCFA"
 */
export const formatCFACourt = (montant) => {
  if (!montant || isNaN(montant)) return "0 FCFA";
  const n = Number(montant);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M FCFA`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K FCFA`;
  return `${n} FCFA`;
};

/**
 * Convertit FCFA → MATIC (simulation)
 * 1 MATIC ≈ 350 FCFA
 */
export const fcfaVersMaticSimulation = (fcfa) => {
  const RATE = 350;
  return (Number(fcfa) / RATE).toFixed(6);
};

/**
 * Convertit MATIC → FCFA (simulation)
 */
export const maticVersFCFA = (matic) => {
  const RATE = 350;
  return Math.round(parseFloat(matic) * RATE);
};

/**
 * Parse une chaîne FCFA → nombre
 * Ex: "450 000 FCFA" → 450000
 */
export const parseCFA = (str) => {
  if (!str) return 0;
  return parseInt(str.replace(/\s/g, "").replace("FCFA", ""), 10) || 0;
};