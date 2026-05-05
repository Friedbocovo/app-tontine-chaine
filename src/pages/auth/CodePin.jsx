import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CodePin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState([]);
  const [step, setStep] = useState("create"); // "create" | "confirm"
  const [firstPin, setFirstPin] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const keys = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "👁", value: "FP" },
    { label: "0", value: "0" },
    { label: "⌫", value: "DEL" },
  ];

  const handleKey = (value) => {
    if (value === "FP") return; // Biométrie — ignorée pour l'instant

    if (value === "DEL") {
      setPin((prev) => prev.slice(0, -1));
      setError("");
      return;
    }

    if (pin.length >= 6) return;

    const newPin = [...pin, value];
    setPin(newPin);
    setError("");

    if (newPin.length === 6) {
      setTimeout(() => handleComplete(newPin), 300);
    }
  };

  const handleComplete = (completedPin) => {
    if (step === "create") {
      setFirstPin(completedPin);
      setStep("confirm");
      setPin([]);
    } else {
      if (completedPin.join("") === firstPin.join("")) {
        setLoading(true);
        localStorage.setItem("pin", completedPin.join(""));
        setTimeout(() => {
          setLoading(false);
          navigate("/kyc");
        }, 1000);
      } else {
        setError("Les codes PIN ne correspondent pas. Recommencez.");
        setPin([]);
        setStep("create");
        setFirstPin([]);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-start justify-center md:py-8"
      translate="no"
    >
      <div className="w-full flex-1 max-w-md bg-white min-h-screen md:min-h-0 md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center px-6 pt-8 pb-4 flex-1">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <span className="text-gray-600">←</span>
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 flex flex-col px-6 pt-4">

          {/* Barre progression */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Créer mon compte
            </h1>
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
            <p className="text-gray-400 text-sm">
              {step === "create"
                ? "Ce code sécurise vos transactions"
                : "Ressaisissez votre PIN pour confirmer"}
            </p>
          </div>

          {/* Points PIN — suppressHydrationWarning sur chaque div */}
          <div
            className="flex justify-center gap-4 mb-4"
            suppressHydrationWarning
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                suppressHydrationWarning
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  i < pin.length
                    ? "bg-green-700 scale-110"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Erreur */}
          {error && (
            <p className="text-red-400 text-xs text-center mb-4">{error}</p>
          )}

          {/* Badge sécurité */}
          <div className="flex justify-center mb-6">
            <div
              className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2"
              suppressHydrationWarning
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 6v6c0 5 4 9.7 8 11 4-1.3 8-6 8-11V6l-8-4z" fill="#1B5E4B"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xs text-gray-500">
                Votre PIN ne sera jamais partagé
              </span>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center mb-6">
              <div className="w-8 h-8 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Clavier numérique — translate="no" + type="button" */}
        <div className="px-8 pb-10" translate="no">
          <div className="grid grid-cols-3 gap-4">
            {keys.map((key, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleKey(key.value)}
                className={`h-16 rounded-2xl flex items-center justify-center transition-all active:scale-90 select-none ${
                  key.value === "DEL"
                    ? "bg-gray-100 text-gray-600 active:bg-gray-200"
                    : key.value === "FP"
                    ? "bg-gray-50 text-gray-400"
                    : "bg-gray-100 text-gray-800 active:bg-gray-200"
                }`}
              >
                <span className="text-2xl font-semibold select-none">
                  {key.label}
                </span>
              </button>
            ))}
          </div>

          {/* Bouton valider */}
          <button
            type="button"
            onClick={() => pin.length === 6 && handleComplete(pin)}
            disabled={pin.length < 6 || loading}
            className={`w-full mt-6 py-4 rounded-2xl font-semibold text-white text-base flex items-center justify-center gap-2 transition-all active:scale-95 ${
              pin.length < 6 || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: "#1B5E4B" }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Valider le code PIN →</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}