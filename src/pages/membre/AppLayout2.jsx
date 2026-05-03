import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

function BottomNav({ navigate }) {
  const location = useLocation();

  const tabs = [
    {
      id: "accueil",
      label: "Accueil",
      path: "/membre",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 21V12h6v9M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "suivi",
      label: "Ma Tontine",
      path: "/membre/suivi/1",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "historique2",
      label: "Paiement",
      path: "/membre/historique2/1",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="7" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
          <path d="M2 11h20" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "profil",
      label: "Profil",
      path: "/membre/profil2",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/membre") return "accueil";
    if (path.includes("/membre/suivi") ) return "suivi";
    if (path.includes("/membre/historique2")) return "historique2";
    if (path.includes("/membre/profil2")) return "profil";
    return "accueil";
  };

  const activeTab = getActiveTab();

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-2 flex justify-around items-center">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              isActive ? "text-[#1B5E4B]" : "text-gray-400"
            }`}
          >
            {tab.icon}
            <span className={`text-xs font-medium ${isActive ? "text-[#1B5E4B]" : "text-gray-400"}`}>
              {tab.label}
            </span>
            {isActive && <div className="w-1 h-1 rounded-full bg-[#1B5E4B]" />}
          </button>
        );
      })}
    </div>
  );
}

function Sidebar({ navigate, nomUtilisateur, role = "membre" }) {
  const location = useLocation();

  const tabs = [
    { id: "accueil", label: "Accueil", path: "/membre", emoji: "🏠" },
    { id: "suivi", label: "Mes Tontines", path: "/membre/suivi/1", emoji: "👥" },
    { id: "historique2", label: "Paiement", path: "/membre/historique2/1", emoji: "💳" },
    { id: "profil", label: "Profil", path: "/membre/profil2", emoji: "👤" },
  ];

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/membre") return "accueil";
    if (path.includes("/membre/suivi") ) return "suivi";
    if (path.includes("/membre/historique2")) return "historique2";
    if (path.includes("/membre/profil2")) return "profil";
    return "accueil";
  };

  const activeTab = getActiveTab();

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col py-8 px-4 flex-shrink-0 min-h-screen sticky top-0">
      {/* Logo */}
      <div className="mb-10 px-2 ">
        <span className="text-xl font-bold cursor-pointer flex gap-2" onClick={() => navigate("/membre")}>
                    <img src={Logo} alt="logo" className="w-[35px] h-[35px] object-contain" />

          <span className="text-gray-900">Tontine</span>
          <span className="text-[#1B5E4B]">Chain</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left ${
              activeTab === tab.id
                ? "bg-[#E8F5F0] text-[#1B5E4B] font-semibold"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <span className="text-lg">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Créer tontine */}
      <button
        onClick={() => navigate("/membre/rejoindre")}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white font-semibold text-sm mb-4 hover:bg-[#2D7A63] active:scale-95 transition-all"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        <span className="text-lg">＋</span>
        Rejoindre une tontine
      </button>

      {/* Utilisateur */}
      <div className="flex items-center gap-3 px-2 pt-4 border-t border-gray-100">
        <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-sm flex-shrink-0">
          {nomUtilisateur.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{nomUtilisateur}</p>
          <p className="text-xs text-[#1B5E4B] font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function AppLayout({
  children,
  bgColor = "#F5F2ED",
  showFab = false,
  fabAction,
  role = "Membre",
}) {
  const navigate = useNavigate();
  const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");
  const nomUtilisateur = inscription.nom || "BOCOVO Friedrich";

  return (
    <>
      {/* MOBILE */}
      <div className="flex flex-col min-h-screen md:hidden" style={{ backgroundColor: bgColor }}>
        <div className="flex-1 overflow-y-auto pb-20">{children}</div>

        {showFab && (
          <button
            onClick={fabAction || (() => navigate("/membre/rejoindre"))} 
            className="fixed bottom-20 right-4 w-14 h-14 rounded-full text-white text-3xl flex items-center justify-center shadow-xl z-20 active:scale-90 transition-transform"
            style={{ backgroundColor: "#1B5E4B" }}
          >
            +
          </button>
        )}

        <div className="fixed bottom-0 left-0 right-0 z-10">
          <BottomNav navigate={navigate} />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex min-h-screen" style={{ backgroundColor: bgColor }}>
        <Sidebar navigate={navigate} nomUtilisateur={nomUtilisateur} role={role} />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-8">{children}</div>
        </div>
      </div>
    </>
  );
}

export { BottomNav, Sidebar };