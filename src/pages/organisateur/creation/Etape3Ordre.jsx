import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout";

const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const COLORS = ["bg-orange-400","bg-blue-400","bg-purple-400","bg-pink-400","bg-teal-400","bg-yellow-500","bg-red-400","bg-indigo-400"];

const defaultMembres = [
  { id: 1, nom: "Koffi Kouamé (Vous)", initiale: "K", color: "bg-orange-400" },
  { id: 2, nom: "Amara Sidibé", initiale: "A", color: "bg-blue-400" },
  { id: 3, nom: "Fatoumata Traoré", initiale: "F", color: "bg-purple-400" },
  { id: 4, nom: "Moussa Diallo", initiale: "M", color: "bg-teal-400" },
  { id: 5, nom: "Kouassi Bah", initiale: "K", color: "bg-pink-400" },
];

export default function Etape3Ordre() {
  const navigate = useNavigate();
  const [methode, setMethode] = useState("manuel");
  const [membres, setMembres] = useState(defaultMembres);
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleDrop = (e, idx) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const list = [...membres];
    const [item] = list.splice(dragIdx, 1);
    list.splice(idx, 0, item);
    setMembres(list);
    setDragIdx(null); setOverIdx(null);
  };

  const etape1 = JSON.parse(localStorage.getItem("tontine_etape1") || "{}");
  const contribution = Number(etape1.contribution || 50000);
  const frequence = etape1.frequence || "mensuel";
  const potMensuel = contribution * membres.length;
  const dureeCycle = membres.length;

  const visibles = showAll ? membres : membres.slice(0, 3);
  const restants = membres.length - 3;

  const handleCreer = () => {
    localStorage.setItem("tontine_ordre", JSON.stringify({ methode, ordre: membres.map(m => m.id) }));
    navigate("/organisateur/creer/confirmation");
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
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <p className="text-[#1B5E4B] text-sm font-semibold mb-1">Étape 3 sur 3</p>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Ordre des<br />bénéficiaires</h2>
          <span className="text-[#1B5E4B] font-bold text-lg">100%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-full bg-[#1B5E4B] rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Méthode */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Méthode de distribution</p>
          <div className="space-y-2">
            {[
              { val: "aleatoire", label: "Tirage au sort automatique", desc: "L'ordre sera généré aléatoirement par le système.", icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#F5A623" strokeWidth="2" />
                  <circle cx="8" cy="8" r="1.5" fill="#F5A623" /><circle cx="12" cy="12" r="1.5" fill="#F5A623" />
                  <circle cx="16" cy="16" r="1.5" fill="#F5A623" /><circle cx="16" cy="8" r="1.5" fill="#F5A623" />
                  <circle cx="8" cy="16" r="1.5" fill="#F5A623" />
                </svg>
              ), bg: "bg-orange-50" },
              { val: "manuel", label: "Je définis l'ordre moi-même", desc: "Faites glisser les membres pour ajuster l'ordre.", icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              ), bg: "bg-[#E8F5F0]" },
            ].map(({ val, label, desc, icon, bg }) => (
              <button key={val} onClick={() => setMethode(val)}
                className={`w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border-2 transition-all ${methode === val ? "border-[#1B5E4B]" : "border-transparent"}`}>
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>{icon}</div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-900 text-sm">{label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${methode === val ? "border-[#1B5E4B] bg-[#1B5E4B]" : "border-gray-300"}`}>
                  {methode === val && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Drag & drop */}
        {methode === "manuel" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Membres ({membres.length})</p>
              <p className="text-xs text-[#1B5E4B] font-medium">Appuyez longuement pour déplacer</p>
            </div>
            <div className="space-y-2">
              {visibles.map((m, idx) => (
                <div key={m.id} draggable
                  onDragStart={() => setDragIdx(idx)}
                  onDragOver={(e) => { e.preventDefault(); setOverIdx(idx); }}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
                  className={`bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all border-2 ${
                    overIdx === idx && dragIdx !== idx ? "border-[#1B5E4B] scale-[1.02]" : "border-transparent"
                  } ${dragIdx === idx ? "opacity-50" : ""}`}>
                  <span className="text-gray-300 font-bold text-sm w-6 text-center flex-shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {m.initiale}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{m.nom}</p>
                    <p className="text-[#1B5E4B] text-xs font-medium">
                      Bénéficiaire {MOIS[idx] || `Tour ${idx + 1}`}
                    </p>
                  </div>
                  <div className="flex-shrink-0 opacity-30 flex flex-col gap-1">
                    {[0,1,2].map(i => <div key={i} className="flex gap-1">{[0,1].map(j => <div key={j} className="w-1 h-1 rounded-full bg-gray-600" />)}</div>)}
                  </div>
                </div>
              ))}

              {!showAll && restants > 0 && (
                <button onClick={() => setShowAll(true)}
                  className="w-full flex items-center justify-center gap-2 py-3">
                  <div className="flex -space-x-2">
                    {membres.slice(3, 6).map((m, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${m.color} flex items-center justify-center text-white text-xs font-bold`}>{m.initiale}</div>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1B5E4B] flex items-center justify-center text-white text-xs font-bold">+{restants}</div>
                </button>
              )}
              {showAll && restants > 0 && (
                <button onClick={() => setShowAll(false)} className="w-full text-center text-[#1B5E4B] text-sm font-medium py-2">Réduire ↑</button>
              )}
            </div>
          </div>
        )}

        {methode === "aleatoire" && (
          <div className="bg-[#E8F5F0] rounded-2xl p-4 flex gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" stroke="#1B5E4B" strokeWidth="2" />
              <path d="M12 8v4M12 16h.01" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-[#1B5E4B] text-sm font-medium">
              Le système effectuera un tirage au sort équitable. Chaque membre reçoit la cagnotte une seule fois.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white rounded-2xl p-5 mt-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Pot {frequence === "hebdomadaire" ? "hebdo" : "mensuel"}</p>
            <p className="text-xl font-bold text-gray-900">{potMensuel.toLocaleString("fr-FR")} <span className="text-sm text-gray-400 font-normal">FCFA</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Durée du cycle</p>
            <p className="text-xl font-bold text-gray-900">{dureeCycle} <span className="text-sm text-gray-400 font-normal">{frequence === "hebdomadaire" ? "semaines" : "mois"}</span></p>
          </div>
        </div>
        <button onClick={handleCreer}
          className="w-full bg-[#1B5E4B] text-white rounded-2xl py-4 font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-[#2D7A63] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Créer la tontine
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