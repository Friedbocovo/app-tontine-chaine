import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, Shield } from "lucide-react";

export default function ProfilAdmin() {
  // Infos profil
  const [nom,   setNom]   = useState("Administrateur DTC");
  const [email, setEmail] = useState("admin@dtc.bj");
  const [tel,   setTel]   = useState("+22901 97 00 00 00");
  const [profilSaved, setProfilSaved] = useState(false);

  // Mot de passe
  const [ancienPwd,   setAncienPwd]   = useState("");
  const [nouveauPwd,  setNouveauPwd]  = useState("");
  const [confirmPwd,  setConfirmPwd]  = useState("");
  const [showAncien,  setShowAncien]  = useState(false);
  const [showNouveau, setShowNouveau] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwdError,    setPwdError]    = useState("");
  const [pwdSaved,    setPwdSaved]    = useState(false);

  // Sauvegarder profil
  const handleSaveProfil = (e) => {
    e.preventDefault();
    setProfilSaved(true);
    setTimeout(() => setProfilSaved(false), 3000);
  };

  // Changer mot de passe
  const handleChangePwd = (e) => {
    e.preventDefault();
    setPwdError("");
    setPwdSaved(false);

    if (ancienPwd !== "TontineChain2026") {
      setPwdError("L'ancien mot de passe est incorrect.");
      return;
    }
    if (nouveauPwd.length < 8) {
      setPwdError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (nouveauPwd !== confirmPwd) {
      setPwdError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    // Succès
    setPwdSaved(true);
    setAncienPwd("");
    setNouveauPwd("");
    setConfirmPwd("");
    setTimeout(() => setPwdSaved(false), 3000);
  };

  // Indicateur force mot de passe
  const getForce = (pwd) => {
    if (pwd.length === 0) return { label: "", color: "", width: "0%" };
    if (pwd.length < 6)   return { label: "Faible",  color: "bg-red-400",    width: "33%" };
    if (pwd.length < 10)  return { label: "Moyen",   color: "bg-yellow-400", width: "66%" };
    return                       { label: "Fort",    color: "bg-green-500",  width: "100%" };
  };

  const force = getForce(nouveauPwd);

  return (
    <div className="p-8 max-w-3xl space-y-8">

      {/* En-tête */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Mon profil</h2>
        <p className="text-gray-500 mt-1">Gérez vos informations et votre mot de passe</p>
      </div>

      {/* Avatar + rôle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-[#1B5E4B] flex items-center justify-center flex-shrink-0">
          <Shield size={36} className="text-white" />
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">{nom}</p>
          <p className="text-sm text-gray-500">{email}</p>
          <span className="inline-block mt-2 text-xs font-semibold bg-[#1B5E4B]/10 text-[#1B5E4B] px-3 py-1 rounded-full">
            Super Administrateur DTC
          </span>
        </div>
      </div>

      {/* Formulaire infos personnelles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-5">
          Informations personnelles
        </h3>

        <form onSubmit={handleSaveProfil} className="space-y-4">

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nom complet
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
              />
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Téléphone
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
              />
            </div>
          </div>

          {/* Message succès profil */}
          {profilSaved && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
              <CheckCircle size={16} />
              Profil mis à jour avec succès.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#1B5E4B] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#164a3b] transition"
          >
            Sauvegarder les modifications
          </button>
        </form>
      </div>

      {/* Formulaire changement mot de passe */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <Lock size={18} className="text-[#1B5E4B]" />
          Changer le mot de passe
        </h3>

        <form onSubmit={handleChangePwd} className="space-y-4">

          {/* Ancien mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Ancien mot de passe
            </label>
            <div className="relative">
              <input
                type={showAncien ? "text" : "password"}
                value={ancienPwd}
                onChange={(e) => setAncienPwd(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
              />
              <button type="button" onClick={() => setShowAncien(!showAncien)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showAncien ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Nouveau mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showNouveau ? "text" : "password"}
                value={nouveauPwd}
                onChange={(e) => setNouveauPwd(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
              />
              <button type="button" onClick={() => setShowNouveau(!showNouveau)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showNouveau ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Indicateur de force */}
            {nouveauPwd.length > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${force.color}`}
                    style={{ width: force.width }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Force : <span className="font-semibold">{force.label}</span></p>
              </div>
            )}
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E4B] text-sm"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Vérification correspondance */}
            {confirmPwd.length > 0 && (
              <p className={`text-xs mt-1 ${nouveauPwd === confirmPwd ? "text-green-500" : "text-red-400"}`}>
                {nouveauPwd === confirmPwd ? "✓ Les mots de passe correspondent" : "✗ Les mots de passe ne correspondent pas"}
              </p>
            )}
          </div>

          {/* Erreur */}
          {pwdError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {pwdError}
            </div>
          )}

          {/* Succès */}
          {pwdSaved && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
              <CheckCircle size={16} />
              Mot de passe changé avec succès.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#1B5E4B] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#164a3b] transition"
          >
            Changer le mot de passe
          </button>
        </form>
      </div>

    </div>
  );
}