// ================================
// Demo.jsx — Démo live TontineChain
// Scénario complet pour la demi-finale
// ================================

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ================================
// DONNÉES SIMULÉES
// ================================
const MEMBRES_INITIAUX = [
  { id: 1, nom: "Fatou Diallo",    tel: "+229 97 11 22 33", avatar: "FD", couleur: "#1B5E4B", aPaye: false, retard: 0, aRecu: false, exclu: false, penalites: 0 },
  { id: 2, nom: "Kouassi Mensah",  tel: "+229 96 44 55 66", avatar: "KM", couleur: "#F5A623", aPaye: false, retard: 0, aRecu: false, exclu: false, penalites: 0 },
  { id: 3, nom: "Amara Traoré",    tel: "+229 95 77 88 99", avatar: "AT", couleur: "#3B82F6", aPaye: false, retard: 0, aRecu: false, exclu: false, penalites: 0 },
  { id: 4, nom: "Marie Ahounou",   tel: "+229 94 22 33 44", avatar: "MA", couleur: "#8B5CF6", aPaye: false, retard: 0, aRecu: false, exclu: false, penalites: 0 },
  { id: 5, nom: "Koffi Akakpo",    tel: "+229 93 55 66 77", avatar: "KA", couleur: "#EF4444", aPaye: false, retard: 3, aRecu: false, exclu: false, penalites: 1 }, // ← Le problème
];

const TONTINE = {
  nom: "Les Artisans de Cotonou",
  cotisation: 50000,
  frequence: "Mensuel",
  tourActuel: 3,
  totalTours: 5,
  beneficiaire: "Amara Traoré",
  codeInvitation: "TC-A7Z334",
};

const LOGS_INITIAUX = [
  { id: 1, type: "info",    msg: "🚀 Tontine \"Les Artisans de Cotonou\" créée sur Polygon", time: "09:00", tx: "0x1a2b...3c4d" },
  { id: 2, type: "success", msg: "✅ Tour 1 — Fatou Diallo a reçu 250 000 FCFA", time: "10:15", tx: "0x2b3c...4d5e" },
  { id: 3, type: "success", msg: "✅ Tour 2 — Kouassi Mensah a reçu 250 000 FCFA", time: "11:30", tx: "0x3c4d...5e6f" },
  { id: 4, type: "warning", msg: "⚠️ Tour 3 — Koffi Akakpo : 3 jours de retard (Pénalité 10% appliquée)", time: "14:00", tx: "0x4d5e...6f7a" },
];

// ================================
// COMPOSANTS UTILITAIRES
// ================================
const Badge = ({ type, label }) => {
  const styles = {
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-orange-100 text-orange-700 border border-orange-200",
    danger:  "bg-red-100 text-red-700 border border-red-200",
    info:    "bg-blue-100 text-blue-700 border border-blue-200",
    gray:    "bg-gray-100 text-gray-600 border border-gray-200",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[type] || styles.gray}`}>
      {label}
    </span>
  );
};

const Avatar = ({ initiales, couleur, size = "md" }) => {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: couleur }}>
      {initiales}
    </div>
  );
};

const LogLine = ({ log }) => {
  const colors = {
    success: "border-l-green-500 bg-green-50",
    warning: "border-l-orange-500 bg-orange-50",
    danger:  "border-l-red-500 bg-red-50",
    info:    "border-l-blue-500 bg-blue-50",
  };
  return (
    <div className={`border-l-4 px-3 py-2 rounded-r-lg ${colors[log.type] || colors.info}`}>
      <p className="text-xs text-gray-800 font-medium">{log.msg}</p>
      <div className="flex gap-3 mt-1">
        <span className="text-xs text-gray-400">{log.time}</span>
        {log.tx && (
          <span className="text-xs text-gray-400 font-mono">Tx: {log.tx}</span>
        )}
      </div>
    </div>
  );
};

// ================================
// PAGE PRINCIPALE DÉMO
// ================================
export default function Demo() {
  const navigate = useNavigate();
  const logsRef = useRef(null);

  const [membres, setMembres] = useState(MEMBRES_INITIAUX);
  const [logs, setLogs] = useState(LOGS_INITIAUX);
  const [etape, setEtape] = useState(0); // 0=intro, 1=cotisations, 2=incident, 3=liberation, 4=fin
  const [enCours, setEnCours] = useState(false);
  const [cagnotte, setCagnotte] = useState(0);
  const [tourComplete, setTourComplete] = useState(false);
  const [showModal, setShowModal] = useState(null); // "incident" | "liberation" | "blacklist"
  const [compteur, setCompteur] = useState(null);
  const [autoMode, setAutoMode] = useState(false);
  const autoRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (log) => {
    setLogs(prev => [...prev, { id: Date.now(), time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }), ...log }]);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // ================================
  // ÉTAPE 1 — PAIEMENTS UN PAR UN
  // ================================
  const lancerPaiements = async () => {
    setEnCours(true);
    setEtape(1);
    let cagnotteActuelle = 0;

    const payeurs = membres.filter(m => m.id !== 5 && !m.exclu); // Koffi ne paie pas

    for (const m of payeurs) {
      await sleep(1200);
      setMembres(prev => prev.map(mb =>
        mb.id === m.id ? { ...mb, aPaye: true } : mb
      ));
      cagnotteActuelle += 50000;
      setCagnotte(cagnotteActuelle);
      addLog({
        type: "success",
        msg: `✅ ${m.nom} a payé 50 000 FCFA`,
        tx: `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`,
      });
    }

    // Koffi ne paie pas → incident automatique
    await sleep(1500);
    setEtape(2);
    setShowModal("incident");
    setEnCours(false);
  };

  // ================================
  // ÉTAPE 2 — GÉRER L'INCIDENT
  // ================================
  const gererIncident = async (action) => {
    setShowModal(null);
    setEnCours(true);

    if (action === "penalite") {
      // Pénalité 10% automatique
      const penalite = 5000;
      addLog({ type: "warning", msg: `⚠️ Smart contract : Koffi Akakpo — Pénalité 10% (5 000 FCFA) appliquée automatiquement`, tx: `0x${Math.random().toString(16).slice(2,10)}` });
      setMembres(prev => prev.map(m => m.id === 5 ? { ...m, penalites: m.penalites + 1 } : m));
      await sleep(1000);
      addLog({ type: "info", msg: `🏦 5 000 FCFA versés à la caisse commune automatiquement` });

    } else if (action === "exclure") {
      // Exclusion automatique
      addLog({ type: "danger", msg: `❌ Smart contract : Koffi Akakpo exclu après 3 jours de retard`, tx: `0x${Math.random().toString(16).slice(2,10)}` });
      setMembres(prev => prev.map(m => m.id === 5 ? { ...m, exclu: true, aPaye: true } : m));
      await sleep(800);
      addLog({ type: "info", msg: `📋 Dette enregistrée sur blockchain : Koffi doit 100 000 FCFA (2 tours cotisés)` });
      await sleep(800);
      addLog({ type: "info", msg: `🔄 Remboursement prévu : Fatou (T4) et Kouassi (T5) rembourseront Koffi à la fin` });
      await sleep(800);
      setShowModal("blacklist");
      setEnCours(false);
      return;
    }

    await sleep(800);
    setEtape(3);
    lancerLiberation();
  };

  // ================================
  // ÉTAPE 3 — LIBÉRATION AUTOMATIQUE
  // ================================
  const lancerLiberation = async () => {
    setEnCours(true);
    addLog({ type: "info", msg: `🔍 Smart contract vérifie : tous les membres actifs ont payé ?` });
    await sleep(1200);
    addLog({ type: "success", msg: `✅ Vérification confirmée — Libération automatique déclenchée` });
    await sleep(1000);

    // Compte à rebours visuel
    for (let i = 3; i >= 1; i--) {
      setCompteur(i);
      await sleep(800);
    }
    setCompteur(null);

    addLog({
      type: "success",
      msg: `💰 250 000 FCFA libérés automatiquement → Amara Traoré (Tour 3/5)`,
      tx: `0x${Math.random().toString(16).slice(2,10)}`,
    });
    await sleep(500);
    setMembres(prev => prev.map(m => m.nom === "Amara Traoré" ? { ...m, aRecu: true } : m));
    setShowModal("liberation");
    setEtape(4);
    setTourComplete(true);
    setEnCours(false);
  };

  // ================================
  // MODE AUTO (démo complète en 1 clic)
  // ================================
  const lancerModeAuto = async () => {
    setAutoMode(true);
    await lancerPaiements();
  };

  const resetDemo = () => {
    setMembres(MEMBRES_INITIAUX);
    setLogs(LOGS_INITIAUX);
    setEtape(0);
    setEnCours(false);
    setCagnotte(0);
    setTourComplete(false);
    setShowModal(null);
    setCompteur(null);
    setAutoMode(false);
  };

  // ================================
  // RENDER
  // ================================
  const nbPayes = membres.filter(m => m.aPaye && !m.exclu).length;
  const totalActifs = membres.filter(m => !m.exclu).length;
  const progression = totalActifs > 0 ? (nbPayes / totalActifs) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ===== HEADER ===== */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition text-sm">← Retour</button>
          <div className="w-px h-4 bg-gray-700" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-white">Démo Live — TontineChain</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:block">Polygon Mumbai Testnet</span>
          <div className="bg-purple-900/50 border border-purple-700/50 text-purple-300 text-xs px-2 py-1 rounded-full">
            ⬡ Blockchain
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== COLONNE GAUCHE — Info tontine + membres ===== */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Carte tontine */}
          <div className="bg-gradient-to-br from-[#1B5E4B] to-[#0F3D2E] rounded-2xl p-5 border border-[#2D7A63]/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-green-300 text-xs font-medium mb-1">TONTINE ACTIVE — TOUR {TONTINE.tourActuel}/{TONTINE.totalTours}</p>
                <h2 className="text-white text-xl font-bold">{TONTINE.nom}</h2>
                <p className="text-green-300/70 text-sm">Code : {TONTINE.codeInvitation}</p>
              </div>
              <div className="bg-white/10 rounded-xl px-3 py-2 text-center">
                <p className="text-white/60 text-xs">Cotisation</p>
                <p className="text-white font-bold text-lg">50K</p>
                <p className="text-white/60 text-xs">FCFA</p>
              </div>
            </div>

            {/* Cagnotte */}
            <div className="bg-white/10 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Cagnotte collectée</span>
                <span className="text-white font-bold text-xl">
                  {cagnotte.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-[#F5A623] rounded-full h-2 transition-all duration-700"
                  style={{ width: `${progression}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-white/50 text-xs">{nbPayes}/{totalActifs} membres ont payé</span>
                <span className="text-white/50 text-xs">{Math.round(progression)}%</span>
              </div>
            </div>

            {/* Bénéficiaire du tour */}
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm">AT</div>
              <div>
                <p className="text-white/60 text-xs">Bénéficiaire du tour 3</p>
                <p className="text-white font-semibold">Amara Traoré</p>
              </div>
              {tourComplete && (
                <div className="ml-auto bg-green-500/20 border border-green-500/40 text-green-400 text-xs px-3 py-1 rounded-full font-semibold">
                  ✓ Reçu !
                </div>
              )}
            </div>
          </div>

          {/* Liste membres */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold">Membres — Tour 3</h3>
              <Badge type={tourComplete ? "success" : "info"} label={tourComplete ? "Tour complet ✓" : "En cours"} />
            </div>

            <div className="divide-y divide-gray-800">
              {membres.map(m => (
                <div key={m.id} className={`flex items-center gap-3 px-5 py-3 transition
                  ${m.exclu ? "opacity-50 bg-red-950/20" : ""}`}>
                  <Avatar initiales={m.avatar} couleur={m.couleur} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-medium text-sm">{m.nom}</p>
                      {m.exclu && <Badge type="danger" label="Exclu" />}
                      {m.aRecu && <Badge type="success" label="💰 Reçu" />}
                      {m.penalites > 0 && !m.exclu && <Badge type="warning" label={`⚠️ ${m.penalites} pénalité`} />}
                      {m.retard > 0 && !m.aPaye && !m.exclu && <Badge type="danger" label={`${m.retard}j retard`} />}
                    </div>
                    <p className="text-gray-500 text-xs">{m.tel}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {m.exclu ? (
                      <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center">
                        <span className="text-red-400 text-lg">✕</span>
                      </div>
                    ) : m.aPaye ? (
                      <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center">
                        <span className="text-green-400 text-lg">✓</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-orange-900/50 flex items-center justify-center animate-pulse">
                        <span className="text-orange-400 text-sm">⏱</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boutons de contrôle de la démo */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <h3 className="text-white font-semibold mb-1">Contrôles de la démo</h3>
            <p className="text-gray-500 text-xs mb-4">Simulez chaque étape du scénario en temps réel</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Étape 1 */}
              <button
                onClick={lancerPaiements}
                disabled={enCours || etape >= 1}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition
                  ${etape >= 1
                    ? "border-green-800 bg-green-950/30 opacity-60 cursor-not-allowed"
                    : "border-gray-700 bg-gray-800 hover:border-[#1B5E4B] hover:bg-[#1B5E4B]/10 active:scale-95"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                  ${etape >= 1 ? "bg-green-900/50" : "bg-gray-700"}`}>
                  {etape >= 1 ? "✓" : "💳"}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Étape 1 — Paiements</p>
                  <p className="text-gray-400 text-xs">4 membres paient, Koffi ne paie pas</p>
                </div>
              </button>

              {/* Étape 2 */}
              <button
                onClick={() => setShowModal("incident")}
                disabled={enCours || etape < 1 || etape >= 2}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition
                  ${etape >= 2
                    ? "border-orange-800 bg-orange-950/30 opacity-60 cursor-not-allowed"
                    : etape < 1
                    ? "border-gray-800 bg-gray-900 opacity-40 cursor-not-allowed"
                    : "border-orange-700 bg-orange-950/20 hover:border-orange-500 active:scale-95 animate-pulse"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                  ${etape >= 2 ? "bg-orange-900/50" : "bg-gray-700"}`}>
                  {etape >= 2 ? "✓" : "⚠️"}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Étape 2 — Incident</p>
                  <p className="text-gray-400 text-xs">Gérer le non-paiement de Koffi</p>
                </div>
              </button>

              {/* Étape 3 */}
              <button
                onClick={lancerLiberation}
                disabled={enCours || etape < 2 || etape >= 3}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition
                  ${etape >= 3
                    ? "border-green-800 bg-green-950/30 opacity-60 cursor-not-allowed"
                    : etape < 2
                    ? "border-gray-800 bg-gray-900 opacity-40 cursor-not-allowed"
                    : "border-[#1B5E4B] bg-[#1B5E4B]/10 hover:bg-[#1B5E4B]/20 active:scale-95"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                  ${etape >= 3 ? "bg-green-900/50" : "bg-gray-700"}`}>
                  {etape >= 3 ? "✓" : "🚀"}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Étape 3 — Libération</p>
                  <p className="text-gray-400 text-xs">Cagnotte libérée automatiquement</p>
                </div>
              </button>

              {/* Reset */}
              <button
                onClick={resetDemo}
                disabled={enCours}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-700 bg-gray-800
                  hover:border-gray-500 active:scale-95 transition text-left disabled:opacity-40"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center text-xl flex-shrink-0">
                  🔄
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Réinitialiser</p>
                  <p className="text-gray-400 text-xs">Recommencer la démo depuis le début</p>
                </div>
              </button>
            </div>

            {/* Bouton mode auto */}
            <button
              onClick={lancerModeAuto}
              disabled={enCours || etape > 0}
              className="mt-3 w-full bg-gradient-to-r from-[#1B5E4B] to-[#2D7A63] text-white py-3 rounded-xl
                font-semibold text-sm flex items-center justify-center gap-2
                hover:opacity-90 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {enCours
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Simulation en cours...</>
                : "⚡ Mode Auto — Démo complète"
              }
            </button>
          </div>
        </div>

        {/* ===== COLONNE DROITE — Journal blockchain ===== */}
        <div className="flex flex-col gap-4">

          {/* Étape active */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <p className="text-gray-400 text-xs font-medium mb-3">ÉTAPE ACTIVE</p>
            <div className="flex flex-col gap-2">
              {[
                { n: 1, label: "Collecte des cotisations", icon: "💳" },
                { n: 2, label: "Gestion de l'incident",   icon: "⚠️" },
                { n: 3, label: "Libération automatique",  icon: "🚀" },
                { n: 4, label: "Tour complété",           icon: "🎉" },
              ].map(e => (
                <div key={e.n} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition
                  ${etape === e.n ? "bg-[#1B5E4B]/20 border border-[#1B5E4B]/40"
                  : etape > e.n ? "opacity-50" : "opacity-30"}`}>
                  <span>{e.icon}</span>
                  <span className={`text-sm ${etape === e.n ? "text-white font-semibold" : "text-gray-400"}`}>
                    {e.label}
                  </span>
                  {etape > e.n && <span className="ml-auto text-green-400 text-xs">✓</span>}
                  {etape === e.n && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Journal blockchain */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 flex flex-col flex-1">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm">Journal Blockchain</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs">Live</span>
              </div>
            </div>
            <div
              ref={logsRef}
              className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 max-h-80 lg:max-h-96"
            >
              {logs.map(log => <LogLine key={log.id} log={log} />)}

              {enCours && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-950/30 border-l-4 border-l-blue-500 rounded-r-lg">
                  <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-blue-300">Smart contract en cours d'exécution...</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="border-t border-gray-800 px-4 py-3 grid grid-cols-3 gap-2">
              {[
                { label: "Transactions", val: logs.filter(l => l.tx).length },
                { label: "Membres actifs", val: membres.filter(m => !m.exclu).length },
                { label: "Tour", val: `${TONTINE.tourActuel}/${TONTINE.totalTours}` },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-bold text-lg">{s.val}</p>
                  <p className="text-gray-500 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info contrat */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
            <p className="text-gray-400 text-xs font-medium mb-3">SMART CONTRACT</p>
            <div className="space-y-2">
              {[
                { label: "Réseau", val: "Polygon Mumbai" },
                { label: "Contrat", val: "0x1B5E...4B2A" },
                { label: "Standard", val: "ERC-4337" },
                { label: "Oracle", val: "Chainlink VRF" },
              ].map(i => (
                <div key={i.label} className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">{i.label}</span>
                  <span className="text-gray-300 text-xs font-mono">{i.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL INCIDENT ===== */}
      {showModal === "incident" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl border border-gray-700 p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-full bg-orange-900/50 flex items-center justify-center text-3xl mx-auto mb-3">
                ⚠️
              </div>
              <h2 className="text-white text-xl font-bold">Incident détecté</h2>
              <p className="text-gray-400 text-sm mt-1">
                Koffi Akakpo n'a pas payé sa cotisation depuis <strong className="text-orange-400">3 jours</strong>
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cotisation due</span>
                <span className="text-white font-semibold">50 000 FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pénalité (10%)</span>
                <span className="text-orange-400 font-semibold">+ 5 000 FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Statut</span>
                <span className="text-red-400 font-semibold">N'a PAS encore reçu sa cagnotte</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between text-sm">
                <span className="text-gray-400">Règle appliquée</span>
                <span className="text-white font-semibold">CAS 2 — Exclusion au J3</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs text-center mb-4">
              Le smart contract applique automatiquement les règles définies à la création
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => gererIncident("penalite")}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold text-sm transition active:scale-95"
              >
                ⚠️ Appliquer pénalité 10% (continuer)
              </button>
              <button
                onClick={() => gererIncident("exclure")}
                className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-sm transition active:scale-95"
              >
                ❌ Exclure Koffi (CAS 2 — J3)
              </button>
              <button
                onClick={() => setShowModal(null)}
                className="w-full bg-gray-800 text-gray-300 py-3 rounded-xl font-medium text-sm transition hover:bg-gray-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL LIBÉRATION ===== */}
      {showModal === "liberation" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl border border-green-800/50 p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-20 h-20 rounded-full bg-green-900/50 border-2 border-green-500/50 flex items-center justify-center text-4xl mx-auto mb-3 animate-bounce">
                🎉
              </div>
              <h2 className="text-white text-2xl font-bold">Cagnotte libérée !</h2>
              <p className="text-green-400 text-sm mt-1">Automatiquement par le smart contract</p>
            </div>

            <div className="bg-green-950/30 border border-green-800/50 rounded-2xl p-4 mb-5 text-center">
              <p className="text-green-300 text-sm mb-1">Amara Traoré a reçu</p>
              <p className="text-white text-4xl font-bold">250 000</p>
              <p className="text-green-300 text-lg">FCFA</p>
              <p className="text-gray-500 text-xs mt-2 font-mono">
                Tx: 0x{Math.random().toString(16).slice(2, 18)}
              </p>
            </div>

            <div className="space-y-2 mb-5">
              {[
                "✅ Règles respectées automatiquement",
                "✅ Aucune intervention humaine nécessaire",
                "✅ Transaction immuable sur la blockchain",
                "✅ Tour 4 commence automatiquement",
              ].map(t => (
                <p key={t} className="text-gray-300 text-sm flex items-center gap-2">{t}</p>
              ))}
            </div>

            <button
              onClick={() => setShowModal(null)}
              className="w-full bg-[#1B5E4B] hover:bg-[#2D7A63] text-white py-3 rounded-xl font-semibold transition active:scale-95"
            >
              Parfait ! Continuer
            </button>
          </div>
        </div>
      )}

      {/* ===== MODAL BLACKLIST ===== */}
      {showModal === "blacklist" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl border border-red-800/50 p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center text-3xl mx-auto mb-3">
                🚫
              </div>
              <h2 className="text-white text-xl font-bold">Membre exclu & blacklisté</h2>
              <p className="text-gray-400 text-sm mt-1">Enregistré automatiquement sur la blockchain</p>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { icon: "📋", label: "Dette enregistrée", val: "100 000 FCFA" },
                { icon: "🔒", label: "Statut", val: "Blacklisté" },
                { icon: "⛔", label: "Nouvelles tontines", val: "Bloqué" },
                { icon: "🔄", label: "Pour lever la blacklist", val: "Rembourser la dette" },
              ].map(i => (
                <div key={i.label} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-2">
                  <span className="text-gray-400 text-sm">{i.icon} {i.label}</span>
                  <span className="text-white text-sm font-semibold">{i.val}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-950/30 border border-blue-800/40 rounded-xl p-3 mb-4">
              <p className="text-blue-300 text-xs text-center">
                Fatou Diallo et Kouassi Mensah rembourseront Koffi à la fin de la tontine selon l'ordre de réception
              </p>
            </div>

            <button
              onClick={() => { setShowModal(null); setEtape(3); lancerLiberation(); }}
              className="w-full bg-[#1B5E4B] text-white py-3 rounded-xl font-semibold transition active:scale-95"
            >
              Continuer → Libération de la cagnotte
            </button>
          </div>
        </div>
      )}

      {/* ===== COMPTE À REBOURS ===== */}
      {compteur !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">Libération dans...</p>
            <div className="text-9xl font-bold text-[#1B5E4B] animate-ping-once">
              {compteur}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}