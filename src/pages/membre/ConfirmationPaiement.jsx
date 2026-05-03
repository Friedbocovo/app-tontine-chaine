import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "./AppLayout2";

export default function ConfirmationPaiement() {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const { montant, tontine, methode } = location.state || {
    montant: 50000,
    tontine: "Cercle des Entrepreneurs",
    methode: "mtn",
  };

  const txHash = "0x71C...a8E9";
  const dateHeure = new Date().toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  }) + " — " + new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit", minute: "2-digit",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("0x71C4f2b8a3d9e1c5f7a2b4e6d8c1a3b5e7d9f1c3e5a7b9d1f3a5c7e9b1d3f5a8E9");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div className="flex flex-col items-center gap-5">

      {/* Icône succès */}
      <div className="relative mt-4">
        <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: "#1B5E4B" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Badge confetti */}
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>
      </div>

      {/* Titre */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Paiement confirmé !</h1>
        <p className="text-gray-400 text-sm">
          Votre contribution a été enregistrée avec succès.
        </p>
      </div>

      {/* Reçu numérique */}
      <div className="w-full bg-white rounded-3xl shadow-sm overflow-hidden">

        {/* Header reçu */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1B5E4B" }}>
              <span className="text-white text-xs font-bold">TC</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">TONTINE CHAIN</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">Reçu Numérique</span>
        </div>

        {/* Corps reçu */}
        <div className="px-5 py-5 flex flex-col gap-4">

          {/* Montant */}
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Montant envoyé</p>
            <p className="text-4xl font-bold text-gray-900">
              {montant.toLocaleString("fr-FR")}{" "}
              <span className="text-xl text-gray-400 font-normal">CFA</span>
            </p>
          </div>

          {/* Détails */}
          <div className="flex flex-col gap-3 border-t border-dashed border-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Tontine</p>
              <p className="text-sm font-bold text-gray-800">{tontine}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Tour</p>
              <p className="text-sm font-bold text-gray-800">N° 4 / 12</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Méthode</p>
              <p className="text-sm font-bold text-gray-800">
                {methode === "mtn" ? "🟡 MTN MoMo" : "🔵 Moov Money"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Date & Heure</p>
              <p className="text-sm font-bold text-gray-800">{dateHeure}</p>
            </div>
          </div>

          {/* Hash blockchain */}
          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">
              Référence blockchain
            </p>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-mono font-bold text-green-700 truncate">{txHash}</p>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${
                  copied ? "bg-green-100" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#9CA3AF" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Badge sécurité */}
          <div className="flex items-start gap-3 bg-green-50 rounded-2xl p-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              🛡️
            </div>
            <p className="text-xs text-green-700 leading-relaxed">
              Cette transaction est sécurisée par contrat intelligent et immuablement enregistrée sur le registre distribué.
            </p>
          </div>
        </div>

        {/* Tirets reçu */}
        <div className="px-5 py-3 border-t border-dashed border-gray-100 flex items-center gap-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-gray-100" />
          ))}
        </div>
      </div>

      {/* Boutons */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => {
            // Simulation téléchargement reçu
            alert("Reçu téléchargé !");
          }}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
          style={{ backgroundColor: "#1B5E4B" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="7 10 12 15 17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Télécharger le reçu
        </button>

        <button
          onClick={() => navigate("/membre")}
          className="w-full py-4 rounded-2xl font-bold text-gray-600 text-sm bg-gray-100 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="#6B7280" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="#6B7280" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="#6B7280" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="#6B7280" strokeWidth="2"/>
          </svg>
          Retour au tableau de bord
        </button>
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
        <div className="max-w-lg mx-auto">
          {content}
        </div>
      </div>
    </AppLayout>
  );
}