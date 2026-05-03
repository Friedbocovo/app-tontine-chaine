import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout";

export default function Confirmation() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const etape1 = JSON.parse(localStorage.getItem("tontine_etape1") || "{}");
  const membres = JSON.parse(localStorage.getItem("tontine_membres") || "[]");

  const contribution = etape1.contribution
    ? Number(etape1.contribution).toLocaleString("fr-FR") + " FCFA"
    : "50 000 FCFA";
  const frequence =
    etape1.frequence === "hebdomadaire" ? "Hebdomadaire" : "Mensuelle";
  const dateDebut = etape1.dateDebut
    ? new Date(etape1.dateDebut).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "5 Octobre 2023";
  const nbMembres = etape1.membresMax || membres.length || 12;
  const codeInvitation = "To.....A@334";

  const handleCopy = () => {
    navigator.clipboard.writeText(codeInvitation).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recap = [
    {
      label: "CONTRIBUTION",
      value: contribution,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="3" stroke="#F5A623" strokeWidth="2" />
          <path d="M2 10h20" stroke="#F5A623" strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: "FRÉQUENCE",
      value: frequence,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="3" stroke="#F5A623" strokeWidth="2" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 14h8M8 18h5" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "PREMIER TOUR",
      value: dateDebut,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="3" stroke="#F5A623" strokeWidth="2" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "MEMBRES",
      value: `${nbMembres} Personnes`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="7" r="4" stroke="#F5A623" strokeWidth="2" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const content = (
    <div className="flex flex-col items-center">
      {/* Header avatar + cloche */}
      <div className="w-full flex items-center justify-between mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 overflow-hidden flex-shrink-0">
          <div className="w-full h-full flex items-center justify-center text-white font-bold">K</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Illustration succès */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Cercles décoratifs */}
        <div className="absolute w-40 h-40 rounded-full bg-[#E8F5F0] opacity-60" />
        <div className="absolute w-28 h-28 rounded-full bg-[#C8E6DA] opacity-60" />
        {/* Icône principale */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#1B5E4B] flex items-center justify-center shadow-xl">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Badge lien */}
          <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl bg-[#F5A623] flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-2xl font-bold text-gray-900 text-center leading-tight mb-3 mt-4">
        Votre tontine est<br />créée et sécurisée !
      </h1>
      <p className="text-gray-500 text-sm text-center leading-relaxed mb-6 max-w-xs">
        Félicitations ! Le contrat intelligent a été déployé sur la blockchain pour garantir la transparence de votre communauté.
      </p>

      {/* Carte récapitulatif */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-sm mb-5">
        {/* Header carte */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#1B5E4B] font-bold text-base">Récapitulatif des règles</h2>
          <span className="bg-[#E8F5F0] text-[#1B5E4B] text-xs font-bold px-3 py-1 rounded-full">ACTIF</span>
        </div>

        {/* Lignes recap */}
        <div className="space-y-3">
          {recap.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wider">{item.label}</p>
                <p className="text-gray-900 font-bold text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons partage */}
      <div className="w-full flex gap-3 mb-3">
        <button className="flex-1 bg-[#1B5E4B] text-white rounded-2xl py-4 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-[#2D7A63] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="white" strokeWidth="2" />
            <circle cx="6" cy="12" r="3" stroke="white" strokeWidth="2" />
            <circle cx="18" cy="19" r="3" stroke="white" strokeWidth="2" />
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Partager le lien
        </button>
        <button className="w-14 h-14 bg-[#1B5E4B] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg hover:bg-[#2D7A63] transition-colors">
          {/* QR Code icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" />
            <rect x="5" y="5" width="3" height="3" fill="white" />
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" />
            <rect x="16" y="5" width="3" height="3" fill="white" />
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" />
            <rect x="5" y="16" width="3" height="3" fill="white" />
            <path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2h-2zM20 16h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Code invitation */}
      <div className="w-full flex items-center justify-between bg-white rounded-2xl px-4 py-3 shadow-sm mb-4">
        <p className="text-gray-700 text-sm font-medium">
          Code : <span className="font-bold text-gray-900">{codeInvitation}</span>
        </p>
        <button
          onClick={handleCopy}
          className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
            copied
              ? "bg-[#E8F5F0] text-[#1B5E4B]"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>
      </div>

      {/* Bouton voir tontine */}
      <button
        onClick={() => navigate("/organisateur/tontine/1")}
        className="w-full bg-[#F5A623] text-white rounded-2xl py-4 font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-[#F7C46A] transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
        </svg>
        Voir ma tontine
      </button>
    </div>
  );

  return (
    <AppLayout activeTab="tontine">
      {/* Mobile */}
      <div
        className="md:hidden px-5 pt-8 pb-10 min-h-screen"
        style={{ backgroundColor: "#F5F2ED" }}
      >
        {content}
      </div>
      {/* Desktop */}
      <div className="hidden md:flex justify-center">
        <div className="w-full max-w-lg">{content}</div>
      </div>
    </AppLayout>
  );
}