import { useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout";

const demoTontines = [
  {
    id: 1,
    nom: "Marché Dantokpa — Grossistes",
    statut: "ACTIF",
    cycle: 30,
    membres: 15,
    progression: 80,
    avatars: ["F", "K", "A"],
    extras: 12,
  },
  {
    id: 2,
    nom: "Épargne Construction 2024",
    statut: "EN_ATTENTE",
    cycle: 12,
    membres: 8,
    progression: 35,
    avatars: ["M", "S"],
    extras: 6,
  },
];

const avatarColors = ["#1B5E4B", "#F5A623", "#D94F3D", "#3B82F6", "#8B5CF6"];

export default function DashboardOrganisateur() {
  const navigate = useNavigate();
  const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");
  const nomUtilisateur = inscription.nom || "Maman Fatou";

  return (
    <AppLayout showFab={true} fabAction={() => navigate("/organisateur/creer/regles")}>

      {/* ======================== */}
      {/* MOBILE                   */}
      {/* ======================== */}
      <div className="md:hidden px-4 pt-4 pb-4">
        <MobileContent navigate={navigate} nomUtilisateur={nomUtilisateur} />
      </div>

      {/* ======================== */}
      {/* DESKTOP                  */}
      {/* ======================== */}
      <div className="hidden md:block">
        {/* Header desktop */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bonjour, {nomUtilisateur.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">Voici l'état de vos tontines</p>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            🔔
          </button>
        </div>

        <DesktopContent navigate={navigate} />
      </div>

    </AppLayout>
  );
}

// ========================
// MOBILE CONTENT
// ========================
function MobileContent({ navigate, nomUtilisateur }) {
  return (
    <>
      {/* Carte verte */}
      <div
        className="rounded-3xl p-6 text-white relative overflow-hidden mb-3"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-5" />
        <div className="absolute -right-4 top-8 w-20 h-20 rounded-full bg-white opacity-5" />
        <p className="text-green-200 text-xs font-medium mb-1">Total collecté (FCFA)</p>
        <h1 className="text-3xl font-bold mb-3">2 450 000</h1>
        <span className="bg-green-600 text-green-100 text-xs px-3 py-1 rounded-full font-medium">
          +12% ce mois
        </span>
        <div className="absolute top-5 right-5 w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="3" stroke="white" strokeWidth="2" />
            <path d="M16 14a1 1 0 100-2 1 1 0 000 2z" fill="white" />
            <path d="M2 11h20" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <span className="text-lg">👥</span>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-400">Tontines actives</p>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <span className="text-lg">📅</span>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">24 Oct</p>
            <p className="text-xs text-gray-400">Prochaine collecte</p>
          </div>
        </div>
      </div>

      {/* Tontines */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-gray-900">Vos Tontines en cours</h2>
          <button className="text-green-700 text-sm font-semibold">Voir tout</button>
        </div>
        <div className="flex flex-col gap-3">
          {demoTontines.map((t) => (
            <TontineCard key={t.id} tontine={t} navigate={navigate} />
          ))}
        </div>
      </div>

      {/* Alerte */}
      <AlerteAction navigate={navigate} />

      {/* Utilisateur */}
      <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm mt-3">
        <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold">
          {nomUtilisateur.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{nomUtilisateur}</p>
          <p className="text-xs text-green-700 font-medium uppercase tracking-wide">Organisateur</p>
        </div>
      </div>
    </>
  );
}

// ========================
// DESKTOP CONTENT
// ========================
function DesktopContent({ navigate }) {
  return (
    <>
      {/* Stats 3 colonnes */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total collecté", value: "2 450 000", sub: "+12% ce mois", subColor: "text-green-600" },
          { label: "Tontines actives", value: "12", sub: "En cours", subColor: "text-gray-400" },
          { label: "Prochaine collecte", value: "24 Oct", sub: "Dans 3 jours", subColor: "text-gray-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className={`text-xs mt-1 font-medium ${stat.subColor}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Tontines grille */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Vos Tontines en cours</h2>
          <button className="text-green-700 text-sm font-semibold">Voir tout</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {demoTontines.map((t) => (
            <TontineCard key={t.id} tontine={t} navigate={navigate} />
          ))}
        </div>
      </div>

      {/* Alerte */}
      <AlerteAction navigate={navigate} />
    </>
  );
}

// ========================
// COMPOSANTS PARTAGÉS
// ========================
function TontineCard({ tontine, navigate }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 mr-3">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{tontine.nom}</h3>
          <p className="text-gray-400 text-xs mt-1">
            Cycle de {tontine.cycle} jours · {tontine.membres} participants
          </p>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
          tontine.statut === "ACTIF"
            ? "bg-green-100 text-green-700"
            : "bg-orange-100 text-orange-600"
        }`}>
          {tontine.statut === "ACTIF" ? "ACTIF" : "EN ATTENTE"}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-xs text-gray-400">Progression du cycle</p>
          <p className="text-xs font-bold text-gray-700">{tontine.progression}%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${tontine.progression}%`,
              background: tontine.statut === "ACTIF"
                ? "linear-gradient(to right, #1B5E4B, #2D7A63)"
                : "linear-gradient(to right, #F5A623, #F7C46A)",
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {tontine.avatars.map((initial, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white -ml-1 first:ml-0"
              style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
            >
              {initial}
            </div>
          ))}
          {tontine.extras > 0 && (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold border-2 border-white -ml-1">
              +{tontine.extras}
            </div>
          )}
        </div>
        <button
          onClick={() => navigate(`/organisateur/tontine/${tontine.id}`)}
          className="bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl active:scale-95 transition-transform"
        >
          Gérer
        </button>
      </div>
    </div>
  );
}

function AlerteAction({ navigate }) {
  return (
    <div className="bg-orange-50 rounded-2xl p-4 flex items-start gap-3 mt-3">
      <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
        <span className="text-orange-500 text-lg">⚡</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">Action requise</p>
        <p className="text-xs text-gray-500 mt-0.5">
          3 membres n'ont pas encore validé leur versement pour la tontine "Dantokpa".
        </p>
        <button
          onClick={() => navigate("/organisateur/incidents/1")}
          className="text-orange-500 text-xs font-semibold mt-2"
        >
          Relancer les membres →
        </button>
      </div>
    </div>
  );
}