import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout2";

const demoTontine = {
  id: 1,
  nom: "Tontine des Entrepreneurs",
  montantDu: 5000,
  dateLimit: "20 Jan 2026",
  statut: "EN_ATTENTE",
  cycle: 12,
  participants: 12,
  tonTour: "Mars 2026",
  progression: { actuel: 4, total: 12 },
};

const methodesPaiement = [
  {
    id: "mtn",
    label: "MTN Mobile Money",
    icon: "🟡",
    bg: "#FFF9E6",
    border: "#F5A623",
    desc: "Paiement instantané",
  },
  {
    id: "moov",
    label: "Moov Money",
    icon: "🔵",
    bg: "#EFF6FF",
    border: "#3B82F6",
    desc: "Paiement instantané",
  },
];

export default function Paiement() {
  const navigate = useNavigate();
  const [methode, setMethode] = useState("mtn");
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handlePayer = () => {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/membre/paiement-confirme", {
        state: {
          montant: demoTontine.montantDu,
          tontine: demoTontine.nom,
          methode,
        },
      });
    }, 2000);
  };

  const content = (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
            🔔
          </button>
          <div className="w-9 h-9 rounded-full bg-orange-300 flex items-center justify-center text-white font-bold text-sm">F</div>
        </div>
      </div>

      {/* Carte montant dû */}
      <div className="bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gray-50" />
        <div className="absolute right-4 bottom-4 w-16 h-16 rounded-full bg-gray-50" />

        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">
          Montant dû
        </p>
        <p className="text-4xl font-bold text-gray-900 mb-4">
          {demoTontine.montantDu.toLocaleString("fr-FR")}{" "}
          <span className="text-xl text-gray-400 font-normal">FCFA</span>
        </p>

        <div className="flex gap-4">
          <div>
            <p className="text-xs text-gray-400">Date limite</p>
            <p className="text-sm font-bold text-gray-800">{demoTontine.dateLimit}</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-xs text-gray-400">Statut</p>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600">
              EN ATTENTE
            </span>
          </div>
        </div>
      </div>

      {/* Détails du cycle */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
          Détails du cycle
        </p>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#1B5E4B" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="#1B5E4B" strokeWidth="2"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#1B5E4B" strokeWidth="2"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">{demoTontine.nom}</p>
            <p className="text-gray-400 text-xs">Cycle de {demoTontine.cycle} mois</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Votre tour</p>
            <p className="text-sm font-bold text-green-700">{demoTontine.tonTour}</p>
          </div>
        </div>

        {/* Progression */}
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Progression du tour</span>
            <span>{demoTontine.progression.actuel}/{demoTontine.progression.total} participants</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${(demoTontine.progression.actuel / demoTontine.progression.total) * 100}%`,
                background: "linear-gradient(to right, #1B5E4B, #2D7A63)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Méthode de paiement */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
          Méthode de paiement
        </p>
        <div className="flex flex-col gap-2">
          {methodesPaiement.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethode(m.id)}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left"
              style={{
                backgroundColor: methode === m.id ? m.bg : "white",
                borderColor: methode === m.id ? m.border : "#F3F4F6",
              }}
            >
              {/* Icône Mobile Money */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                style={{ backgroundColor: m.bg }}
              >
                {m.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{m.label}</p>
                <p className="text-gray-400 text-xs">{m.desc}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: methode === m.id ? m.border : "#D1D5DB",
                  backgroundColor: methode === m.id ? m.border : "transparent",
                }}
              >
                {methode === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation */}
      {confirm && (
        <div className="bg-orange-50 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <div>
            <p className="font-bold text-gray-800 text-sm">Confirmer le paiement</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Vous êtes sur le point de payer{" "}
              <strong>{demoTontine.montantDu.toLocaleString("fr-FR")} FCFA</strong> via{" "}
              <strong>{methodesPaiement.find(m => m.id === methode)?.label}</strong>.
              Cette transaction sera enregistrée sur la blockchain et est irréversible.
            </p>
          </div>
        </div>
      )}

      {/* Bouton payer */}
      <button
        onClick={handlePayer}
        disabled={loading}
        className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="7" width="20" height="14" rx="3" stroke="white" strokeWidth="2"/>
              <path d="M2 11h20" stroke="white" strokeWidth="2"/>
              <path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="white"/>
            </svg>
            {confirm
              ? `Confirmer — ${demoTontine.montantDu.toLocaleString("fr-FR")} FCFA`
              : `Payer ${demoTontine.montantDu.toLocaleString("fr-FR")} FCFA`}
          </>
        )}
      </button>

      {/* Note sécurité */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        En cliquant, vous autorisez le prélèvement sur votre compte mobile money.
        Transaction sécurisée par TontineChain.
      </p>
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