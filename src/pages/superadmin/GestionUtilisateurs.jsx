import { useState } from "react";
import { Ban, CheckCircle, Search } from "lucide-react";

const usersData = [
  { id: 1, nom: "Fatoumata Koffi",  tel: "+229 97 12 34 56", role: "Membre",      kyc: "Validé",     statut: "Actif",       tontines: 3, score: 95 },
  { id: 2, nom: "Rodrigue Mensah",  tel: "+229 96 78 90 12", role: "Organisateur",kyc: "Validé",     statut: "Actif",       tontines: 5, score: 88 },
  { id: 3, nom: "Adjoa Sossou",     tel: "+229 95 34 56 78", role: "Membre",      kyc: "En attente", statut: "Actif",       tontines: 1, score: 72 },
  { id: 4, nom: "Dossou Agossou",   tel: "+229 94 90 12 34", role: "Membre",      kyc: "Rejeté",     statut: "Blacklisté",  tontines: 0, score: 10 },
  { id: 5, nom: "Akouvi Dossa",     tel: "+229 93 11 22 33", role: "Organisateur",kyc: "Validé",     statut: "Actif",       tontines: 2, score: 80 },
  { id: 6, nom: "Kofi Adeoti",      tel: "+229 97 44 55 66", role: "Membre",      kyc: "Validé",     statut: "Blacklisté",  tontines: 0, score: 5  },
];

const kycStyle = {
  "Validé":     "bg-green-100 text-green-700",
  "En attente": "bg-yellow-100 text-yellow-700",
  "Rejeté":     "bg-red-100 text-red-700",
};

const statutStyle = {
  "Actif":      "bg-blue-100 text-blue-700",
  "Blacklisté": "bg-red-100 text-red-700",
};

export default function GestionUtilisateurs() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(usersData);

  const filtered = users.filter(u =>
    u.nom.toLowerCase().includes(search.toLowerCase()) ||
    u.tel.includes(search)
  );

  const toggleBlacklist = (id) => {
    setUsers(u => u.map(x =>
      x.id === id
        ? { ...x, statut: x.statut === "Actif" ? "Blacklisté" : "Actif" }
        : x
    ));
  };

  return (
    <div className="p-8">
      {/* En-tête */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des utilisateurs</h2>
        <p className="text-gray-500 mt-1">{users.length} utilisateurs enregistrés sur la plateforme</p>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par nom ou téléphone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
        />
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              {["Nom", "Téléphone", "Rôle", "KYC", "Tontines", "Score", "Statut", "Action"].map(h => (
                <th key={h} className="px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{user.nom}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{user.tel}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    user.role === "Organisateur"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kycStyle[user.kyc]}`}>
                    {user.kyc}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm text-center">{user.tontines}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${user.score}%`,
                          backgroundColor: user.score > 70 ? "#1B5E4B" : user.score > 40 ? "#F5A623" : "#ef4444"
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{user.score}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statutStyle[user.statut]}`}>
                    {user.statut}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleBlacklist(user.id)}
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition ${
                      user.statut === "Actif"
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-green-50 text-green-600 hover:bg-green-100"
                    }`}
                  >
                    {user.statut === "Actif"
                      ? <><Ban size={13} /> Blacklister</>
                      : <><CheckCircle size={13} /> Réactiver</>
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            Aucun utilisateur trouvé pour « {search} »
          </div>
        )}
      </div>
    </div>
  );
}