import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Liberation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const beneficiaire = { nom: "Moussa ABDOULAYE", initiale: "M", color: "#1B5E4B" };
  const montant = 750000;

  const handleVoirDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#F5F2ED" }}>
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <span className="text-5xl">🎉</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Cagnotte libérée !
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          {montant.toLocaleString("fr-FR")} FCFA ont été transférés automatiquement vers le portefeuille de {beneficiaire.nom}.
        </p>
        <div className="bg-white rounded-2xl p-4 w-full max-w-sm mb-8">
          <p className="text-xs text-gray-400 mb-1">Référence blockchain</p>
          <p className="font-mono text-xs text-green-700 font-bold">#TH-9921-X-{Date.now().toString().slice(-6)}</p>
        </div>
        <button
          onClick={() => navigate(`/organisateur/tontine/${id || 1}`)}
          className="w-full max-w-sm py-4 rounded-2xl font-bold text-white active:scale-95 transition-transform"
          style={{ backgroundColor: "#1B5E4B" }}
        >
          Retour à la tontine
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F2ED" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
            <span className="text-white text-xs font-bold">TC</span>
          </div>
          <span className="font-bold text-gray-900 text-sm">TontineChain</span>
        </div>
        <button className="w-9 h-9 flex items-center justify-center">
          <span className="text-xl">🔔</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 pb-10 max-w-lg mx-auto w-full">

        {/* Titre */}
        <div className="text-center mt-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
            Tous les membres ont<br />cotisé.
          </h1>
          <p className="text-gray-400 text-sm">La cagnotte est prête !</p>
        </div>

        {/* Illustration avec icônes flottantes */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          {/* Avatar bénéficiaire */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl z-10"
            style={{ backgroundColor: beneficiaire.color }}
          >
            {beneficiaire.initiale}
          </div>

          {/* Icônes flottantes */}
          <div className="absolute top-2 right-2 w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shadow">
            <span className="text-xl">💸</span>
          </div>
          <div className="absolute bottom-4 left-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow">
            <span className="text-xl">⭐</span>
          </div>
          <div className="absolute bottom-2 left-8 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shadow">
            <span className="text-white text-lg">$</span>
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shadow">
            <span className="text-xl">🔄</span>
          </div>
        </div>

        {/* Carte bénéficiaire + montant */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm mb-5">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider text-center mb-2">
            Bénéficiaire du cycle
          </p>
          <p className="text-xl font-bold text-gray-900 text-center mb-4">{beneficiaire.nom}</p>

          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black" style={{ color: "#1B5E4B" }}>
              {montant.toLocaleString("fr-FR")}
            </span>
            <span className="text-xl font-bold text-gray-400">CFA</span>
          </div>
        </div>

        {/* Badge smart contract */}
        <div className="w-full bg-gray-50 rounded-2xl p-4 flex items-start gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#1B5E4B"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Cette transaction est sécurisée par un{" "}
            <span className="font-bold text-gray-800">Smart Contract</span>. Une fois confirmée, les fonds seront transférés instantanément et de manière irréversible vers le portefeuille du bénéficiaire.
          </p>
        </div>

        {/* Bouton voir les détails */}
        <button
          onClick={handleVoirDetails}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-bold text-gray-700 text-base flex items-center justify-center gap-2 active:scale-95 transition-transform bg-gray-200"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
              Transfert en cours...
            </>
          ) : (
            "Voir les détails"
          )}
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center md:hidden">
        {[
          { label: "Accueil", icon: "🏠" },
          { label: "Ma Tontine", icon: "👥", active: true },
          { label: "Paiements", icon: "💳" },
          { label: "Profil", icon: "👤" },
        ].map((tab) => (
          <button key={tab.label}
            className={`flex flex-col items-center gap-1 ${tab.active ? "text-green-700" : "text-gray-400"}`}>
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {tab.active && <div className="w-1 h-1 rounded-full bg-green-700" />}
          </button>
        ))}
      </div>
    </div>
  );
}