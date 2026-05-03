import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "./AppLayout";

const demoTontine = {
  id: 1,
  nom: "Cercle des Entrepreneurs",
  tourActuel: 3,
  totalTours: 12,
  beneficiaire: { nom: "Ines Dagda", initiale: "I", color: "#1B5E4B" },
  potCycle: 1250000,
  cotisationsPagees: 8,
  totalCotisations: 12,
  progression: 65,
  membres: [
    { id: 1, nom: "Kofi Mensah", statut: "EN_RETARD", detail: "Retard de 2 jours", initiale: "K", color: "#D94F3D" },
    { id: 2, nom: "Amina Touré", statut: "EN_ATTENTE", detail: "Promis ce soir", initiale: "A", color: "#F5A623" },
    { id: 3, nom: "Chloé Adande", statut: "CONFIRME", detail: "Payé le 12 Oct.", initiale: "C", color: "#1B5E4B" },
    { id: 4, nom: "Babatunde Oke", statut: "CONFIRME", detail: "Payé le 11 Oct.", initiale: "B", color: "#3B82F6" },
    { id: 5, nom: "Fatou Diallo", statut: "CONFIRME", detail: "Payé le 10 Oct.", initiale: "F", color: "#8B5CF6" },
    { id: 6, nom: "Moussa Traoré", statut: "EN_ATTENTE", detail: "Pas encore payé", initiale: "M", color: "#F5A623" },
  ],
};

const statutConfig = {
  CONFIRME: { label: "CONFIRMÉ", bg: "bg-green-100", text: "text-green-700" },
  EN_ATTENTE: { label: "EN ATTENTE", bg: "bg-orange-100", text: "text-orange-600" },
  EN_RETARD: { label: "EN RETARD", bg: "bg-red-100", text: "text-red-600" },
};

export default function GestionTontine() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [filtre, setFiltre] = useState("Tous");

  const filtres = ["Tous", "Confirmé", "En attente", "En retard"];

  const membresFiltres = demoTontine.membres.filter((m) => {
    if (filtre === "Tous") return true;
    if (filtre === "Confirmé") return m.statut === "CONFIRME";
    if (filtre === "En attente") return m.statut === "EN_ATTENTE";
    if (filtre === "En retard") return m.statut === "EN_RETARD";
    return true;
  });

  const content = (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/organisateur")}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
            🔔
          </button>
          <div className="w-9 h-9 rounded-full bg-orange-300 flex items-center justify-center text-white font-bold text-sm">
            K
          </div>
        </div>
      </div>

      {/* Titre + Tour */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">
            Gestion Organisateur
          </p>
          <h1 className="text-xl font-bold text-gray-900">{demoTontine.nom}</h1>
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: "#1B5E4B" }}
        >
          Tour {demoTontine.tourActuel} / {demoTontine.totalTours}
        </div>
      </div>

      {/* Carte bénéficiaire */}
      <div
        className="rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white opacity-5" />
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-white opacity-5" />

        <p className="text-green-200 text-xs font-medium mb-3">Bénéficiaire du tour</p>

        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold border-2 border-white border-opacity-30 flex-shrink-0"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            {demoTontine.beneficiaire.initiale}
          </div>
          <div>
            <h2 className="text-xl font-bold">{demoTontine.beneficiaire.nom}</h2>
            <p className="text-green-200 text-sm font-medium">
              {demoTontine.potCycle.toLocaleString("fr-FR")} FCFA
            </p>
          </div>
        </div>

        {/* Progression */}
        <div>
          <div className="flex justify-between text-xs text-green-200 mb-1.5">
            <span>{demoTontine.cotisationsPagees} / {demoTontine.totalCotisations} Cotisations</span>
            <span>{demoTontine.progression}% Complété</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-white"
              style={{ width: `${demoTontine.progression}%` }}
            />
          </div>
        </div>
      </div>

      {/* État des paiements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">État des Paiements</h2>
          {/* Filtres */}
          <div className="flex gap-1">
            {filtres.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`text-xs px-2 py-1 rounded-lg font-medium transition-all ${
                  filtre === f
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {membresFiltres.map((membre) => {
            const config = statutConfig[membre.statut];
            return (
              <div
                key={membre.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm"
              >
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: membre.color }}
                >
                  {membre.initiale}
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{membre.nom}</p>
                  <p className={`text-xs mt-0.5 ${
                    membre.statut === "EN_RETARD" ? "text-red-500" : "text-gray-400"
                  }`}>
                    {membre.detail}
                  </p>
                </div>

                {/* Statut + Action */}
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}>
                    {config.label}
                  </span>
                  {membre.statut === "EN_RETARD" && (
                    <button
                      onClick={() => navigate(`/organisateur/incidents/${id}`)}
                      className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white flex items-center gap-1"
                    >
                      ▶ RAPPELER
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bouton historique */}
      <button
        onClick={() => navigate(`/organisateur/historique/${id}`)}
        className="bg-white rounded-2xl p-4 flex items-center justify-center gap-2 shadow-sm text-gray-600 font-semibold text-sm"
      >
        <span>🕐</span>
        Historique des tours précédents
      </button>

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate(`/organisateur/incidents/${id}`)}
          className="bg-red-50 rounded-2xl p-4 flex flex-col items-center gap-2 text-red-600"
        >
          <span className="text-2xl">⚠️</span>
          <p className="text-xs font-semibold text-center">Gérer les incidents</p>
        </button>
        <button
          onClick={() => navigate(`/organisateur/creer/ordre`)}
          className="bg-green-50 rounded-2xl p-4 flex flex-col items-center gap-2 text-green-700"
        >
          <span className="text-2xl">📋</span>
          <p className="text-xs font-semibold text-center">Voir l'ordre des tours</p>
        </button>
      </div>
    </div>
  );

  return (
    <AppLayout activeTab="tontine">
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
    </AppLayout>
  );
}