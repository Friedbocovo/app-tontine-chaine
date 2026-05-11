import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function LoginAdmin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate                = useNavigate();

  // Identifiants super admin (en dur pour la démo)
  const ADMIN_EMAIL    = "admin@dtc.bj";
  const ADMIN_PASSWORD = "TontineChain2026";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("admin_logged", "true");
        navigate("/admin");
      } else {
        setError("Email ou mot de passe incorrect.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#1B5E4B] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1B5E4B] rounded-2xl mb-4">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">TontineChain</h1>
          <p className="text-sm text-gray-500 mt-1">Espace Super Administrateur DTC</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email administrateur
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dtc.bj"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B5E4B] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#164a3b] transition disabled:opacity-60"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        {/* Indice pour la démo */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-400 font-medium mb-1">Identifiants de démo</p>
          <p className="text-xs text-gray-500">Email : <span className="font-mono font-semibold">admin@dtc.bj</span></p>
          <p className="text-xs text-gray-500">Mot de passe : <span className="font-mono font-semibold">TontineChain2026</span></p>
        </div>

      </div>
    </div>
  );
}