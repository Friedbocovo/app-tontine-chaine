import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Users, Wallet, AlertTriangle, Ban, TrendingUp, CheckCircle } from "lucide-react";

// --- Données des graphiques ---

const volumeMensuel = [
  { mois: "Déc",  volume: 280 },
  { mois: "Jan",  volume: 320 },
  { mois: "Fév",  volume: 295 },
  { mois: "Mar",  volume: 410 },
  { mois: "Avr",  volume: 380 },
  { mois: "Mai",  volume: 487 },
];

const incidentsParMois = [
  { mois: "Déc",  incidents: 8  },
  { mois: "Jan",  incidents: 14 },
  { mois: "Fév",  incidents: 10 },
  { mois: "Mar",  incidents: 19 },
  { mois: "Avr",  incidents: 15 },
  { mois: "Mai",  incidents: 23 },
];

const repartitionKYC = [
  { name: "Validés",     value: 1180, color: "#1B5E4B" },
  { name: "En attente",  value: 47,   color: "#F5A623" },
  { name: "Rejetés",     value: 57,   color: "#ef4444" },
];

const statsCards = [
  { label: "Membres actifs",      value: "1 284",        icon: <Users size={22} />,        color: "bg-blue-50 text-blue-600"    },
  { label: "Volume total (M FCFA)",value: "487,2M",       icon: <Wallet size={22} />,       color: "bg-green-50 text-green-600"  },
  { label: "Tontines actives",    value: "312",           icon: <TrendingUp size={22} />,   color: "bg-purple-50 text-purple-600"},
  { label: "KYC en attente",      value: "47",            icon: <CheckCircle size={22} />,  color: "bg-yellow-50 text-yellow-600"},
  { label: "Incidents ce mois",   value: "23",            icon: <AlertTriangle size={22} />,color: "bg-red-50 text-red-600"      },
  { label: "Membres blacklistés", value: "18",            icon: <Ban size={22} />,          color: "bg-gray-50 text-gray-600"    },
];

// Tooltip personnalisé pour le volume
const TooltipVolume = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-[#1B5E4B] font-bold">{payload[0].value}M FCFA</p>
      </div>
    );
  }
  return null;
};

// Tooltip personnalisé pour les incidents
const TooltipIncidents = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-3 text-sm">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-red-500 font-bold">{payload[0].value} incidents</p>
      </div>
    );
  }
  return null;
};

export default function DashboardAdmin() {
  return (
    <div className="p-8 space-y-8">

      {/* En-tête */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 mt-1">Vue d'ensemble de la plateforme TontineChain</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-3 gap-5">
        {statsCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques ligne 1 : Volume + Incidents */}
      <div className="grid grid-cols-2 gap-6">

        {/* Courbe volume FCFA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Volume mensuel</h3>
          <p className="text-xs text-gray-400 mb-5">En millions de FCFA — 6 derniers mois</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={volumeMensuel}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1B5E4B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1B5E4B" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipVolume />} />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#1B5E4B"
                strokeWidth={2.5}
                fill="url(#colorVolume)"
                dot={{ fill: "#1B5E4B", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Barres incidents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Incidents par mois</h3>
          <p className="text-xs text-gray-400 mb-5">Nombre d'incidents signalés — 6 derniers mois</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incidentsParMois} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TooltipIncidents />} />
              <Bar dataKey="incidents" fill="#ef4444" radius={[6, 6, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Graphique ligne 2 : KYC camembert + Activité récente */}
      <div className="grid grid-cols-2 gap-6">

        {/* Camembert KYC */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Répartition KYC</h3>
          <p className="text-xs text-gray-400 mb-4">Sur {1180 + 47 + 57} demandes totales</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={180}>
              <PieChart>
                <Pie
                  data={repartitionKYC}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {repartitionKYC.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} demandes`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {repartitionKYC.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.value} demandes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {[
              { type: "KYC",       message: "Nouveau KYC soumis — Fatoumata K.",  time: "Il y a 5 min",  dot: "bg-yellow-400" },
              { type: "INCIDENT",  message: "Non-paiement J4 — Tontine Akpakpa", time: "Il y a 12 min", dot: "bg-red-400"    },
              { type: "KYC",       message: "KYC validé — Rodrigue M.",           time: "Il y a 28 min", dot: "bg-green-400"  },
              { type: "BLACKLIST", message: "Membre blacklisté — 0022963****",    time: "Il y a 1h",     dot: "bg-gray-400"   },
              { type: "TONTINE",  message: "Nouvelle tontine — Groupe Zongo",     time: "Il y a 2h",     dot: "bg-blue-400"   },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{item.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}