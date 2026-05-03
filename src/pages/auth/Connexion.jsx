import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
  const navigate = useNavigate();
  const [telephone, setTelephone] = useState("");
  const [pin, setPin] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const keys = ["1","2","3","4","5","6","7","8","9","fingerprint","0","←"];

  const handleKey = (key) => {
    if (key === "fingerprint") {
      // Simulation biométrie
      handleBiometric();
      return;
    }
    if (key === "←") {
      setPin((prev) => prev.slice(0, -1));
      setError("");
      return;
    }
    if (pin.length >= 6) return;
    const newPin = [...pin, key];
    setPin(newPin);
    setError("");

    if (newPin.length === 6) {
      setTimeout(() => handleLogin(telephone, newPin.join("")), 300);
    }
  };

  const handleLogin = (tel, pinCode) => {
    if (!tel || tel.length < 8) {
      setError("Veuillez entrer votre numéro de téléphone");
      setPin([]);
      return;
    }

    setLoading(true);
    setError("");

    // Simulation connexion
    setTimeout(() => {
      setLoading(false);
      const savedPin = localStorage.getItem("pin");
      const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");

      if (pinCode === savedPin) {
        // Récupérer le rôle et rediriger
        const role = inscription.role || "membre";
        if (role === "organisateur") {
          navigate("/organisateur");
        } else {
          navigate("/membre");
        }
      } else {
        setError("Numéro ou code PIN incorrect");
        setPin([]);
      }
    }, 1500);
  };

  const handleBiometric = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const inscription = JSON.parse(localStorage.getItem("inscription") || "{}");
      const role = inscription.role || "membre";
      if (role === "organisateur") {
        navigate("/organisateur");
      } else {
        navigate("/membre");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen mt-[50px] flex flex-col bg-white">

      {/* Carte blanche arrondie */}
      <div className="flex-1 flex  flex-col bg-white rounded-t-3xl -mt-6 px-6 pt-8 pb-4 w-full max-w-md mx-auto">

        {/* Titre */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Bon retour,</h1>
          <p className="text-gray-400 text-sm">
            Veuillez vous authentifier pour accéder à vos cercles de confiance.
          </p>
        </div>

        {/* Numéro de téléphone */}
        <div className="mb-6">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
            Numéro de téléphone
          </label>
          <div className="flex items-center bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <div className="px-4 py-4 border-r border-gray-200">
              <span className="text-sm font-bold text-gray-700">+229</span>
            </div>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => {
                setTelephone(e.target.value.replace(/\D/g, "").slice(0, 8));
                setError("");
              }}
              placeholder="00 00 00 00"
              className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-800 text-sm"
            />
          </div>
        </div>

        {/* Code PIN */}
        <div className="mb-6">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">
            Code PIN de sécurité
          </label>
          <div className="flex justify-center gap-3 bg-gray-50 rounded-2xl py-4 border border-gray-100">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  i < pin.length ? "bg-green-700 scale-110" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <p className="text-red-400 text-xs text-center mb-4">{error}</p>
        )}

        {/* Bouton Se connecter */}
        <button
          onClick={() => handleLogin(telephone, pin.join(""))}
          disabled={loading || pin.length < 6}
          className={`w-full py-4 rounded-2xl font-semibold text-white text-base flex items-center justify-center gap-2 transition-all mb-6 ${
            pin.length < 6 ? "opacity-50" : "active:scale-95"
          }`}
          style={{ backgroundColor: "#1B5E4B" }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Se connecter"
          )}
        </button>

        {/* Biométrie */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <button
            onClick={handleBiometric}
            className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 1C7.03 1 3 5.03 3 10v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-4.97-4.03-9-9-9z" fill="#9CA3AF"/>
              <path d="M12 5c-2.76 0-5 2.24-5 5v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-1.65 1.35-3 3-3s3 1.35 3 3v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-2.76-2.24-5-5-5z" fill="#9CA3AF"/>
              <path d="M12 9c-1.1 0-2 .9-2 2v5c0 .55.45 1 1 1s1-.45 1-1v-5h1v5c0 .55.45 1 1 1s1-.45 1-1v-5c0-1.1-.9-2-2-2z" fill="#9CA3AF"/>
            </svg>
          </button>
          <p className="text-gray-400 text-sm">Connexion par empreinte digitale</p>
        </div>

        {/* PIN oublié */}
        <div className="text-center mb-6">
          <button className="text-yellow-600 font-semibold text-sm">
            PIN oublié ?
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400 uppercase tracking-widest">Sécurité bancaire héritage</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
      </div>

      {/* Clavier numérique */}
      <div className="px-8 pb-8 w-full max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {keys.map((key, i) => (
            <button
              key={i}
              onClick={() => key && handleKey(key)}
              className={`h-16 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
                key === "" ? "" :
                key === "←" ? "bg-gray-100 text-gray-600" :
                key === "fingerprint" ? "bg-gray-50" :
                "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {key === "fingerprint" ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1C7.03 1 3 5.03 3 10v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-4.97-4.03-9-9-9z" fill="#9CA3AF"/>
                  <path d="M12 5c-2.76 0-5 2.24-5 5v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-1.65 1.35-3 3-3s3 1.35 3 3v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-2.76-2.24-5-5-5z" fill="#9CA3AF"/>
                </svg>
              ) : key === "←" ? (
                <span className="text-xl">⌫</span>
              ) : (
                <span className="text-2xl font-semibold text-gray-800">{key}</span>
              )}
            </button>
          ))}
        </div>

        {/* Inscription */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Pas encore de compte ?{" "}
          <button
            onClick={() => navigate("/choix-role")}
            className="text-green-700 font-semibold"
          >
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  );
}