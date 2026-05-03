import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CodePin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState([]);
  const [step, setStep] = useState("create"); // "create" ou "confirm"
  const [firstPin, setFirstPin] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const keys = ["1","2","3","4","5","6","7","8","9","fingerprint","0","←"];

  const handleKey = (key) => {
    if (key === "fingerprint") return;

    if (key === "←") {
      setPin((prev) => prev.slice(0, -1));
      setError("");
      return;
    }

    if (pin.length >= 6) return;

    const newPin = [...pin, key];
    setPin(newPin);
    setError("");

    // Auto-valider quand 6 chiffres saisis
    if (newPin.length === 6) {
      setTimeout(() => handleComplete(newPin), 300);
    }
  };

  const handleComplete = (completedPin) => {
    if (step === "create") {
      // Première saisie → passer à la confirmation
      setFirstPin(completedPin);
      setStep("confirm");
      setPin([]);
    } else {
      // Confirmation → vérifier que les deux PIN sont identiques
      if (completedPin.join("") === firstPin.join("")) {
        setLoading(true);
        // Sauvegarder le PIN (hashé en production)
        localStorage.setItem("pin", completedPin.join(""));
        setTimeout(() => {
          setLoading(false);
          navigate("/kyc");
        }, 1000);
      } else {
        setError("Les codes PIN ne correspondent pas");
        setPin([]);
        setStep("create");
        setFirstPin([]);
      }
    }
  };

  return (
            <div className="md:flex md:flex-col justify-content items-center" style={{ backgroundColor: "#F5F2ED" }}>

    <div className="min-h-screen flex flex-col md:w-[500px] bg-white" style={{ backgroundColor: "#F5F2ED" }}>

      {/* Header */}
      <div className="flex items-center px-6 pt-8 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <span className="text-gray-600">←</span>
        </button>
      </div>

      {/* Contenu */}
      <div className="flex-1 flex flex-col px-6 pt-4">

        {/* Titre + barre progression */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer mon compte</h1>
          <div className="flex justify-between items-center mb-2 mt-4">
            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
              Étape 3 sur 3
            </span>
            <span className="text-xs text-gray-400">Code PIN</span>
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 flex-1 rounded-full bg-green-700" />
            <div className="h-1.5 flex-1 rounded-full bg-green-700" />
            <div className="h-1.5 flex-1 rounded-full bg-green-700" />
          </div>
        </div>

        {/* Titre central */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {step === "create" ? "Créez votre code PIN" : "Confirmez votre PIN"}
          </h2>
          <p className="text-gray-600 text-sm">
            {step === "create"
              ? "Ce code sécurise vos transactions"
              : "Ressaisissez votre PIN pour confirmer"}
          </p>
        </div>

        {/* Points PIN */}
        <div className="flex justify-center gap-4 mb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                i < pin.length
                  ? "bg-green-700 scale-110"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Erreur */}
        {error && (
          <p className="text-red-400 text-xs text-center mb-4">{error}</p>
        )}

        {/* Badge sécurité */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5 4 9.7 8 11 4-1.3 8-6 8-11V6l-8-4z" fill="#1B5E4B"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-xs text-gray-700">Votre PIN ne sera jamais partagé</span>
          </div>
        </div>

        {/* Spinner loading */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="w-8 h-8 border-3 border-green-700 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Clavier numérique */}
      <div className="px-8 pb-10">
        <div className="grid grid-cols-3 gap-4">
          {keys.map((key, i) => (
            <button
              key={i}
              onClick={() => handleKey(key)}
              className={`h-16 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
                key === ""
                  ? ""
                  : key === "←"
                  ? "bg-gray-200 text-gray-600"
                  : key === "fingerprint"
                  ? "bg-gray-100"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {key === "fingerprint" ? (
                // Icône empreinte digitale
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C7.03 1 3 5.03 3 10v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-4.97-4.03-9-9-9z" fill="#9CA3AF"/>
                  <path d="M12 5c-2.76 0-5 2.24-5 5v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-1.65 1.35-3 3-3s3 1.35 3 3v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-2.76-2.24-5-5-5z" fill="#9CA3AF"/>
                  <path d="M12 9c-1.1 0-2 .9-2 2v7c0 .55.45 1 1 1s1-.45 1-1v-7c0 0 0 0 0 0s.45 0 1 0v7c0 .55.45 1 1 1s1-.45 1-1v-7c0-1.1-.9-2-2-2z" fill="#9CA3AF"/>
                </svg>
              ) : key === "←" ? (
                <span className="text-xl">⌫</span>
              ) : (
                <span className="text-2xl font-semibold text-gray-800">{key}</span>
              )}
            </button>
          ))}
        </div>

        {/* Bouton valider */}
        <button
          onClick={() => pin.length === 6 && handleComplete(pin)}
          disabled={pin.length < 6 || loading}
          className={`w-full mt-6 py-4 rounded-2xl font-semibold text-white text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${
            pin.length < 6 ? "opacity-50" : ""
          }`}
          style={{ backgroundColor: "#1B5E4B" }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Valider le code PIN →
            </>
          )}
        </button>
      </div>
    </div>

    </div>
  );
}