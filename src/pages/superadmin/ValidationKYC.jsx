import { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const kycData = [
  { id: 1, nom: "Fatoumata Koffi",   tel: "+229 97 12 34 56", doc: "CNI",        soumisLe: "11/05/2026", statut: "en_attente" },
  { id: 2, nom: "Rodrigue Mensah",   tel: "+229 96 78 90 12", doc: "Passeport",  soumisLe: "10/05/2026", statut: "en_attente" },
  { id: 3, nom: "Adjoa Sossou",      tel: "+229 95 34 56 78", doc: "CIP",        soumisLe: "10/05/2026", statut: "valide"     },
  { id: 4, nom: "Dossou Agossou",    tel: "+229 94 90 12 34", doc: "CNI",        soumisLe: "09/05/2026", statut: "rejete"     },
];

const badge = { en_attente: "bg-yellow-100 text-yellow-700", valide: "bg-green-100 text-green-700", rejete: "bg-red-100 text-red-700" };
const label  = { en_attente: "En attente", valide: "Validé", rejete: "Rejeté" };

export default function ValidationKYC() {
  const [data, setData] = useState(kycData);

  const valider  = (id) => setData(d => d.map(x => x.id === id ? { ...x, statut: "valide"  } : x));
  const rejeter  = (id) => setData(d => d.map(x => x.id === id ? { ...x, statut: "rejete"  } : x));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Validation KYC</h2>
        <p className="text-gray-500 mt-1">Vérification des documents d'identité soumis</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              {["Nom", "Téléphone", "Document", "Soumis le", "Statut", "Actions"].map(h => (
                <th key={h} className="px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{row.nom}</td>
                <td className="px-6 py-4 text-gray-600">{row.tel}</td>
                <td className="px-6 py-4 text-gray-600">{row.doc}</td>
                <td className="px-6 py-4 text-gray-600">{row.soumisLe}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge[row.statut]}`}>
                    {label[row.statut]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {row.statut === "en_attente" ? (
                    <div className="flex gap-2">
                      <button onClick={() => valider(row.id)}
                        className="flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition">
                        <CheckCircle size={14} /> Valider
                      </button>
                      <button onClick={() => rejeter(row.id)}
                        className="flex items-center gap-1 text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition">
                        <XCircle size={14} /> Rejeter
                      </button>
                    </div>
                  ) : (
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                      <Eye size={14} /> Voir
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}