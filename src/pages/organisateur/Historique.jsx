import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout";

// ================================
// DONNÉES DE DÉMO
// ================================
const demoHistorique = [
  {
    id: 1,
    date: "Aujourd'hui",
    heure: "14:30",
    type: "DECAISSEMENT",
    titre: "Décaissement effectué",
    detail: "Attribué à Amadou Diallo",
    montant: 250000,
    positif: true,
    cycle: "Cycle 4 complété",
    txHash: "0x71C...a8E9",
  },
  {
    id: 2,
    date: "Aujourd'hui",
    heure: "11:15",
    type: "PAIEMENT",
    titre: "Paiement reçu",
    detail: "De Mariam K. pour Cycle 5",
    montant: 25000,
    positif: true,
    txHash: "0x4f2b...8e12",
  },
  {
    id: 3,
    date: "Hier",
    heure: "18:00",
    type: "INCIDENT",
    titre: "Incident de paiement",
    detail: "Retard constaté : Koffi Mensah",
    montant: null,
    positif: false,
    extra: "Échéance dépassée de 24h pour la cotisation du Cycle 5.",
    actionLabel: "ENVOYER UN RAPPEL URGENT",
  },
  {
    id: 4,
    date: "Hier",
    heure: "09:00",
    type: "RAPPEL",
    titre: "Rappels groupés envoyés",
    detail: "Notifications de clôture de cycle aux 12 membres",
    montant: null,
    positif: null,
    txHash: null,
  },
  {
    id: 5,
    date: "Semaine dernière",
    heure: "01 Juil",
    type: "DEBUT_CYCLE",
    titre: "Début du Cycle 5",
    detail: "L'ouverture des collectes a été lancée automatiquement.",
    montant: null,
    positif: null,
    txHash: null,
  },
  {
    id: 6,
    date: "Semaine dernière",
    heure: "28 Juin",
    type: "DECAISSEMENT",
    titre: "Décaissement effectué",
    detail: "Attribué à Fatou Koné",
    montant: 250000,
    positif: true,
    cycle: "Cycle 3 complété",
    txHash: "0x9a3c...1f45",
  },
  {
    id: 7,
    date: "Semaine dernière",
    heure: "25 Juin",
    type: "PENALITE",
    titre: "Pénalité appliquée",
    detail: "10% appliqué à Jean Dossou — Jour 1 de retard",
    montant: 5000,
    positif: false,
    txHash: "0x2d7e...9c01",
  },
  {
    id: 8,
    date: "Semaine dernière",
    heure: "20 Juin",
    type: "EXCLUSION",
    titre: "Membre exclu automatiquement",
    detail: "Samuel Béhanzin — Jour 3 sans paiement",
    montant: null,
    positif: false,
    txHash: "0x5f1a...3b78",
  },
];

const typeConfig = {
  DECAISSEMENT: {
    icon: "💰",
    bg: "bg-green-100",
    iconBg: "bg-green-500",
    label: "Décaissement",
  },
  PAIEMENT: {
    icon: "👤",
    bg: "bg-blue-50",
    iconBg: "bg-blue-400",
    label: "Paiement",
  },
  INCIDENT: {
    icon: "⚠️",
    bg: "bg-red-50",
    iconBg: "bg-red-400",
    label: "Incident",
  },
  RAPPEL: {
    icon: "📢",
    bg: "bg-gray-50",
    iconBg: "bg-gray-400",
    label: "Rappel",
  },
  DEBUT_CYCLE: {
    icon: "🔄",
    bg: "bg-green-50",
    iconBg: "bg-green-400",
    label: "Cycle",
  },
  PENALITE: {
    icon: "💸",
    bg: "bg-orange-50",
    iconBg: "bg-orange-400",
    label: "Pénalité",
  },
  EXCLUSION: {
    icon: "❌",
    bg: "bg-red-50",
    iconBg: "bg-red-600",
    label: "Exclusion",
  },
};

const filtres = ["Tout", "Paiements", "Décaissements", "Incidents"];

// ================================
// GROUPER PAR DATE
// ================================
function groupByDate(items) {
  const groups = {};
  items.forEach((item) => {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
  });
  return groups;
}

// ================================
// CARTE ÉVÉNEMENT
// ================================
function EventCard({ event }) {
  const config = typeConfig[event.type] || typeConfig.RAPPEL;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 cursor-pointer transition-all ${
        event.type === "INCIDENT" || event.type === "EXCLUSION"
          ? "border-red-400"
          : event.type === "DECAISSEMENT" || event.type === "PAIEMENT"
          ? "border-green-400"
          : event.type === "PENALITE"
          ? "border-orange-400"
          : "border-gray-200"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        {/* Icône */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${config.bg}`}
        >
          {config.icon}
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm ${
                event.type === "INCIDENT" || event.type === "EXCLUSION"
                  ? "text-red-600"
                  : "text-gray-900"
              }`}>
                {event.titre}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{event.detail}</p>
            </div>
            <div className="flex flex-col items-end ml-2 flex-shrink-0">
              <p className="text-xs text-gray-400">{event.heure}</p>
              {event.montant && (
                <p className={`text-sm font-bold mt-0.5 ${
                  event.positif ? "text-green-600" : "text-red-500"
                }`}>
                  {event.positif ? "+" : "-"}{event.montant.toLocaleString("fr-FR")} FCFA
                </p>
              )}
            </div>
          </div>

          {/* Cycle badge */}
          {event.cycle && (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                ✓ {event.cycle}
              </span>
            </div>
          )}

          {/* Détail expandable */}
          {expanded && (
            <div className="mt-3 border-t border-gray-100 pt-3 flex flex-col gap-2">
              {event.extra && (
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3">
                  {event.extra}
                </p>
              )}
              {event.actionLabel && (
                <button className="w-full py-2.5 rounded-xl bg-red-500 text-white text-xs font-bold">
                  {event.actionLabel}
                </button>
              )}
              {event.txHash && (
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5">
                  <span className="text-xs text-gray-400">🔗 Tx :</span>
                  <span className="text-xs text-green-700 font-mono font-medium">{event.txHash}</span>
                  <button
                    className="ml-auto text-xs text-gray-400 underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(event.txHash);
                    }}
                  >
                    Copier
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================================
// PAGE PRINCIPALE
// ================================
export default function Historique() {
  const navigate = useNavigate();
  const [filtre, setFiltre] = useState("Tout");

  const filtered = demoHistorique.filter((e) => {
    if (filtre === "Tout") return true;
    if (filtre === "Paiements") return e.type === "PAIEMENT";
    if (filtre === "Décaissements") return e.type === "DECAISSEMENT";
    if (filtre === "Incidents") return ["INCIDENT", "PENALITE", "EXCLUSION"].includes(e.type);
    return true;
  });

  const grouped = groupByDate(filtered);

  const content = (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Historique</h1>
          <p className="text-gray-400 text-xs">
            Journal d'activités · Tontine "Solidarité Cotonou"
          </p>
        </div>
      </div>

      {/* Résumé stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-green-600">
            {demoHistorique.filter(e => e.type === "DECAISSEMENT").length}
          </p>
          <p className="text-xs text-gray-400">Décaissements</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-blue-500">
            {demoHistorique.filter(e => e.type === "PAIEMENT").length}
          </p>
          <p className="text-xs text-gray-400">Paiements</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-red-500">
            {demoHistorique.filter(e => ["INCIDENT","PENALITE","EXCLUSION"].includes(e.type)).length}
          </p>
          <p className="text-xs text-gray-400">Incidents</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filtres.map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filtre === f
                ? "bg-green-700 text-white"
                : "bg-white text-gray-500 shadow-sm"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-5">
        {Object.entries(grouped).map(([date, events]) => (
          <div key={date}>
            {/* Label date */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              {date}
            </p>

            {/* Événements avec ligne verticale */}
            <div className="relative flex flex-col gap-3">
              {/* Ligne verticale */}
              <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-gray-100" />

              {events.map((event) => (
                <div key={event.id} className="relative pl-0">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Badge blockchain */}
      <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-xl">⛓️</span>
        <p className="text-xs text-green-700 leading-relaxed font-medium">
          Toutes les transactions sont sécurisées et immuablement enregistrées sur la blockchain Polygon.
        </p>
      </div>
    </div>
  );

  return (
    <AppLayout>
      {/* Mobile */}
      <div
        className="md:hidden px-4 pt-6 pb-10 min-h-screen"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        {content}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="max-w-2xl">
          {content}
        </div>
      </div>
    </AppLayout>
  );
}