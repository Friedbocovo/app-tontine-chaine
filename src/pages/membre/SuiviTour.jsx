import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "./AppLayout2";

// ================================
// DONNÉES DE DÉMO
// ================================
const demoTour = {
  numero: 3,
  cagnotte: 750000,
  objectif: 1000000,
  pourcentage: 75,
  membresRestants: 3,
  beneficiaire: { nom: "Koffi Mensah", initiale: "K", color: "#1B5E4B", date: "15 Octobre" },
  membres: [
    { id: 1, nom: "Vous", initiale: "V", color: "#1B5E4B", statut: "PAYE", date: "02 Oct." },
    { id: 2, nom: "Amina Diallo", initiale: "A", color: "#F5A623", statut: "PAYE", date: "01 Oct." },
    { id: 3, nom: "Samuel Béhanzin", initiale: "S", color: "#8B5CF6", statut: "EN_ATTENTE", delai: "+2 jours" },
    { id: 4, nom: "Marie Tové", initiale: "M", color: "#EC4899", statut: "PAYE", date: "04 Oct." },
    { id: 5, nom: "Jean Dossou", initiale: "J", color: "#D94F3D", statut: "EN_ATTENTE", delai: "Aujourd'hui" },
    { id: 6, nom: "Fatou Koné", initiale: "F", color: "#3B82F6", statut: "PAYE", date: "03 Oct." },
  ],
};

// Prochain tour
const demoProchainTour = {
  toursRestants: 2,
  montantEstime: 500000,
};

// ================================
// STATUT CONFIG
// ================================
const statutConfig = {
  PAYE: { label: "Payé", bg: "bg-green-100", text: "text-green-700", icon: "✓" },
  EN_ATTENTE: { label: "En attente", bg: "bg-orange-100", text: "text-orange-600", icon: "⏱" },
  EN_RETARD: { label: "En retard", bg: "bg-red-100", text: "text-red-600", icon: "!" },
};

export default function SuiviTour() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [onglet, setOnglet] = useState("tour"); // "tour" | "prochain"

  const nbPayes = demoTour.membres.filter(m => m.statut === "PAYE").length;
  const nbTotal = demoTour.membres.length;

  const content = (
    <div className="flex flex-col gap-4 px-4 pt-6 pb-10 md:px-0 md:pt-0 md:pb-0">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">🔔</button>
          <div className="w-9 h-9 rounded-full bg-orange-300 flex items-center justify-center text-white font-bold text-sm">F</div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex bg-gray-100 rounded-2xl p-1">
        {[
          { id: "tour", label: "Tour en cours" },
          { id: "prochain", label: "Mon prochain tour" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setOnglet(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              onglet === tab.id
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ======================== */}
      {/* ONGLET 1 — Tour en cours */}
      {/* ======================== */}
      {onglet === "tour" && (
        <>
          {/* Titre */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Tour en cours — Tour {demoTour.numero}
            </h1>
            <p className="text-gray-400 text-sm">Cycle de récolte mensuel</p>
          </div>

          {/* Carte cagnotte */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">
              Cagnotte actuelle
            </p>
            <div className="flex items-end gap-2 mb-1">
              <p className="text-3xl font-bold text-gray-900">
                {demoTour.cagnotte.toLocaleString("fr-FR")}
              </p>
              <p className="text-lg text-gray-400 mb-0.5">FCFA</p>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Objectif total{" "}
              <span className="font-bold text-gray-700">
                {demoTour.objectif.toLocaleString("fr-FR")} FCFA
              </span>
            </p>

            {/* Barre progression */}
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${demoTour.pourcentage}%`,
                  background: "linear-gradient(to right, #F5A623, #1B5E4B)",
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{demoTour.pourcentage}% collectés</span>
              <span>{demoTour.membresRestants} membres restants</span>
            </div>
          </div>

          {/* Bénéficiaire */}
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ backgroundColor: "#1B5E4B" }}
          >
            <div className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse ml-1" />
            <div className="px-2 py-0.5 bg-white bg-opacity-20 rounded-full flex-shrink-0">
              <span className="text-white text-xs font-bold">Bénéficiaire du tour</span>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 border-2 border-white border-opacity-30"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {demoTour.beneficiaire.initiale}
            </div>
            <div>
              <p className="text-white font-bold">{demoTour.beneficiaire.nom}</p>
              <p className="text-green-200 text-xs">Prévu pour le {demoTour.beneficiaire.date}</p>
            </div>
          </div>

          {/* Qui a payé */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-bold text-gray-900">Qui a payé ?</h2>
              <div className="flex items-center gap-1">
                <span className="text-green-700 text-sm">🛡️</span>
                <span className="text-green-700 text-xs font-semibold">Transparence totale</span>
              </div>
            </div>

            {/* Résumé */}
            <div className="flex gap-3 mb-3">
              <div className="flex-1 bg-green-50 rounded-2xl p-3 text-center">
                <p className="text-xl font-bold text-green-700">{nbPayes}</p>
                <p className="text-xs text-green-600">Payés</p>
              </div>
              <div className="flex-1 bg-orange-50 rounded-2xl p-3 text-center">
                <p className="text-xl font-bold text-orange-500">{nbTotal - nbPayes}</p>
                <p className="text-xs text-orange-500">En attente</p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-2xl p-3 text-center">
                <p className="text-xl font-bold text-gray-700">{nbTotal}</p>
                <p className="text-xs text-gray-400">Total</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {demoTour.membres.map((membre) => {
                const config = statutConfig[membre.statut];
                return (
                  <div
                    key={membre.id}
                    className="bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm"
                  >
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative"
                      style={{ backgroundColor: membre.color }}
                    >
                      {membre.initiale}
                      {membre.nom === "Vous" && (
                        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white">
                          <span className="text-white text-xs">★</span>
                        </div>
                      )}
                    </div>

                    {/* Nom */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">
                        {membre.nom}
                        {membre.nom === "Vous" && (
                          <span className="ml-1.5 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-semibold">
                            Moi
                          </span>
                        )}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {membre.statut === "PAYE"
                          ? `Payé le ${membre.date}`
                          : `Délai : ${membre.delai}`}
                      </p>
                    </div>

                    {/* Statut */}
                    <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full flex-shrink-0 ${config.bg} ${config.text}`}>
                      {config.icon} {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bouton payer si en attente */}
          <button
            onClick={() => navigate(`/membre/payer/${id}`)}
            className="w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
            style={{ backgroundColor: "#1B5E4B" }}
          >
            💳 Payer ma cotisation
          </button>
        </>
      )}

      {/* ======================== */}
      {/* ONGLET 2 — Prochain tour */}
      {/* ======================== */}
      {onglet === "prochain" && (
        <>
          {/* Illustration */}
          <div className="flex flex-col items-center py-8">
            <div className="w-40 h-40 rounded-full flex items-center justify-center relative mb-6"
              style={{ backgroundColor: "#1B5E4B" }}>
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-opacity-30 animate-ping" />
              <div className="text-center">
                <p className="text-white text-xs font-semibold mb-1">EXCITATION</p>
                <p className="text-4xl">🎯</p>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Votre tour approche !
            </h1>
            <p className="text-gray-400 text-center text-sm leading-relaxed max-w-xs">
              Préparez-vous à recevoir votre part de prospérité collective.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-2xl p-4 text-white"
              style={{ backgroundColor: "#1B5E4B" }}
            >
              <p className="text-green-200 text-xs font-semibold uppercase tracking-wide mb-1">
                Compte à rebours
              </p>
              <p className="text-2xl font-bold">
                Dans {demoProchainTour.toursRestants} tours
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">
                Montant estimé
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {demoProchainTour.montantEstime.toLocaleString("fr-FR")}
              </p>
              <p className="text-gray-400 text-xs">FCFA</p>
            </div>
          </div>

          {/* Transfert automatique */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Transfert Automatique</p>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Dès que le tour est bouclé, vos fonds seront transférés instantanément sur votre compte{" "}
                <span className="text-green-700 font-semibold">Mobile Money</span> associé.
              </p>
            </div>
          </div>

          {/* Ordre des bénéficiaires */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Ordre des prochains tours
            </p>
            <div className="flex flex-col gap-2">
              {[
                { tour: "Tour 4", nom: "Amina Diallo", initiale: "A", color: "#F5A623", estMoi: false },
                { tour: "Tour 5", nom: "Vous", initiale: "V", color: "#1B5E4B", estMoi: true },
                { tour: "Tour 6", nom: "Samuel Béhanzin", initiale: "S", color: "#8B5CF6", estMoi: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    item.estMoi ? "bg-green-50 border-2 border-green-200" : "bg-gray-50"
                  }`}
                >
                  <span className="text-xs text-gray-400 font-semibold w-12 flex-shrink-0">
                    {item.tour}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.initiale}
                  </div>
                  <p className={`text-sm font-semibold flex-1 ${item.estMoi ? "text-green-700" : "text-gray-800"}`}>
                    {item.nom}
                    {item.estMoi && (
                      <span className="ml-1.5 text-xs bg-green-200 text-green-700 px-1.5 py-0.5 rounded-full">
                        Vous
                      </span>
                    )}
                  </p>
                  {item.estMoi && <span className="text-yellow-500">⭐</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Bouton historique */}
          <button
            onClick={() => navigate(`/membre/historique`)}
            className="w-full py-4 rounded-2xl border-2 border-green-200 text-green-700 font-bold text-sm flex items-center justify-center gap-2"
          >
            🕐 Voir l'historique
          </button>

          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Toutes les transactions sont sécurisées et vérifiées par les membres de votre tontine.
          </p>
        </>
      )}
    </div>
  );

  return <AppLayout>{content}</AppLayout>;
}