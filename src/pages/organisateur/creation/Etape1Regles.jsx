import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout";

export default function Etape1Regles() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "", contribution: "", frequence: "mensuel",
    dateDebut: "", membresMax: 12, organisateurParticipe: true,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = "Le nom est requis";
    if (!form.contribution || Number(form.contribution) <= 0) e.contribution = "Montant invalide";
    if (!form.dateDebut) e.dateDebut = "Date requise";
    else if (new Date(form.dateDebut) <= new Date()) e.dateDebut = "La date doit être dans le futur";
    if (form.membresMax < 2) e.membresMax = "Minimum 2 membres";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    localStorage.setItem("tontine_etape1", JSON.stringify(form));
    navigate("/organisateur/creer/membres");
  };

  const potTotal = form.contribution && form.membresMax
    ? Number(form.contribution) * Number(form.membresMax) : 0;
  const formatCFA = (n) => n ? n.toLocaleString("fr-FR") + " FCFA" : "0 FCFA";

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
        <span className="md:hidden text-gray-500 text-sm font-medium"></span>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white font-bold text-sm md:hidden">K</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <p className="text-[#1B5E4B] text-sm font-semibold mb-1">Étape 1 sur 3</p>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Définir les règles</h2>
          <span className="text-[#1B5E4B] font-bold text-lg">33%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-[#1B5E4B] rounded-full" />
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Nom */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Nom de la tontine</label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm border-2 border-transparent focus-within:border-[#1B5E4B] transition-colors">
            <svg className="w-5 h-5 text-[#1B5E4B] mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Tontine des Mamans" value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm" />
          </div>
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
        </div>

        {/* Contribution */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Contribution (FCFA)</label>
          <div className="flex items-center bg-white rounded-2xl px-4 py-3 shadow-sm border-2 border-transparent focus-within:border-[#1B5E4B] transition-colors">
            <svg className="w-5 h-5 text-[#1B5E4B] mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input type="number" placeholder="50000" value={form.contribution}
              onChange={(e) => setForm({ ...form, contribution: e.target.value })}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Le montant que chaque membre versera à chaque tour.</p>
          {errors.contribution && <p className="text-red-500 text-xs mt-1">{errors.contribution}</p>}
        </div>

        {/* Fréquence */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Fréquence</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "hebdomadaire", label: "Hebdomadaire", icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <rect x="7" y="14" width="2" height="2" fill="currentColor" />
                  <rect x="11" y="14" width="2" height="2" fill="currentColor" />
                  <rect x="15" y="14" width="2" height="2" fill="currentColor" />
                </svg>
              )},
              { val: "mensuel", label: "Mensuel", icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 14h8M8 18h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )},
            ].map(({ val, label, icon }) => (
              <button key={val} onClick={() => setForm({ ...form, frequence: val })}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  form.frequence === val
                    ? "border-[#1B5E4B] bg-[#E8F5F0] text-[#1B5E4B]"
                    : "border-gray-200 bg-white text-gray-600"
                }`}>
                {icon}
                <span className="font-semibold text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date + Membres */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Date de début</label>
            <div className="bg-white rounded-2xl px-3 py-3 shadow-sm border-2 border-transparent focus-within:border-[#1B5E4B]">
              <input type="date" value={form.dateDebut}
                onChange={(e) => setForm({ ...form, dateDebut: e.target.value })}
                className="w-full bg-transparent outline-none text-gray-800 text-sm" />
            </div>
            {errors.dateDebut && <p className="text-red-500 text-xs mt-1">{errors.dateDebut}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Membres max.</label>
            <div className="bg-white rounded-2xl px-3 py-3 shadow-sm flex items-center gap-2">
              <button onClick={() => setForm({ ...form, membresMax: Math.max(2, form.membresMax - 1) })}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200">−</button>
              <span className="flex-1 text-center font-semibold text-gray-800 text-sm">{form.membresMax}</span>
              <button onClick={() => setForm({ ...form, membresMax: Math.min(50, form.membresMax + 1) })}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-200">+</button>
            </div>
          </div>
        </div>

        {/* Participe */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">Je participe à la tontine</p>
            <p className="text-xs text-gray-500 mt-0.5">Vous serez membre et devrez cotiser</p>
          </div>
          <button onClick={() => setForm({ ...form, organisateurParticipe: !form.organisateurParticipe })}
            className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${form.organisateurParticipe ? "bg-[#1B5E4B]" : "bg-gray-300"}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${form.organisateurParticipe ? "left-6" : "left-0.5"}`} />
          </button>
        </div>

        {/* Pot info */}
        {potTotal > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E8F5F0] flex items-center justify-center flex-shrink-0 font-bold text-[#1B5E4B] text-sm">i</div>
            <p className="text-sm text-gray-700">
              Avec <strong>{form.membresMax} membres</strong> versant <strong>{Number(form.contribution).toLocaleString("fr-FR")} FCFA</strong>{" "}
              chaque {form.frequence === "hebdomadaire" ? "semaine" : "mois"}, le pot total sera de{" "}
              <strong className="text-[#1B5E4B]">{formatCFA(potTotal)}</strong> par tour.
            </p>
          </div>
        )}

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