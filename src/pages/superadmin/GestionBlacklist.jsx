import { useState } from "react";
import { Ban, Unlock } from "lucide-react";

const blacklistData = [
  { id: 1, nom: "Kofi Adeoti",   tel: "+229 97 11 22 33", dette: "45 000",  motif: "Non-paiement J4+",   depuis: "03/05/2026" },
  { id: 2, nom: "Senan Houeto",  tel: "+229 96 44 55 66", dette: "120 000", motif: "Fraude organisateur", depuis: "28/04/2026" },
  { id: 3, nom: "Akouvi Dossa",  tel: "+229 95 77 88 99", dette: "60 000",  motif: "Non-paiement J4+",   depuis: "15/04/2026" },
];

export default function GestionBlacklist() {
  const [data, setData] = useState(blacklistData);

  const leverBlacklist = (id) => {
    if (window.confirm("Confirmer la levée de blacklist ?"))
      setData(d => d.filter(x => x.id !== id));
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blacklist globale</h2>
        <p className="text-gray-500 mt-1">{data.length} membre(s) blacklisté(s) sur la plateforme</p>
      </div>

      <div className="space-y-4">
        {data.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Ban size={24} className="text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{member.nom}</p>
                <p className="text-sm text-gray-500">{member.tel}</p>
                <p className="text-xs text-red-500 mt-0.5">{member.motif} — depuis le {member.depuis}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Dette : {member.dette} FCFA</p>
              <button
                onClick={() => leverBlacklist(member.id)}
                className="mt-2 flex items-center gap-1 text-xs bg-[#1B5E4B] text-white px-4 py-2 rounded-lg hover:bg-[#164a3b] transition"
              >
                <Unlock size={14} /> Lever blacklist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}