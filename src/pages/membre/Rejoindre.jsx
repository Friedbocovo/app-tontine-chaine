import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "./AppLayout2";

// Démo tontine trouvée
const demoTontine = {
  nom: "Les Artisans de Cotonou",
  organisateur: "Moussa B.",
  membres: 12,
  maxMembres: 15,
  montant: 50000,
  frequence: "Mensuel",
  code: "A7Z334",
};

export default function Rejoindre() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["A", "7", "Z", "", "", ""]);
  const [tontine, setTontine] = useState(demoTontine); // null = pas trouvée
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const inputs = useRef([]);

  const handleCodeChange = (index, value) => {
    const val = value.toUpperCase().slice(-1);
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    setError("");

    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Recherche auto quand code complet
    if (newCode.filter(c => c).length === 6) {
      handleSearch(newCode.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSearch = (codeStr) => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      // Simulation — n'importe quel code de 6 caractères trouve la démo
      if (codeStr.length === 6) {
        setTontine(demoTontine);
      } else {
        setError("Code invalide. Vérifiez le code d'invitation.");
        setTontine(null);
      }
    }, 1000);
  };

  const handleScanQR = () => {
    setScanning(true);
    // Simulation scan QR
    setTimeout(() => {
      setScanning(false);
      setCode(["A", "7", "Z", "3", "3", "4"]);
      setTontine(demoTontine);
    }, 2000);
  };

  const handleRejoindre = () => {
    if (!tontine) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/membre");
    }, 1500);
  };

  const content = (
    <div className="flex flex-col gap-5">

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
          <h1 className="text-xl font-bold text-gray-900">Rejoindre une tontine</h1>
          <p className="text-gray-400 text-xs mt-0.5">
            Entrez le code d'invitation pour accéder au cercle de confiance.
          </p>
        </div>
      </div>

      {/* Code d'invitation */}
      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-4">
          Code d'invitation
        </p>

        {/* Cases du code */}
        <div className="flex justify-center gap-2 mb-4">
          {code.map((char, i) => (
            <div
              key={i}
              className={`w-12 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                char
                  ? "border-green-700 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <input
                ref={(el) => (inputs.current[i] = el)}
                type="text"
                maxLength={1}
                value={char}
                onChange={(e) => handleCodeChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-full h-full text-center text-lg font-bold text-green-800 bg-transparent outline-none uppercase"
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mb-3">{error}</p>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mb-3">
            <div className="w-5 h-5 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Séparateur */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 font-medium">OU</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Bouton QR */}
        <button
          onClick={handleScanQR}
          disabled={scanning}
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{ backgroundColor: "#F5A623" }}
        >
          {scanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Scan en cours...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="5" y="5" width="3" height="3" fill="white"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="16" y="5" width="3" height="3" fill="white"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="5" y="16" width="3" height="3" fill="white"/>
                <path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2h-2z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Scanner le QR code
            </>
          )}
        </button>
      </div>

      {/* Détails de la tontine trouvée */}
      {tontine && (
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Détails de la tontine
          </p>

          {/* Nom */}
          <h2 className="text-xl font-bold text-green-700 mb-4 leading-tight">
            {tontine.nom}
          </h2>

          {/* Infos en grille */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Organisateur</p>
                <p className="text-sm font-semibold text-gray-800">{tontine.organisateur}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#9CA3AF" strokeWidth="2"/>
                  <circle cx="9" cy="7" r="4" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#9CA3AF" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Membres</p>
                <p className="text-sm font-semibold text-gray-800">
                  {tontine.membres} / {tontine.maxMembres}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="3" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M2 10h20" stroke="#9CA3AF" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Montant</p>
                <p className="text-sm font-semibold text-gray-800">
                  {tontine.montant.toLocaleString("fr-FR")} FCFA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#9CA3AF" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400">Fréquence</p>
                <p className="text-sm font-semibold text-gray-800">{tontine.frequence}</p>
              </div>
            </div>
          </div>

          {/* Places restantes */}
          <div className="bg-green-50 rounded-2xl p-3 mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-xs text-green-700 font-medium">Places disponibles</p>
              <p className="text-xs font-bold text-green-700">
                {tontine.maxMembres - tontine.membres} restantes
              </p>
            </div>
            <div className="w-full bg-green-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-green-600"
                style={{ width: `${(tontine.membres / tontine.maxMembres) * 100}%` }}
              />
            </div>
          </div>

          {/* Boutons */}
          <button
            onClick={handleRejoindre}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform mb-3 shadow-lg"
            style={{ backgroundColor: "#1B5E4B" }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Rejoindre la tontine →</>
            )}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-2xl text-gray-500 font-semibold text-sm"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Info sécurité */}
      <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-lg flex-shrink-0">🔒</span>
        <p className="text-xs text-green-700 leading-relaxed">
          En rejoignant cette tontine, vous acceptez les règles définies par l'organisateur. Ces règles sont immuables et enregistrées sur la blockchain.
        </p>
      </div>
    </div>
  );

  return (
    <AppLayout>
      {/* Mobile */}
      <div className="md:hidden px-4 pt-6 pb-10 min-h-screen" style={{ backgroundColor: "#F5F2ED" }}>
        {content}
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="max-w-lg mx-auto">
          {content}
        </div>
      </div>
    </AppLayout>
  );
}