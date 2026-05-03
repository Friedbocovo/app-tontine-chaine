import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../assets/screen.png";
import Screen2 from "../assets/screen2.png";
import Screen3 from "../assets/screen3.png";


const slides = [
  {
    id: 1,
    image: Screen,
    title: "Épargnez ensemble, en confiance",
    subtitle: "Rejoignez ou créez une tontine avec vos proches",
  },
  {
    id: 2,
    image: Screen2,
    title: "Zéro risque de fraude",
    subtitle: "Les règles sont gravées dans la blockchain — personne ne peut tricher",
  },
  {
    id: 3,
    image: Screen3,
    title: "Automatique et transparent",
    subtitle: "La cagnotte se libère seule au bon bénéficiaire, en temps réel",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/choix-role");
    }
  };

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-6">
        <span className="text-lg font-bold">
          <span className="text-gray-900">Tontine</span>
          <span className="text-green-700">Chain</span>
        </span>
        {current < slides.length - 1 && (
          <button
            onClick={() => navigate("/choix-role")}
            className="text-gray-400 text-sm"
          >
            Passer
          </button>
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">

        {/* Image ou Icône */}
        {slide.image ? (
          <div className="w-full max-w-xs rounded-3xl overflow-hidden shadow-lg">
            <img
              src={slide.image}
              alt="tontine"
              className="w-full h-72 object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center text-6xl shadow-inner">
            {slide.icon}
          </div>
        )}

        {/* Texte */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
            {slide.title}
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            {slide.subtitle}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-10 flex flex-col items-center gap-6">

        {/* Points de navigation */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2.5 bg-green-700"
                  : "w-2.5 h-2.5 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Bouton */}
        <button
          onClick={handleNext}
          className="w-full bg-green-800 text-white py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          {current < slides.length - 1 ? "Suivant" : "Commencer"}
          <span>→</span>
        </button>

        {/* Footer text */}
        <p className="text-xs text-gray-400 tracking-widest uppercase text-center">
          Propulsé par la Blockchain · Sécurité de grade bancaire
        </p>
      </div>
    </div>
  );
}