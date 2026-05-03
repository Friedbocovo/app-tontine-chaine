import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout";

// ================================
// DONNÉES DE DÉMO
// ================================
const demoIncidents = [
  {
    id: 1,
    nom: "Koffi Mensah",
    initiale: "K",
    color: "#D94F3D",
    joursRetard: 8,
    montantDu: 50000,
    aDejaRecu: true,  // CAS 1 — A déjà reçu sa cagnotte
    statut: "EN_RETARD",
    telephone: "+229 97 XX XX 01",
  },
  {
    id: 2,
    nom: "Amina Touré",
    initiale: "A",
    color: "#F5A623",
    joursRetard: 2,
    montantDu: 50000,
    aDejaRecu: false, // CAS 2 — N'a pas encore reçu
    statut: "AVERTISSEMENT",
    telephone: "+229 96 XX XX 02",
  },
  {
    id: 3,
    nom: "Jean Dossou",
    initiale: "J",
    color: "#8B5CF6",
    joursRetard: 4,
    montantDu: 50000,
    aDejaRecu: true,  // CAS 1 — Signalement autorités
    statut: "SIGNALE",
    telephone: "+229 95 XX XX 03",
  },
];

// ================================
// CONFIG SCÉNARIOS
// ================================
const getScenario = (membre) => {
  if (membre.aDejaRecu) {
    // CAS 1 — A déjà reçu
    if (membre.joursRetard === 1) return { type: "CAS1_J1", label: "Pénalité 10%", color: "orange" };
    if (membre.joursRetard === 2) return { type: "CAS1_J2", label: "Avertissement", color: "orange" };
    if (membre.joursRetard === 3) return { type: "CAS1_J3", label: "Pénalité 20%", color: "red" };
    if (membre.joursRetard >= 4) return { type: "CAS1_J4", label: "Signalé aux autorités", color: "red" };
  } else {
    // CAS 2 — Pas encore reçu
    if (membre.joursRetard === 1) return { type: "CAS2_J1", label: "Pénalité 10%", color: "orange" };
    if (membre.joursRetard === 2) return { type: "CAS2_J2", label: "Avertissement", color: "orange" };
    if (membre.joursRetard >= 3) return { type: "CAS2_J3", label: "Exclu automatiquement", color: "red" };
  }
  return { type: "UNKNOWN", label: "Inconnu", color: "gray" };
};

// ================================
// MODAL DÉTAIL INCIDENT
// ================================
function ModalIncident({ membre, onClose }) {
  const scenario = getScenario(membre);

  const penalite10 = Math.round(membre.montantDu * 0.1);
  const penalite20 = Math.round(membre.montantDu * 0.2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Header modal */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg">Incident de paiement</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">

          {/* Membre */}
          <div className={`rounded-2xl p-4 flex flex-col items-center gap-3 ${
            membre.aDejaRecu ? "bg-red-50" : "bg-orange-50"
          }`}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold relative"
              style={{ backgroundColor: membre.color }}
            >
              {membre.initiale}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚠</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-base">{membre.nom}</p>
              <div className="flex items-center gap-2 mt-1 justify-center">
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                  🕐 {membre.joursRetard} jours de retard
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">MONTANT DÛ</p>
              <p className="text-2xl font-bold text-gray-900">
                {membre.montantDu.toLocaleString("fr-FR")} FCFA
              </p>
            </div>
          </div>

          {/* Badge CAS */}
          <div className={`rounded-2xl p-3 flex items-center gap-3 ${
            membre.aDejaRecu ? "bg-red-50" : "bg-orange-50"
          }`}>
            <span className="text-2xl">{membre.aDejaRecu ? "💰" : "⏳"}</span>
            <div>
              <p className="font-semibold text-sm text-gray-800">
                {membre.aDejaRecu
                  ? "A déjà reçu sa cagnotte"
                  : "N'a pas encore reçu sa cagnotte"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {membre.aDejaRecu
                  ? "Règles CAS 1 applicables"
                  : "Règles CAS 2 applicables"}
              </p>
            </div>
          </div>

          {/* Timeline des règles */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Règles blockchain automatiques
            </p>
            <div className="flex flex-col gap-2">
              {membre.aDejaRecu ? (
                // CAS 1
                <>
                  <TimelineItem
                    jour={1} actif={membre.joursRetard >= 1}
                    label={`Pénalité 10% = ${penalite10.toLocaleString("fr-FR")} FCFA`}
                    icon="💸" color="orange"
                  />
                  <TimelineItem
                    jour={2} actif={membre.joursRetard >= 2}
                    label="Avertissement automatique"
                    icon="⚠️" color="orange"
                  />
                  <TimelineItem
                    jour={3} actif={membre.joursRetard >= 3}
                    label={`Double pénalité 20% = ${penalite20.toLocaleString("fr-FR")} FCFA`}
                    icon="💸💸" color="red"
                  />
                  <TimelineItem
                    jour={4} actif={membre.joursRetard >= 4}
                    label="Signalement aux autorités"
                    icon="🚨" color="red"
                    isFinal
                  />
                </>
              ) : (
                // CAS 2
                <>
                  <TimelineItem
                    jour={1} actif={membre.joursRetard >= 1}
                    label={`Pénalité 10% = ${penalite10.toLocaleString("fr-FR")} FCFA`}
                    icon="💸" color="orange"
                  />
                  <TimelineItem
                    jour={2} actif={membre.joursRetard >= 2}
                    label="Avertissement automatique"
                    icon="⚠️" color="orange"
                  />
                  <TimelineItem
                    jour={3} actif={membre.joursRetard >= 3}
                    label="Exclusion définitive automatique"
                    icon="❌" color="red"
                    isFinal
                  />
                </>
              )}
            </div>
          </div>

          {/* Statut actuel */}
          <StatutActuel scenario={scenario} membre={membre} />

          {/* Registre blockchain */}
          <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              🛡️
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Registre Inaltérable</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Toute action est enregistrée de manière permanente sur la blockchain.
                Aucune modification n'est possible après enregistrement.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold text-sm"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================
// COMPOSANTS TIMELINE
// ================================
function TimelineItem({ jour, actif, label, icon, color, isFinal }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
      actif
        ? color === "red" ? "bg-red-50" : "bg-orange-50"
        : "bg-gray-50 opacity-50"
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
        actif
          ? color === "red" ? "bg-red-500 text-white" : "bg-orange-500 text-white"
          : "bg-gray-200 text-gray-500"
      }`}>
        J{jour}
      </div>
      <div className="flex-1">
        <p className={`text-xs font-semibold ${actif ? "text-gray-800" : "text-gray-400"}`}>
          {icon} {label}
        </p>
        {isFinal && actif && (
          <p className="text-xs text-red-500 mt-0.5 font-medium">✓ Déjà appliqué automatiquement</p>
        )}
        {actif && !isFinal && (
          <p className="text-xs text-green-600 mt-0.5 font-medium">✓ Appliqué automatiquement</p>
        )}
      </div>
    </div>
  );
}

function StatutActuel({ scenario, membre }) {
  const configs = {
    CAS1_J1: {
      bg: "bg-orange-50", icon: "💸", title: "Pénalité 10% appliquée",
      desc: "La pénalité a été automatiquement ajoutée à la caisse commune."
    },
    CAS1_J2: {
      bg: "bg-orange-50", icon: "⚠️", title: "Avertissement envoyé",
      desc: "Le membre a été averti automatiquement par le système."
    },
    CAS1_J3: {
      bg: "bg-red-50", icon: "💸💸", title: "Double pénalité 20% appliquée",
      desc: "La double pénalité a été automatiquement ajoutée à la caisse commune."
    },
    CAS1_J4: {
      bg: "bg-red-50", icon: "🚨", title: "Signalé aux autorités",
      desc: `Signalement automatique envoyé. Preuve immuable enregistrée sur la blockchain. Contact officiel notifié.`
    },
    CAS2_J1: {
      bg: "bg-orange-50", icon: "💸", title: "Pénalité 10% appliquée",
      desc: "La pénalité a été automatiquement ajoutée à la caisse commune."
    },
    CAS2_J2: {
      bg: "bg-orange-50", icon: "⚠️", title: "Avertissement envoyé",
      desc: "Le membre a été averti automatiquement. Exclusion prévue demain si non-paiement."
    },
    CAS2_J3: {
      bg: "bg-red-50", icon: "❌", title: "Membre exclu automatiquement",
      desc: "Le membre a été exclu définitivement. Sa dette a été enregistrée. Les membres qui ont reçu avant lui devront rembourser à la fin."
    },
  };

  const config = configs[scenario.type];
  if (!config) return null;

  return (
    <div className={`${config.bg} rounded-2xl p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{config.icon}</span>
        <p className="font-bold text-gray-900 text-sm">{config.title}</p>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">{config.desc}</p>
    </div>
  );
}

// ================================
// CARTE INCIDENT
// ================================
function IncidentCard({ membre, onClick }) {
  const scenario = getScenario(membre);

  const badgeConfig = {
    EN_RETARD: { bg: "bg-red-100", text: "text-red-600", label: "EN RETARD" },
    AVERTISSEMENT: { bg: "bg-orange-100", text: "text-orange-600", label: "AVERTI" },
    SIGNALE: { bg: "bg-red-200", text: "text-red-800", label: "SIGNALÉ" },
    EXCLU: { bg: "bg-gray-200", text: "text-gray-700", label: "EXCLU" },
  };

  const badge = badgeConfig[membre.statut] || badgeConfig.EN_RETARD;

  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer active:scale-98 transition-all border border-transparent hover:border-red-100"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: membre.color }}
          >
            {membre.initiale}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">⚠</span>
          </div>
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm">{membre.nom}</p>
          <p className="text-gray-400 text-xs mt-0.5">{membre.telephone}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
              {badge.label}
            </span>
            <span className="text-xs text-gray-400">
              🕐 {membre.joursRetard} jour{membre.joursRetard > 1 ? "s" : ""} de retard
            </span>
          </div>
        </div>

        {/* Montant + flèche */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <p className="font-bold text-gray-900 text-sm">
            {membre.montantDu.toLocaleString("fr-FR")}
          </p>
          <p className="text-xs text-gray-400">FCFA</p>
          <span className="text-gray-300">›</span>
        </div>
      </div>

      {/* Règle appliquée */}
      <div className={`mt-3 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 ${
        scenario.color === "red" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
      }`}>
        <span>⚡</span>
        <span>Blockchain : {scenario.label}</span>
        <span className="ml-auto text-gray-400">Voir détails →</span>
      </div>
    </div>
  );
}

// ================================
// PAGE PRINCIPALE
// ================================
export default function Incidents() {
  const navigate = useNavigate();
  const [membreSelectionne, setMembreSelectionne] = useState(null);

  const nbRetards = demoIncidents.filter(m => m.statut === "EN_RETARD").length;
  const nbAvertis = demoIncidents.filter(m => m.statut === "AVERTISSEMENT").length;
  const nbSignales = demoIncidents.filter(m => m.statut === "SIGNALE").length;

  const content = (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-base font-bold text-gray-900">Gestion des Incidents</h1>
        <div className="w-9" />
      </div>

      {/* Titre */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Un membre n'a pas payé</h2>
        <p className="text-gray-400 text-sm mt-1">
          Incidents détectés pour le cycle en cours. La blockchain gère tout automatiquement.
        </p>
      </div>

      {/* Résumé stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-red-50 rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-red-600">{nbRetards}</p>
          <p className="text-xs text-red-500 font-medium">En retard</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-orange-600">{nbAvertis}</p>
          <p className="text-xs text-orange-500 font-medium">Avertis</p>
        </div>
        <div className="bg-red-100 rounded-2xl p-3 text-center">
          <p className="text-xl font-bold text-red-800">{nbSignales}</p>
          <p className="text-xs text-red-700 font-medium">Signalés</p>
        </div>
      </div>

      {/* Badge blockchain */}
      <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0">⛓️</span>
        <div>
          <p className="font-bold text-green-800 text-sm">100% Automatique</p>
          <p className="text-xs text-green-600 mt-0.5 leading-relaxed">
            Pénalités, avertissements, exclusions et signalements sont gérés automatiquement par le smart contract. Aucune intervention manuelle requise.
          </p>
        </div>
      </div>

      {/* Liste incidents */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
          Membres en incident ({demoIncidents.length})
        </p>
        <div className="flex flex-col gap-3">
          {demoIncidents.map((membre) => (
            <IncidentCard
              key={membre.id}
              membre={membre}
              onClick={() => setMembreSelectionne(membre)}
            />
          ))}
        </div>
      </div>

      {/* Légende des scénarios */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
          Règles automatiques blockchain
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs font-bold text-gray-700 mb-1">
              💰 CAS 1 — A déjà reçu sa cagnotte
            </p>
            <div className="flex flex-col gap-1 ml-4">
              {[
                "Jour 1 → Pénalité 10%",
                "Jour 2 → Avertissement",
                "Jour 3 → Pénalité 20%",
                "Jour 4 → Signalement autorités",
              ].map((r, i) => (
                <p key={i} className="text-xs text-gray-500 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i >= 2 ? "bg-red-400" : "bg-orange-400"}`} />
                  {r}
                </p>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs font-bold text-gray-700 mb-1">
              ⏳ CAS 2 — Pas encore reçu sa cagnotte
            </p>
            <div className="flex flex-col gap-1 ml-4">
              {[
                "Jour 1 → Pénalité 10%",
                "Jour 2 → Avertissement",
                "Jour 3 → Exclusion définitive",
              ].map((r, i) => (
                <p key={i} className="text-xs text-gray-500 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i >= 2 ? "bg-red-400" : "bg-orange-400"}`} />
                  {r}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout>
      {/* Mobile */}
      <div className="md:hidden px-4 pt-6 pb-10 min-h-screen" style={{ backgroundColor: "#F5F2ED" }}>
        {content}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="max-w-2xl">
          {content}
        </div>
      </div>

      {/* Modal */}
      {membreSelectionne && (
        <ModalIncident
          membre={membreSelectionne}
          onClose={() => setMembreSelectionne(null)}
        />
      )}
    </AppLayout>
  );
}