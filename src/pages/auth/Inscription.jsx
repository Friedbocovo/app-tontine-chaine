import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const villesBenin = [
    "Cotonou", "Porto-Novo", "Parakou", "Abomey-Calavi",
    "Bohicon", "Kandi", "Lokossa", "Ouidah", "Djougou", "Natitingou"
];

export default function Inscription() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role") || "membre";

    const [form, setForm] = useState({
        nom: "",
        telephone: "",
        ville: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.nom.trim()) newErrors.nom = "Le nom est requis";
        if (!form.telephone.trim()) newErrors.telephone = "Le numéro est requis";
        else if (form.telephone.length < 8) newErrors.telephone = "Numéro invalide";
        if (!form.ville) newErrors.ville = "Veuillez sélectionner une ville";
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Stocker les infos temporairement
        localStorage.setItem("inscription", JSON.stringify({ ...form, role }));
        navigate("/verification");
    };

    return (
        <div className="md:flex md:flex-col justify-content items-center" style={{ backgroundColor: "#F5F2ED" }}>

            <div className="min-h-screen  md:flex md:flex-col justify-content items-center md:w-[500px] flex flex-col" >

                {/* Header */}
                <div className="flex items-center px-6 pt-8 pb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm mr-4"
                    >
                        <span className="text-gray-600 text-lg">←</span>
                    </button>
                </div>

                {/* Contenu scrollable */}
                <div className="flex-1 px-6 pb-10 overflow-y-auto">

                    {/* Photo de profil */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" fill="#D1D5DB" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#D1D5DB" />
                            </svg>
                        </div>
                    </div>

                    {/* Titre */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer mon compte</h1>
                        <p className="text-gray-400 text-sm">
                            Commencez votre voyage d'épargne communautaire en quelques étapes.
                        </p>
                    </div>

                    {/* Barre de progression */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-green-700 uppercase tracking-wide">
                                Étape 1 sur 3
                            </span>
                            <span className="text-xs text-gray-400">Identité personnelle</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="h-1.5 flex-1 rounded-full bg-green-700" />
                            <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
                            <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
                        </div>
                    </div>

                    {/* Formulaire */}
                    <div className="flex flex-col gap-5">

                        {/* Prénom et Nom */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Prénom et Nom
                            </label>
                            <div className={`flex items-center bg-white rounded-2xl px-4 py-3.5 shadow-sm border ${errors.nom ? "border-red-400" : "border-transparent"
                                }`}>
                                <svg className="mr-3 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="2" />
                                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <input
                                    type="text"
                                    name="nom"
                                    value={form.nom}
                                    onChange={handleChange}
                                    placeholder="Ex: Koffi Mensah"
                                    className="flex-1 outline-none text-gray-800 bg-transparent text-sm"
                                />
                            </div>
                            {errors.nom && (
                                <p className="text-red-400 text-xs mt-1 ml-1">{errors.nom}</p>
                            )}
                        </div>

                        {/* Numéro de téléphone */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Numéro de téléphone
                            </label>
                            <div className={`flex items-center bg-white rounded-2xl shadow-sm border overflow-hidden ${errors.telephone ? "border-red-400" : "border-transparent"
                                }`}>
                                {/* Indicatif */}
                                <div className="flex items-center px-4 py-3.5 border-r border-gray-100">
                                    <span className="text-sm font-semibold text-gray-700">+229</span>
                                </div>
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={form.telephone}
                                    onChange={handleChange}
                                    placeholder="00 00 00 00"
                                    maxLength={8}
                                    className="flex-1 outline-none text-gray-800 bg-transparent text-sm px-4 py-3.5"
                                />
                            </div>
                            {errors.telephone && (
                                <p className="text-red-400 text-xs mt-1 ml-1">{errors.telephone}</p>
                            )}
                        </div>

                        {/* Ville / Quartier */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                Ville / Quartier
                            </label>
                            <div className={`flex items-center bg-white rounded-2xl px-4 py-3.5 shadow-sm border ${errors.ville ? "border-red-400" : "border-transparent"
                                }`}>
                                <svg className="mr-3 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#9CA3AF" strokeWidth="2" />
                                    <circle cx="12" cy="9" r="2.5" stroke="#9CA3AF" strokeWidth="2" />
                                </svg>
                                <select
                                    name="ville"
                                    value={form.ville}
                                    onChange={handleChange}
                                    className="flex-1 outline-none text-gray-800 bg-transparent text-sm appearance-none"
                                >
                                    <option value="">Sélectionnez votre ville</option>
                                    {villesBenin.map((v) => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 9l6 6 6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            {errors.ville && (
                                <p className="text-red-400 text-xs mt-1 ml-1">{errors.ville}</p>
                            )}
                        </div>
                    </div>

                    {/* Bouton continuer */}
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-10 py-4 rounded-2xl font-semibold text-white text-base flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        style={{ backgroundColor: "#1B5E4B" }}
                    >
                        Continuer →
                    </button>

                    {/* Lien connexion */}
                    <p className="text-center text-sm text-gray-400 mt-5">
                        J'ai déjà un compte ?{" "}
                        <button
                            onClick={() => navigate("/connexion")}
                            className="text-green-700 font-semibold"
                        >
                            Se connecter
                        </button>
                    </p>
                </div>
            </div>
        </div>

    );
}