import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

// ================================
// DONNÉES DE DÉMO
// ================================
const demoMembre = {
  nom: "Fatou",
  prochaineReception: { tours: 3, montant: 750000 },
  prochainePaiement: { echeance: "15 OCT.", montant: 50000 },
  progression: { actuel: 8, total: 12 },
  prochainTour: "Famille Diallo",
  tontines: [
    {
      id: 1,
      nom: "Commerce Grand Marché",
      membres: 12,
      frequence: "Cycle mensuel",
      statut: "PAYE",
      montant: 25000,
      icon: "👥",
      iconBg: "#E8F5F0",
    },
    {
      id: 2,
      nom: "Cercle Famille",
      membres: 5,
      frequence: "Cycle hebdomadaire",
      statut: "EN_ATTENTE",
      montant: 10000,
      icon: "🐷",
      iconBg: "#FDF6EC",
    },
    {
      id: 3,
      nom: "Projet Immobilier 2024",
      membres: 20,
      frequence: "Cycle trimestriel",
      statut: "PAYE",
      montant: 150000,
      icon: "🔧",
      iconBg: "#FDF6EC",
    },
  ],
};

// ================================
// BOTTOM NAV MEMBRE
// ================================
function MembreBottomNav({ navigate, active }) {
  const tabs = [
    {
      id: "accueil", label: "Accueil", path: "/membre",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9 21V12h6v9M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    },
    {
      id: "tontine", label: "Ma Tontine", path: "/membre/suivi/1",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2"/></svg>
    },
    {
      id: "paiements", label: "Paiements", path: "/membre/payer/1",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/><path d="M2 11h20" stroke="currentColor" strokeWidth="2"/></svg>
    },
    {
      id: "profil", label: "Profil", path: "/membre/profil2",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    },
  ];

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-2 flex justify-around items-center">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${isActive ? "text-[#1B5E4B]" : "text-gray-400"}`}
          >
            {tab.icon}
            <span className={`text-xs font-medium ${isActive ? "text-[#1B5E4B]" : "text-gray-400"}`}>{tab.label}</span>
            {isActive && <div className="w-1 h-1 rounded-full bg-[#1B5E4B]" />}
          </button>
        );
      })}
    </div>
  );
}

// ================================
// SIDEBAR MEMBRE
// ================================
function MembreSidebar({ navigate, nomUtilisateur }) {
  const tabs = [
    { id: "accueil", label: "Accueil", path: "/membre", emoji: "🏠" },
    { id: "tontine", label: "Mes Tontines", path: "/membre/suivi/1", emoji: "👥" },
    { id: "historique2", label: "Paiement", path: "/membre/historique2/1", emoji: "💳" },
    { id: "profil", label: "Profil", path: "/membre/profil2", emoji: "👤" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 flex-shrink-0 min-h-screen sticky top-0">
      <div className="mb-10 px-2 cursor-pointer" onClick={() => navigate("/membre")}>
        <span className="text-xl font-bold flex gap-2">
                              <img src={Logo} alt="logo" className="w-[35px] h-[35px] object-contain" />

          <span className="text-gray-900">Tontine</span>
          <span className="text-[#1B5E4B]">Chain</span>
        </span>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all text-left"
          >
            <span className="text-lg">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </nav>
      <button
        onClick={() => navigate("/membre/rejoindre")}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white font-semibold text-sm mb-4 active:scale-95 transition-all"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        <span className="text-lg">+</span>
        Rejoindre une tontine
      </button>
      <div className="flex items-center gap-3 px-2 pt-4 border-t border-gray-100">
        <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-sm flex-shrink-0">
          {nomUtilisateur.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{nomUtilisateur}</p>
          <p className="text-xs text-[#1B5E4B] font-medium">Membre</p>
        </div>
      </div>
    </div>
  );
}

// ================================
// CONTENU PRINCIPAL
// ================================
function Content({ navigate }) {
  const { nom, prochaineReception, prochainePaiement, progression, prochainTour, tontines } = demoMembre;

  return (
    <div className="flex flex-col gap-4">

      {/* Salutation */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Bonjour, {nom} !</h1>
          <p className="text-gray-400 text-sm">Voici l'état de vos épargnes collectives.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
            🔔
          </button>
          <div className="w-9 h-9 rounded-full bg-orange-300 flex items-center justify-center text-white font-bold text-sm">
            {nom.charAt(0)}
          </div>
        </div>
      </div>

      {/* Carte prochaine réception */}
      <div
        className="rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-5" />
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-white opacity-5" />

        <p className="text-green-200 text-xs font-bold uppercase tracking-wide mb-1">
          Prochaine réception
        </p>
        <p className="text-white font-semibold text-sm mb-2">
          Vous recevez la cagnotte dans{" "}
          <span className="text-yellow-300 font-bold">{prochaineReception.tours} tours !</span>
        </p>
        <p className="text-3xl font-bold">
          {prochaineReception.montant.toLocaleString("fr-FR")}{" "}
          <span className="text-lg text-green-200">CFA</span>
        </p>
      </div>

      {/* Prochaine cotisation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-orange-500 text-sm font-bold">🕐 ÉCHÉANCE : {prochainePaiement.echeance}</span>
        </div>
        <p className="text-gray-500 text-sm mb-1">Prochaine cotisation</p>
        <p className="text-2xl font-bold text-gray-900 mb-4">
          {prochainePaiement.montant.toLocaleString("fr-FR")} CFA
        </p>
        <button
          onClick={() => navigate("/membre/payer/1")}
          className="w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
          style={{ backgroundColor: "#1B5E4B" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="3" stroke="white" strokeWidth="2"/>
            <path d="M2 11h20" stroke="white" strokeWidth="2"/>
            <path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="white"/>
          </svg>
          Payer maintenant
        </button>
      </div>

      {/* Progression du cycle */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-gray-700">Progression du cycle</p>
          <p className="text-sm font-bold text-gray-900">
            {progression.actuel} / {progression.total} Mois
          </p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${(progression.actuel / progression.total) * 100}%`,
              background: "linear-gradient(to right, #1B5E4B, #2D7A63)",
            }}
          />
        </div>
        <p className="text-xs text-gray-400">
          Prochain tour : <span className="text-gray-600 font-medium">{prochainTour}</span>
        </p>
      </div>

      {/* Mes tontines */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">Mes tontines</h2>
          <button
            onClick={() => navigate("/membre/rejoindre")}
            className="text-green-700 text-sm font-semibold"
          >
            Voir tout →
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {tontines.map((tontine) => (
            <button
              key={tontine.id}
              onClick={() => navigate(`/membre/suivi/${tontine.id}`)}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 text-left active:scale-98 transition-transform w-full"
            >
              {/* Icône */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: tontine.iconBg }}
              >
                {tontine.icon}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{tontine.nom}</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {tontine.membres} membres · {tontine.frequence}
                </p>
              </div>

              {/* Statut + montant */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  tontine.statut === "PAYE"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-600"
                }`}>
                  {tontine.statut === "PAYE" ? "PAYÉ" : "EN ATTENTE"}
                </span>
                <p className="text-sm font-bold text-gray-900">
                  {tontine.montant.toLocaleString("fr-FR")} CFA
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bouton rejoindre */}
      <button
        onClick={() => navigate("/membre/rejoindre")}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-green-300 text-green-700 font-semibold text-sm flex items-center justify-center gap-2"
      >
        <span className="text-lg">+</span>
        Rejoindre une nouvelle tontine
      </button>
    </div>
  );
}

// ================================
// PAGE PRINCIPALE
// ================================
export default function DashboardMembre() {
  const navigate = useNavigate();
  const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");
  const nomUtilisateur = inscription.nom || "Fatou";

  return (
    <>
      {/* MOBILE */}
      <div className="flex flex-col min-h-screen md:hidden" style={{ backgroundColor: "#F5F2ED" }}>
        <div className="flex-1 overflow-y-auto pb-20 px-4 pt-6">
          <Content navigate={navigate} />
        </div>

        {/* FAB rejoindre */}
        <button
          onClick={() => navigate("/membre/rejoindre")}
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full text-white text-3xl flex items-center justify-center shadow-xl z-20 active:scale-90 transition-transform"
          style={{ backgroundColor: "#1B5E4B" }}
        >
          +
        </button>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <MembreBottomNav navigate={navigate} active="accueil" />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex min-h-screen" style={{ backgroundColor: "#F5F2ED" }}>
        <MembreSidebar navigate={navigate} nomUtilisateur={nomUtilisateur} />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-8">

            {/* Header desktop */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bonjour, {nomUtilisateur.split(" ")[0]} 👋
                </h1>
                <p className="text-gray-400 text-sm mt-1">Voici l'état de vos épargnes collectives</p>
              </div>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                🔔
              </button>
            </div>

            {/* Stats desktop */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div
                className="rounded-2xl p-5 text-white"
                style={{ backgroundColor: "#1B5E4B" }}
              >
                <p className="text-green-200 text-xs mb-1">Prochaine réception</p>
                <p className="text-xl font-bold">
                  {demoMembre.prochaineReception.montant.toLocaleString("fr-FR")} CFA
                </p>
                <p className="text-green-300 text-xs mt-1">
                  Dans {demoMembre.prochaineReception.tours} tours
                </p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-gray-400 text-xs mb-1">Prochaine cotisation</p>
                <p className="text-xl font-bold text-gray-900">
                  {demoMembre.prochainePaiement.montant.toLocaleString("fr-FR")} CFA
                </p>
                <p className="text-orange-500 text-xs mt-1 font-medium">
                  Échéance {demoMembre.prochainePaiement.echeance}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="text-gray-400 text-xs mb-1">Progression cycle</p>
                <p className="text-xl font-bold text-gray-900">
                  {demoMembre.progression.actuel}/{demoMembre.progression.total}
                </p>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${(demoMembre.progression.actuel / demoMembre.progression.total) * 100}%`,
                      backgroundColor: "#1B5E4B",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bouton payer + tontines */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                {/* Payer maintenant */}
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Cotisation du mois</p>
                  <p className="text-2xl font-bold text-gray-900 mb-3">
                    {demoMembre.prochainePaiement.montant.toLocaleString("fr-FR")} CFA
                  </p>
                  <button
                    onClick={() => navigate("/membre/payer/1")}
                    className="w-full py-3 rounded-2xl text-white font-bold text-sm active:scale-95 transition-transform"
                    style={{ backgroundColor: "#1B5E4B" }}
                  >
                    Payer maintenant
                  </button>
                </div>

                {/* Rejoindre */}
                <button
                  onClick={() => navigate("/membre/rejoindre")}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-green-300 text-green-700 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  + Rejoindre une tontine
                </button>
              </div>

              {/* Liste tontines */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-base font-bold text-gray-900">Mes tontines</h2>
                  <button className="text-green-700 text-sm font-semibold">Voir tout →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {demoMembre.tontines.map((tontine) => (
                    <button
                      key={tontine.id}
                      onClick={() => navigate(`/membre/suivi/${tontine.id}`)}
                      className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3 text-left w-full active:scale-98 transition-transform"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: tontine.iconBg }}
                      >
                        {tontine.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-xs truncate">{tontine.nom}</p>
                        <p className="text-gray-400 text-xs">{tontine.frequence}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        tontine.statut === "PAYE"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-600"
                      }`}>
                        {tontine.statut === "PAYE" ? "PAYÉ" : "EN ATTENTE"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}