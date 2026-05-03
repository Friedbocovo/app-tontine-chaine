import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
export default function ChoixRole() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col px-6 py-10  md:items-center gap-4 md:justify-center  md:m-auto" style={{ backgroundColor: "#F5F2ED" }}>

            {/* Header */}
            <div className="flex justify-end mb-8 absolute top-0 right-0 p-6">
                <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow text-gray-500 font-bold text-sm">
                    ?
                </button>
            </div>

            {/* Logo */}
            <div className="text-center  flex flex-col items-center justify-center mb-2 mt-[50px]">
                <img src={Logo} alt="logo" className="md:w-[100px] md:h-[100px] w-[55px] h-[55px] object-contain" />
                <span className="text-lg font-bold">
                    <span className="text-gray-900">Tontine</span>
                    <span className="text-green-700">Chain</span>
                </span>
            </div>

            {/* Titre */}
            <div className="text-center mb-10 ">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Vous êtes ?</h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Choisissez votre rôle pour commencer l'aventure TontineChain.
                </p>
            </div>

            {/* Cards */}
            <div className="flex md:flex-row flex-col md:gap-10 gap-4 justify-center items-center">

                {/* Organisateur */}
                <button
                    onClick={() => navigate("/inscription?role=organisateur")}
                    className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm border border-gray-100 active:scale-95 transition-transform text-left"
                >
                    <div className="flex items-center gap-4">
                        {/* Icône */}
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#E8F5F0" }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" fill="#1B5E4B" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#1B5E4B" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="18" cy="6" r="3" fill="#F5A623" />
                                <path d="M18 9c2 0 4 1.5 4 4" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Organisateur</h2>
                            <p className="text-gray-400 text-sm mb-2">Je crée et gère une tontine</p>
                            <div className="flex gap-2">
                                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                                    Visionnaire
                                </span>
                                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                                    Gestionnaire
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Flèche */}
                    <span className="text-gray-300 text-xl">›</span>
                </button>

                {/* Membre */}
                <button
                    onClick={() => navigate("/inscription?role=membre")}
                    className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm border border-gray-100 active:scale-95 transition-transform text-left"
                >
                    <div className="flex items-center gap-4">
                        {/* Icône */}
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#FDF6EC" }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" fill="#F5A623" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Membre</h2>
                            <p className="text-gray-400 text-sm mb-2">Je rejoins une tontine</p>
                            <div className="flex gap-2">
                                <span className="text-xs bg-orange-50 text-orange-500 px-2 py-1 rounded-full font-medium">
                                    Épargnant
                                </span>
                                <span className="text-xs bg-orange-50 text-orange-500 px-2 py-1 rounded-full font-medium">
                                    Bénéficiaire
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Flèche */}
                    <span className="text-gray-300 text-xl">›</span>
                </button>
            </div>

            {/* Citation bas */}
            <div className="mt-10 text-center">
                <p className="text-xs text-gray-400 italic">
                    "Le tisserand ne fait qu'un avec son pagne."
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    Construisons ensemble votre sécurité financière.
                </p>
            </div>
        </div>
    );
}