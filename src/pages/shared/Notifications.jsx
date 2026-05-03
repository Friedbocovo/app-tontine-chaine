import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../organisateur/AppLayout";

const demoNotifications = [
  {
    id: 1, groupe: "AUJOURD'HUI", heure: "10:45",
    type: "BENEFICIAIRE", titre: "Nouveau Bénéficiaire",
    message: "Mme. Adeyemi a été désignée comme bénéficiaire du cycle \"Hearth Alpha\" pour ce mois-ci.",
    lu: false, actionLabel: "Voir les détails", actionColor: "#F5A623",
  },
  {
    id: 2, groupe: "AUJOURD'HUI", heure: "08:12",
    type: "PAIEMENT", titre: "Paiement Confirmé",
    message: "Votre contribution de 50 000 FCFA pour le cycle de Juillet a été validée avec succès.",
    lu: false, actionLabel: null,
  },
  {
    id: 3, groupe: "HIER", heure: "16:30",
    type: "RAPPEL", titre: "Rappel de Paiement",
    message: "Le délai de contribution pour la Tontine \"Marché Dantokpa\" expire dans 24 heures.",
    lu: true, actionLabel: "Régler maintenant", actionColor: "#1B5E4B", urgent: true,
  },
  {
    id: 4, groupe: "HIER", heure: "11:15",
    type: "INFO", titre: "Mise à jour du Règlement",
    message: "Les conditions générales d'utilisation de TontineChain ont été mises à jour.",
    lu: true, actionLabel: null,
  },
  {
    id: 5, groupe: "CETTE SEMAINE", heure: "Lun 09:00",
    type: "PENALITE", titre: "Pénalité appliquée",
    message: "Une pénalité de 10% (5 000 FCFA) a été automatiquement appliquée à Jean Dossou pour retard de paiement.",
    lu: true, actionLabel: null,
  },
  {
    id: 6, groupe: "CETTE SEMAINE", heure: "Dim 14:30",
    type: "DECAISSEMENT", titre: "Cagnotte libérée !",
    message: "La cagnotte du Tour 4 (250 000 FCFA) a été automatiquement transférée à Amadou Diallo.",
    lu: true, actionLabel: null,
  },
];

const typeConfig = {
  BENEFICIAIRE: { icon: "🎉", bg: "bg-yellow-50", border: "border-yellow-200" },
  PAIEMENT: { icon: "✅", bg: "bg-green-50", border: "border-green-200" },
  RAPPEL: { icon: "⚠️", bg: "bg-red-50", border: "border-red-200" },
  INFO: { icon: "ℹ️", bg: "bg-gray-50", border: "border-gray-200" },
  PENALITE: { icon: "💸", bg: "bg-orange-50", border: "border-orange-200" },
  DECAISSEMENT: { icon: "💰", bg: "bg-green-50", border: "border-green-200" },
};

function groupBy(arr) {
  return arr.reduce((acc, item) => {
    if (!acc[item.groupe]) acc[item.groupe] = [];
    acc[item.groupe].push(item);
    return acc;
  }, {});
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(demoNotifications);

  const nbNonLues = notifications.filter(n => !n.lu).length;
  const grouped = groupBy(notifications);

  const marquerToutLu = () => {
    setNotifications(prev => prev.map(n => ({ ...n, lu: true })));
  };

  const marquerLu = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, lu: true } : n));
  };

  const content = (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
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
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-400 text-xs mt-0.5">
              Restez informé de l'activité de votre cercle de confiance.
            </p>
          </div>
        </div>

        {/* Badge + Tout lire */}
        <div className="flex items-center gap-2">
          {nbNonLues > 0 && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{nbNonLues}</span>
            </div>
          )}
          {nbNonLues > 0 && (
            <button
              onClick={marquerToutLu}
              className="text-xs text-green-700 font-semibold"
            >
              Tout lire
            </button>
          )}
        </div>
      </div>

      {/* Liste groupée */}
      <div className="flex flex-col gap-5">
        {Object.entries(grouped).map(([groupe, items]) => (
          <div key={groupe}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              {groupe}
            </p>
            <div className="flex flex-col gap-2">
              {items.map((notif) => {
                const config = typeConfig[notif.type];
                return (
                  <div
                    key={notif.id}
                    onClick={() => marquerLu(notif.id)}
                    className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 cursor-pointer transition-all ${
                      !notif.lu ? "border-green-500 bg-green-50" : "border-transparent"
                    } ${notif.urgent ? "border-red-400" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icône */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${config.bg}`}>
                        {config.icon}
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className={`font-bold text-sm ${!notif.lu ? "text-gray-900" : "text-gray-700"}`}>
                            {notif.titre}
                          </p>
                          <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                            {!notif.lu && (
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                            )}
                            <span className="text-xs text-gray-400">{notif.heure}</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{notif.message}</p>

                        {/* Action */}
                        {notif.actionLabel && (
                          <button
                            className="mt-2.5 px-4 py-2 rounded-xl text-white text-xs font-bold active:scale-95 transition-transform"
                            style={{ backgroundColor: notif.actionColor }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (notif.type === "RAPPEL") navigate("/membre/payer/1");
                              else if (notif.type === "BENEFICIAIRE") navigate("/membre/suivi/1");
                            }}
                          >
                            {notif.actionLabel} →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {nbNonLues === 0 && (
        <div className="flex flex-col items-center py-6 gap-3">
          <span className="text-4xl">✅</span>
          <p className="text-gray-400 text-sm font-medium">Toutes les notifications sont lues</p>
        </div>
      )}
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