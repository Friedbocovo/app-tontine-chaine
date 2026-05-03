import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animer la barre de progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Rediriger après 3 secondes
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-8">

      {/* Logo + Nom */}
      <div className="flex flex-col items-center mb-16 animate-fade-in">

        {/* Logo cercle avec personnes */}
        <div className="w-24 h-24 mb-6">
          <img src={Logo} alt="logo" className="w-full h-full object-contain" />
        </div>

        {/* Nom de l'app */}
        <div className="text-center">
          <span className="text-2xl font-bold">
            <span className="text-gray-900">Tontine</span>
            <span className="text-green-700">Chain</span>
          </span>
        </div>
      </div>

      {/* Titre + Barre de progression */}
      <div className="w-full max-w-xs flex flex-col items-center gap-6">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TontineChain</h1>
          <p className="text-gray-500 text-sm">Votre tontine, protégée et transparente</p>
        </div>

        {/* Barre de progression */}
        <div className="w-full">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #1B5E4B, #2D7A63)",
              }}
            />
          </div>
          <p className="text-center text-xs font-semibold text-green-700 mt-3 tracking-widest uppercase">
            Sécurisation de la session...
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 flex flex-col items-center gap-3">
        {/* Points de navigation */}
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <div className="w-2 h-2 rounded-full bg-green-700" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>

        <p className="text-xs text-gray-400 tracking-widest uppercase">
          Powered by Blockchain Architecture
        </p>
      </div>
    </div>
  );
}