import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Verification() {
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(59);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const inputs = useRef([]);

    // Récupérer le numéro de téléphone
    const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");
    const tel = inscription.telephone || "XX XX XX XX";

    // Countdown timer
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Chiffres uniquement

        const newCode = [...code];
        newCode[index] = value.slice(-1); // Un seul chiffre
        setCode(newCode);
        setError("");

        // Passer au champ suivant automatiquement
        if (value && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Revenir en arrière si on efface
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleValidate = () => {
        const fullCode = code.join("");
        if (fullCode.length < 4) {
            setError("Veuillez entrer le code complet");
            return;
        }

        setLoading(true);

        // Simulation vérification (en production → appel API)
        setTimeout(() => {
            setLoading(false);
            // Pour la démo : n'importe quel code à 4 chiffres fonctionne
            navigate("/code-pin");
        }, 1500);
    };

    const handleResend = () => {
        if (timer > 0) return;
        setTimer(59);
        setCode(["", "", "", ""]);
        setError("");
        inputs.current[0]?.focus();
    };

    // Clavier numérique personnalisé
    const handleKeyPress = (val) => {
        if (val === "←") {
            // Backspace
            const lastFilled = code.map((c, i) => (c ? i : -1)).filter((i) => i >= 0).pop();
            if (lastFilled !== undefined) {
                const newCode = [...code];
                newCode[lastFilled] = "";
                setCode(newCode);
                inputs.current[lastFilled]?.focus();
            }
            return;
        }

        const emptyIndex = code.findIndex((c) => c === "");
        if (emptyIndex === -1) return;

        const newCode = [...code];
        newCode[emptyIndex] = val;
        setCode(newCode);

        if (emptyIndex < 3) {
            inputs.current[emptyIndex + 1]?.focus();
        }
    };

    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "←"];

    return (
        <div className="md:flex md:flex-col justify-content items-center" style={{ backgroundColor: "#F5F2ED" }}>

            <div className="min-h-screen flex md:w-[600px] flex-col bg-white "style={{ backgroundColor: "#F5F2ED" }} >

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

                    {/* Titre */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer mon compte</h1>

                        {/* Barre de progression */}
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

                    {/* Cases de code */}
                    <div className="flex justify-center gap-4 mb-4">
                        {code.map((digit, i) => (
                            <div
                                key={i}
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${digit
                                        ? "border-green-700 bg-green-50"
                                        : "border-gray-200 bg-gray-50"
                                    }`}
                            >
                                {digit ? (
                                    <span className="text-2xl font-bold text-green-800">•</span>
                                ) : (
                                    <span className="text-gray-300 text-2xl">•</span>
                                )}
                                <input
                                    ref={(el) => (inputs.current[i] = el)}
                                    type="tel"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="sr-only"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Erreur */}
                    {error && (
                        <p className="text-red-400 text-xs text-center mb-4">{error}</p>
                    )}

                    {/* Timer renvoyer */}
                    <div className="flex justify-center mb-8">
                        {timer > 0 ? (
                            <p className="text-gray-400 text-sm flex items-center gap-1">
                                <span>⏱</span>
                                Renvoyer le code dans {timer}s
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
                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 mb-8">
                        <div className="flex gap-1">
                            <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-xs font-bold">M</div>
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-xs font-bold text-white">V</div>
                        </div>
                        <p className="text-xs text-gray-500 flex-1">
                            Vérification sécurisée via nos partenaires Mobile Money officiels au Bénin.
                        </p>
                    </div>

                    {/* Bouton valider */}
                    <button
                        onClick={handleValidate}
                        disabled={loading || code.join("").length < 4}
                        className={`w-full py-4 rounded-2xl font-semibold text-white  text-base flex items-center justify-center gap-2 transition-all ${code.join("").length < 4
                                ? "bg-gray-300"
                                : "active:scale-95"
                            }`}
                        style={{
                            backgroundColor: code.join("").length < 4 ? "#D1D5DB" : "#1B5E4B"
                        }}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>Valider →</>
                        )}
                    </button>
                </div>

                {/* Clavier numérique */}
                <div className="px-6 pb-8 mt-6">
                    <div className="grid grid-cols-3 gap-3">
                        {keys.map((key, i) => (
                            <button
                                key={i}
                                onClick={() => key && handleKeyPress(key)}
                                className={`h-14 rounded-2xl flex items-center justify-center text-xl font-semibold transition-all active:scale-95 ${key === ""
                                        ? ""
                                        : key === "←"
                                            ? "bg-gray-200 text-gray-600"
                                            : "bg-gray-200 text-gray-800 hover:bg-gray-400"
                                    }`}
                            >
                                {key}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}