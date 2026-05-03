import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../organisateur/AppLayout";

const demoProfile = {
  nom: "Fatou Dossou",
  telephone: "+229 97 00 00 00",
  ville: "Cotonou, Bénin",
  role: "Organisateur",
  kycStatut: "APPROUVE",
  scorefiabilite: 96,
  totalEpargne: 345000,
  tontinesCompletes: 3,
  comptesMobileMoney: [
    { id: "mtn", label: "MTN MoMo", numero: "+229 97 XX XX 01", defaut: true, color: "#F5A623", icon: "🟡" },
    { id: "moov", label: "Moov Money", numero: "+229 95 XX XX 02", defaut: false, color: "#3B82F6", icon: "🔵" },
  ],
  blackliste: false,
  detteRestante: 0,
};

function ScoreCircle({ score }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#1B5E4B" : score >= 50 ? "#F5A623" : "#D94F3D";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" className="-rotate-90">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={radius} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-bold text-gray-900">{score}%</p>
      </div>
    </div>
  );
}

export default function Profil() {
  const navigate = useNavigate();
  const [biometrie, setBiometrie] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState([]);
  const [section, setSection] = useState(null);

  const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");
  const nom = inscription.nom || demoProfile.nom;
  const telephone = inscription.telephone
    ? `+229 ${inscription.telephone}`
    : demoProfile.telephone;

  const scoreColor =
    demoProfile.scorefiabilite >= 80 ? "text-green-700" :
    demoProfile.scorefiabilite >= 50 ? "text-orange-500" : "text-red-500";

  const scoreLabel =
    demoProfile.scorefiabilite >= 80 ? "Excellent payeur" :
    demoProfile.scorefiabilite >= 50 ? "Payeur moyen" : "Payeur en risque";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/connexion");
  };

  const content = (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#1B5E4B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-base font-bold text-gray-900">Mon Profil</h1>
        <button className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center">
          🔔
        </button>
      </div>

      {/* Avatar + Infos */}
      <div className="bg-white rounded-3xl p-5 shadow-sm flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: "linear-gradient(135deg, #F97316, #DC2626)" }}
          >
            {nom.charAt(0)}
          </div>
          {/* Badge vérifié */}
          {demoProfile.kycStatut === "APPROUVE" && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 truncate">{nom}</h2>
          <p className="text-gray-400 text-sm">{telephone}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold">
              ● Organisateur
            </span>
          </div>
        </div>
      </div>

      {/* Score de fiabilité */}
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-700 mb-0.5">Mon score de fiabilité</p>
          <p className={`text-sm font-semibold ${scoreColor}`}>{scoreLabel}</p>
          <div className="flex gap-3 mt-3">
            {[
              { label: "Pénalités", value: "0", icon: "⚡" },
              { label: "Tours payés à temps", value: "12/12", icon: "✅" },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-xl px-3 py-2">
                <p className="text-xs text-gray-400">{stat.icon} {stat.label}</p>
                <p className="text-sm font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <ScoreCircle score={demoProfile.scorefiabilite} />
      </div>

      {/* Stats épargne */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">🐷</div>
          <div>
            <p className="text-xs text-gray-400">Total épargné</p>
            <p className="text-base font-bold text-green-700">
              {demoProfile.totalEpargne.toLocaleString("fr-FR")} CFA
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl flex-shrink-0">✓</div>
          <div>
            <p className="text-xs text-gray-400">Tontines complétées</p>
            <p className="text-base font-bold text-gray-900">{demoProfile.tontinesCompletes}</p>
          </div>
        </div>
      </div>

      {/* Alerte blacklist */}
      {demoProfile.blackliste && (
        <div className="bg-red-50 rounded-2xl p-4 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🚫</span>
            <div className="flex-1">
              <p className="font-bold text-red-700 text-sm">Compte blacklisté</p>
              <p className="text-xs text-red-500 mt-1">
                Vous avez une dette de {demoProfile.detteRestante.toLocaleString("fr-FR")} FCFA à rembourser.
              </p>
              <button
                onClick={() => navigate("/rembourser")}
                className="mt-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
              >
                Rembourser ma dette
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Sécurité */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
          🛡️ Sécurité
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">Code PIN</p>
            <button
              onClick={() => setShowPinModal(true)}
              className="text-xs text-green-700 font-bold"
            >
              Modifier
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">Biométrie</p>
            <button
              onClick={() => setBiometrie(!biometrie)}
              className={`w-12 h-6 rounded-full transition-all relative ${biometrie ? "bg-green-700" : "bg-gray-300"}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all ${biometrie ? "left-6" : "left-0.5"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">KYC</p>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              demoProfile.kycStatut === "APPROUVE"
                ? "bg-green-100 text-green-700"
                : demoProfile.kycStatut === "PENDING"
                ? "bg-orange-100 text-orange-600"
                : "bg-red-100 text-red-600"
            }`}>
              {demoProfile.kycStatut === "APPROUVE" ? "✓ Vérifié" :
               demoProfile.kycStatut === "PENDING" ? "En attente" : "Rejeté"}
            </span>
          </div>
        </div>
      </div>

      {/* À propos */}
      <div
        className="rounded-2xl p-5 text-white"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="font-bold text-white text-sm">À propos</p>
        </div>
        <p className="text-green-200 text-xs leading-relaxed mb-3">
          Vos fonds sont sécurisés par la technologie blockchain. Chaque transaction est transparente, immuable et vérifiable par tous les membres de la tontine.
        </p>
        <button className="px-4 py-2 bg-white bg-opacity-20 rounded-xl text-white text-xs font-semibold">
          En savoir plus
        </button>
      </div>

      {/* Aide & Support */}
      <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 w-full text-left">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0">❓</div>
        <p className="font-semibold text-gray-800 text-sm flex-1">Aide & Support</p>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Déconnexion */}
      <button
        onClick={handleLogout}
        className="bg-red-50 rounded-2xl p-4 flex items-center gap-3 w-full text-left"
      >
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-xl flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="#D94F3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-semibold text-red-500 text-sm flex-1">Se déconnecter</p>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#D94F3D" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Version */}
      <p className="text-center text-xs text-gray-300 pb-2">
        VERSION 2.4.0 · SOVEREIGN HEARTH BÉNIN
      </p>
    </div>
  );

  return (
    <AppLayout>
      <div className="md:hidden px-4 pt-6 pb-10 min-h-screen" style={{ backgroundColor: "#F5F2ED" }}>
        {content}
      </div>
      <div className="hidden md:block">
        <div className="max-w-2xl">{content}</div>
      </div>
    </AppLayout>
  );
}