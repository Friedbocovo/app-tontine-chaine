import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout";

const COLORS = ["bg-orange-400","bg-blue-400","bg-purple-400","bg-pink-400","bg-teal-400","bg-yellow-500"];

export default function Etape2Membres() {
  const navigate = useNavigate();
  const [telephone, setTelephone] = useState("");
  const [membres, setMembres] = useState([
    { nom: "Fatou", tel: "+229 90 •• •• 44" },
    { nom: "Kouassi", tel: "+229 61 •• •• 12" },
    { nom: "Amara", tel: "+229 97 •• •• 89" },
    { nom: "Moussa", tel: "+229 66 •• •• 00" },
  ]);
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!telephone.trim() || telephone.length < 8) { setError("Numéro invalide"); return; }
    setMembres([...membres, { nom: "Membre " + (membres.length + 1), tel: "+229 " + telephone }]);
    setTelephone(""); setError("");
  };

  const handleNext = () => {
    if (membres.length < 1) { setError("Ajoutez au moins un membre"); return; }
    localStorage.setItem("tontine_membres", JSON.stringify(membres));
    navigate("/organisateur/creer/ordre");
  };

  const content = (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-gray-500 text-sm font-medium md:hidden">Étape 2 sur 3</span>
        <div className="w-9 md:hidden" />
      </div>

      {/* Progress */}
      <div className="mb-6">
        <p className="text-[#1B5E4B] text-sm font-semibold mb-1 hidden md:block">Étape 2 sur 3</p>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Ajouter des membres</h2>
          <span className="text-[#1B5E4B] font-bold text-lg">66%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-[#1B5E4B] rounded-full" />
        </div>
      </div>

      {/* Champ téléphone */}
      <div className="space-y-3">
        <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm border-2 border-transparent focus-within:border-[#1B5E4B] gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1B5E4B] flex-shrink-0">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input type="tel" placeholder="Numéro de téléphone" value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm" />
          <button onClick={handleAdd}
            className="w-8 h-8 rounded-full bg-[#1B5E4B] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}

        {/* SMS */}
        <button className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 10h8M8 14h5" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="flex-1 text-left font-semibold text-gray-800 text-sm">Inviter par SMS</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Liste membres */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
            Membres ajoutés ({membres.length})
          </p>
          <div className="space-y-2">
            {membres.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${COLORS[idx % COLORS.length]} text-white font-bold text-base`}>
                    {m.nom.charAt(0)}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#1B5E4B] rounded-full flex items-center justify-center border-2 border-white">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{m.nom}</p>
                  <p className="text-gray-400 text-xs">{m.tel}</p>
                </div>
                <button onClick={() => setMembres(membres.filter((_, i) => i !== idx))}
                  className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton */}
        <button onClick={handleNext}
          className="w-full bg-[#1B5E4B] text-white rounded-2xl py-4 font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-[#2D7A63] transition-colors mt-2">
          Suivant
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <AppLayout activeTab="tontine">
      <div className="md:hidden px-5 pt-12 pb-10 min-h-screen" style={{ backgroundColor: "#F5F2ED" }}>{content}</div>
      <div className="hidden md:block">{content}</div>
    </AppLayout>
  );
}