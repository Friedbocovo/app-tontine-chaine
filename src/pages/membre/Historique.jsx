import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout2";

const demoHistorique = [
  {
    id: 1, type: "COTISATION", cycle: "Cycle 8",
    date: "12 Oct 2023", heure: "14:20",
    montant: 50000, statut: "VALIDE",
    txHash: "0x4f2b...8e12",
  },
  {
    id: 2, type: "COTISATION", cycle: "Cycle 9",
    date: "Hier", heure: "09:15",
    montant: 50000, statut: "EN_COURS",
    txHash: null,
  },
  {
    id: 3, type: "COTISATION", cycle: "Cycle 7",
    date: "12 Sep 2023", heure: "18:45",
    montant: 50000, statut: "VALIDE",
    txHash: "0x4f2b...8e12",
  },
  {
    id: 4, type: "COTISATION", cycle: "Cycle 6",
    date: "12 Août 2023", heure: "10:30",
    montant: 50000, statut: "VALIDE",
    txHash: "0x9a3c...1f45",
  },
  {
    id: 5, type: "RECEPTION", cycle: "Cycle 4",
    date: "12 Juin 2023", heure: "16:00",
    montant: 450000, statut: "VALIDE",
    txHash: "0x2d7e...9c01",
  },
  {
    id: 6, type: "PENALITE", cycle: "Cycle 3",
    date: "05 Mai 2023", heure: "08:15",
    montant: 5000, statut: "VALIDE",
    txHash: "0x5f1a...3b78",
  },
];

const statutConfig = {
  VALIDE: { label: "VALIDÉ", bg: "bg-green-100", text: "text-green-700" },
  EN_COURS: { label: "EN COURS", bg: "bg-orange-100", text: "text-orange-600" },
  ECHOUE: { label: "ÉCHOUÉ", bg: "bg-red-100", text: "text-red-600" },
};

const typeConfig = {
  COTISATION: { icon: "↑", bg: "bg-green-50", iconColor: "text-green-600", label: "Cotisation" },
  RECEPTION: { icon: "↓", bg: "bg-blue-50", iconColor: "text-blue-600", label: "Réception" },
  PENALITE: { icon: "!", bg: "bg-orange-50", iconColor: "text-orange-600", label: "Pénalité" },
};

const filtres = ["Tout", "Ce mois", "Cycle actuel", "Archivés"];
const onglets = ["Mes paiements", "Mes réceptions"];

export default function HistoriqueMembre() {
  const navigate = useNavigate();
  const [filtre, setFiltre] = useState("Tout");
  const [onglet, setOnglet] = useState("Mes paiements");
  const [expanded, setExpanded] = useState(null);

  const totalCotise = demoHistorique
    .filter(e => e.type === "COTISATION" && e.statut === "VALIDE")
    .reduce((sum, e) => sum + e.montant, 0);

  const filtered = demoHistorique.filter(e => {
    if (onglet === "Mes paiements") return e.type === "COTISATION" || e.type === "PENALITE";
    if (onglet === "Mes réceptions") return e.type === "RECEPTION";
    return true;
  });

  const content = (
    <div className="flex flex-col gap-4 px-4 pt-6 pb-10 md:px-0 md:pt-0 md:pb-0">

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
        <div>
          <h1 className="text-xl font-bold text-gray-900">Historique personnel</h1>
          <p className="text-gray-400 text-xs mt-0.5">
            Consultez l'ensemble de vos transactions blockchain sécurisées.
          </p>
        </div>
      </div>

      {/* Carte totale */}
      <div
        className="rounded-3xl p-5 text-white relative overflow-hidden"
        style={{ backgroundColor: "#1B5E4B" }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white opacity-5" />
        <p className="text-green-200 text-xs font-semibold uppercase tracking-wide mb-1">
          Total cotisé
        </p>
        <p className="text-3xl font-bold mb-3">
          {totalCotise.toLocaleString("fr-FR")} <span className="text-lg text-green-200">FCFA</span>
        </p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-3 py-1.5">
            <span className="text-xs font-bold text-white">
              ✓ {demoHistorique.filter(e => e.statut === "VALIDE").length} Paiements
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-3 py-1.5">
            <span className="text-xs font-bold text-white">
              ↓ {demoHistorique.filter(e => e.type === "RECEPTION").length} Réception
            </span>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex bg-gray-100 rounded-2xl p-1">
        {onglets.map((tab) => (
          <button
            key={tab}
            onClick={() => setOnglet(tab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              onglet === tab ? "bg-white text-green-700 shadow-sm" : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filtres.map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filtre === f
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-500 shadow-sm"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Liste transactions */}
      <div className="flex flex-col gap-2">
        {filtered.map((tx) => {
          const type = typeConfig[tx.type];
          const statut = statutConfig[tx.statut];
          const isExpanded = expanded === tx.id;

          return (
            <div
              key={tx.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
              onClick={() => setExpanded(isExpanded ? null : tx.id)}
            >
              <div className="flex items-center gap-3 p-4">
                {/* Icône type */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${type.bg} ${type.iconColor}`}>
                  {type.icon}
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{type.label} {tx.cycle}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{tx.date} · {tx.heure}</p>
                  {/* Hash si valide */}
                  {tx.txHash && !isExpanded && (
                    <p className="text-green-700 font-mono text-xs mt-0.5">{tx.txHash}</p>
                  )}
                </div>

                {/* Montant + statut */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <p className={`font-bold text-sm ${
                    tx.type === "RECEPTION" ? "text-blue-600" :
                    tx.type === "PENALITE" ? "text-orange-600" :
                    "text-gray-900"
                  }`}>
                    {tx.type === "COTISATION" || tx.type === "PENALITE" ? "−" : "+"}
                    {tx.montant.toLocaleString("fr-FR")} FCFA
                  </p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statut.bg} ${statut.text}`}>
                    {statut.label}
                  </span>
                </div>
              </div>

              {/* Détail expandable */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-50 flex flex-col gap-2">
                  {tx.txHash && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                      <span className="text-xs text-gray-400">🔗 Référence :</span>
                      <span className="text-xs text-green-700 font-mono font-bold flex-1">{tx.txHash}</span>
                      <button
                        className="text-xs text-gray-400 underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(tx.txHash);
                        }}
                      >
                        DÉTAILS ↗
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-xs text-gray-400">Type</p>
                      <p className="text-xs font-bold text-gray-800">{type.label}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-xs text-gray-400">Cycle</p>
                      <p className="text-xs font-bold text-gray-800">{tx.cycle}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Badge blockchain */}
      <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-xl">⛓️</span>
        <p className="text-xs text-green-700 font-medium leading-relaxed">
          Toutes vos transactions sont immuablement enregistrées sur la blockchain Polygon.
        </p>
      </div>
    </div>
  );

  return <AppLayout>{content}</AppLayout>;
}