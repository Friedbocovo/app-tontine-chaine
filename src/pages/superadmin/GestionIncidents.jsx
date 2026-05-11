import { AlertTriangle, ExternalLink } from "lucide-react";

const incidents = [
  { id: 1, tontine: "Tontine Akpakpa",   membre: "Kofi Adeoti",   type: "Non-paiement J4+", txHash: "0xabc...123", date: "08/05/2026", statut: "Signalé DTC"  },
  { id: 2, tontine: "Tontine Zongo",     membre: "Senan Houeto",  type: "Fraude organisateur",txHash:"0xdef...456", date: "01/05/2026", statut: "En traitement"},
  { id: 3, tontine: "Groupe Cadjehoun",  membre: "Ama Lawson",    type: "Non-paiement J3",  txHash: "0xghi...789", date: "29/04/2026", statut: "Résolu"       },
];

const statutStyle = {
  "Signalé DTC":    "bg-red-100 text-red-700",
  "En traitement":  "bg-orange-100 text-orange-700",
  "Résolu":         "bg-green-100 text-green-700",
};

export default function GestionIncidents() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Incidents signalés</h2>
        <p className="text-gray-500 mt-1">Tous les incidents avec preuve blockchain immuable</p>
      </div>

      <div className="space-y-4">
        {incidents.map((inc) => (
          <div key={inc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{inc.tontine}</p>
                  <p className="text-sm text-gray-500">Membre : {inc.membre}</p>
                  <p className="text-sm text-red-500 mt-0.5">{inc.type}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {inc.txHash}
                    </span>
                    <button className="text-[#1B5E4B] hover:text-[#164a3b]">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statutStyle[inc.statut]}`}>
                  {inc.statut}
                </span>
                <p className="text-xs text-gray-400 mt-2">{inc.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}