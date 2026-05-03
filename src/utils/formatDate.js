// ================================
// formatDate.js
// Formatage des dates pour TontineChain
// ================================

/**
 * Formate une date en français
 * Ex: new Date() → "3 mai 2026"
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Formate une date courte
 * Ex: new Date() → "03/05/2026"
 */
export const formatDateCourte = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("fr-FR");
};

/**
 * Formate date + heure
 * Ex: "3 mai 2026 à 14:30"
 */
export const formatDateHeure = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return "";
  return (
    d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) +
    " à " +
    d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  );
};

/**
 * Temps relatif (comme WhatsApp)
 * Ex: "il y a 2 heures" | "hier" | "3 mai 2026"
 */
export const formatTempsRelatif = (date) => {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return "";

  const now = new Date();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffH = Math.floor(diffMs / 3_600_000);
  const diffJ = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  if (diffH < 24) return `il y a ${diffH}h`;
  if (diffJ === 1) return "hier";
  if (diffJ < 7) return `il y a ${diffJ} jours`;
  return formatDate(d);
};

/**
 * Compte à rebours vers une date future
 * Ex: { jours: 5, heures: 3, minutes: 22 }
 */
export const compteARebours = (dateFuture) => {
  if (!dateFuture) return null;
  const d = dateFuture instanceof Date ? dateFuture : new Date(dateFuture);
  const diff = d - new Date();
  if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, expire: true };

  const jours = Math.floor(diff / 86_400_000);
  const heures = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return { jours, heures, minutes, expire: false };
};

/**
 * Calcule la prochaine date de cotisation
 * @param {Date} dateDebut - Date de début de la tontine
 * @param {number} frequenceJours - 7 ou 30
 * @param {number} tourActuel - numéro du tour actuel
 */
export const prochaineDateCotisation = (dateDebut, frequenceJours, tourActuel) => {
  if (!dateDebut) return null;
  const d = new Date(dateDebut);
  d.setDate(d.getDate() + frequenceJours * tourActuel);
  return d;
};

/**
 * Timestamp Unix → Date JS
 */
export const timestampVersDate = (timestamp) => {
  if (!timestamp) return null;
  return new Date(Number(timestamp) * 1000);
};

/**
 * Date JS → Timestamp Unix
 */
export const dateVersTimestamp = (date) => {
  if (!date) return 0;
  const d = date instanceof Date ? date : new Date(date);
  return Math.floor(d.getTime() / 1000);
};

/**
 * Label lisible pour la fréquence
 * Ex: 7 → "Hebdomadaire" | 30 → "Mensuel"
 */
export const labelFrequence = (joursFrequence) => {
  if (joursFrequence === 7) return "Hebdomadaire";
  if (joursFrequence === 30) return "Mensuel";
  return `Tous les ${joursFrequence} jours`;
};