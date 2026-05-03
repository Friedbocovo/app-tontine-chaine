// ================================
// reliabilityScore.js
// Score de fiabilité des membres
// ================================

/**
 * Calcule le score de fiabilité (0-100)
 * Même logique que le smart contract
 * 0 pénalité → 100 | chaque pénalité → -15
 */
export const calculerScore = (nbPenalites) => {
  const base = 100;
  const impact = (nbPenalites || 0) * 15;
  return Math.max(0, base - impact);
};

/**
 * Niveau du score
 */
export const niveauScore = (score) => {
  if (score >= 90) return { label: "Excellent", couleur: "#2D7A63", bg: "#E8F5F0" };
  if (score >= 75) return { label: "Bon",       couleur: "#F5A623", bg: "#FEF3DC" };
  if (score >= 50) return { label: "Moyen",     couleur: "#F59E0B", bg: "#FFFBEB" };
  return           { label: "Faible",           couleur: "#D94F3D", bg: "#FEE2E2" };
};

/**
 * Emoji associé au score
 */
export const emojiScore = (score) => {
  if (score >= 90) return "✅";
  if (score >= 75) return "🟡";
  if (score >= 50) return "⚠️";
  return "🔴";
};

/**
 * Message d'explication du score
 */
export const messageScore = (score, nbPenalites) => {
  if (score === 100) return "Membre exemplaire — aucune pénalité";
  if (score >= 75)
    return `${nbPenalites} pénalité${nbPenalites > 1 ? "s" : ""} enregistrée${nbPenalites > 1 ? "s" : ""}`;
  if (score >= 50) return `Attention : ${nbPenalites} pénalités — risque moyen`;
  if (score === 0 && nbPenalites >= 7) return "Membre blacklisté";
  return `Score critique : ${nbPenalites} pénalités`;
};

/**
 * Couleur de la barre de progression SVG
 */
export const couleurBarreScore = (score) => {
  if (score >= 90) return "#2D7A63";
  if (score >= 75) return "#F5A623";
  if (score >= 50) return "#F59E0B";
  return "#D94F3D";
};

/**
 * Calcule si un membre est à risque d'exclusion
 * (2 pénalités = avertissement, 3 = exclusion)
 */
export const statutRisque = (nbPenalites) => {
  if (nbPenalites >= 3) return { niveau: "exclu",       label: "Exclu",       couleur: "#D94F3D" };
  if (nbPenalites === 2) return { niveau: "avertissement", label: "Averti",    couleur: "#F59E0B" };
  if (nbPenalites === 1) return { niveau: "attention",  label: "Attention",   couleur: "#F5A623" };
  return                        { niveau: "ok",          label: "Fiable",      couleur: "#2D7A63" };
};

/**
 * Données pour le graphique SVG du score (cercle)
 * @param {number} score - 0 à 100
 * @param {number} rayon - rayon du cercle (défaut 40)
 */
export const donneesGraphiqueScore = (score, rayon = 40) => {
  const circonference = 2 * Math.PI * rayon;
  const offset = circonference - (score / 100) * circonference;
  return {
    circonference,
    offset,
    couleur: couleurBarreScore(score),
    rayon,
  };
};